import React, { useEffect, useRef } from 'react';
import { api } from '../lib/api';

const PhoneEmailWidget = ({ onPhoneVerified, email }) => {
  const widgetRef = useRef(null);
  const listenerRef = useRef(null);

  useEffect(() => {
    // Load the external script
    const script = document.createElement('script');
    script.src = "https://www.phone.email/sign_in_button_v1.js";
    script.async = true;
    
    if (widgetRef.current) {
      widgetRef.current.appendChild(script);
    }

    // Define the listener function
    const phoneEmailListener = async function(userObj) {
      console.log('Phone verification successful:', userObj);
      
      try {
        // Call our backend to verify the phone number
        const response = await api.post('/auth/verify-phone-widget', {
          user_json_url: userObj.user_json_url,
          email: email
        });

        if (response.data.ok) {
          console.log('Phone verified successfully:', response.data);
          onPhoneVerified && onPhoneVerified(response.data);
        } else {
          console.error('Phone verification failed:', response.data);
        }
      } catch (error) {
        console.error('Error verifying phone:', error);
      }
    };

    // Store reference to the listener
    listenerRef.current = phoneEmailListener;
    window.phoneEmailListener = phoneEmailListener;

    return () => {
      // Cleanup the listener function when the component unmounts
      if (listenerRef.current) {
        window.phoneEmailListener = null;
      }
      
      // Remove script if it exists
      if (widgetRef.current && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [email, onPhoneVerified]);

  return (
    <div className="phone-email-widget">
      <div 
        ref={widgetRef}
        className="pe_signin_button" 
        data-client-id="15695407177920574360"
        style={{ minHeight: '50px' }}
      >
        {/* Loading message while widget loads */}
        <div className="flex items-center justify-center p-4 bg-black/30 rounded-xl border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 border-2 border-bca-gold border-t-transparent rounded-full animate-spin"></div>
            <span className="text-white/70 text-sm">Loading phone verification...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneEmailWidget;
