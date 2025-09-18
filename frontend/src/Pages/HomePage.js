import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import profilePic from '../Assets/Images/profilepicture.png';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaDownload, FaPaperPlane } from 'react-icons/fa';
import '../Assets/Css/HomePage.css';
import blackhole from '../Assets/Videos/blackhole.mp4'

function HomePage() {
    const [typedRole, setTypedRole] = useState('');
    const roles = ['Full Stack Developer', 'React Developer', 'Flutter Developer', 'UI/UX Designer'];
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    // Typewriter effect
    useEffect(() => {
        const currentRole = roles[currentRoleIndex];
        const typingSpeed = isDeleting ? 50 : 100;
        
        const timeout = setTimeout(() => {
            if (!isDeleting && currentCharIndex < currentRole.length) {
                setTypedRole(currentRole.substring(0, currentCharIndex + 1));
                setCurrentCharIndex(prev => prev + 1);
            } else if (isDeleting && currentCharIndex > 0) {
                setTypedRole(currentRole.substring(0, currentCharIndex - 1));
                setCurrentCharIndex(prev => prev - 1);
            } else if (!isDeleting && currentCharIndex === currentRole.length) {
                setTimeout(() => setIsDeleting(true), 1500);
            } else if (isDeleting && currentCharIndex === 0) {
                setIsDeleting(false);
                setCurrentRoleIndex(prev => (prev + 1) % roles.length);
            }
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [currentCharIndex, currentRoleIndex, isDeleting, roles]);

    // Social media links
    const socialLinks = [
        {
            href: 'https://github.com/yourusername',
            label: 'GitHub',
            icon: <FaGithub className="social-icon" />
        },
        {
            href: 'https://linkedin.com/in/yourusername',
            label: 'LinkedIn',
            icon: <FaLinkedin className="social-icon" />
        },
        {
            href: 'https://twitter.com/yourusername',
            label: 'Twitter',
            icon: <FaTwitter className="social-icon" />
        },
        {
            href: 'https://instagram.com/yourusername',
            label: 'Instagram',
            icon: <FaInstagram className="social-icon" />
        }
    ];

    // Scroll to contact function
    const scrollToContact = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { 
            opacity: 0, 
            y: 20 
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const iconVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: (i) => ({
            scale: 1,
            opacity: 1,
            transition: {
                delay: i * 0.1,
                duration: 0.4,
                type: "spring",
                stiffness: 200
            }
        })
    };

    const imageVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
            rotate: -10
        },
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                delay: 0.3
            }
        }
    };

    const floatVariants = {
        animate: {
            y: [-8, 8, -8],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <>

            <motion.div
                className="landing-container landing-rounded"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >

                <div className="half-width-boxleft">
                                     {/* Blackhole Video Background */}
  <video
    className="blackhole-video"
    src={blackhole}
    autoPlay
    loop
    muted
    playsInline
  />
                    <motion.div className="intro-block" variants={containerVariants}>
                        <motion.p className="hello-text" variants={itemVariants}>
                            Hello, It's Me
                        </motion.p>
                        <motion.h1 className="main-name gradient-underline" variants={itemVariants}>
                            Syed Atif Shah
                        </motion.h1>
                        <motion.h2 className="subtitle" variants={itemVariants}>
                            And I'm a <span className="highlight-blue typewriter">
                                {typedRole}<span className="type-cursor">|</span>
                            </span>
                        </motion.h2>
                        <motion.p className="description-text" variants={itemVariants}>
                            I am a passionate web developer with expertise in creating dynamic and responsive websites. I also build beautiful mobile applications with Flutter. I strive to create impactful and user-friendly solutions.
                        </motion.p>
                        <motion.div className="social-row" style={{ display: 'flex', gap: '18px', marginBottom: '32px' }}>
                            {socialLinks.map((link, i) => (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={link.label}
                                    custom={i}
                                    variants={iconVariants}
                                    whileHover={{ scale: 1.2, boxShadow: "0 0 24px #1de9ff" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="social-link"
                                >
                                    {link.icon}
                                </motion.a>
                            ))}
                        </motion.div>
                        <motion.div className="button-group" variants={containerVariants}>
                            <motion.button
                                className="btn hire-btn"
                                onClick={scrollToContact}
                                variants={itemVariants}
                                whileHover={{ scale: 1.07, boxShadow: "0 0 16px 2px #1de9ff" }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <FaPaperPlane className="btn-icon" />
                                Hire Me
                            </motion.button>
                            <motion.a
                                href="/Atif%20CV.pdf"
                                download="ATIFCV.pdf"
                                className="btn download-btn"
                                variants={itemVariants}
                                whileHover={{ scale: 1.07, boxShadow: "0 0 16px 2px #1de9ff" }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <FaDownload className="btn-icon" />
                                Download CV
                            </motion.a>
                        </motion.div>
                    </motion.div>
                </div>
                <div className="half-width-boxright">
                    
                    <motion.div
                        className="profile-image-wrapper profile-glow"
                        variants={imageVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Animated gradient blob background */}
                        <motion.div
                            className="animated-blob-bg"
                            animate={{
                                scale: [1, 1.08, 1],
                                rotate: [0, 8, -8, 0],
                                filter: [
                                    'blur(16px) brightness(1)',
                                    'blur(24px) brightness(1.1)',
                                    'blur(16px) brightness(1)',
                                ],
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        />
                        <motion.img
                            src={profilePic}
                            alt="Syed Atif Shah"
                            className="profile-image"
                            variants={floatVariants}
                            animate="animate"
                        />
                    </motion.div>
                </div>
            </motion.div>
            <br></br>
            
        </>
    );
}

export default HomePage;