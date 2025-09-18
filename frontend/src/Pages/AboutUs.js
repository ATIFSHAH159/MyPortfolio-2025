import { motion } from 'framer-motion'
import digitalbrain from '../Assets/Images/digital brain (2).png'
import about from '../Assets/Images/About.png'
import globe from '../Assets/Videos/glob.mp4'
import '../Assets/Css/AboutUs.css'

function AboutUs() {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { 
            opacity: 0, 
            y: 30,
            scale: 0.95 
        },
        visible: { 
            opacity: 1, 
            y: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    }

    const floatingVariants = {
        animate: {
            y: [0, -15, 0],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    }

    const orbitVariants = {
        animate: {
            rotate: 360,
            transition: {
                duration: 20,
                repeat: Infinity,
                ease: "linear"
            }
        }
    }

    const starVariants = {
        animate: {
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    }

    const textGlowVariants = {
        animate: {
            textShadow: [
                "0 0 10px rgba(29, 233, 255, 0.5)",
                "0 0 20px rgba(29, 233, 255, 0.8)",
                "0 0 30px rgba(29, 233, 255, 0.6)",
                "0 0 10px rgba(29, 233, 255, 0.5)"
            ],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    }

    const zoomVariants = {
        animate: {
            scale: [1, 1.05, 1],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    }

    return (
        <>
        <br></br>
 <div className="about-us-container">
            {/* Cosmic Background Elements */}
            <div className="cosmic-bg">
                <motion.div className="star star-1" variants={starVariants} animate="animate" />
                <motion.div className="star star-2" variants={starVariants} animate="animate" />
                <motion.div className="star star-3" variants={starVariants} animate="animate" />
                <motion.div className="star star-4" variants={starVariants} animate="animate" />
                <motion.div className="star star-5" variants={starVariants} animate="animate" />

                <motion.div className="orbit-ring orbit-1" variants={orbitVariants} animate="animate">
                    <div className="planet planet-1"></div>
                </motion.div>
                <motion.div className="orbit-ring orbit-2" variants={orbitVariants} animate="animate">
                    <div className="planet planet-2"></div>
                </motion.div>
            </div>

            <div className="container">
                {/* About Me Title */}
                <motion.div 
                    className="about-title"
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                >
                    <motion.h1 variants={textGlowVariants} animate="animate">
                        About Me
                        <span className="cosmic-accent">✦</span>
                    </motion.h1>
                </motion.div>

                {/* Main Content Layout */}
                <motion.div 
                    className="about-content"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    {/* Left Side - Designer */}
                    <motion.div className="role-section left-section" variants={itemVariants}>
                        <div className="role-content" >
                            <motion.h2 variants={textGlowVariants} animate="animate">
                                🎨 designer
                            </motion.h2>
                            <div className="role-description">
                                <p>Crafting stellar UI designs and cosmic design systems that navigate users through beautiful digital galaxies.</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Center - About Image */}
                    <motion.div 
                        className="image-section" 
                        variants={itemVariants}
                    >
                        <motion.div
                            variants={floatingVariants}
                            animate="animate"
                            className="image-container"
                        >
                            <motion.img 
                                src={digitalbrain} 
                                alt="About Syed Atif Shah" 
                                className="about-main-image"
                                variants={zoomVariants}
                                animate="animate"
                            />
                            {/* Orbiting elements around image */}
                            <motion.div 
                                className="orbit-element orbit-element-1"
                                variants={orbitVariants}
                                animate="animate"
                            >
                                <div className="cosmic-particle">✦</div>
                            </motion.div>
                            <motion.div 
                                className="orbit-element orbit-element-2"
                                variants={orbitVariants}
                                animate="animate"
                                style={{ animationDelay: '3s' }}
                            >
                                <div className="cosmic-particle">⭐</div>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Coder */}
                    <motion.div className="role-section right-section" variants={itemVariants}>
                        <div className="role-content">
                            <motion.h2 variants={textGlowVariants} animate="animate">
                                💻 &lt;coder&gt;
                            </motion.h2>
                            <div className="role-description">
                                <p>Architecting clean, efficient code that powers interstellar web experiences and mobile applications.</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Hero Section with Name and Info */}
                <motion.div 
                    className="hero-section"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <motion.h1 className="about-hero-name" variants={itemVariants}>
                        Syed Atif <motion.span 
                            className="name-accent"
                            variants={textGlowVariants} 
                            animate="animate"
                        >
                            Shah
                        </motion.span>
                    </motion.h1>

                    <motion.h2 className="about-hero-role" variants={itemVariants}>
                        ⭐ Web & Mobile Developer ⭐
                    </motion.h2>

                    <motion.blockquote className="about-hero-quote" variants={itemVariants}>
                        "Turning ideas into impactful digital experiences across the digital cosmos."
                    </motion.blockquote>

                    <motion.p className="about-hero-desc" variants={itemVariants}>
                        I am a passionate web and mobile developer with expertise in creating dynamic, responsive websites and beautiful Flutter apps. My journey started with a love for technology, grew through formal education, and blossomed into a career where I solve real-world problems with code. I thrive on creativity, collaboration, and continuous learning through the infinite possibilities of the digital universe.
                    </motion.p>
                </motion.div>
            </div>

            {/* My Journey Section */}
            <motion.div 
                className="journey-section"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.h2 className="journey-title" variants={itemVariants}>
                    My Journey
                    <span className="cosmic-accent">✦</span>
                </motion.h2>
                
                <div className="myjourney">
                    {/* Education Column */}
                    <motion.div className="education" variants={itemVariants}>
                        <h3>EDUCATION</h3>
                        
                        <div className="education-item">
                            <div className="education-period">2021 - 2025</div>
                            <div className="education-content">
                                <h4>COMSATS University Islamabad</h4>
                                <p className="education-location">Abbottabad, Pakistan</p>
                                <p className="education-details">Bachelor of Science in Computer Science</p>
                                <p className="education-grade">CGPA: 3.37/4.00</p>
                            </div>
                        </div>
                        
                        <div className="education-item">
                            <div className="education-period">2019 - 2021</div>
                            <div className="education-content">
                                <h4>Karwan Model College</h4>
                                <p className="education-location">Kohat, Pakistan</p>
                                <p className="education-details">Higher Secondary School Certificate (Pre-Engineering)</p>
                                <p className="education-grade">Grade: 95%</p>
                            </div>
                        </div>
                        
                        <div className="education-item">
                            <div className="education-period">2017 - 2019</div>
                            <div className="education-content">
                                <h4>Iqra Public School and College</h4>
                                <p className="education-location">Kohat, Pakistan</p>
                                <p className="education-details">Secondary School Certificate (Science)</p>
                                <p className="education-grade">Grade: 85%</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Globe Video Column */}
                    <motion.div className="globevideo" variants={itemVariants}>
                        <video 
                            autoPlay 
                            loop 
                            muted 
                            playsInline 
                            className="globe-video"
                        >
                            <source src={globe} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </motion.div>

                    {/* Experience Column */}
                    <motion.div className="experience" variants={itemVariants}>
                        <h3>EXPERIENCE</h3>
                        
                        <div className="experience-item">
                            <div className="experience-period">2023 - Present</div>
                            <div className="experience-content">
                                <h4>Web & Mobile Developer</h4>
                                <p className="experience-location">Freelance & Personal Projects</p>
                                <p className="experience-details">2+ years of experience developing responsive websites and mobile applications using React, Flutter, and Firebase.</p>
                                <div className="experience-projects">
                                    <p>Key Projects:</p>
                                    <ul>
                                        <li>4 responsive web applications</li>
                                        <li>4 Flutter mobile apps</li>
                                        <li>RESTful API development</li>
                                        <li>UI/UX design implementation</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
            </div>
            </>
    )
}

export default AboutUs;
