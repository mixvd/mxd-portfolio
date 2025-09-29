import React, { useEffect, useRef } from 'react';

const PurchaseModal = ({ plugin, onClose }) => {
  const modalRef = useRef(null);

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

  const handleContactClick = () => {
    onClose();
    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="purchase-modal active" ref={modalRef}>
      <div className="modal-content">
        <span className="modal-close" onClick={onClose}>&times;</span>
        <div className="modal-header">
          <h3>Purchase Plugin</h3>
        </div>
        <div className="modal-body">
          <div className="purchase-details">
            <div className="purchase-plugin-name">
              <h4>Plugin: <span className="plugin-name">{plugin.title}</span></h4>
            </div>
            <div className="purchase-price">
              <p>Price: <span className="plugin-price">Contact for pricing</span></p>
            </div>
            <div className="purchase-info">
              <p>To purchase this plugin, please contact me through one of the following methods:</p>
              <ul className="contact-methods">
                <li><i className="fab fa-discord"></i> Discord: mixvd</li>
                <li><i className="fas fa-envelope"></i> Email: mxd.dev.contact@gmail.com</li>
              </ul>
              <p className="purchase-note">
                Please mention the plugin name in your message. I'll get back to you
                with payment details and provide the plugin once the transaction is complete.
              </p>
            </div>
            <div className="purchase-actions">
              <a href="#contact" className="btn primary contact-btn" onClick={handleContactClick}>
                Contact Me
              </a>
              <button className="btn secondary close-modal-btn" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
