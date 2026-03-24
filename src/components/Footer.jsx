import React from 'react';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

const Footer = () => {
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
          
          <div className="flex space-x-6">
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
          
          <div className="text-[10px] text-secondary/20 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Vishal S. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
