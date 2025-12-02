import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Github, Linkedin, Mail } from 'lucide-react'; // 1. Import new icons

const Carousel = ({ slides }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  if (!slides || slides.length === 0) return null;

  const slideIndex = Math.abs(page % slides.length);
  const currentSlideData = slides[slideIndex];

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  // 2. Icon Helper: Maps string keys to Lucide components
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'github': return Github;
      case 'linkedin': return Linkedin;
      case 'mail': return Mail;
      default: return ExternalLink; // Fallback for standard links
    }
  };

  const variants = {
    enter: (direction) => ({ x: direction > 0 ? 100 : -100, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction) => ({ zIndex: 0, x: direction < 0 ? 100 : -100, opacity: 0 }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const navBtnStyle = "absolute top-1/2 -translate-y-1/2 z-20 bg-fantasy-dark/60 text-fantasy-gold p-2 md:p-3 rounded-full hover:bg-fantasy-gold hover:text-fantasy-dark transition-colors border-2 border-fantasy-gold/30 backdrop-blur-sm pointer-events-auto touch-none md:touch-auto";

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-lg bg-fantasy-dark/10 border border-fantasy-gold/20">
      
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <Motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) paginate(1);
            else if (swipe > swipeConfidenceThreshold) paginate(-1);
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
           <div className="w-full h-full max-h-full overflow-y-auto px-6 md:px-12 py-6 custom-scrollbar">
             <div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-fantasy-accent font-fantasy border-b-2 border-fantasy-gold/30 pb-2 inline-block">
                    {currentSlideData.subtitle}
                </h3>
                <ul className="space-y-3 md:space-y-4 ml-0 md:ml-2 pb-4">
                    {currentSlideData.body.map((item, index) => {
                        // Check if item is an object (link)
                        const isLink = typeof item === 'object' && item.url;
                        const content = isLink ? item.label : item;
                        
                        // 3. Determine which icon to use
                        const IconComponent = isLink ? getIcon(item.icon) : null;

                        return (
                            <li key={index} className="flex items-start">
                                {/* Bullet Point (Only show if it's NOT a link with a custom icon to avoid clutter, or keep it for consistency) */}
                                <span className="text-fantasy-accent mr-3 text-xl leading-none mt-1">•</span>

                                {isLink ? (
                                    <a 
                                        href={item.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-base md:text-lg leading-relaxed font-medium text-[#000] hover:text-[#c0392b] transition-colors flex items-center gap-2 group w-full"
                                    >
                                        {/* Render the specific Icon */}
                                        <div className="bg-fantasy-dark/10 p-1.5 rounded-md group-hover:bg-fantasy-dark/20 transition-colors">
                                            <IconComponent size={18} className="text-fantasy-dark group-hover:text-[#c0392b]" />
                                        </div>
                                        
                                        <span className="underline decoration-[#d4af37]/60 underline-offset-4">
                                            {content}
                                        </span>
                                    </a>
                                ) : (
                                    <p className="text-base md:text-lg leading-relaxed font-medium text-fantasy-dark">
                                        {content}
                                    </p>
                                )}
                            </li>
                        );
                    })}
                </ul>
             </div>
           </div>
        </Motion.div>
      </AnimatePresence>

      {slides.length > 1 && (
        <>
          <button className={`${navBtnStyle} left-2`} onClick={() => paginate(-1)}>
            <ChevronLeft size={20} />
          </button>
          <button className={`${navBtnStyle} right-2`} onClick={() => paginate(1)}>
            <ChevronRight size={20} />
          </button>
           
           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20 pointer-events-none">
            {slides.map((_, idx) => (
                <div 
                    key={idx}
                    className={`w-3 h-3 rounded-full transition-all duration-300 border border-fantasy-gold/50 ${idx === slideIndex ? 'bg-fantasy-accent scale-125' : 'bg-fantasy-gold/40'}`}
                ></div>
            ))}
           </div>
        </>
      )}
    </div>
  );
};

export default Carousel;