import React, { useState, useEffect } from 'react';
import logo from '../Assets/Images/logo.png';
import '../Assets/Css/Menubar.css';

const Menubar = () => {
  const [showModal, setShowModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setShowModal(true);
  };

  // Close modal when clicking outside
  const closeModal = () => {
    setShowModal(false);
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close mobile menu when clicking on a link
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-brand">
          <a href="#home">
            <img src={logo} alt="Logo" className="logo" />
          </a>
        </div>
       
        {/* Desktop Menu */}
        <ul className={`nav-menu ${isMenuOpen ? 'nav-menu-active' : ''}`}>
          <li className="nav-item">
            <a href="#home" className="nav-link" onClick={closeMobileMenu}>Home</a>
          </li>
          <li className="nav-item">
            <a href="#about" className="nav-link" onClick={closeMobileMenu}>About</a>
          </li>
          <li className="nav-item">
            <a href="#skills" className="nav-link" onClick={closeMobileMenu}>Skills</a>
          </li>
          <li className="nav-item">
            <a href="#work" className="nav-link" onClick={closeMobileMenu}>Projects</a>
          </li>
          <li className="nav-item">
            <a href="#testimonials" className="nav-link" onClick={closeMobileMenu}>Testimonials</a>
          </li>
          <li className="nav-item">
            <a href="#contact" className="nav-link" onClick={closeMobileMenu}>Contact</a>
          </li>
        </ul>
       
        <div className="nav-actions">
          {/* Dark Mode Toggle */}
          <button className="theme-toggle" onClick={toggleDarkMode} title="Toggle Theme">
            {/* Moon icon for space theme */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          </button>

          {/* Contact Button */}
          <button className="contact-btn" title="Get in Touch" onClick={() => {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            closeMobileMenu();
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m22 2-7 20-4-9-9-4Z"/>
              <path d="M22 2 11 13"/>
            </svg>
          </button>

          {/* Mobile Menu Toggle */}
          <button className={`menu-toggle ${isMenuOpen ? 'menu-toggle-active' : ''}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Dark Mode Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal} title="Close">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <div className="modal-icon">
              🚀
            </div>
            <h3 className="modal-title">
              We're in Space Right Now
            </h3>
            <p className="modal-message">
              We are floating in the vast darkness of space right now, where the sun does not shine and silence echoes through infinity. Soon we will land on Earth and embrace the light once again. Until then, we drift among the stars...
            </p>
            <div className="modal-animation">
              <div className="cosmic-element stars"></div>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default Menubar;