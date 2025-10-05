import React, { useState, useEffect } from 'react';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.classList.add('dark-mode');
    
    const interval = setInterval(() => {
      setProgress(prev => {
        const increment = Math.random() * 15;
        const newProgress = prev + increment;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-screen">
      <div className="loader">
        <div className="loader-text">mxd<span>.</span></div>
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="progress-text">{Math.round(progress)}%</div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
