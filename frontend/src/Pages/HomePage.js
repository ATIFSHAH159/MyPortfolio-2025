import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import profilePic from '../Assets/Images/profilepicture.png';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaDownload, FaPaperPlane } from 'react-icons/fa';
import '../Assets/Css/HomePage.css';
import backgroundimg from '../Assets/Images/astronaut.png'
import Ticker from '../Components/Ticker';
import cvFile from '../Assets/Documents/Atif Cv.pdf';

function HomePage() {
    const [typedRole, setTypedRole] = useState('');
    const roles = ['Full Stack Developer', 'AI/ML Enthusiast', 'Flutter Developer', 'UI/UX Designer'];
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isAstronautDancing, setIsAstronautDancing] = useState(false);

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

    // Handle astronaut double-click
    const handleAstronautDoubleClick = () => {
        setIsAstronautDancing(true);
        // Stop dancing after 8 seconds
        setTimeout(() => {
            setIsAstronautDancing(false);
        }, 8000);
    };

    // Social media links
    const socialLinks = [
        {
            href: 'https://github.com/ATIFSHAH159',
            label: 'GitHub',
            icon: <FaGithub className="social-icon" />
        },
        {
            href: 'https://linkedin.com/in/atif-shah-b62008378/',
            label: 'LinkedIn',
            icon: <FaLinkedin className="social-icon" />
        },
        {
            href: 'https://instagram.com/atif_shah90',
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

    // Dancing astronaut animation variants
    const astronautVariants = {
        normal: {
            y: [0, -10, 0, -8, 0],
            rotate: [0, 1, 0, -1, 0],
            scale: [1, 1.02, 1, 1.01, 1],
            transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
            }
        },
        dancing: {
            y: [0, -30, -15, -35, -10, -40, -5, -25, 0],
            rotate: [0, 15, -12, 20, -15, 25, -20, 10, 0],
            scale: [1, 1.1, 0.95, 1.15, 0.9, 1.2, 1.05, 1.1, 1],
            x: [0, 20, -15, 25, -20, 30, -10, 15, 0],
            transition: {
                duration: 1.2,
                repeat: 6, // Dance for about 8 seconds total
                ease: "easeInOut",
                times: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1]
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
                <motion.img
                    className="backgroundimage"
                    src={backgroundimg}
                    alt="Dancing Astronaut"
                    onDoubleClick={handleAstronautDoubleClick}
                    variants={astronautVariants}
                    animate={isAstronautDancing ? "dancing" : "normal"}
                    style={{
                        cursor: 'pointer',
                        userSelect: 'none'
                    }}
                    whileHover={{ 
                        scale: 1.05,
                        transition: { duration: 0.2 }
                    }}
                />

                <div className="half-width-boxleft">
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
                            I am an AI and Machine Learning enthusiast with a strong interest in building intelligent systems. I enjoy exploring data, developing predictive models, and creating solutions that leverage the power of AI to solve real-world problems. My passion lies in continuously learning, experimenting with new algorithms, and applying cutting-edge technologies to make meaningful impacts.
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
                                href={cvFile}
                                download="Syed_Atif_Shah_CV.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
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
            <Ticker/>
            <br></br>
        </>
    );
}

export default HomePage;