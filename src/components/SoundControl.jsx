
import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useSound } from '../context/SoundContext';
import { motion } from 'framer-motion';

const SoundControl = () => {
    const { isMuted, toggleMute } = useSound();

    return (
        <motion.button
            onClick={toggleMute}
            className="fixed top-4 right-4 md:top-8 md:right-8 z-50 p-2 md:p-3 rounded-full bg-fantasy-dark/80 border border-fantasy-gold/30 text-fantasy-gold hover:bg-fantasy-dark hover:border-fantasy-gold transition-all shadow-lg backdrop-blur-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
        >
            {isMuted ? <VolumeX className="w-5 h-5 md:w-6 md:h-6" /> : <Volume2 className="w-5 h-5 md:w-6 md:h-6" />}
        </motion.button>
    );
};

export default SoundControl;
