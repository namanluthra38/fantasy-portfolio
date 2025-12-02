import React, { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import charImg from '../assets/character.png'; 

const Guide = ({ isVisible, onDismiss }) => {
  const [textIndex, setTextIndex] = useState(0);
  const fullText = "Greetings, Traveler! I am Naman. Welcome to my digital realm. The lands before you hold the stories of my skills and triumphs. Click on the landmarks to explore my journey!";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (isVisible && textIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[textIndex]);
        setTextIndex((prev) => prev + 1);
      }, 30);
      return () => clearTimeout(timeout);
    }
  }, [textIndex, isVisible, fullText]);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-0 left-2 md:left-10 z-40 flex items-end pointer-events-none sm:pointer-events-auto">

          <div className="relative">
            
            <Motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{
                  x: 0,
                  opacity: 1,
                  transition: { type: "spring", stiffness: 100, damping: 20 }
              }}
              exit={{
                  x: -300,
                  opacity: 0,
                  transition: { delay: 0.3, duration: 0.4, ease: "easeInOut" }
              }}
              className="relative z-20 pointer-events-auto origin-bottom-left"
            >
              <img 
                src={charImg} 
                alt="Guide Character" 
                className="h-[220px] sm:h-[300px] md:h-[350px] lg:h-[450px] w-auto object-contain drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]"
              />
            </Motion.div>

            <Motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{
                  opacity: 1, scale: 1, y: 0,
                  transition: { delay: 0.5, duration: 0.4 }
              }}
              exit={{
                  opacity: 0, scale: 0.8, y: 20,
                  transition: { delay: 0, duration: 0.3 }
              }}
              className="absolute left-[60%] sm:left-[62%] bottom-[60%] z-30 pointer-events-auto w-[220px] sm:w-[280px] md:w-[350px] overflow-visible"
            >
              <div className="bg-[#1a1612]/95 border-2 border-fantasy-gold rounded-lg p-4 sm:p-5 shadow-2xl relative text-fantasy-paper font-fantasy tracking-wide leading-relaxed">
                <div className="absolute bottom-3 -left-2 w-4 h-4 bg-[#1a1612] border-l-2 border-b-2 border-fantasy-gold transform rotate-45"></div>

                <div className="absolute -top-4 left-4 bg-fantasy-accent px-3 py-1 rounded border border-fantasy-gold shadow-md">
                  <span className="text-white text-xs sm:text-sm font-bold tracking-wider">NAMAN</span>
                </div>

                <button
                  onClick={onDismiss}
                  aria-label="Close guide"
                  className="absolute -top-2 -right-2 z-50 flex items-center justify-center bg-fantasy-dark border border-fantasy-gold rounded-full p-1 text-fantasy-gold hover:text-white hover:bg-red-900 transition-colors shadow-sm"
                >
                  <X size={16} />
                </button>

                <p className="text-xs sm:text-sm md:text-base drop-shadow-md min-h-[64px]">
                  {displayedText}
                  <span className="animate-pulse text-fantasy-gold">|</span>
                </p>
              </div>
            </Motion.div>
          </div>

        </div>
      )}
    </AnimatePresence>
  );
};

export default Guide;