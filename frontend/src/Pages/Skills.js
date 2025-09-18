import React, { useState } from 'react';
import technologies from '../Assets/Videos/technologies.mp4';
import '../Assets/Css/Skills.css';

const Skills = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);

  const allSkills = [
    { 
      name: 'HTML', 
      color: '#E34F26', 
      size: 40, 
      orbit: 100, 
      speed: 80,
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'
    },
    { 
      name: 'CSS', 
      color: '#1572B6', 
      size: 40, 
      orbit: 140, 
      speed: 75,
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg'
    },
    { 
      name: 'Tailwind', 
      color: '#38B2AC', 
      size: 45, 
      orbit: 180, 
      speed: 70,
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg'
    },
    { 
      name: 'GitHub', 
      color: '#181717', 
      size: 45, 
      orbit: 220, 
      speed: 65,
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg'
    },
    { 
      name: 'React', 
      color: '#61DAFB', 
      size: 50, 
      orbit: 260, 
      speed: 60,
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
    },
    { 
      name: 'Node.js', 
      color: '#339933', 
      size: 50, 
      orbit: 300, 
      speed: 55,
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'
    },
    { 
      name: 'JavaScript', 
      color: '#F7DF1E', 
      size: 55, 
      orbit: 340, 
      speed: 50,
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
    },
    { 
      name: 'MongoDB', 
      color: '#47A248', 
      size: 55, 
      orbit: 380, 
      speed: 45,
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg'
    },
    { 
      name: 'Flutter', 
      color: '#02569B', 
      size: 60, 
      orbit: 420, 
      speed: 40,
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg'
    },
    { 
      name: 'Firebase', 
      color: '#FFCA28', 
      size: 60, 
      orbit: 460, 
      speed: 35,
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg'
    },
    { 
      name: 'Python', 
      color: '#3776AB', 
      size: 65, 
      orbit: 500, 
      speed: 30,
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'
    },
    { 
      name: 'Figma', 
      color: '#F24E1E', 
      size: 65, 
      orbit: 540, 
      speed: 25,
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg'
    },
    { 
      name: 'Canva', 
      color: '#00C4CC', 
      size: 60, 
      orbit: 580, 
      speed: 20,
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg'
    },
    { 
      name: 'Bootstrap', 
      color: '#7952B3', 
      size: 60, 
      orbit: 620, 
      speed: 15,
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg'
    },
  ];

  // Use all skills for the solar system
  const solarSystemSkills = allSkills;

  // Generate stars for background
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5,
  }));

  return (
    <div className="skills-page">
      <div className="skills-header">
        <h1 className="skills-main-title">My Skill Universe</h1>
        <p className="skills-subtitle">Exploring the vast galaxy of technologies I've mastered in my development journey</p>
      </div>
      <div className="skills-top-section">
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
            
            {solarSystemSkills.map((skill, index) => (
              <div
                key={skill.name}
                className="orbit"
                style={{ 
                  width: `${(index + 1) * 50 + 120}px`, 
                  height: `${(index + 1) * 50 + 120}px`,
                  animationDuration: `${30 + index * 5}s`
                }}
              >
                <div
                  className="planet"
                  style={{
                    width: `${skill.size}px`,
                    height: `${skill.size}px`,
                    background: `linear-gradient(135deg, ${skill.color}22, ${skill.color}66)`,
                    border: `2px solid ${skill.color}`,
                    boxShadow: `0 0 15px ${skill.color}44, inset 0 0 15px ${skill.color}22`,
                    animationDelay: `${Math.random() * 2}s`
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
            ))}
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