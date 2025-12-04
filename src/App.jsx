import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { locations } from './data';
import MapMarker from './components/MapMarker';
import Modal from './components/Modal';
import Guide from './components/Guide';

import mapBg from './assets/map.png'; 
import mobileMap from './assets/mobileMap.png';

import shipIcon from './assets/ship.png'; 

function App() {
  const [activeLocationId, setActiveLocationId] = useState(null);
  const [showGuide, setShowGuide] = useState(true);
  
  
  const [lastClickedId, setLastClickedId] = useState(null);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth <= 768 : false);

  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const moveX = useTransform(mouseX, [-1, 1], [50, -50]);
  const moveY = useTransform(mouseY, [-1, 1], [50, -50]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // cleanup resize listener on unmount
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const handleMarkerClick = (id) => {
    setActiveLocationId(id);
    setShowGuide(false);
    setLastClickedId(id);
  };

  const closeModal = () => {
    setActiveLocationId(null);
  };

  const activeData = locations.find(loc => loc.id === activeLocationId);
  
  
  const shipLocation = locations.find(loc => loc.id === lastClickedId);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-fantasy-dark">
        
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 text-center pointer-events-none">
        <h1 className="font-fantasy text-4xl md:text-6xl text-fantasy-gold drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)]">
            Naman's Chronicles
        </h1>
      </div>

      {/* The Movable Map Container */}
      {(() => {
        const mapWrapperClass = isMobile ? 'absolute inset-0 w-full h-full z-10 flex items-center justify-center' : 'absolute inset-[-5%] w-[110%] h-[110%] z-10 flex items-center justify-center';
        const innerDivClass = isMobile ? 'relative w-full h-full mx-auto shadow-2xl overflow-hidden' : 'relative w-full h-full max-w-[2500px] max-h-[1400px] mx-auto aspect-video shadow-2xl';
        const motionStyle = isMobile ? {} : { x: moveX, y: moveY };
        const motionTransition = isMobile ? {} : { type: "tween", ease: "easeOut", duration: 0.5 };

        return (
          <motion.div className={mapWrapperClass} style={motionStyle} transition={motionTransition}>
            <div className={innerDivClass}>
            <img 
              src={isMobile ? mobileMap : mapBg} 
              alt="Fantasy World Map" 
              className={isMobile ? "w-full h-[105%] object-cover object-top rounded-xl opacity-90" : "w-full h-full object-cover rounded-xl opacity-90"}
            />
            <div className="absolute inset-0 bg-fantasy-dark/30 mix-blend-overlay pointer-events-none rounded-xl"></div>

            
            {shipLocation && (
              <motion.img
                src={shipIcon}
                alt="Sailing Ship"
                className="absolute w-5 h-5 md:w-7 md:h-7 object-contain z-30 drop-shadow-xl pointer-events-none"
                initial={{ opacity: 0, scale: 0 }} 
                animate={{ 
                  left: `calc(${isMobile && shipLocation?.xMobile !== undefined ? shipLocation.xMobile : shipLocation.x}% + 2%)`, 
                  top: `calc(${isMobile && shipLocation?.yMobile !== undefined ? shipLocation.yMobile : shipLocation.y}% + 4%)`,
                  opacity: 1, 
                  scale: 1,
                  y: [0, -5, 0], 
                }}
                transition={{
                  left: { duration: 2, ease: "easeInOut" }, 
                  top: { duration: 2, ease: "easeInOut" },
                  y: { 
                    repeat: Infinity, 
                    duration: 3, 
                    ease: "easeInOut" 
                  }
                }}
              />
            )}

            {locations.map(location => (
            <MapMarker 
                key={location.id} 
                location={location} 
                onClick={handleMarkerClick} 
                isMobile={isMobile}
            />
            ))}
        </div>
      </motion.div>
        );
      })() }

      <Guide 
        isVisible={showGuide && !activeLocationId} 
        onDismiss={() => setShowGuide(false)}
      />

      <Modal 
        isOpen={!!activeLocationId} 
        onClose={closeModal} 
        data={activeData}
      />

      <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_50%,_rgba(26,22,18,0.8)_100%)]"></div>
    </div>
  );
}

export default App;