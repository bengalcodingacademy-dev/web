import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api } from '../lib/api';
import { useAuth } from '../lib/authContext';

const RazorpayPayment = ({ 
  isOpen, 
  onClose, 
  course, 
  onSuccess, 
  onError,
  isMonthlyPayment = false,
  monthNumber = 1,
  totalMonths = 1
}) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setLoading(false);
      setError('');
    } else {
      setLoading(false);
      setError('');
      // Clean up any remaining fetch interception
      if (window._originalFetch) {
        window.fetch = window._originalFetch;
        delete window._originalFetch;
      }
    }
  }, [isOpen]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      // Check if script is already loaded
      if (window.Razorpay) {
        console.log('Razorpay script already loaded');
        resolve(true);
        return;
      }

      // Check if script is already in DOM
      const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
      if (existingScript) {
        console.log('Razorpay script already in DOM, waiting for load');
        existingScript.onload = () => resolve(true);
        existingScript.onerror = () => resolve(false);
        return;
      }

      console.log('Loading Razorpay script...');
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        console.log('Razorpay script loaded successfully');
        resolve(true);
      };
      script.onerror = (error) => {
        console.error('Failed to load Razorpay script:', error);
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError('');

      // Intercept and block Razorpay tracking requests
      if (!window._originalFetch) {
        window._originalFetch = window.fetch;
      }
      const originalFetch = window._originalFetch;
      window.fetch = function(...args) {
        const url = args[0];
        if (typeof url === 'string' && 
            (url.includes('lumberjack.razorpay.com') || 
             url.includes('track?key_id') || 
             url.includes('preferences?key_id'))) {
          console.log('Blocking Razorpay tracking request:', url);
          return Promise.resolve(new Response('{}', { status: 200 }));
        }
        return originalFetch.apply(this, args);
      };

      // Check if Razorpay key is configured
      console.log('Razorpay Key ID:', import.meta.env.VITE_RAZORPAY_KEY_ID ? 'Present' : 'Missing');
      console.log('Environment:', import.meta.env.MODE);
      console.log('All env vars:', import.meta.env);
      if (!import.meta.env.VITE_RAZORPAY_KEY_ID) {
        throw new Error('Razorpay configuration missing. Please contact support.');
      }

      // Load Razorpay script with timeout
      const scriptLoaded = await Promise.race([
        loadRazorpayScript(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Script loading timeout')), 10000)
        )
      ]);
      
      if (!scriptLoaded) {
        throw new Error('Failed to load Razorpay script. Please check your internet connection.');
      }

      // Create order
      console.log('Creating order with data:', {
        courseId: course.id,
        isMonthlyPayment,
        monthNumber,
        totalMonths
      });

      const orderResponse = await api.post('/purchases/create-order', {
        courseId: course.id,
        isMonthlyPayment,
        monthNumber,
        totalMonths
      });

      console.log('Order response:', orderResponse.data);

      // Validate response structure - handle both nested and spread formats
      if (!orderResponse.data) {
        throw new Error('Invalid order response from server');
      }

      // Check if order is nested or spread
      let order;
      if (orderResponse.data.order && orderResponse.data.order.id) {
        // Nested format: { order: {...}, purchase: {...} }
        console.log('Using nested order format');
        order = orderResponse.data.order;
      } else if (orderResponse.data.id) {
        // Spread format: { id: "...", amount: ..., purchase: {...} }
        console.log('Using spread order format');
        order = orderResponse.data;
      } else {
        throw new Error('Invalid order response from server');
      }

      // Configure Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Bengal Coding Academy',
        description: `${course.title}${isMonthlyPayment ? ` - Month ${monthNumber}` : ''}`,
        order_id: order.id,
        method: {
          netbanking: true,
          wallet: true,
          upi: true,
          card: true,
          emi: false,
          paylater: false
        },
        upi_intent: true, // force UPI option
        handler: async function (response) {
          try {
            console.log('Payment response received:', response);
            
            if (!response.razorpay_order_id || !response.razorpay_payment_id || !response.razorpay_signature) {
              throw new Error('Invalid payment response from Razorpay');
            }

            const verifyResponse = await api.post('/purchases/verify-payment', {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature
            });

            console.log('Verification response:', verifyResponse.data);

            if (verifyResponse.data.success) {
              setLoading(false);
              onSuccess(verifyResponse.data.purchase);
            } else {
              throw new Error(verifyResponse.data.error || 'Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            setLoading(false);
            onError(error.response?.data?.error || error.message || 'Payment verification failed');
          }
        },
        notes: {
          courseId: course.id,
          courseTitle: course.title,
          isMonthlyPayment: isMonthlyPayment.toString(),
          monthNumber: monthNumber.toString(),
          totalMonths: totalMonths.toString()
        },
        theme: {
          color: '#F59E0B', // BCA Gold
          backdrop_color: 'rgba(0, 0, 0, 0.8)'
        },
        analytics: {
          enabled: false // Disable Razorpay analytics to prevent tracking failures
        },
        retry: {
          enabled: false // Disable retry mechanism
        },
        timeout: 30000, // 30 second timeout
        upi: {
          flow: 'collect'
        },
        payment_capture: 1,
        readonly: {
          email: true,
          contact: true,
          name: true
        },
        prefill: {
          name: user?.name || "Guest User",
          email: user?.email || "guest@example.com",
          contact: user?.phone || "9999999999"
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            setError('');
            // Clean up fetch interception and event listeners
            if (razorpay && razorpay._cleanup) {
              razorpay._cleanup();
            }
            onClose();
          }
        }
      };

      // Check if Razorpay is available
      if (!window.Razorpay) {
        console.error('Razorpay not available on window object');
        throw new Error('Razorpay is not available. Please refresh the page and try again.');
      }

      console.log('Initializing Razorpay with options:', {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id
      });

      let razorpay;
      try {
        razorpay = new window.Razorpay(options);
        console.log('Razorpay instance created successfully');
      } catch (initError) {
        console.error('Failed to create Razorpay instance:', initError);
        throw new Error(`Failed to initialize payment: ${initError.message}`);
      }
      
      // Add error handler for Razorpay
      razorpay.on('payment.failed', function (response) {
        console.error('Payment failed:', response.error);
        setError(`Payment failed: ${response.error.description || 'Unknown error'}`);
        setLoading(false);
      });

      // Add error handler for Razorpay modal errors
      razorpay.on('modal.error', function (response) {
        console.error('Razorpay modal error:', response.error);
        setError(`Payment modal error: ${response.error.description || 'Unknown error'}`);
        setLoading(false);
      });

      try {
        razorpay.open();
        console.log('Razorpay payment window opened');
      } catch (openError) {
        console.error('Failed to open Razorpay payment window:', openError);
        throw new Error(`Failed to open payment window: ${openError.message}`);
      }

      // Add global error handler for any unhandled Razorpay errors
      const handleGlobalError = (event) => {
        console.log('Global error caught:', event);
        
        // Ignore Razorpay tracking/analytics errors
        if (event.error && event.error.message) {
          const errorMessage = event.error.message.toLowerCase();
          if (errorMessage.includes('razorpay') && 
              (errorMessage.includes('track') || 
               errorMessage.includes('analytics') || 
               errorMessage.includes('preferences'))) {
            console.log('Ignoring Razorpay tracking error:', event.error);
            return; // Don't show error for tracking failures
          }
        }
        
        // Handle other Razorpay errors
        if (event.error && event.error.message && event.error.message.includes('razorpay')) {
          console.error('Global Razorpay error caught:', event.error);
          setError('Payment system error. Please try again.');
          setLoading(false);
        }
      };

      window.addEventListener('error', handleGlobalError);
      
      // Clean up event listener when component unmounts
      const cleanup = () => {
        window.removeEventListener('error', handleGlobalError);
      };
      
      // Store cleanup function for later use
      razorpay._cleanup = () => {
        cleanup();
        // Restore original fetch
        window.fetch = originalFetch;
      };

    } catch (error) {
      console.error('Payment error:', error);
      setError(error.response?.data?.error || 'Failed to initiate payment');
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md rounded-xl bg-bca-gray-800 border border-bca-gray-700 p-6"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            Complete Your Purchase
          </h2>
          <p className="text-bca-gray-300">
            {course.title}
            {isMonthlyPayment && ` - Month ${monthNumber}`}
          </p>
        </div>

        <div className="mb-6 p-4 bg-bca-gray-700 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-bca-gray-300">Amount:</span>
            <span className="text-xl font-bold text-bca-gold">
              ₹{isMonthlyPayment 
                ? (parseFloat(course.monthlyFeeRupees) || 0).toFixed(2) 
                : (parseFloat(course.priceRupees) || 0).toFixed(2)}
            </span>
          </div>
          {isMonthlyPayment && (
            <div className="text-sm text-bca-gray-400">
              Monthly payment • {totalMonths} months total
            </div>
          )}
        </div>

        <div className="mb-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-blue-400 text-sm font-medium">Secure Payment</p>
              <p className="text-blue-300 text-xs mt-1">
                Powered by Razorpay • 100% secure and encrypted
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-3 rounded-lg border border-bca-gray-600 text-bca-gray-300 hover:bg-bca-gray-700 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handlePayment}
            disabled={loading}
            className="flex-1 px-4 py-3 rounded-lg bg-bca-gold text-black font-semibold hover:bg-bca-gold/80 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                Pay Now
              </>
            )}
          </button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-bca-gray-400">
            By proceeding, you agree to our terms and conditions
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RazorpayPayment;
