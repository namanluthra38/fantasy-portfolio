import React from 'react';
import { motion as Motion } from 'framer-motion';
import { useSound } from '../context/SoundContext';

const MapMarker = ({ location, onClick, isMobile = false, isVisited = false }) => {
  const { playHover, playClick } = useSound();
  const Icon = location.icon;
  const posX = isMobile && location.xMobile !== undefined ? location.xMobile : location.x;
  const posY = isMobile && location.yMobile !== undefined ? location.yMobile : location.y;

  const glowColor = isVisited ? 'bg-fantasy-visited' : 'bg-fantasy-gold';
  const borderColor = isVisited ? 'border-fantasy-visited' : 'border-fantasy-gold';
  const textColor = isVisited ? 'text-fantasy-visited' : 'text-fantasy-gold';
  const shadowColor = isVisited ? 'rgba(163, 201, 54, 0.5)' : 'rgba(212,175,55,0.5)';

  const outerGlowClass = isMobile ? 'absolute -inset-2' : 'absolute -inset-4';
  const paddingClass = isMobile ? 'p-2' : 'p-3';
  const iconSize = isMobile ? 16 : 24;
  const hoverProps = isMobile ? {} : { whileHover: { scale: 1.15, y: -4 } };
  const labelClass = isMobile ? 'font-fantasy font-bold text-sm text-fantasy-paper drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] bg-fantasy-dark/60 px-1 py-0.5 rounded-md' : 'font-fantasy font-bold text-lg text-fantasy-paper drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] bg-fantasy-dark/60 px-2 py-1 rounded-md';

  const handleClick = (e) => {
    e.stopPropagation();
    playClick();
    onClick(location.id);
  };

  return (
    <div
      className="absolute z-20 cursor-pointer group"
      style={{ left: `${posX}%`, top: `${posY}%` }}
      onClick={handleClick}
      onMouseEnter={playHover}
    >
      <div className={`${outerGlowClass} ${glowColor} opacity-20 rounded-full blur-xl group-hover:opacity-40 transition-opacity duration-300`}></div>

      <Motion.div
        {...hoverProps}
        className={`relative bg-fantasy-dark border-2 ${borderColor} ${paddingClass} rounded-full shadow-[0_0_15px_${shadowColor}] ${textColor} transition-colors duration-500`}
      >
        <Icon size={iconSize} strokeWidth={1.5} />
      </Motion.div>

      <div className={`absolute top-full ${isMobile ? 'mt-1' : 'mt-2'} left-1/2 -translate-x-1/2 whitespace-nowrap`}>
        <span className={labelClass}>
          {location.label}
        </span>
      </div>
    </div>
  );
};

export default MapMarker;