import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Code, Cpu, LineChart, Network, Zap, Database, Eye } from 'lucide-react';

const Interests = () => {
  const interests = [
    { name: "Machine Learning", icon: <Brain size={24} /> },
    { name: "Full Stack", icon: <Code size={24} /> },
    { name: "Deep Learning", icon: <Network size={24} /> },
    { name: "IoT", icon: <Cpu size={24} /> },
    { name: "Computer Vision", icon: <Eye size={24} /> },
    { name: "NLP", icon: <Database size={24} /> },
    { name: "Data Analytics", icon: <LineChart size={24} /> },
    { name: "Cloud Computing", icon: <Zap size={24} /> }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-[var(--bg)] transition-colors duration-700 font-sans min-h-[900px] flex flex-col justify-center">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent)]/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Header */}
      <div className="relative z-20 text-center px-6 mb-32 md:mb-48">
        <h2 className="text-sm font-mono tracking-[0.3em] text-[var(--accent)] uppercase mb-4">Focus Areas</h2>
        <h3 className="text-5xl md:text-7xl font-black tracking-tighter text-[var(--text-primary)] uppercase leading-none">
          Personal <br className="md:hidden" />
          <span className="text-[var(--accent)] underline underline-offset-[12px]">Interests</span>
        </h3>
        <p className="text-[var(--text-secondary)] max-w-2xl mx-auto mt-10 italic text-lg font-medium">
          The technological domains that fuel my curiosity and anchor my development universe.
        </p>
      </div>

      <div className="container mx-auto px-6 relative z-10 flex justify-center items-center">
        
        {/* Orbital System Container */}
        <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] flex justify-center items-center">
          
          {/* Central Core */}
          <div className="absolute w-32 h-32 md:w-40 md:h-40 rounded-full bg-[var(--surface)] border border-[var(--accent)]/30 flex items-center justify-center z-20 shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-xl group cursor-none">
            <div className="text-center space-y-2 group-hover:scale-110 transition-transform duration-500">
              <Brain size={40} className="mx-auto text-[var(--accent)]" />
              <p className="font-bold text-[var(--text-primary)] uppercase tracking-widest text-[10px] md:text-xs">Intelligence Core</p>
            </div>
            {/* Core Pulse */}
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full border border-[var(--accent)]"
            />
          </div>

          {/* Orbit Track Rings */}
          <div className="absolute inset-0 rounded-full border border-[var(--border)] border-dashed"></div>
          <div className="absolute -inset-8 md:-inset-16 rounded-full border border-[var(--accent)]/20"></div>
          <div className="absolute inset-12 md:inset-20 rounded-full border border-[var(--border)]"></div>

          {/* Orbiting Nodes Wrapper */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 z-30"
          >
            {interests.map((item, index) => {
              const angle = (index / interests.length) * 360;
              const rad = angle * (Math.PI / 180);
              
              // Positioning elements on the border of the 100% width/height container
              const x = 50 + 50 * Math.cos(rad);
              const y = 50 + 50 * Math.sin(rad);

              return (
                <div 
                  key={index}
                  className="absolute w-0 h-0 flex items-center justify-center group"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  {/* The Counter-Rotator keeps the icon pointing perfectly upright */}
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="relative flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2"
                  >
                    {/* Floating Node */}
                    <motion.div 
                      whileHover={{ scale: 1.2 }}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[var(--surface)] backdrop-blur-md border border-[var(--border)] flex items-center justify-center text-[var(--accent)] hover:text-[var(--bg)] hover:bg-[var(--accent)] hover:border-[var(--accent)] shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-none relative z-10"
                    >
                      {item.icon}
                    </motion.div>
                    
                    {/* Label Tooltip */}
                    <div className="absolute -bottom-12 md:-bottom-14 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                      <div className="bg-[var(--bg)] border border-[var(--accent)]/30 px-4 py-2 rounded-full shadow-lg shadow-black/50">
                        <span className="text-[10px] md:text-xs font-bold text-[var(--accent)] uppercase tracking-widest whitespace-nowrap">
                          {item.name}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Interests;
