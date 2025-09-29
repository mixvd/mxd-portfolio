import React, { useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { plugins } from '../data/pluginData';
import PluginCard from './PluginCard';

const Plugins = ({ onViewDetails, onPurchase }) => {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Plugins' },
    { id: 'private', label: 'Private' },
    { id: 'public', label: 'Public' },
    { id: 'for-sale', label: 'For Sale' }
  ];

  const filteredPlugins = plugins.filter(plugin => 
    activeFilter === 'all' || plugin.category === activeFilter
  );

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
  };

  return (
    <section id="plugins" className={isIntersecting ? 'active' : ''} ref={ref}>
      <div className="container">
        <div className="section-header">
          <h2>My <span>Plugins</span></h2>
          <p>A showcase of my work for the Helix Framework in Garry's Mod</p>
        </div>

        <div className="filter-tabs">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => handleFilterChange(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="plugins-grid">
          {filteredPlugins.map(plugin => (
            <PluginCard
              key={plugin.id}
              plugin={plugin}
              onViewDetails={onViewDetails}
              onPurchase={onPurchase}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Plugins;
