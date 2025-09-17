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
          // keep dynamic gradient origin tied to cursor
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

      <style jsx>{`
        @keyframes twinkle {
          from { opacity: 0.2; transform: scale(1); }
          to { opacity: 1; transform: scale(1.2); }
        }
        @keyframes ringOrbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes rocketLaunch {
          0% { transform: translateX(-50%) translateY(0) rotate(0deg); opacity: 1; }
          70% { transform: translateX(-50%) translateY(-70vh) rotate(-10deg); }
          100% { transform: translateX(-50%) translateY(-120vh) rotate(-15deg); opacity: 0; }
        }
        @keyframes flame {
          0%, 100% { transform: translateX(-50%) scaleY(1) scaleX(1); }
          50% { transform: translateX(-50%) scaleY(0.7) scaleX(1.2); }
        }
      `}</style>

      <div className="contact-grid">
        
        {/* Avatar Section */}
        <div 
          ref={containerRef}
          style={{
            position: 'relative',
            minHeight: '500px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            perspective: '1200px'
          }}
        >
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              position: 'absolute',
              top: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: isAwake ? 'rgba(29,233,255,0.2)' : 'rgba(138,43,226,0.2)',
              border: `1px solid ${isAwake ? '#1de9ff' : '#8a2be2'}`,
              color: isAwake ? '#1de9ff' : '#8a2be2',
              padding: '0.5rem 1rem',
              borderRadius: '999px',
              fontSize: '0.875rem',
              fontWeight: '600',
              backdropFilter: 'blur(10px)',
              boxShadow: `0 0 20px ${isAwake ? 'rgba(29,233,255,0.3)' : 'rgba(138,43,226,0.3)'}`,
              zIndex: 10
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
            style={{
              position: 'relative',
              width: '400px',
              height: '400px',
              background: `
                linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05)),
                radial-gradient(circle at 30% 30%, rgba(29,233,255,0.2), transparent 70%),
                radial-gradient(circle at 70% 70%, rgba(138,43,226,0.15), transparent 70%)
              `,
              borderRadius: '40% 60% 50% 70% / 60% 40% 70% 50%',
              border: '2px solid rgba(29,233,255,0.3)',
              boxShadow: `
                inset 0 0 80px rgba(29,233,255,0.1),
                0 20px 100px rgba(0,0,0,0.5),
                0 0 100px rgba(29,233,255,0.2)
              `,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              cursor: 'pointer'
            }}
            onClick={() => setIsAwake(!isAwake)}
          >
            {/* Helmet */}
            <motion.div
              style={{
                position: 'absolute',
                top: '15%',
                width: '70%',
                height: '40%',
                background: `
                  radial-gradient(circle at 40% 30%, rgba(29,233,255,0.4), rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 80%),
                  linear-gradient(145deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))
                `,
                borderRadius: '50%',
                border: '1px solid rgba(29,233,255,0.5)',
                boxShadow: `
                  inset 0 0 40px rgba(29,233,255,0.2),
                  0 10px 30px rgba(0,0,0,0.3)
                `,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* Helmet Reflection */}
              <div style={{
                position: 'absolute',
                top: '20%',
                left: '25%',
                width: '30%',
                height: '40%',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.6), transparent)',
                borderRadius: '50%',
                filter: 'blur(2px)'
              }} />
              
              {/* Orbital Ring */}
              <div style={{
                position: 'absolute',
                inset: '-15%',
                border: '2px dashed rgba(29,233,255,0.4)',
                borderRadius: '50%',
                animation: 'ringOrbit 15s linear infinite'
              }} />
            </motion.div>

            {/* Face Container */}
            <div style={{
              position: 'absolute',
              bottom: '20%',
              width: '80%',
              height: '40%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem'
            }}>
              {/* Eyes */}
              <div style={{
                display: 'flex',
                gap: '2rem',
                alignItems: 'center'
              }}>
                {/* Left Eye */}
                <div style={{
                  position: 'relative',
                  width: '80px',
                  height: '50px',
                  background: 'rgba(0,0,0,0.7)',
                  borderRadius: '25px',
                  border: '2px solid rgba(29,233,255,0.3)',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <motion.div
                    style={{
                      width: '20px',
                      height: '20px',
                      background: isAwake ? 
                        'radial-gradient(circle, #1de9ff, #0066cc)' : 
                        'radial-gradient(circle, #666, #333)',
                      borderRadius: '50%',
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
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0.8), transparent 60%)',
                      borderRadius: '25px',
                      transformOrigin: 'center'
                    }}
                  />
                </div>

                {/* Right Eye */}
                <div style={{
                  position: 'relative',
                  width: '80px',
                  height: '50px',
                  background: 'rgba(0,0,0,0.7)',
                  borderRadius: '25px',
                  border: '2px solid rgba(29,233,255,0.3)',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <motion.div
                    style={{
                      width: '20px',
                      height: '20px',
                      background: isAwake ? 
                        'radial-gradient(circle, #1de9ff, #0066cc)' : 
                        'radial-gradient(circle, #666, #333)',
                      borderRadius: '50%',
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
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0.8), transparent 60%)',
                      borderRadius: '25px',
                      transformOrigin: 'center'
                    }}
                  />
                </div>
              </div>

              {/* Mouth */}
              <motion.div
                animate={{
                  scaleY: !isAwake ? 0.2 : isHovering ? 0.8 : 1,
                  borderRadius: !isAwake ? '50%/50%' : isHovering ? '20px/8px' : '16px/12px',
                  background: !isAwake ? 'rgba(138,43,226,0.6)' : 
                              isHovering ? 'rgba(29,233,255,0.9)' : 'rgba(29,233,255,0.7)'
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                style={{
                  width: '60px',
                  height: '20px',
                  boxShadow: isAwake ? '0 0 20px rgba(29,233,255,0.5)' : '0 0 10px rgba(138,43,226,0.3)',
                  filter: 'blur(0.5px)'
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
              style={{
                position: 'absolute',
                top: '10%',
                right: '15%',
                fontSize: '2rem',
                color: '#8a2be2',
                textShadow: '0 0 10px #8a2be2'
              }}
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
              Contact Mission Control
            </h2>
            
            <p className="form-subtitle">
              Ready to launch your next project into orbit?
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
                <input id="name" type="text" placeholder="e.g., Captain Stellar" required className="form-input" />
              </motion.div>

              <motion.div whileFocus={{ scale: 1.02 }} className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input id="email" type="email" placeholder="captain@starship.space" required className="form-input" />
              </motion.div>

              <motion.div whileFocus={{ scale: 1.02 }} className="form-group">
                <label htmlFor="title" className="form-label">Project title</label>
                <input id="title" type="text" placeholder="Deep Space Exploration" required className="form-input" />
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
                <textarea id="description" rows={4} placeholder="Describe your interstellar project requirements..." required className="form-textarea" />
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
                    🚀 Launch Message
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
          style={{
            position: 'fixed',
            bottom: '-100px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            animation: 'rocketLaunch 2s ease-out forwards'
          }}
        >
          <div style={{
            position: 'relative',
            width: '30px',
            height: '60px'
          }}>
            {/* Rocket Body */}
            <div style={{
              width: '30px',
              height: '60px',
              background: 'linear-gradient(180deg, #ffffff, #e0e0e0)',
              borderRadius: '15px 15px 8px 8px',
              boxShadow: '0 0 20px rgba(255,255,255,0.8)',
              position: 'relative'
            }}>
              {/* Nose Cone */}
              <div style={{
                position: 'absolute',
                top: '-18px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '15px solid transparent',
                borderRight: '15px solid transparent',
                borderBottom: '20px solid #1de9ff',
                filter: 'drop-shadow(0 0 10px #1de9ff)'
              }} />
              
              {/* Window */}
              <div style={{
                position: 'absolute',
                top: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '14px',
                height: '14px',
                background: '#0a0a0a',
                borderRadius: '50%',
                border: '3px solid #1de9ff'
              }} />
              
              {/* Fins */}
              <div style={{
                position: 'absolute',
                bottom: '-3px',
                left: '-12px',
                width: '14px',
                height: '16px',
                background: '#1de9ff',
                clipPath: 'polygon(0 100%, 100% 0, 100% 100%)'
              }} />
              <div style={{
                position: 'absolute',
                bottom: '-3px',
                right: '-12px',
                width: '14px',
                height: '16px',
                background: '#1de9ff',
                clipPath: 'polygon(0 0, 100% 100%, 0 100%)'
              }} />
            </div>
            
            {/* Flame */}
            <div style={{
              position: 'absolute',
              bottom: '-25px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '16px',
              height: '25px',
              background: 'radial-gradient(circle at 50% 0%, #ffffff, #1de9ff, #ff6b00)',
              borderRadius: '50%',
              filter: 'blur(2px)',
              animation: 'flame 0.2s ease-in-out infinite alternate'
            }} />
            
            {/* Exhaust Trail */}
            <div style={{
              position: 'absolute',
              bottom: '-60px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '3px',
              height: '80px',
              background: 'linear-gradient(180deg, #1de9ff, transparent)',
              filter: 'blur(2px)',
              opacity: 0.8
            }} />
          </div>
        </motion.div>
      )}

      {/* Success Message */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(10px)',
            zIndex: 1001
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            style={{
              background: 'linear-gradient(135deg, rgba(29,233,255,0.2), rgba(138,43,226,0.2))',
              border: '2px solid rgba(29,233,255,0.5)',
              borderRadius: '20px',
              padding: '2rem 3rem',
              textAlign: 'center',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 100px rgba(29,233,255,0.3)'
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
            <h3 style={{
              fontSize: '1.8rem',
              marginBottom: '0.5rem',
              background: 'linear-gradient(135deg, #1de9ff, #8a2be2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Mission Successful!
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem' }}>
              Your message has been launched into cyberspace!
            </p>
          </motion.div>
        </motion.div>
      )}

      {/* Additional CSS animations */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default ContactForm;