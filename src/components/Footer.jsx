import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <a href="#home">mxd<span>.</span></a>
          </div>
          <div className="social-links">
            <a href="https://discord.com/users/264147356113436683" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-discord"></i>
            </a>
            <a href="https://github.com/mixvd" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://steamcommunity.com/id/mixed10e" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-steam"></i>
            </a>
            <a href="https://www.gmodstore.com/users/mxd/reputation" target="_blank" rel="noopener noreferrer">
              <i className="fas fa-store"></i>
            </a>
          </div>
          <p>&copy; 2025 mxd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
