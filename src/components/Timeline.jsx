import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { GraduationCap, Award, Briefcase, Star, Trophy, ShieldCheck } from 'lucide-react';

const TimelineItem = ({ data, index }) => {
  const isEven = index % 2 === 0;
  const itemRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 0.9, 1]);
  
  // Dynamic styles that work with both themes
  const iconGlow = useTransform(scrollYProgress, [0, 1], ["0px 0px 0px rgba(0,0,0,0)", "0px 0px 20px var(--accent-glow)"]);
  const iconBg = useTransform(scrollYProgress, [0, 1], ["var(--surface)", "var(--accent)"]);

  return (
    <div ref={itemRef} className={`mb-32 flex justify-between items-center w-full ${isEven ? 'flex-row-reverse' : ''}`}>
      <div className="hidden md:block w-5/12"></div>
      
      <motion.div 
        style={{ backgroundColor: iconBg, boxShadow: iconGlow }}
        className="z-20 flex items-center justify-center w-12 h-12 rounded-full border-4 border-background transition-shadow duration-500"
      >
         {data.icon}
      </motion.div>

      <motion.div 
        style={{ opacity, scale }}
        className="w-full md:w-5/12 glass-morphism p-8 rounded-3xl border border-[var(--border)] hover:border-[var(--accent)] transition-all relative group shadow-2xl shadow-accent/5 backdrop-blur-xl"
      >
        {/* Date Tag */}
        <span className="absolute -top-4 right-8 px-4 py-1 bg-[var(--accent)] text-[var(--bg)] text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
          {data.year}
        </span>

        <div className="space-y-4 text-left">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-[0.3em] bg-accent/5 px-3 py-1 rounded-full border border-accent/10">
              {data.type}
            </span>
          </div>
          <h3 className="text-3xl font-black text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors tracking-tighter uppercase leading-none">
            {data.title}
          </h3>
          <p className="text-[var(--text-secondary)] font-bold text-sm tracking-widest uppercase italic">
            {data.subtitle}
          </p>
          <p className="text-[var(--text-secondary)] opacity-80 text-base leading-relaxed">
            {data.details}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const Timeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const timelineData = [
    {
      year: "2023 - 2027",
      title: "B.E. Computer Science and Engineering (IoT)",
      subtitle: "Saveetha Engineering College, Chennai",
      details: "Focusing on AI, ML, and Full Stack development with a CGPA of 8.32/10. Exploring the intersection of IoT and intelligent systems.",
      type: "Education",
      icon: <GraduationCap size={18} className="text-[var(--bg)]" />
    },
    {
      year: "2024",
      title: "Flipkart GRID 6.0 Robotics Challenge",
      subtitle: "Semi Finalist",
      details: "Designed and prototyped an autonomous robot for warehouse automation during this prestigious national-level challenge.",
      type: "Achievement",
      icon: <Trophy size={18} className="text-[var(--bg)]" />
    },
    {
      year: "2024",
      title: "Nasscom Automation Using Agentic AI",
      subtitle: "Finalist",
      details: "Developed intelligent agents for process automation, reaching the finals of this industry-recognized automation challenge.",
      type: "Achievement",
      icon: <Star size={18} className="text-[var(--bg)]" />
    },
    {
      year: "2024",
      title: "NSIC Technical Training Centre",
      subtitle: "Internship",
      details: "Gained hands-on experience in technical training and industrial automation processes at the NSIC facility.",
      type: "Experience",
      icon: <Briefcase size={18} className="text-[var(--bg)]" />
    },
    {
      year: "2024",
      title: "AI and Big Data in IoT Certification",
      subtitle: "Sectorial Course",
      details: "Certified in integrating big data analytics with IoT ecosystems for real-time decision making.",
      type: "Certification",
      icon: <ShieldCheck size={18} className="text-[var(--bg)]" />
    },
    {
      year: "2021 - 2023",
      title: "Higher Secondary School",
      subtitle: "Sree Narayana Mission Senior Secondary School",
      details: "Completed CBSE curriculum with a focus on science and mathematics.",
      type: "Education",
      icon: <GraduationCap size={18} className="text-[var(--bg)]" />
    }
  ];

  return (
    <section id="timeline" className="py-32 relative bg-[var(--bg)] transition-colors duration-700 overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6">
        <div className="mb-32 text-center space-y-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-black tracking-tighter text-[var(--text-primary)] uppercase"
          >
            My <span className="text-[var(--accent)] underline underline-offset-[12px]">Journey</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[var(--text-secondary)] max-w-2xl mx-auto italic text-lg"
          >
            A chronological voyage through my technical evolution and academic milestones.
          </motion.p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Vertical Line Background */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-[2px] h-full bg-[var(--text-primary)] opacity-5 hidden md:block"></div>
          
          {/* Animated Progress Line */}
          <motion.div 
            style={{ scaleY }}
            className="absolute left-1/2 transform -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-[var(--accent)]/50 to-[var(--accent)] origin-top hidden md:block"
          >
            {/* Glowing Head of the Line */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[var(--accent)] rounded-full blur-[4px] shadow-[0_0_15px_var(--accent-glow)]"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
          </motion.div>

          {/* Timeline Items */}
          <div className="space-y-4">
            {timelineData.map((item, index) => (
              <TimelineItem key={index} data={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
