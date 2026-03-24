import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Activity } from 'lucide-react';

const Footer = () => {
  const [views, setViews] = useState('...');

  useEffect(() => {
    fetch('https://api.counterapi.dev/v1/vishalportfolio/visits/up')
      .then(res => res.json())
      .then(data => setViews(data.count))
      .catch(() => setViews('1.2K+')); // Fallback text
  }, []);
  return (
    <footer className="py-12 border-t border-primary/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="flex flex-col items-center md:items-start space-y-2">
            <h2 className="text-lg font-bold tracking-tighter text-primary">
              VISHAL <span className="text-accent">S</span>
            </h2>
            <p className="text-xs text-secondary uppercase tracking-[0.2em]">
              Building the future of intelligent systems.
            </p>
          </div>
          
          <div className="flex space-x-6 pb-6 md:pb-0">
            <a href="https://github.com/vishal23000591" target="_blank" rel="noreferrer" className="text-secondary/50 hover:text-accent transition-colors">
              <Github size={18} />
            </a>
            <a href="https://linkedin.com/in/vishal-s-bab6a6301/" target="_blank" rel="noreferrer" className="text-secondary/50 hover:text-accent transition-colors">
              <Linkedin size={18} />
            </a>
            <a href="mailto:vishalsuresh1975@gmail.com" className="text-secondary/50 hover:text-accent transition-colors">
              <Mail size={18} />
            </a>
          </div>
          
          <div className="flex flex-col items-center md:items-end space-y-4">
             {/* Live View Counter */}
             <div className="flex items-center space-x-3 bg-accent/5 border border-accent/20 px-5 py-2 rounded-full shadow-[0_0_15px_rgba(var(--accent-rgb),0.1)] group hover:bg-accent/10 transition-all cursor-default">
                <div className="relative flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-accent absolute animate-ping"></div>
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                </div>
                <span className="text-[10px] font-bold text-accent tracking-[0.2em] uppercase flex items-center">
                  <Activity size={12} className="mr-1.5" />
                  {views} <span className="text-secondary/50 ml-1">Profile Views</span>
                </span>
             </div>

             <div className="text-[10px] text-secondary/30 uppercase tracking-widest font-bold">
               &copy; {new Date().getFullYear()} Vishal S. All rights reserved.
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
