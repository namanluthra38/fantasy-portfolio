import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Carousel from './Carousel';

const Modal = ({ isOpen, onClose, data }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };
        if (isOpen) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onClose]);

    // UX: Prevent body scroll when modal is open
    useEffect(() => {
      if (isOpen) document.body.style.overflow = 'hidden';
      else document.body.style.overflow = 'unset';
    }, [isOpen])


    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } }
    };

    const modalVariants = {
        hidden: { y: 50, opacity: 0, scale: 0.95 },
        // We set a fixed height here (e.g., h-[85vh]) so the internal parts know how much space they have.
        visible: { 
            y: 0, 
            opacity: 1, 
            scale: 1,
            transition: { type: "spring", damping: 25, stiffness: 300 } 
        },
        exit: { y: 50, opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
    };

    return (
        <AnimatePresence>
            {isOpen && data && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={overlayVariants}
                >
                    <motion.div
                        ref={modalRef}
                        // CHANGED: Added h-[85vh] to give it a definite height constraint.
                        // Removed max-h-[90vh] in favor of the explicit height for better flex behavior.
                        className="bg-fantasy-paper bg-parchment-texture text-fantasy-dark w-full max-w-4xl h-[85vh] rounded-lg shadow-2xl border-4 border-fantasy-dark overflow-hidden relative flex flex-col"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {/* Header - Flex shrink 0 prevents it from squishing */}
                        <div className="bg-fantasy-dark text-fantasy-gold p-6 flex justify-between items-center border-b-4 border-fantasy-gold/50 relative shrink-0">
                            <div>
                                <h2 className="text-3xl font-fantasy font-bold tracking-wider">{data.content.mainTitle}</h2>
                            </div>
                            
                             <button 
                                onClick={onClose}
                                className="text-fantasy-gold hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full z-10"
                            >
                                <X size={28} />
                            </button>
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-fantasy-gold"></div>
                            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-fantasy-gold"></div>
                        </div>

                        {/* Body - THE FIX IS HERE */}
                        {/* CHANGED: Removed 'overflow-y-auto'. Added 'flex-grow' and 'overflow-hidden'. */}
                        {/* This forces the child (Carousel) to handle the scrolling within this defined space. */}
                        <div className="relative flex-grow overflow-hidden p-6">
                           <Carousel slides={data.content.slides} />
                        </div>
                        
                        {/* Footer - Flex shrink 0 prevents it from squishing */}
                        <div className="h-4 bg-fantasy-dark border-t-2 border-fantasy-gold/50 shrink-0"></div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;