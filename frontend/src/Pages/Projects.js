import React, { useState, useEffect, useRef } from 'react';
import { Github, ExternalLink, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import robot3 from '../Assets/Images/astronaut3.png';
import robot4 from '../Assets/Images/astronaut4.png';
import '../Assets/Css/Projects.css';

const SpaceProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Sample projects data - replace with your actual projects
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce platform built with React and Node.js featuring user authentication, payment integration, and admin dashboard.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "JWT"],
      githubUrl: "https://github.com/yourusername/ecommerce",
      liveUrl: "https://your-ecommerce-demo.com",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      video: null,
      date: "2024",
      status: "Completed"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      technologies: ["React", "Firebase", "Tailwind CSS", "Socket.io"],
      githubUrl: "https://github.com/yourusername/taskmanager",
      liveUrl: "https://your-taskmanager-demo.com",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
      video: null,
      date: "2024",
      status: "Completed"
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "A modern weather application with location-based forecasts, interactive maps, and detailed weather analytics with beautiful UI.",
      technologies: ["React", "OpenWeather API", "Chart.js", "CSS3"],
      githubUrl: "https://github.com/yourusername/weather-app",
      liveUrl: "https://your-weather-demo.com",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop",
      video: null,
      date: "2023",
      status: "Completed"
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "A responsive portfolio website with space theme, smooth animations, and interactive elements showcasing my work and skills.",
      technologies: ["React", "CSS3", "Framer Motion", "Three.js"],
      githubUrl: "https://github.com/yourusername/portfolio",
      liveUrl: "https://your-portfolio.com",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop",
      video: null,
      date: "2024",
      status: "In Progress"
    },
    {
      id: 5,
      title: "Social Media App",
      description: "A social media platform with real-time chat, post sharing, stories feature, and advanced privacy controls.",
      technologies: ["React Native", "Node.js", "PostgreSQL", "Socket.io"],
      githubUrl: "https://github.com/yourusername/social-app",
      liveUrl: "https://your-social-demo.com",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
      video: null,
      date: "2024",
      status: "In Progress"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleProjectSelect = (index) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedProject(index);
      setIsLoading(false);
    }, 300);
  };

  const nextProject = () => {
    const next = (selectedProject + 1) % projects.length;
    handleProjectSelect(next);
  };

  const prevProject = () => {
    const prev = selectedProject === 0 ? projects.length - 1 : selectedProject - 1;
    handleProjectSelect(prev);
  };

  return (
    <div ref={sectionRef} className="projects-container">
      {/* Animated Background */}
      <div className="space-background">
        {[...Array(200)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Floating Particles */}
      <div className="particles">
        {[...Array(40)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Moving Rockets */}
      <div className="rockets-container">
        {[...Array(3)].map((_, i) => (
          <div
            key={`rocket-${i}`}
            className="rocket"
            style={{
              animationDelay: `${i * 8}s`,
              animationDuration: `${15 + i * 3}s`,
              top: `${20 + i * 25}%`
            }}
          >
            <div className="rocket-body">
              <div className="rocket-nose"></div>
              <div className="rocket-middle"></div>
              <div className="rocket-tail"></div>
              <div className="rocket-flame"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Moving Satellites */}
      <div className="satellites-container">
        {[...Array(2)].map((_, i) => (
          <div
            key={`satellite-${i}`}
            className="satellite"
            style={{
              animationDelay: `${i * 12}s`,
              animationDuration: `${20 + i * 5}s`,
              top: `${15 + i * 50}%`
            }}
          >
            <div className="satellite-body">
              <div className="satellite-dish"></div>
              <div className="satellite-panels">
                <div className="panel left"></div>
                <div className="panel right"></div>
              </div>
              <div className="satellite-antenna"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Animated Astronaut Images */}
      <div className="astronauts-container">
        <div className="astronaut-left">
          <img src={robot3} alt="Astronaut" className="astronaut-image" />
        </div>
        <div className="astronaut-right">
          <img src={robot4} alt="Astronaut" className="astronaut-image" />
        </div>
      </div>

      {/* Section Header */}
      <div className={`section-header ${isVisible ? 'animate-in' : ''}`}>
        <h1 className="main-title">MY PROJECTS</h1>
        <p className="main-subtitle">
          Explore my latest work and digital creations
        </p>
        <div className="title-decoration">
          <div className="decoration-line"></div>
          <div className="decoration-dot"></div>
          <div className="decoration-line"></div>
        </div>
      </div>

      <div className="content-wrapper">
        {/* Left Side - Space Computer */}
        <div className={`computer-section ${isVisible ? 'slide-in-left' : ''}`}>
          <div className="computer-container">
            {/* Computer Base */}
            <div className="computer-base">
              <div className="base-stand"></div>
              <div className="base-foot"></div>
            </div>
            
            {/* Computer Screen */}
            <div className="computer-screen">
              <div className="screen-border">
                <div className="screen-content">
                  {isLoading ? (
                    <div className="loading-screen">
                      <div className="loading-spinner"></div>
                      <div className="loading-text">Loading...</div>
                    </div>
                  ) : (
                    <div className="project-display">
                      <img 
                        src={projects[selectedProject].image} 
                        alt={projects[selectedProject].title}
                        className="project-image"
                      />
                      <div className="screen-overlay">
                        <div className="project-title-screen">
                          {projects[selectedProject].title}
                        </div>
                        <div className="project-status">
                          {projects[selectedProject].status}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Screen Reflection */}
                <div className="screen-reflection"></div>
              </div>
              
              {/* Power Button */}
              <div className="power-button">
                <div className="power-led"></div>
              </div>
            </div>

            {/* Holographic Effects */}
            <div className="holographic-glow"></div>
          </div>
        </div>

        {/* Right Side - Projects Sliding Window */}
        <div className={`projects-section ${isVisible ? 'slide-in-right' : ''}`}>
          <div className="projects-slider">
            {/* Navigation Arrows */}
            <button className="nav-arrow nav-left" onClick={prevProject}>
              <ChevronLeft size={24} />
            </button>
            <button className="nav-arrow nav-right" onClick={nextProject}>
              <ChevronRight size={24} />
            </button>

            {/* Projects Window */}
            <div className="projects-window">
              <div 
                className="projects-track"
                style={{
                  transform: `translateX(-${selectedProject * 20}%)`
                }}
              >
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    className={`project-slide ${selectedProject === index ? 'active' : ''}`}
                  >
                    <div className="slide-content">
                      <div className="project-card">
                        <div className="card-glow"></div>
                        
                        <div className="card-header">
                          <h3 className="project-title">{project.title}</h3>
                          <div className="project-date">
                            <Calendar size={16} />
                            <span>{project.date}</span>
                          </div>
                        </div>

                        <p className="project-description">{project.description}</p>

                        <div className="technologies">
                          {project.technologies.map((tech, techIndex) => (
                            <span key={techIndex} className="tech-tag">
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="project-links">
                          <a 
                            href={project.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="project-link github-link"
                          >
                            <Github size={18} />
                            <span>Code</span>
                          </a>
                          <a 
                            href={project.liveUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="project-link live-link"
                          >
                            <ExternalLink size={18} />
                            <span>Live Demo</span>
                          </a>
                        </div>

                        <div className="card-border"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Indicators */}
            <div className="project-indicators">
              {projects.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${selectedProject === index ? 'active' : ''}`}
                  onClick={() => handleProjectSelect(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceProjectsPage;