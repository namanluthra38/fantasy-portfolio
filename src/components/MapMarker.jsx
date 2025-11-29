import React from 'react';
import { motion } from 'framer-motion';

const MapMarker = ({ location, onClick }) => {
  const Icon = location.icon;

  return (
    <div
      className="absolute z-20 cursor-pointer group"
      style={{ left: `${location.x}%`, top: `${location.y}%` }}
      onClick={() => onClick(location.id)}
    >
      {/* Glowing effect behind marker */}
      <div className="absolute -inset-4 bg-fantasy-gold opacity-20 rounded-full blur-xl group-hover:opacity-40 transition-opacity duration-300"></div>
      
      {/* The Marker Icon */}
      <motion.div
        whileHover={{ scale: 1.2, y: -5 }}
        className="relative bg-fantasy-dark border-2 border-fantasy-gold p-3 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.5)] text-fantasy-gold"
      >
        <Icon size={24} strokeWidth={1.5} />
      </motion.div>
      
      {/* The Label Text */}
      <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <span className="font-fantasy font-bold text-lg text-fantasy-paper drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] bg-fantasy-dark/60 px-2 py-1 rounded-md">
          {location.label}
        </span>
      </div>
    </div>
  );
};

export default MapMarker;