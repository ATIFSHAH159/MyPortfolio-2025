import React, { useState, useEffect } from 'react';
import technologies from '../Assets/Videos/technologies.mp4';
import '../Assets/Css/Skills.css';
import blackhole from '../Assets/Videos/blackhole.mp4';

const Skills = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [screenSize, setScreenSize] = useState('large');

  // Improved screen size monitoring
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 480) setScreenSize('extraSmall');
      else if (width <= 640) setScreenSize('small');
      else if (width <= 768) setScreenSize('medium');
      else if (width <= 1024) setScreenSize('tablet');
      else if (width <= 1280) setScreenSize('large');
      else setScreenSize('extraLarge');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const allSkills = [
    { 
      name: 'HTML', 
      color: '#E34F26', 
      size: 40, 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'
    },
    { 
      name: 'CSS', 
      color: '#1572B6', 
      size: 40, 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg'
    },
    { 
      name: 'Next.js', 
      color: '#000000', 
      size: 45, 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg'
    }
,    
    { 
      name: 'GitHub', 
      color: '#181717', 
      size: 45, 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg'
    },
    { 
      name: 'React', 
      color: '#61DAFB', 
      size: 50, 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
    },
    { 
      name: 'Node.js', 
      color: '#339933', 
      size: 50, 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'
    },
    { 
      name: 'JavaScript', 
      color: '#F7DF1E', 
      size: 55, 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
    },
    { 
      name: 'MongoDB', 
      color: '#47A248', 
      size: 55, 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg'
    },
    { 
      name: 'Flutter', 
      color: '#02569B', 
      size: 60, 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg'
    },
    { 
      name: 'Firebase', 
      color: '#FFCA28', 
      size: 60, 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg'
    },
    { 
      name: 'Python', 
      color: '#3776AB', 
      size: 65, 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'
    },
    { 
      name: 'Figma', 
      color: '#F24E1E', 
      size: 65, 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg'
    },
    { 
      name: 'Canva', 
      color: '#00C4CC', 
      size: 60, 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg'
    },
    { 
      name: 'Bootstrap', 
      color: '#7952B3', 
      size: 60, 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg'
    },
  ];

  // Calculate responsive orbit sizes and speeds
  const getOrbitConfig = (index) => {
    const baseSpeed = 15; // Much faster base speed
    
    switch (screenSize) {
      case 'extraSmall':
        return {
          size: (index + 1) * 20 + 40,
          speed: baseSpeed + (index * 2), // Faster speeds
          planetSize: Math.max(25, allSkills[index].size * 0.6)
        };
      case 'small':
        return {
          size: (index + 1) * 25 + 50,
          speed: baseSpeed + (index * 1.8),
          planetSize: Math.max(30, allSkills[index].size * 0.7)
        };
      case 'medium':
        return {
          size: (index + 1) * 30 + 60,
          speed: baseSpeed + (index * 1.6),
          planetSize: Math.max(35, allSkills[index].size * 0.8)
        };
      case 'tablet':
        return {
          size: (index + 1) * 35 + 80,
          speed: baseSpeed + (index * 1.4),
          planetSize: allSkills[index].size * 0.9
        };
      case 'large':
        return {
          size: (index + 1) * 40 + 100,
          speed: baseSpeed + (index * 1.2),
          planetSize: allSkills[index].size
        };
      default:
        return {
          size: (index + 1) * 45 + 120,
          speed: baseSpeed + (index * 1),
          planetSize: allSkills[index].size
        };
    }
  };

  // Generate stars for background
  const stars = Array.from({ length: screenSize === 'extraSmall' ? 30 : 50 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5,
  }));

  return (
    <div className="skills-page">
      <video
        className="blackhole-video"
        src={blackhole}
        autoPlay
        loop
        muted
        playsInline
      />
      
      <div className="skills-header">
        <h1 className="skills-main-title">My Skill Universe</h1>
        <p className="skills-subtitle">Exploring the vast galaxy of technologies I've mastered in my development journey</p>
      </div>
      
      <div className="skills-top-section"  >
        <div className="solar-system-container">
          {/* Animated Stars Background */}
          {stars.map(star => (
            <div
              key={star.id}
              className="star"
              style={{
                top: `${star.top}%`,
                left: `${star.left}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDelay: `${star.delay}s`
              }}
            />
          ))}

          <div className="solar-system">
            <div className="sun"></div>
            
            {allSkills.map((skill, index) => {
              const config = getOrbitConfig(index);
              return (
                <div
                  key={skill.name}
                  className="orbit"
                  style={{ 
                    width: `${config.size}px`, 
                    height: `${config.size}px`,
                    animationDuration: `${config.speed}s`
                  }}
                >
                  <div
                    className="planet"
                    style={{
                      width: `${config.planetSize}px`,
                      height: `${config.planetSize}px`,
                      background: `linear-gradient(135deg, ${skill.color}22, ${skill.color}66)`,
                      border: `2px solid ${skill.color}`,
                      boxShadow: `0 0 15px ${skill.color}44, inset 0 0 15px ${skill.color}22`,
                      animationDuration: `${config.speed}s`
                    }}
                    onMouseEnter={() => setSelectedSkill(skill)}
                    onMouseLeave={() => setSelectedSkill(null)}
                  >
                    <img 
                      src={skill.logo} 
                      alt={skill.name}
                      className="planet-logo"
                    />
                    <span className="planet-name">{skill.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
          
          {selectedSkill && (
            <div className="skill-info">
              <h3>{selectedSkill.name}</h3>
              <p>Proficiency: {Math.floor(Math.random() * 40) + 60}%</p>
              <p className="skill-hint">Hover over planets to explore my skills!</p>
            </div>
          )}
        </div>
        
        <div className="tech-video-container">
          <video 
            src={technologies} 
            alt="technologies"
            autoPlay
            loop
            muted
            playsInline
            className="tech-video"
          />
        </div>
      </div>

      <div className="all-skills-section">
        <h2 className="skills-list-title">All Skills</h2>
        
        <div className="skills-ticker-container">
          <div className="skills-ticker">
            {allSkills.map((skill) => (
              <div 
                key={`first-${skill.name}`}
                className="skill-ticker-item"
                style={{ borderColor: skill.color, boxShadow: `0 0 10px ${skill.color}44` }}
              >
                <img 
                  src={skill.logo} 
                  alt={skill.name}
                  className="skill-ticker-icon"
                />
                <span>{skill.name}</span>
              </div>
            ))}
            
            {allSkills.map((skill) => (
              <div 
                key={`second-${skill.name}`}
                className="skill-ticker-item"
                style={{ borderColor: skill.color, boxShadow: `0 0 10px ${skill.color}44` }}
              >
                <img 
                  src={skill.logo} 
                  alt={skill.name}
                  className="skill-ticker-icon"
                />
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;