import React, { useEffect, useRef } from 'react';
import { pluginData } from '../data/pluginData';

const PluginModal = ({ pluginId, onClose }) => {
  const modalRef = useRef(null);
  const videoRef = useRef(null);

  const plugin = pluginData[pluginId];

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && e.target === modalRef.current) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('click', handleClickOutside);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [pluginId]);

  if (!plugin) return null;

  return (
    <div className="modal active" ref={modalRef}>
      <div className="modal-content">
        <span className="modal-close" onClick={onClose}>&times;</span>
        <div className="modal-header">
          <h3>{plugin.title}</h3>
        </div>
        <div className="modal-body">
          <div className="modal-video-container">
            <video 
              ref={videoRef}
              controls 
              poster={plugin.poster} 
              muted
            >
              <source src={plugin.video} type="video/mp4" />
            </video>
          </div>
          <div 
            className="modal-description"
            dangerouslySetInnerHTML={{ __html: plugin.description }}
          />
        </div>
      </div>
    </div>
  );
};

export default PluginModal;
