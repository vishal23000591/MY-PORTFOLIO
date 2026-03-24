import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Home, Code, Briefcase, Mail, Moon, Sun, Download, Command } from 'lucide-react';
import resumePDF from '../assets/Vishal_S_Resume-5.pdf';

const CommandPalette = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    } else {
      setSearch('');
    }
  }, [isOpen]);

  const handleScrollTo = (id) => {
    setIsOpen(false);
    if (!id) {
       window.scrollTo({ top: 0, behavior: 'smooth' });
       return;
    }
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('vishalsuresh1975@gmail.com');
    setIsOpen(false);
    // Optional: could add a toast here
  };

  const commands = [
    { id: '1', icon: <Home size={18} />, title: 'Go to Home', action: () => handleScrollTo('') },
    { id: '2', icon: <Code size={18} />, title: 'Go to Skills', action: () => handleScrollTo('skills') },
    { id: '3', icon: <Briefcase size={18} />, title: 'Go to Projects', action: () => handleScrollTo('projects') },
    { id: '4', icon: <Mail size={18} />, title: 'Contact Me', action: () => handleScrollTo('contact') },
    { id: '5', icon: theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />, title: 'Toggle Theme', action: () => { toggleTheme(); setIsOpen(false); } },
    { id: '6', icon: <Mail size={18} />, title: 'Copy Email Address', action: copyEmail },
    { id: '7', icon: <Download size={18} />, title: 'View/Download Resume', action: () => { window.open(resumePDF, '_blank'); setIsOpen(false); } }
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 font-sans">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full max-w-2xl bg-background border border-primary/20 rounded-2xl shadow-2xl relative z-10 overflow-hidden"
            style={{ boxShadow: '0 0 40px rgba(var(--accent-rgb), 0.15)' }}
          >
            <div className="flex items-center px-4 py-4 border-b border-primary/10 space-x-3">
              <Search className="text-accent" size={22} />
              <input
                ref={inputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent border-none text-primary placeholder:text-secondary/40 focus:outline-none focus:ring-0 text-lg"
              />
              <div className="text-[10px] font-mono text-secondary/60 border border-primary/20 px-2 py-1 rounded bg-primary/5 uppercase tracking-widest cursor-pointer hover:bg-primary/10 transition-colors" onClick={() => setIsOpen(false)}>
                ESC
              </div>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-2 scrollbar-none">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd) => (
                  <motion.button
                    key={cmd.id}
                    onClick={cmd.action}
                    whileHover={{ scale: 1.01, backgroundColor: "var(--accent-glow)" }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full flex items-center space-x-4 px-4 py-3 rounded-xl text-left transition-colors group"
                  >
                    <div className="text-secondary/50 group-hover:text-accent transition-colors flex items-center justify-center p-2 rounded-lg bg-primary/5 group-hover:bg-background">
                      {cmd.icon}
                    </div>
                    <span className="text-primary font-medium group-hover:text-accent transition-colors text-sm">
                      {cmd.title}
                    </span>
                  </motion.button>
                ))
              ) : (
                <div className="py-12 text-center text-secondary/50 text-sm">
                  No results found for "<span className="text-primary italic">{search}</span>"
                </div>
              )}
            </div>
            <div className="bg-primary/5 px-4 py-3 border-t border-primary/10 flex items-center justify-between text-[10px] text-secondary/50 uppercase tracking-widest font-bold">
              <div className="flex items-center space-x-2">
                <span>Navigate</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center bg-background border border-primary/10 px-1.5 py-0.5 rounded shadow-sm">
                   <Command size={10} className="mr-1" /> K
                </div>
                <span>to close</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
