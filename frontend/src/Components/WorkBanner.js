import React, { useState, useEffect, useRef } from 'react';
import '../Assets/Css/WorkBanner.css';

const WorkBanner = () => {
  const [counts, setCounts] = useState({
    projects: 0,
    clients: 0,
    ratings: 0,
    experience: 0
  });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const stats = [
    { key: 'projects', value: 10, suffix: '+', label: 'PROJECTS DONE' },
    { key: 'clients', value: 15, suffix: '+', label: 'CLIENTS ACROSS GLOBE' },
    { key: 'ratings', value: 5, suffix: '', label: 'CLIENT RATINGS' },
    { key: 'experience', value: 2, suffix: '+', label: 'EXPERIENCE' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  const animateCounters = () => {
    stats.forEach((stat) => {
      let start = 0;
      const end = stat.value;
      const duration = 1000; // 2 seconds
      const increment = end / (duration / 16); // 60fps

      const timer = setInterval(() => {
        start += increment;
        setCounts(prev => ({
          ...prev,
          [stat.key]: Math.min(Math.floor(start), end)
        }));

        if (start >= end) {
          setCounts(prev => ({
            ...prev,
            [stat.key]: end
          }));
          clearInterval(timer);
        }
      }, 16);
    });
  };

  return (
    <section className="stats" ref={sectionRef}>
      <div className="stats-container">
        {stats.map((stat, index) => (
          <React.Fragment key={index}>
            <div className="stat-box">
              <h3>
                {counts[stat.key]}
                <span className="stat-suffix">{stat.suffix}</span>
              </h3>
              <p>{stat.label}</p>
            </div>
            {index < stats.length - 1 && <div className="stat-divider"></div>}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default WorkBanner;