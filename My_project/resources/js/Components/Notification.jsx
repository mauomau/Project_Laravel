// components/Notification/Notification.jsx
import { X, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createContext, useContext, useState, useCallback, useEffect } from 'react';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = useCallback((message, details = null, type = 'info', duration = 5000) => {
    const id = Date.now();
    const newNotification = { id, message, details, type };

    setNotifications(prev => [...prev, newNotification]);

    if (duration > 0) {
      setTimeout(() => {
        hideNotification(id);
      }, duration);
    }

    return id;
  }, []);

  const hideNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification, hideNotification }}>
      {children}
      <NotificationContainer 
        notifications={notifications} 
        onHide={hideNotification} 
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

const NotificationContainer = ({ notifications, onHide }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onHide={onHide}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

const NotificationItem = ({ notification, onHide }) => {
  const { message, details, type, id } = notification;

  const typeStyles = {
    success: {
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
      icon: <CheckCircle className="w-5 h-5 text-green-400" />,
    },
    error: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      icon: <XCircle className="w-5 h-5 text-red-400" />,
    },
    warning: {
      bg: 'bg-yellow-500/90',
      border: 'border-yellow-500/30',
      icon: <AlertTriangle className="w-5 h-5 text-yellow-400" />,
    },
    info: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      icon: <Info className="w-5 h-5 text-blue-400" />,
    },
  }[type] || typeStyles.info;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className={`
        ${typeStyles.bg} ${typeStyles.border}
        backdrop-blur-sm rounded-lg shadow-lg shadow-black/30 p-3
        flex items-start gap-3 w-[90vw] sm:w-96 max-w-full
        border
      `}
      onClick={() => onHide(id)}
    >
      <div className="shrink-0 pt-0.5">
        {typeStyles.icon}
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-white font-medium text-sm line-clamp-2">
          {message}
        </p>
        {details && (
          <p className="text-gray-300 text-xs mt-1 line-clamp-2">
            {details}
          </p>
        )}
      </div>
      
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onHide(id);
        }}
        className="text-gray-400 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};