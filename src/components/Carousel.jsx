import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Carousel = ({ slides }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  if (!slides || slides.length === 0) return null;

  const slideIndex = Math.abs(page % slides.length);
  const currentSlideData = slides[slideIndex];

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const navBtnStyle = "absolute top-1/2 -translate-y-1/2 z-20 bg-fantasy-dark/50 text-fantasy-gold p-2 rounded-full hover:bg-fantasy-gold hover:text-fantasy-dark transition-colors border-2 border-fantasy-gold/30 backdrop-blur-sm pointer-events-auto";

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-lg bg-fantasy-dark/10 border border-fantasy-gold/20">
      
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
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
           {/* --- THE SINGLE SCROLL CONTAINER --- */}
           <div className="w-full h-full max-h-full overflow-y-auto px-12 py-8 custom-scrollbar">
             {/* Removed the relative wrapper that was needed for sticky positioning */}
             <div>
                {/* CHANGED: Removed 'sticky top-0 bg-fantasy-paper/90 backdrop-blur-md pt-2 z-10' */}
                <h3 className="text-2xl font-bold mb-6 text-fantasy-accent font-fantasy border-b-2 border-fantasy-gold/30 pb-2 inline-block">
                    {currentSlideData.subtitle}
                </h3>
                <ul className="space-y-4 ml-2 pb-4">
                    {currentSlideData.body.map((item, index) => (
                        <li key={index} className="flex items-start">
                            <span className="text-fantasy-accent mr-3 text-xl leading-none mt-1">•</span>
                            <p className="text-lg leading-relaxed font-medium text-fantasy-dark">{item}</p>
                        </li>
                    ))}
                </ul>
             </div>
           </div>
           {/* ----------------------------------- */}

        </motion.div>
      </AnimatePresence>

      {slides.length > 1 && (
        <>
          <button className={`${navBtnStyle} left-2`} onClick={() => paginate(-1)}>
            <ChevronLeft size={24} />
          </button>
          <button className={`${navBtnStyle} right-2`} onClick={() => paginate(1)}>
            <ChevronRight size={24} />
          </button>
           
           {/* Dots */}
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