import React, { useEffect, useRef, useState } from 'react';
import { Bot } from 'lucide-react';
import Menubar from './Components/Menubar';
import backgroundVideo from './Assets/Videos/galaxy.mp4';
import './App.css';
import Footer from './Components/Footer';
import HomePage from './Pages/HomePage';
import ContactPage from './Pages/ContactPage';
import Ticker from './Components/Ticker';
import AboutUs from './Pages/AboutUs';
import Skills from './Pages/Skills';
import WorkBanner from './Components/WorkBanner';
import SpaceProjectsPage from './Pages/Projects';
import Testimonials from './Pages/Testimonials';
import Chatbot from './Components/Chatbot';

function App() {
  const videoRef = useRef(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

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
        <div id='about'>
           <AboutUs/>
        </div>
        <div id='skills'>  
          <Skills/>
        </div>
        <div id='work'>
          <SpaceProjectsPage/>
         
        </div>
        <div id='testimonials'>
          <Testimonials/>
          <WorkBanner/>
        </div>
        <div id="contact">
          <ContactPage />
        </div>
       
        <Footer/>
      </div>

      {/* Floating AI Assistant Button and Label */}
      {!isChatOpen && (
        <div className="ai-assistant-label">AI Assistant ↓</div>
      )}
      <button
        onClick={() => setIsChatOpen((v) => !v)}
        className="ai-assistant-btn"
        aria-label="Toggle AI Assistant"
        title={isChatOpen ? 'Close Assistant' : 'AI Assistant'}
      >
        {isChatOpen ? '×' : <Bot size={42} strokeWidth={2.5} />}
      </button>

      {/* Chatbot Panel */}
      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}

export default App;