import { useEffect } from 'react';
import { api } from '../lib/api';

export default function VisitorTracker() {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Only track once per session
        const hasTracked = sessionStorage.getItem('visitorTracked');
        if (hasTracked) {
          console.log('Visitor already tracked in this session');
          return;
        }

        console.log('Attempting to track visitor...');
        const response = await api.post('/visitors/track');
        sessionStorage.setItem('visitorTracked', 'true');
        
        console.log('Visitor tracked successfully:', response.data);
      } catch (error) {
        // Log error for debugging
        console.error('Failed to track visitor:', error);
        console.error('Error details:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data
        });
      }
    };

    // Track visitor after a short delay to ensure page is loaded
    const timer = setTimeout(trackVisitor, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return null; // This component doesn't render anything
}
