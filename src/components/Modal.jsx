import React, { useEffect, useRef } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Carousel from './Carousel';
import { useSound } from '../context/SoundContext';

const Modal = ({ isOpen, onClose, data }) => {
  const modalRef = useRef(null);
  const { playClose } = useSound();

  const handleClose = () => {
    playClose();
    onClose();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isOpen])

  const overlayVariants = {
    hidden: {
      opacity: 0,
      backdropFilter: "blur(0px)",
      backgroundColor: "rgba(0,0,0,0)"
    },
    visible: {
      opacity: 1,
      backdropFilter: "blur(6px)",
      backgroundColor: "rgba(0,0,0,0.55)",
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    },
    exit: {
      opacity: 0,
      backdropFilter: "blur(0px)",
      backgroundColor: "rgba(0,0,0,0)",
      transition: { duration: 0.3, ease: "easeInOut" }
    },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.88,
      y: 40,
      rotateX: -6,
      filter: "brightness(0.6) blur(3px)",
      boxShadow: "0 0 0 rgba(255,215,90,0)",
      transformOrigin: "center bottom"
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      filter: "brightness(1) blur(0px)",
      boxShadow: "0 0 40px rgba(255,215,90,0.25)",
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }
    },
    exit: {
      opacity: 0,
      scale: 0.92,
      y: 30,
      rotateX: 4,
      filter: "brightness(0.7) blur(3px)",
      boxShadow: "0 0 0 rgba(255,215,90,0)",
      transition: { duration: 0.35, ease: "easeInOut" }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && data && (
        <Motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={overlayVariants}
        >
          <Motion.div
            ref={modalRef}
            className="bg-fantasy-paper bg-parchment-texture text-fantasy-dark w-full max-w-3xl sm:max-w-4xl md:max-w-5xl h-[80vh] sm:h-[85vh] rounded-lg shadow-2xl border-4 border-fantasy-dark overflow-hidden relative flex flex-col"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="bg-fantasy-dark text-fantasy-gold p-4 sm:p-6 flex justify-between items-center border-b-4 border-fantasy-gold/50 relative shrink-0">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-fantasy font-bold tracking-wider">{data.content.mainTitle}</h2>
              </div>

              <button
                onClick={handleClose}
                className="text-fantasy-gold hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full z-10"
              >
                <X size={22} />
              </button>
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-fantasy-gold"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-fantasy-gold"></div>
            </div>

            <div className="relative flex-grow overflow-hidden p-4 sm:p-6">
              <Carousel slides={data.content.slides} />
            </div>

            <div className="h-4 bg-fantasy-dark border-t-2 border-fantasy-gold/50 shrink-0"></div>
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;