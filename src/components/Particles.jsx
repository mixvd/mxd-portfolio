import React, { useEffect, useRef } from 'react';

const Particles = () => {
  const particlesRef = useRef(null);

  useEffect(() => {
    const particles = particlesRef.current;
    if (!particles) return;

    const particleCount = 40;

    for (let i = 0; i < particleCount; i++) {
      createParticle(particles);
    }

    function createParticle(parent) {
      const particle = document.createElement('div');
      particle.className = 'particle';

      const size = Math.random() * 6 + 2;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = Math.random() * 20 + 10;
      const opacity = Math.random() * 0.5 + 0.2;

      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.left = posX + '%';
      particle.style.top = posY + '%';
      particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
      particle.style.opacity = opacity;
      particle.style.backgroundColor = Math.random() > 0.5 ? 'var(--primary-color)' : 'var(--secondary-color)';
      particle.style.borderRadius = '50%';
      particle.style.position = 'absolute';
      particle.style.filter = 'blur(1px)';

      parent.appendChild(particle);
    }
  }, []);

  return (
    <div className="particles-container">
      <div id="particles" ref={particlesRef}></div>
    </div>
  );
};

export default Particles;
