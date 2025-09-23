import React from "react";
import "../Assets/Css/Footer.css";
import logo from '../Assets/Images/logo.png';
import { FaEnvelope, FaLinkedin, FaGithub, FaInstagram, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

const logoVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      delay: 0.2
    }
  },
  hover: {
    scale: 1.05,
    rotate: 5,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

const socialVariants = {
  hover: {
    scale: 1.1,
    rotate: 360,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0px 0px 20px rgba(29, 233, 255, 0.6)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: {
    scale: 0.95
  }
};

const pulseVariants = {
  animate: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <>
      <motion.footer 
        className="footer"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        <div className="footer-left">
          <motion.div 
            className="footer-logo"
            variants={logoVariants}
            whileHover="hover"
          >
            <img src={logo} alt="Logo"/>
          </motion.div>
          
          <motion.div className="footer-name" variants={itemVariants}>
            SYED ATIF SHAH
          </motion.div>
          
          <motion.p className="footer-tagline" variants={itemVariants}>
            Creating digital experiences with passion
          </motion.p>
          
          <motion.div 
            className="social-links"
            variants={containerVariants}
          >
            <motion.a 
              href="https://linkedin.com/in/atif-shah-b62008378/" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              variants={socialVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FaLinkedin />
            </motion.a>
            <motion.a 
              href="https://github.com/ATIFSHAH159" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              variants={socialVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FaGithub />
            </motion.a>
            <motion.a 
              href="https://instagram.com/atif_shah90" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              variants={socialVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FaInstagram />
            </motion.a>
          </motion.div>
        </div>

        {/* Middle Section - Pages */}
        <motion.div className="footer-middle" variants={containerVariants}>
          <motion.h4 className="footer-heading" variants={itemVariants}>
            Navigation
          </motion.h4>
          
          <motion.ul className="footer-menu" variants={containerVariants}>
            <motion.li variants={itemVariants}>
              <a href="#home" onClick={(e) => {
                e.preventDefault();
                document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
              }}>Home</a>
            </motion.li>
            <motion.li variants={itemVariants}>
              <a href="#about" onClick={(e) => {
                e.preventDefault();
                document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
              }}>About</a>
            </motion.li>
            <motion.li variants={itemVariants}>
              <a href="#skills" onClick={(e) => {
                e.preventDefault();
                document.getElementById('skills').scrollIntoView({ behavior: 'smooth' });
              }}>Skills</a>
            </motion.li>
            <motion.li variants={itemVariants}>
              <a href="#work" onClick={(e) => {
                e.preventDefault();
                document.getElementById('work').scrollIntoView({ behavior: 'smooth' });
              }}>Projects</a>
            </motion.li>
            <motion.li variants={itemVariants}>
              <a href="#testimonials" onClick={(e) => {
                e.preventDefault();
                document.getElementById('testimonials').scrollIntoView({ behavior: 'smooth' });
              }}>Testimonials</a>
            </motion.li>
            <motion.li variants={itemVariants}>
              <a href="#contact" onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
              }}>Contact</a>
            </motion.li>
          </motion.ul>
        </motion.div>

        {/* Right Section - Contact */}
        <motion.div className="footer-right" variants={containerVariants}>
          <motion.h4 className="footer-heading" variants={itemVariants}>
            Get in touch
          </motion.h4>
          
          <motion.div 
            className="footer-contact"
            variants={itemVariants}
            whileHover={{
              y: -5,
              transition: { type: "spring", stiffness: 300 }
            }}
            onClick={() => {
              document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            }}
            style={{ cursor: 'pointer' }}
          >
            <div className="contact-icon">
              <FaEnvelope />
            </div>
            <span>aatifshah15@gmail.com</span>
          </motion.div>
          
          <motion.div className="newsletter" variants={itemVariants}>
            <p>Stay updated with my latest work</p>
            <motion.div 
              className="newsletter-input"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <input type="email" placeholder="Your email address" />
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Subscribe
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.footer>
      
      <motion.div 
        className="footer-bottom"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <div className="container">
          <p>
            Syed Atif Shah • © {currentYear} All rights reserved
            <motion.span
              variants={pulseVariants}
              animate="animate"
              style={{ display: "inline-flex", marginLeft: "0.5rem" }}
            >
            </motion.span>
          </p>
        </div>
      </motion.div>
    </>
  );
}

export default Footer;