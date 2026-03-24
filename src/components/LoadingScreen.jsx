import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const loadingPhrases = [
  "INITIALIZING NEURAL CLUSTER...",
  "ESTABLISHING SECURE HANDSHAKE...",
  "LOADING AI MODELS...",
  "CALIBRATING INTERFACE...",
  "SYSTEM OPTIMIZATION COMPLETE."
];

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    // We'll simulate a 2.5 second loading experience
    const duration = 2500; 
    const intervalTime = 40;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        // Add a bit of randomness to make the loading feel "real"
        return Math.min(prev + increment + (Math.random() * 2 - 1), 100);
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Synchronize phrases with progress
  useEffect(() => {
    const currentPhase = Math.floor((progress / 100) * loadingPhrases.length);
    if (currentPhase < loadingPhrases.length && currentPhase !== phraseIndex) {
      setPhraseIndex(currentPhase);
    }
  }, [progress, phraseIndex]);

  return (
    <motion.div
      className="fixed inset-0 bg-background z-[9999] flex flex-col items-center justify-center p-6 overflow-hidden"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute inset-0 bg-radial-gradient from-accent/5 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center space-y-16">
        
        {/* Animated HUD / Geometry */}
        <div className="relative w-40 h-40 flex items-center justify-center">
          <motion.div
            className="absolute inset-0 rounded-full border border-primary/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-2 rounded-full border border-t-accent border-r-transparent border-b-primary/30 border-l-transparent"
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-6 rounded-full border-2 border-dashed border-primary/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <h1 className="text-4xl font-black tracking-tighter text-primary">
              V<span className="text-accent">S</span>
            </h1>
          </div>
        </div>

        {/* Text and Bar Container */}
        <div className="w-full space-y-6">
          <div className="flex justify-between items-end text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-secondary/80 h-4">
            <motion.span 
              key={phraseIndex}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="text-accent"
            >
              {loadingPhrases[Math.min(phraseIndex, loadingPhrases.length - 1)]}
            </motion.span>
            <span className="text-primary font-bold tracking-wider">{Math.round(progress)}%</span>
          </div>
          
          {/* Advanced Progress Bar */}
          <div className="relative h-[2px] w-full bg-primary/10 overflow-hidden rounded-full">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-accent"
              style={{ width: `${progress}%` }}
            />
            {/* scanning laser effect */}
            <motion.div
              className="absolute top-0 w-24 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '400%' }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>

      </div>
      
      {/* Footer Status */}
      <motion.div
        className="absolute bottom-10 flex space-x-3 items-center text-[10px] tracking-[0.3em] text-secondary/40 font-mono uppercase"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        <span>System Boot Sequence</span>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
