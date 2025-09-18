import React from 'react';
import '../Assets/Css/Ticker.css';

const TiltedTicker = () => {
  const tickerItems = [
    "Artificial Intelligence",
    "App Development",
    "Gaming",
    "eCommerce",
    "Shopify",
    "Web Development",
    "API Strategy",
    "SQL",
    "Machine Learning"
  ];

  return (
    <div className="tilted-ticker-container">
      <div className="ticker-content">
        <div className="ticker-track">
          <div className="ticker-items">
            {tickerItems.map((item, index) => (
              <div key={index} className="ticker-item">
                <span className="ticker-text">{item}</span>
                <span className="ticker-separator">•</span>
              </div>
            ))}
            {/* Duplicate for seamless looping */}
            {tickerItems.map((item, index) => (
              <div key={`dup-${index}`} className="ticker-item">
                <span className="ticker-text">{item}</span>
                <span className="ticker-separator">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TiltedTicker;