import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

let logoutHandler = null;
let isInitialCheck = true;

export function onLogout(handler) {
  logoutHandler = handler;
}

export function setInitialCheckComplete() {
  isInitialCheck = false;
}

export const api = axios.create({ 
  baseURL: API_BASE,
  withCredentials: true, // Enable cookies
  headers: {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  }
});

// Add request interceptor for cache-busting
api.interceptors.request.use(
  config => {
    // Add timestamp to prevent caching
    const timestamp = Date.now();
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: timestamp
      };
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  res => res,
  async err => {
    if (err.response && err.response.status === 401) {
      const errorCode = err.response.data?.code;
      
      // Don't trigger logout during initial auth check
      if (isInitialCheck) {
        return Promise.reject(err);
      }
      
      // Don't redirect or show alerts if we're on public pages
      if (window.location.pathname === '/login' || 
          window.location.pathname === '/' || 
          window.location.pathname === '/batches' ||
          window.location.pathname === '/webinars' ||
          window.location.pathname === '/announcements' ||
          window.location.pathname === '/register' ||
          window.location.pathname === '/forgot-password' ||
          window.location.pathname === '/reset-password' ||
          window.location.pathname.startsWith('/course/')) {
        return Promise.reject(err);
      }
      
      if (errorCode === 'TOKEN_EXPIRED') {
        // Show token expired message
        if (logoutHandler) {
          logoutHandler('Your session has expired. Please login again.');
        }
      } else {
        // Regular unauthorized - don't redirect to login automatically
        // Let the component handle this
        if (logoutHandler) {
          logoutHandler('Please login to continue.');
        }
      }
    }
    return Promise.reject(err);
  }
);
