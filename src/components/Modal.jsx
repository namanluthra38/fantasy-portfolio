import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, data }) => {
    const modalRef = useRef(null);

    // UX: Close modal when clicking outside the content area
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
                        className="bg-fantasy-paper bg-parchment-texture text-fantasy-dark w-full max-w-2xl rounded-lg shadow-2xl border-4 border-fantasy-dark overflow-hidden relative max-h-[80vh] flex flex-col"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {/* Header */}
                        <div className="bg-fantasy-dark text-fantasy-gold p-6 flex justify-between items-center border-b-4 border-fantasy-gold/50 relative">
                            <h2 className="text-3xl font-fantasy font-bold tracking-wider">{data.content.title}</h2>
                             <button 
                                onClick={onClose}
                                className="text-fantasy-gold hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
                            >
                                <X size={28} />
                            </button>
                            {/* Decorative corner elements */}
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-fantasy-gold"></div>
                            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-fantasy-gold"></div>
                        </div>

                        {/* Body */}
                        <div className="p-8 overflow-y-auto">
                            <h3 className="text-xl font-bold mb-6 text-fantasy-accent font-fantasy">{data.content.subtitle}</h3>
                            <ul className="space-y-4">
                                {data.content.body.map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="text-fantasy-accent mr-3 text-2xl leading-none">•</span>
                                        <p className="text-lg leading-relaxed font-medium">{item}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                         {/* Footer decorative element */}
                        <div className="h-4 bg-fantasy-dark border-t-2 border-fantasy-gold/50"></div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;