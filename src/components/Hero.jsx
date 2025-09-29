import React from 'react';

const Hero = ({ onNavClick }) => {

  const stats = [
    { number: '10+', label: 'Years Experience' },
    { number: '20+', label: 'Custom Plugins' },
    { number: '3+', label: 'Frameworks' }
  ];

  return (
    <section id="home" className="active">
      <div className="container">
        <div className="hero">
          <div className="hero-content">
            <h1>Helix <span>Developer</span></h1>
            <p>Crafting innovative and high-quality plugins for Garry's Mod since 2012.</p>
            <div className="hero-cta">
              <a 
                href="#plugins" 
                className="btn primary"
                onClick={(e) => { e.preventDefault(); onNavClick('plugins'); }}
              >
                View My Work
              </a>
              <a 
                href="#contact" 
                className="btn secondary"
                onClick={(e) => { e.preventDefault(); onNavClick('contact'); }}
              >
                Get In Touch
              </a>
            </div>
          </div>
          <div className="hero-stats">
            {stats.map((stat, index) => (
              <div key={index} className="stat">
                <span className="number">{stat.number}</span>
                <span className="label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div 
        className="scroll-indicator"
        onClick={() => onNavClick('plugins')}
      >
        <span>Scroll Down</span>
        <i className="fas fa-chevron-down"></i>
      </div>
    </section>
  );
};

export default Hero;
