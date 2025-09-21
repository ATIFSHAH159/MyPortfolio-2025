import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import '../Assets/Css/ContactPage.css';
function ContactForm() {
  const containerRef = useRef(null);
  const [isAwake, setIsAwake] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Cursor tracking within the avatar area
  const cursorX = useMotionValue(0.5);
  const cursorY = useMotionValue(0.5);

  // Eye/pupil transforms
  const pupilX = useTransform(cursorX, [0, 1], [-15, 15]);
  const pupilY = useTransform(cursorY, [0, 1], [-10, 10]);
  const headTiltX = useTransform(cursorY, [0, 1], [8, -8]);
  const headTiltY = useTransform(cursorX, [0, 1], [-10, 10]);

  // Floating animation
  const floatY = useTransform(cursorY, [0, 0.5, 1], [-6, 0, -6]);

  // Cursor tracking
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function setFromEvent(clientX, clientY) {
      const rect = el.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;
      cursorX.set(Math.max(0, Math.min(1, x)));
      cursorY.set(Math.max(0, Math.min(1, y)));
      setMousePosition({ x: clientX, y: clientY });
    }

    function handleMoveLocal(e) {
      setFromEvent(e.clientX, e.clientY);
      if (isAwake) setIsHovering(true);
    }

    function handleLeave() {
      setIsHovering(false);
      animate(cursorX, 0.5, { duration: 0.8, ease: [0.22, 1, 0.36, 1] });
      animate(cursorY, 0.5, { duration: 0.8, ease: [0.22, 1, 0.36, 1] });
    }

    function handleMoveWindow(e) {
      if (!isAwake) return;
      setFromEvent(e.clientX, e.clientY);
    }

    el.addEventListener('mousemove', handleMoveLocal);
    el.addEventListener('mouseleave', handleLeave);
    if (isAwake) {
      window.addEventListener('mousemove', handleMoveWindow);
    }
    
    return () => {
      el.removeEventListener('mousemove', handleMoveLocal);
      el.removeEventListener('mouseleave', handleLeave);
      window.removeEventListener('mousemove', handleMoveWindow);
    };
  }, [cursorX, cursorY, isAwake]);

  // Periodic blinking
  useEffect(() => {
    if (!isAwake) return;
    const id = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, Math.random() * 3000 + 2000);
    return () => clearInterval(id);
  }, [isAwake]);

  const headVariants = useMemo(() => ({
    sleep: { 
      rotateX: 12, 
      rotateY: -12, 
      y: 8, 
      filter: 'brightness(0.6) blur(0.5px)',
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    },
    awake: { 
      rotateX: headTiltX, 
      rotateY: headTiltY, 
      y: floatY, 
      filter: 'brightness(1) blur(0px)',
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    },
  }), [headTiltX, headTiltY, floatY]);

  const eyeVariants = {
    closed: { scaleY: 0.1, opacity: 0.7 },
    open: { scaleY: 1, opacity: 1 },
    excited: { scaleY: 1.2, opacity: 1 }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setShowSuccess(false);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 2000);
  };

  return (
    <div className="contact-page">
      {/* Animated background */}
      <div
        className="contact-bg"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(29,233,255,0.1) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(138,43,226,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(29,233,255,0.05) 0%, transparent 50%)`
        }}
      />

      {/* Stars */}
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="contact-star"
          style={{
            width: Math.random() * 3 + 1 + 'px',
            height: Math.random() * 3 + 1 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            opacity: Math.random() * 0.8 + 0.2,
            animationDuration: Math.random() * 3 + 2 + 's'
          }}
        />
      ))}

      <div className="contact-grid">
        
        {/* Avatar Section */}
        <div 
          ref={containerRef}
          className="avatar-container"
        >
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="status-badge"
            style={{
              background: isAwake ? 'rgba(29,233,255,0.2)' : 'rgba(138,43,226,0.2)',
              border: `1px solid ${isAwake ? '#1de9ff' : '#8a2be2'}`,
              color: isAwake ? '#1de9ff' : '#8a2be2',
              boxShadow: `0 0 20px ${isAwake ? 'rgba(29,233,255,0.3)' : 'rgba(138,43,226,0.3)'}`,
            }}
          >
            {isAwake ? '🚀 Ready for Contact!' : '😴 Sleeping...' }
          </motion.div>

          {/* Main Avatar Container */}
          <motion.div
            initial="sleep"
            animate={isAwake ? 'awake' : 'sleep'}
            variants={headVariants}
            whileHover={{ scale: 1.05, y: -10 }}
            className="avatar-main"
          >
            {/* Helmet */}
            <motion.div
              className="avatar-helmet"
            >
              {/* Helmet Reflection */}
              <div className="helmet-reflection" />
              
              {/* Orbital Ring */}
              <div className="orbital-ring" />
            </motion.div>

            {/* Face Container */}
            <div className="face-container">
              {/* Eyes */}
              <div className="eyes-container">
                {/* Left Eye */}
                <div className="eye">
                  <motion.div
                    className="pupil"
                    style={{
                      background: isAwake ? 
                        'radial-gradient(circle, #1de9ff, #0066cc)' : 
                        'radial-gradient(circle, #666, #333)',
                      boxShadow: isAwake ? 
                        '0 0 15px #1de9ff, inset 0 0 8px rgba(0,0,0,0.3)' : 
                        '0 0 8px rgba(255,255,255,0.2)',
                      x: pupilX,
                      y: pupilY
                    }}
                  />
                  {/* Eyelid */}
                  <motion.div
                    animate={
                      !isAwake ? 'closed' : 
                      isBlinking ? 'closed' : 
                      isHovering ? 'excited' : 'open'
                    }
                    variants={eyeVariants}
                    transition={{ duration: 0.2 }}
                    className="eyelid"
                  />
                </div>

                {/* Right Eye */}
                <div className="eye">
                  <motion.div
                    className="pupil"
                    style={{
                      background: isAwake ? 
                        'radial-gradient(circle, #1de9ff, #0066cc)' : 
                        'radial-gradient(circle, #666, #333)',
                      boxShadow: isAwake ? 
                        '0 0 15px #1de9ff, inset 0 0 8px rgba(0,0,0,0.3)' : 
                        '0 0 8px rgba(255,255,255,0.2)',
                      x: pupilX,
                      y: pupilY
                    }}
                  />
                  {/* Eyelid */}
                  <motion.div
                    animate={
                      !isAwake ? 'closed' : 
                      isBlinking ? 'closed' : 
                      isHovering ? 'excited' : 'open'
                    }
                    variants={eyeVariants}
                    transition={{ duration: 0.2 }}
                    className="eyelid"
                  />
                </div>
              </div>

              {/* Mouth */}
              <motion.div
                className="mouth"
                animate={{
                  scaleY: !isAwake ? 0.2 : isHovering ? 0.8 : 1,
                  borderRadius: !isAwake ? '50%/50%' : isHovering ? '20px/8px' : '16px/12px',
                  background: !isAwake ? 'rgba(138,43,226,0.6)' : 
                              isHovering ? 'rgba(29,233,255,0.9)' : 'rgba(29,233,255,0.7)'
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                style={{
                  boxShadow: isAwake ? '0 0 20px rgba(29,233,255,0.5)' : '0 0 10px rgba(138,43,226,0.3)'
                }}
              />
            </div>

            {/* Sleep indicator */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: isAwake ? 0 : 1,
                y: isAwake ? -20 : [0, -15, 0],
                scale: isAwake ? 0.5 : [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: isAwake ? 0 : Infinity,
                ease: 'easeInOut'
              }}
              className="sleep-indicator"
            >
              💤
            </motion.div>
          </motion.div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-wrap">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="form-card"
          >
            <h2 className="form-title">
              Contact Form
            </h2>
            
            <p className="form-subtitle">
              Feel Free to Contact if You Have Any Query....
            </p>

            <form 
              onSubmit={handleFormSubmit}
              onFocus={() => setIsAwake(true)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(document.activeElement)) {
                  setTimeout(() => setIsAwake(false), 1000);
                }
              }}
              className="form"
            >
              <motion.div whileFocus={{ scale: 1.02 }} className="form-group">
                <label htmlFor="name" className="form-label">Your Name</label>
                <input id="name" type="text" placeholder="e.g., Syed Atif Shah" required className="form-input" />
              </motion.div>

              <motion.div whileFocus={{ scale: 1.02 }} className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input id="email" type="email" placeholder="captain@gmail.com" required className="form-input" />
              </motion.div>

              <motion.div whileFocus={{ scale: 1.02 }} className="form-group">
                <label htmlFor="title" className="form-label">Project title</label>
                <input id="title" type="text" placeholder="E-Commerce Website" required className="form-input" />
              </motion.div>

              <motion.div whileFocus={{ scale: 1.02 }} className="form-group">
                <label htmlFor="category" className="form-label">Project category</label>
                <select id="category" required className="form-select">
                  <option value="">Select category</option>
                  <option value="website">Website</option>
                  <option value="web-app">Web App</option>
                  <option value="mobile-app">Mobile App</option>
                  <option value="ai-ml">AI/ML App</option>
                  <option value="automation">Automation/Scripts</option>
                  <option value="other">Other</option>
                </select>
                </motion.div>

              <motion.div whileFocus={{ scale: 1.02 }} className="form-group">
                <label htmlFor="description" className="form-label">Project description</label>
                <textarea id="description" rows={4} placeholder="Describe your project requirements..." required className="form-textarea" />
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`submit-btn ${isSubmitting ? 'is-loading' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner" />
                    Launching Mission...
                  </>
                ) : (
                  <>
                    🚀 Send Mail
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Rocket Launch Animation */}
      {isSubmitting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rocket-container"
          style={{ animation: 'rocketLaunch 2s ease-out forwards' }}
        >
          <div style={{ position: 'relative', width: '30px', height: '60px' }}>
            {/* Rocket Body */}
            <div className="rocket-body">
              {/* Nose Cone */}
              <div className="nose-cone" />
              
              {/* Window */}
              <div className="rocket-window" />
              
              {/* Fins */}
              <div className="fin fin-left" />
              <div className="fin fin-right" />
            </div>
            
            {/* Flame */}
            <div className="flame" />
            
            {/* Exhaust Trail */}
            <div className="exhaust-trail" />
          </div>
        </motion.div>
      )}

      {/* Success Message */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="success-overlay"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="success-content"
          >
            <div className="success-emoji">🎉</div>
            <h3 className="success-title">
              Mail Send Successfully!
            </h3>
            <p className="success-message">
              Your message has been launched....
            </p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default ContactForm;