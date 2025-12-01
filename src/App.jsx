import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { locations } from './data';
import MapMarker from './components/MapMarker';
import Modal from './components/Modal';

// *** REPLACE THIS WITH YOUR LOCAL HIGH-RES ASSET ***
 import mapBg from './assets/gptMap.png'; 
// Using a temporary placeholder for demonstration. 
// The effect will look BAD until you use a real high-res map image.
const placeholderMap = "https://images.unsplash.com/photo-1578923246835-09c956fb51c8?q=80&w=3415&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";


function App() {
  const [activeLocationId, setActiveLocationId] = useState(null);
  
  // Framer Motion values for mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Transform mouse position into subtle map movement (Parallax effect)
  // The range [-50, 50] dictates how many pixels the map moves. Adjust based on map size.
  const moveX = useTransform(mouseX, [-1, 1], [50, -50]);
  const moveY = useTransform(mouseY, [-1, 1], [50, -50]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate normalized mouse position between -1 and 1
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
  };

  const closeModal = () => {
    setActiveLocationId(null);
  };

  const activeData = locations.find(loc => loc.id === activeLocationId);

  return (
    // Main container must hide overflow for parallax to work cleanly
    <div className="relative w-screen h-screen overflow-hidden bg-fantasy-dark">
        
      {/* Intro Title (Fades out on interaction, optional) */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 text-center pointer-events-none">
        <h1 className="font-fantasy text-4xl md:text-6xl text-fantasy-gold drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)]">
            Naman's Chronicles
        </h1>
        <p className="text-fantasy/80 mt-2 font-fantasy text-xl">Explore the map to uncover my journey</p>
      </div>

      {/* The Movable Map Container */}
      {/* We make it larger than screen (e.g., 110%) so edges don't show during movement */}
      <motion.div 
        className="absolute inset-[-5%] w-[110%] h-[110%] z-10 flex items-center justify-center"
        style={{ x: moveX, y: moveY }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.5 }}
      >
        <div className="relative w-full h-full max-w-[2500px] max-h-[1400px] mx-auto aspect-video shadow-2xl">
            {/* The Map Image */}
            <img 
                src={mapBg} // REPLACE WITH YOUR VARIABLE: mapBg
                alt="Fantasy World Map" 
                className="w-full h-full object-cover rounded-xl opacity-90"
            />
            
            <div className="absolute inset-0 bg-fantasy-dark/30 mix-blend-overlay pointer-events-none rounded-xl"></div>

            {/* Render Markers on top of the map */}
            {locations.map(location => (
            <MapMarker 
                key={location.id} 
                location={location} 
                onClick={handleMarkerClick} 
            />
            ))}
        </div>
      </motion.div>

      {/* The Modal Component */}
      <Modal 
        isOpen={!!activeLocationId} 
        onClose={closeModal} 
        data={activeData}
      />

      {/* Subtle Vignette overlay for cinematic feel */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_50%,_rgba(26,22,18,0.8)_100%)]"></div>
    </div>
  );
}

export default App;