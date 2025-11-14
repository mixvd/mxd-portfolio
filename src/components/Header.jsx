import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useScrollPosition } from '../hooks/useScrollPosition';

const Header = ({ activeSection, onNavClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const scrollPosition = useScrollPosition();

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'plugins', label: 'Plugins' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (sectionId) => {
    onNavClick(sectionId);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.classList.toggle('no-scroll');
  };

  useEffect(() => {
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  return (
    <>
      <header className={scrollPosition > 100 ? 'scrolled' : ''}>
        <div className="logo">
          <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>
            mxd<span>.</span>
          </a>
        </div>
        
        <nav className="desktop-nav">
          <ul>
            {navItems.map(item => (
              <li key={item.id}>
                <a 
                  href={`#${item.id}`}
                  className={activeSection === item.id ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="theme-toggle" onClick={toggleTheme}>
          <i className={`fas fa-sun ${!isDarkMode ? 'active' : ''}`}></i>
          <i className={`fas fa-moon ${isDarkMode ? 'active' : ''}`}></i>
        </div>

        <div 
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>

      <nav className={`mobile-nav ${isMobileMenuOpen ? 'active' : ''}`}>
        <ul>
          {navItems.map(item => (
            <li key={item.id}>
              <a 
                href={`#${item.id}`}
                className={activeSection === item.id ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mobile-social">
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
      </nav>
    </>
  );
};

export default Header;
