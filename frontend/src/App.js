import React, { useEffect, useRef } from 'react';
import Menubar from './Components/Menubar';
import backgroundVideo from './Assets/Videos/galaxy.mp4';
import './App.css';
import Footer from './Components/Footer';
import HomePage from './Pages/HomePage';
import ContactPage from './Pages/ContactPage';
import Ticker from './Components/Ticker';
import AboutUs from './Pages/AboutUs';
import Skills from './Pages/Skills';

function App() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(error => {
        console.error('Video autoplay failed:', error);
      });
    }
  }, []);

  return (
    <div className="App">
      {/* Background Video */}
      <div className="video-background">
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="auto"
          onError={(e) => console.error('Video error:', e)}
          onLoadedData={() => console.log('Video loaded')}
        >
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
     
      {/* Main Content */}
      <div className="main-content">
        <Menubar />
        <div id="home">
          <HomePage />
        </div>
        <div id="ticker">
          <Ticker/>
        </div>
        <div id='about'>
           <AboutUs/>
        </div>
        <div id='skills'>  
<Skills/>
        </div>
        <div id="contact">
          <ContactPage />
        </div>
       
        <Footer/>
      </div>
    </div>
  );
}

export default App;