import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="p-2.5 rounded-full border border-primary/10 glass-morphism text-secondary hover:text-accent hover:border-accent/30 transition-all flex items-center justify-center relative overflow-hidden"
      aria-label="Toggle Theme"
    >
      <motion.div
        initial={false}
        animate={{ 
          y: theme === 'dark' ? 0 : 40,
          opacity: theme === 'dark' ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <Moon size={18} />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ 
          y: theme === 'light' ? 0 : -40,
          opacity: theme === 'light' ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Sun size={18} />
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
