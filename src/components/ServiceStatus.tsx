import React from 'react';

interface ServiceStatusProps {
  url: string;
  onStatusChange?: (status: 'checking' | 'online' | 'offline') => void;
}

const ServiceStatus: React.FC<ServiceStatusProps> = ({ url, onStatusChange }) => {
  React.useEffect(() => {
    const checkStatus = async () => {
      onStatusChange?.('checking');
      
      try {
        const response = await fetch(url);
        if (response.ok) {
          onStatusChange?.('online');
        } else {
          onStatusChange?.('offline');
        }
      } catch (error) {
        onStatusChange?.('offline');
      }
    };

    checkStatus();

    // Set up periodic health checks
    const interval = setInterval(checkStatus, 30000); // Check every 30 seconds

    return () => {
      clearInterval(interval);
    };
  }, [url, onStatusChange]);

  return null;
};

export default ServiceStatus;