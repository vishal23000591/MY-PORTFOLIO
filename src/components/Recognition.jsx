import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ShieldCheck, Briefcase, Star, Award, Zap, ChevronRight } from 'lucide-react';

const Recognition = () => {
  const [activeTab, setActiveTab] = useState('achievements');

  const achievements = [
    {
      title: "Flipkart GRID 6.0 Robotics Challenge",
      role: "Semi Finalist",
      icon: <Trophy size={18} />
    },
    {
      title: "Nasscom Automation Using Agentic AI",
      role: "Finalist",
      icon: <Star size={18} />
    }
  ];

  const certifications = [
    {
      title: "AI and Big Data in IoT Certification",
      issuer: "Sectorial Course",
      icon: <Zap size={18} />
    },
    {
      title: "Internship at NSIC",
      issuer: "NSIC Technical Training Centre",
      icon: <Briefcase size={18} />
    },
    {
      title: "Leadership Workshop",
      issuer: "Gidy",
      icon: <Award size={18} />
    }
  ];

  const activeData = activeTab === 'achievements' ? achievements : certifications;

  return (
    <section className="py-20 relative bg-[var(--bg)] transition-colors duration-700">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 space-y-4 md:space-y-0">
          <div>
            <h2 className="text-sm font-mono tracking-[0.3em] text-[var(--accent)] uppercase mb-4">Qualifications</h2>
            <h3 className="text-5xl md:text-7xl font-black tracking-tighter text-[var(--text-primary)] uppercase leading-[0.9]">
              Milestones & <br className="hidden md:block"/> <span className="text-[var(--accent)] underline underline-offset-[12px]">Credentials</span>
            </h3>
          </div>

          {/* Interactive Tabs */}
          <div className="flex p-1 bg-[var(--surface)] border border-[var(--border)] rounded-full backdrop-blur-sm self-start md:self-auto">
            <button
              onClick={() => setActiveTab('achievements')}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                activeTab === 'achievements' 
                  ? 'bg-[var(--accent)] text-[var(--bg)] shadow-[0_0_15px_rgba(var(--accent-rgb),0.3)]' 
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Achievements
            </button>
            <button
              onClick={() => setActiveTab('certifications')}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                activeTab === 'certifications' 
                  ? 'bg-[var(--accent)] text-[var(--bg)] shadow-[0_0_15px_rgba(var(--accent-rgb),0.3)]' 
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Certifications
            </button>
          </div>
        </div>

        {/* Dynamic List Container */}
        <div className="relative border-t border-[var(--border)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeData.map((item, idx) => (
                <div 
                  key={idx}
                  className="group flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-[var(--border)] hover:border-[var(--accent)] transition-colors duration-300 cursor-none relative overflow-hidden"
                >
                  {/* Subtle hover background sweep */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/0 via-[var(--accent)]/5 to-[var(--accent)]/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                  
                  {/* Left Side: Icon & Title */}
                  <div className="flex items-center space-x-6 relative z-10 w-full md:w-2/3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] group-hover:text-[var(--accent)] group-hover:border-[var(--accent)] transition-all duration-300 shadow-sm group-hover:shadow-[0_0_10px_rgba(var(--accent-rgb),0.2)]">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg md:text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-300">
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  {/* Right Side: Issuer/Role */}
                  <div className="flex items-center justify-between md:justify-end mt-4 md:mt-0 w-full md:w-1/3 relative z-10 space-x-4 pl-16 md:pl-0">
                    <span className="text-xs font-mono tracking-widest uppercase text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-300">
                      {item.role || item.issuer}
                    </span>
                    <ChevronRight size={16} className="text-[var(--border)] group-hover:text-[var(--accent)] transform group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default Recognition;
