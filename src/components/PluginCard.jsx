import React, { useState, useRef } from 'react';

const PluginCard = ({ plugin, onViewDetails, onPurchase }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        document.querySelectorAll('.plugin-preview video').forEach(video => {
          if (video !== videoRef.current) {
            video.pause();
            video.currentTime = 0;
            video.classList.remove('playing');
          }
        });
        
        videoRef.current.play();
        videoRef.current.classList.add('playing');
        setIsVideoPlaying(true);
      } else {
        videoRef.current.pause();
        videoRef.current.classList.remove('playing');
        setIsVideoPlaying(false);
      }
    }
  };

  const handleVideoEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.classList.remove('playing');
      setIsVideoPlaying(false);
    }
  };

  const handleViewDetails = (e) => {
    e.preventDefault();
    onViewDetails(plugin.id);
  };

  const handlePurchase = (e) => {
    e.preventDefault();
    onPurchase(plugin);
  };

  const getActionButton = () => {
    if (plugin.category === 'public') {
      return (
        <a 
          href="https://github.com/mixvd/helix-plugins" 
          className="get-it"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get It
        </a>
      );
    } else if (plugin.category === 'for-sale') {
      return (
        <a 
          href="#" 
          className="buy-now"
          onClick={handlePurchase}
        >
          Buy Now
        </a>
      );
    }
    return null;
  };

  return (
    <div className="plugin-card" data-category={plugin.category}>
      <div 
        className="plugin-preview"
        style={{ backgroundImage: `url('${plugin.thumbnail}')` }}
        onClick={handlePlayClick}
      >
        <video 
          ref={videoRef}
          poster={plugin.thumbnail} 
          muted
          onEnded={handleVideoEnded}
        >
          <source src={plugin.video} type="video/mp4" />
        </video>
        <div className="play-btn">
          <i className="fas fa-play"></i>
        </div>
      </div>
      <div className="plugin-info">
        <h3>{plugin.title}</h3>
        <p>{plugin.description}</p>
        <div className="plugin-actions">
          <a 
            href="#" 
            className="view-details"
            onClick={handleViewDetails}
          >
            View Details
          </a>
          {getActionButton()}
        </div>
      </div>
    </div>
  );
};

export default PluginCard;
