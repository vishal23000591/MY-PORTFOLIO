import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';

const Navbar = ({ themeToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'py-4' : 'py-8'
      }`}
    >
      {/* Isolated Background Layer to prevent Webkit backdrop-filter white glitches */}
      <div 
        className={`absolute inset-0 w-full h-full glass-morphism border-b border-primary/10 transition-opacity duration-300 ${
          scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />
      <div className="container mx-auto px-6 flex justify-between items-center relative z-10">
        <motion.a 
          href="#" 
          className="text-xl font-bold tracking-tighter"
          whileHover={{ scale: 1.05 }}
        >
          VISHAL <span className="text-accent underline underline-offset-4">S</span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-secondary hover:text-accent transition-colors tracking-widest uppercase"
            >
              {link.name}
            </a>
          ))}
          
          <div className="flex items-center space-x-4 border-l border-primary/10 pl-8">
            {themeToggle}
            <motion.a
              href="/resume.pdf"
              className="px-5 py-2 border border-accent/30 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-black transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Resume
            </motion.a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-[var(--text-primary)]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-primary/10"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-lg font-medium text-secondary uppercase tracking-widest"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 flex space-x-4">
                <Github size={20} className="text-secondary/60 hover:text-accent" />
                <Linkedin size={20} className="text-secondary/60 hover:text-accent" />
                <Mail size={20} className="text-secondary/60 hover:text-accent" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
