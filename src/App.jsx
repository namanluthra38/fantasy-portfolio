import React, { useState, useEffect } from 'react';
import { motion as Motion, useMotionValue, useTransform } from 'framer-motion';
import { locations } from './data';
import MapMarker from './components/MapMarker';
import Modal from './components/Modal';
import Guide from './components/Guide';

import mapBg from './assets/map.png';

function App() {
  const [activeLocationId, setActiveLocationId] = useState(null);
  const [showGuide, setShowGuide] = useState(true);

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
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const handleMarkerClick = (id) => {
    setActiveLocationId(id);
    setShowGuide(false);
  };

  const closeModal = () => {
    setActiveLocationId(null);
  };

  const activeData = locations.find(loc => loc.id === activeLocationId);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-fantasy-dark">
        
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 text-center pointer-events-none">
        <h1 className="font-fantasy text-4xl md:text-6xl text-fantasy-gold drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)]">
            Naman's Chronicles
        </h1>
      </div>

      <Motion.div
        className="absolute inset-[-5%] w-[110%] h-[110%] z-10 flex items-center justify-center"
        style={{ x: moveX, y: moveY }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.5 }}
      >
        <div className="relative w-full h-full max-w-[2500px] max-h-[1400px] mx-auto aspect-video shadow-2xl">
            <img 
                src={mapBg} 
                alt="Fantasy World Map" 
                className="w-full h-full object-cover rounded-xl opacity-90"
            />
            <div className="absolute inset-0 bg-fantasy-dark/30 mix-blend-overlay pointer-events-none rounded-xl"></div>

            {locations.map(location => (
            <MapMarker 
                key={location.id} 
                location={location} 
                onClick={handleMarkerClick} 
            />
            ))}
        </div>
      </Motion.div>

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