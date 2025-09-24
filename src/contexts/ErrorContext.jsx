import React, { createContext, useContext, useState, useCallback } from 'react';

const ErrorContext = createContext();

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};

export const ErrorProvider = ({ children }) => {
  const [errors, setErrors] = useState([]);

  const addError = useCallback((error) => {
    const errorId = Date.now() + Math.random();
    const newError = {
      id: errorId,
      message: error.message || 'An unexpected error occurred',
      type: error.type || 'error',
      details: error.details,
      timestamp: new Date().toISOString()
    };

    setErrors(prev => [...prev, newError]);

    // Auto-remove error after 5 seconds
    setTimeout(() => {
      removeError(errorId);
    }, 5000);

    return errorId;
  }, []);

  const removeError = useCallback((errorId) => {
    setErrors(prev => prev.filter(error => error.id !== errorId));
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors([]);
  }, []);

  const handleApiError = useCallback((error) => {
    let message = 'An unexpected error occurred';
    let type = 'error';

    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          message = data.error?.message || 'Invalid request. Please check your input.';
          type = 'warning';
          break;
        case 401:
          message = 'Please log in to continue.';
          type = 'warning';
          break;
        case 403:
          message = 'You do not have permission to perform this action.';
          type = 'error';
          break;
        case 404:
          message = 'The requested resource was not found.';
          type = 'warning';
          break;
        case 409:
          message = data.error?.message || 'A conflict occurred. Please try again.';
          type = 'warning';
          break;
        case 422:
          message = data.error?.message || 'Validation error. Please check your input.';
          type = 'warning';
          break;
        case 429:
          message = 'Too many requests. Please wait a moment and try again.';
          type = 'warning';
          break;
        case 500:
          message = 'Server error. Please try again later.';
          type = 'error';
          break;
        case 503:
          message = 'Service temporarily unavailable. Please try again later.';
          type = 'error';
          break;
        default:
          message = data.error?.message || `Server error (${status})`;
          type = 'error';
      }
    } else if (error.request) {
      // Request was made but no response received
      message = 'Network error. Please check your connection and try again.';
      type = 'error';
    } else {
      // Something else happened
      message = error.message || 'An unexpected error occurred';
      type = 'error';
    }

    addError({ message, type, details: error.response?.data });
  }, [addError]);

  const value = {
    errors,
    addError,
    removeError,
    clearAllErrors,
    handleApiError
  };

  return (
    <ErrorContext.Provider value={value}>
      {children}
    </ErrorContext.Provider>
  );
};

// Error Notification Component
export const ErrorNotifications = () => {
  const { errors, removeError } = useError();

  if (errors.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {errors.map(error => (
        <div
          key={error.id}
          className={`p-4 rounded-lg shadow-lg border-l-4 ${
            error.type === 'error' 
              ? 'bg-red-900/90 border-red-500 text-red-100' 
              : error.type === 'warning'
              ? 'bg-yellow-900/90 border-yellow-500 text-yellow-100'
              : 'bg-blue-900/90 border-blue-500 text-blue-100'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="font-medium">{error.message}</p>
              {error.details && process.env.NODE_ENV === 'development' && (
                <details className="mt-2">
                  <summary className="text-xs opacity-75 cursor-pointer">Details</summary>
                  <pre className="text-xs mt-1 opacity-75 overflow-auto">
                    {JSON.stringify(error.details, null, 2)}
                  </pre>
                </details>
              )}
            </div>
            <button
              onClick={() => removeError(error.id)}
              className="ml-2 text-current opacity-75 hover:opacity-100"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
