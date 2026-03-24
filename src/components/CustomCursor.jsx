import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* 1. Technical Plus/Crosshair at the center */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[1000] flex items-center justify-center h-4 w-4"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          rotate: isHovered ? 90 : 0,
          scale: isHovered ? 0.8 : 1,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 400, mass: 0.5 }}
      >
        <div className="absolute h-[2px] w-full bg-accent rounded-full"></div>
        <div className="absolute w-[2px] h-full bg-accent rounded-full"></div>
      </motion.div>

      {/* 2. Corner Brackets that expand on hover */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[999]"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
        }}
        transition={{ type: 'spring', damping: 35, stiffness: 250, mass: 0.8 }}
      >
        <motion.div 
          className="relative w-12 h-12"
          animate={{
            scale: isHovered ? 1.4 : 1,
            opacity: isHovered ? 1 : 0.4,
          }}
        >
          {/* Top Left */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-accent"></div>
          {/* Top Right */}
          <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-accent"></div>
          {/* Bottom Left */}
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-accent"></div>
          {/* Bottom Right */}
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-accent"></div>
        </motion.div>
      </motion.div>

      {/* 3. Subtle ambient glow trailing slightly */}
      <motion.div
        className="fixed top-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none z-[-1]"
        animate={{
          x: mousePosition.x - 200,
          y: mousePosition.y - 200,
        }}
        transition={{ type: 'tween', ease: "linear", duration: 0.2 }}
      />
    </>
  );
};

export default CustomCursor;
