import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';

const TopProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let timeoutId = null;

    const startProgress = () => {
      setIsVisible(true);
      setProgress(0);
      
      timeoutId = setTimeout(() => setProgress(10), 200);
      
      timeoutId = setTimeout(() => setProgress(90), 400);
      timeoutId = setTimeout(() => setProgress(95), 600);
    };

    const completeProgress = () => {
      setProgress(100);
      
      timeoutId = setTimeout(() => {
        setIsVisible(false);
        setProgress(0);
      }, 200);
    };

    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      startProgress();
      try {
        const response = await originalFetch(...args);
        completeProgress();
        return response;
      } catch (error) {
        completeProgress();
        throw error;
      }
    };

    startProgress();
    completeProgress();

    return () => {
      window.fetch = originalFetch;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [location]);

  if (!isVisible) return null;

  return (
    <Progress 
      value={progress} 
      className="fixed top-0 left-0 right-0 z-50 h-1 w-full rounded-none transition-all" 
    />
  );
};

export default TopProgressBar;