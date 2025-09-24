import { useCallback } from 'react';
import { useError } from '../contexts/ErrorContext';

export const useErrorHandler = () => {
  const { handleApiError, addError } = useError();

  const handleError = useCallback((error, customMessage) => {
    if (error.response || error.request) {
      // API error
      handleApiError(error);
    } else {
      // Generic error
      addError({
        message: customMessage || error.message || 'An unexpected error occurred',
        type: 'error'
      });
    }
  }, [handleApiError, addError]);

  const handleSuccess = useCallback((message) => {
    addError({
      message,
      type: 'success'
    });
  }, [addError]);

  const handleWarning = useCallback((message) => {
    addError({
      message,
      type: 'warning'
    });
  }, [addError]);

  return {
    handleError,
    handleSuccess,
    handleWarning,
    handleApiError
  };
};

export default useErrorHandler;
