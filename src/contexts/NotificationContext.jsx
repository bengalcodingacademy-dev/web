import { createContext, useContext, useState } from 'react';
import { NotificationManager, useNotifications } from '../components/Notification';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const notificationHook = useNotifications();

  return (
    <NotificationContext.Provider value={notificationHook}>
      {children}
      <NotificationManager 
        notifications={notificationHook.notifications} 
        onRemove={notificationHook.removeNotification} 
      />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
