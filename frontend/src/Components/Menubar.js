import React from 'react';
import '../Assets/Css/Menubar.css';
import logo from '../Assets/Images/logo.png';

const Menubar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <a href="#home">
          <img src={logo} alt="Logo" className="logo" />
        </a>
      </div>
      
      <ul className="nav-menu">
        <li className="nav-item">
          <a href="#home" className="nav-link" style={{ transition: 'color var(--transition-fast), transform var(--transition-fast)' }}>Home</a>
        </li>
        <li className="nav-item">
          <a href="#about" className="nav-link" style={{ transition: 'color var(--transition-fast), transform var(--transition-fast)' }}>About</a>
        </li>
        <li className="nav-item">
          <a href="#skills" className="nav-link" style={{ transition: 'color var(--transition-fast), transform var(--transition-fast)' }}>Skills</a>
        </li>
        <li className="nav-item">
          <a href="#Project" className="nav-link" style={{ transition: 'color var(--transition-fast), transform var(--transition-fast)' }}>Projects</a>
        </li>
        <li className="nav-item">
          <a href="#contact" className="nav-link" style={{ transition: 'color var(--transition-fast), transform var(--transition-fast)' }}>Contact</a>
        </li>
      </ul>
      
      <div className="nav-contact">
        <button className="contact-btn">
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="m22 2-7 20-4-9-9-4Z"/>
            <path d="M22 2 11 13"/>
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Menubar;