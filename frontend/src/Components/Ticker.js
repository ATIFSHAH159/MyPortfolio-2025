import React from 'react';
import '../Assets/Css/Ticker.css';

const SpaceTicker = () => {
  const tickerItems = [
    "🛸 Artificial Intelligence",
    "📱 App Development", 
    "🎮 Gaming",
    "🛒 eCommerce",
    "🛍️ Shopify",
    "💻 Web Development",
    "🔗 API Strategy",
    "🗄️ SQL",
    "🤖 Machine Learning",
    "☁️ Cloud Computing",
    "🔒 Cybersecurity",
    "📊 Data Science"
  ];

  return (
    <div className="tilted-ticker-container">
      {/* Add floating astronaut */}
      <div className="floating-astronaut">
        👨‍🚀
      </div>
      
      <div className="ticker-content">
        <div className="ticker-track">
          <div className="ticker-items">
            {tickerItems.map((item, index) => (
              <div key={index} className="ticker-item">
                <span className="ticker-text">{item}</span>
                <span className="ticker-separator"></span>
              </div>
            ))}
            {/* Duplicate for seamless looping */}
            {tickerItems.map((item, index) => (
              <div key={`dup-${index}`} className="ticker-item">
                <span className="ticker-text">{item}</span>
                <span className="ticker-separator"></span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Add space particles */}
      <div className="space-particles">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`}>✨</div>
        ))}
      </div>
    </div>
  );
};

export default SpaceTicker;