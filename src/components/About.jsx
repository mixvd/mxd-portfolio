import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const About = () => {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });

  const expertiseItems = [
    {
      icon: 'fas fa-code',
      title: 'Framework Experience',
      description: 'Extensive experience with Helix, Nutscript, and Clockwork frameworks.'
    },
    {
      icon: 'fas fa-laptop-code',
      title: 'Development Skills',
      description: 'Proficient in both frontend and backend development, creating seamless user experiences.'
    },
    {
      icon: 'fas fa-lightbulb',
      title: 'Innovation',
      description: 'Constantly exploring new techniques and approaches to enhance gameplay mechanics.'
    },
    {
      icon: 'fas fa-users',
      title: 'Community Contribution',
      description: 'Active member of the Garry\'s Mod development community, creating and sharing solutions since 2012.'
    }
  ];

  return (
    <section id="about" className={isIntersecting ? 'active' : ''} ref={ref}>
      <div className="container">
        <div className="section-header">
          <h2>About <span>Me</span></h2>
          <p>My journey and expertise in Garry's Mod development</p>
        </div>

        <div className="about-content">
          <div className="about-text">
            <p className="lead-text">
              I've been a passionate developer since childhood, specializing in creating
              innovative solutions for Garry's Mod since 2012.
            </p>

            <div className="expertise">
              {expertiseItems.map((item, index) => (
                <div key={index} className="expertise-item">
                  <div className="expertise-icon">
                    <i className={item.icon}></i>
                  </div>
                  <div className="expertise-details">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <p>
              My goal is to create plugins that not only function flawlessly but also enhance the
              roleplaying experience with intuitive interfaces and immersive features.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
