import React, { useState, useEffect, useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import '../Assets/Css/Testimonials.css';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);

  // Sample testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO at TechCorp",
      company: "TechCorp Solutions",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Working with this developer was an absolute game-changer for our company. Their attention to detail and innovative approach to problem-solving exceeded all our expectations.",
      project: "E-commerce Platform",
      date: "2024"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Product Manager",
      company: "InnovateLab",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Exceptional work ethic and technical expertise! The mobile app they developed for us has significantly improved our user engagement.",
      project: "Mobile Application",
      date: "2024"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Marketing Director",
      company: "Creative Agency",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "The website redesign transformed our online presence completely. The space-themed design is not only visually stunning but also highly functional.",
      project: "Website Redesign",
      date: "2023"
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

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={18}
        className={index < rating ? 'star-filled' : 'star-empty'}
      />
    ));
  };

  return (
    <div ref={sectionRef} className="testimonials-container">
      {/* Animated Background */}
      <div className="space-background">
        {[...Array(100)].map((_, i) => (
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
        {[...Array(30)].map((_, i) => (
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

      {/* Section Header */}
      <div className={`testimonials-header ${isVisible ? 'animate-in' : ''}`}>
        <h1 className="main-title">CLIENT TESTIMONIALS</h1>
        <p className="main-subtitle">
          What clients say about their journey with me
        </p>
        <div className="title-decoration">
          <div className="decoration-line"></div>
          <div className="decoration-dot"></div>
          <div className="decoration-line"></div>
        </div>
      </div>

      {/* Main Testimonial Showcase */}
      <div className={`testimonial-showcase ${isVisible ? 'slide-in' : ''}`}>
        <div className="testimonial-navigation">
          <button className="nav-btn nav-prev" onClick={prevTestimonial}>
            <ChevronLeft size={24} />
          </button>
          <button className="nav-btn nav-next" onClick={nextTestimonial}>
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="testimonial-slider">
          <div 
            className="testimonials-track"
            style={{
              transform: `translateX(-${currentTestimonial * 100}%)`
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`testimonial-slide ${currentTestimonial === index ? 'active' : ''}`}
              >
                <div className="testimonial-card main-testimonial">
                  <div className="card-glow"></div>
                  <div className="quote-icon">
                    <Quote size={40} />
                  </div>
                  
                  <div className="testimonial-content">
                    <p className="testimonial-text">"{testimonial.text}"</p>
                    
                    <div className="testimonial-rating">
                      {renderStars(testimonial.rating)}
                    </div>
                    
                    <div className="client-info">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="client-avatar"
                      />
                      <div className="client-details">
                        <h3 className="client-name">{testimonial.name}</h3>
                        <p className="client-role">{testimonial.role}</p>
                        <p className="client-company">{testimonial.company}</p>
                        <div className="project-info">
                          <span className="project-name">{testimonial.project}</span>
                          <span className="project-year">{testimonial.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card-border"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial Indicators */}
        <div className="testimonial-indicators">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`indicator ${currentTestimonial === index ? 'active' : ''}`}
              onClick={() => goToTestimonial(index)}
            />
          ))}
        </div>
      </div>

      {/* Floating Testimonial Cards */}
      <div className={`floating-testimonials ${isVisible ? 'float-in' : ''}`}>
        <h2 className="floating-title">More Client Experiences</h2>
        
        <div className="floating-grid">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`floating-card ${hoveredCard === index ? 'hovered' : ''}`}
              style={{
                animationDelay: `${index * 0.2}s`
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="floating-card-inner">
                <div className="floating-card-front">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="floating-avatar"
                  />
                  <h4 className="floating-name">{testimonial.name}</h4>
                  <p className="floating-role">{testimonial.role}</p>
                  <div className="floating-rating">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
                <div className="floating-card-back">
                  <p className="floating-text">"{testimonial.text.substring(0, 120)}..."</p>
                  <div className="floating-project">{testimonial.project}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;