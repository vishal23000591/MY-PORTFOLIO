import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import vishalImg from '../assets/vishal.jpg';

const Hero = () => {
  const [text, setText] = useState('');
  const fullText = "AI Developer | Full Stack Developer | ML Engineer";
  const [index, setIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoad(false), 3000);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute inset-0 bg-radial-gradient from-accent/5 via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-accent font-bold tracking-[0.4em] uppercase text-[10px]"
            >
              Welcome to my universe
            </motion.p>
            <h1 className="text-7xl md:text-9xl font-bold tracking-tighter leading-[0.9] text-primary">
              Hi, I'm <br />
              <span className="text-primary hover:text-accent transition-colors duration-500 font-extrabold pb-2 inline-block">Vishal S</span>
            </h1>
          </div>
          
          <div className="h-8">
            <p className="text-xl md:text-2xl text-secondary font-semibold tracking-tight">
              {text}
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-[2px] h-6 bg-accent ml-1"
              />
            </p>
          </div>

          <p className="max-w-md text-secondary leading-relaxed text-sm md:text-lg font-medium opacity-80">
            I build intelligent systems and scalable web applications that solve real-world problems. 
            Currently a 3rd Year Computer Science student focused on AI & IoT.
          </p>

          <div className="flex space-x-4 pt-4">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-primary text-background font-bold rounded-full text-sm uppercase tracking-widest hover:bg-accent hover:text-white transition-colors"
            >
              View Work
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-primary/10 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-primary/5 transition-colors"
            >
              Contact Me
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative group justify-self-center md:justify-self-end"
        >
          <div className="absolute inset-0 bg-accent/20 rounded-full blur-[80px] group-hover:bg-accent/30 transition-all duration-700"></div>
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border border-primary/10 glass-morphism cyan-glow rotate-3 group-hover:rotate-0 transition-transform duration-700">
            <img 
              src={vishalImg} 
              alt="Vishal S" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Soft overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isScrolled ? 0 : 1 }}
        transition={isInitialLoad ? { delay: 2, duration: 1 } : { duration: 0.3 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 pointer-events-none"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-secondary/40 font-medium">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={20} className="text-secondary/40" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
