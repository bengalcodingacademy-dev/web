import { useEffect } from 'react';
import { api } from '../lib/api';

export default function VisitorTracker() {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Only track once per session
        const hasTracked = sessionStorage.getItem('visitorTracked');
        if (hasTracked) {
          return;
        }

        await api.post('/visitors/track');
        sessionStorage.setItem('visitorTracked', 'true');
        
        console.log('Visitor tracked successfully');
      } catch (error) {
        // Silently fail - don't show errors to users
        console.error('Failed to track visitor:', error);
      }
    };

    // Track visitor after a short delay to ensure page is loaded
    const timer = setTimeout(trackVisitor, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return null; // This component doesn't render anything
}
