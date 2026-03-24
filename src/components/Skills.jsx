import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Layout, Smartphone, Database, Terminal, Cpu } from 'lucide-react';

const SkillGauge = ({ name, level, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="group relative flex items-center justify-between p-4 glass-morphism rounded-xl border border-primary/5 hover:border-accent/30 transition-all duration-300"
  >
    <div className="flex flex-col">
      <span className="text-xs font-mono text-secondary/60 uppercase tracking-widest mb-1">{name}</span>
      <div className="flex items-center space-x-2">
        <div className="h-1.5 w-32 md:w-40 bg-primary/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${level}%` }}
            transition={{ duration: 1, delay: delay + 0.2 }}
            className="h-full bg-accent shadow-[0_0_8px_var(--accent-glow)]"
          />
        </div>
        <span className="text-[10px] md:text-xs font-mono text-accent font-bold">{level}%</span>
      </div>
    </div>
    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
      <div className="w-2 h-2 rounded-full bg-accent animate-ping"></div>
    </div>
  </motion.div>
);

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  const categories = [
    {
      id: "ai",
      name: "Intelligence Systems",
      description: "NEURAL NETWORK & FEDERATED LEARNING ARCHITECTURES",
      skills: [
        { name: "Python Core", level: 95 },
        { name: "TensorFlow/PyTorch", level: 88 },
        { name: "YOLO/Computer Vision", level: 92 },
        { name: "NLP Pipelines", level: 85 }
      ]
    },
    {
      id: "software",
      name: "Software Forge",
      description: "SCALABLE FULL-STACK & CLOUD NATIVE SOLUTIONS",
      skills: [
        { name: "React Engineering", level: 90 },
        { name: "Node.js / Express", level: 85 },
        { name: "FastAPI / Flask", level: 88 },
        { name: "Distributed Systems", level: 82 }
      ]
    },
    {
      id: "architecture",
      name: "Data & Systems",
      description: "DATABASE DESIGN & CLOUD INFRASTRUCTURE",
      skills: [
        { name: "SQL / NoSQL", level: 84 },
        { name: "REST / gRPC APIs", level: 86 },
        { name: "IoT Integration", level: 80 },
        { name: "Security Architecture", level: 78 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-32 relative overflow-hidden bg-background">
      {/* Background HUD elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--accent)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Header HUD */}
          <div className="flex flex-col md:flex-row items-center justify-between border-b border-primary/10 pb-12 gap-8">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-[10px] font-mono text-accent uppercase tracking-[0.5em] animate-pulse">System Diagnostic: Active</span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
                Technical <br /> <span className="text-accent underline decoration-accent/20 decoration-8 underline-offset-8">Arsenal</span>
              </h2>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((cat, idx) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(idx)}
                  className={`px-8 py-3 rounded-full text-xs md:text-sm font-mono uppercase tracking-widest border transition-all duration-500 font-bold ${
                    activeCategory === idx 
                      ? 'bg-accent/10 border-accent text-accent shadow-[0_0_15px_var(--accent-glow)] scale-105' 
                      : 'border-primary/10 text-secondary hover:border-accent/40'
                  }`}
                >
                  [{cat.id}]
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            {/* Left: Intelligence Monitor */}
            <div className="md:col-span-5 space-y-8">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-1 h-8 bg-accent"></div>
                  <h3 className="text-2xl font-bold tracking-tight uppercase">{categories[activeCategory].name}</h3>
                </div>
                <p className="text-[10px] font-mono text-secondary/60 leading-relaxed tracking-widest leading-6">
                  {categories[activeCategory].description}
                </p>
              </motion.div>

              <div className="space-y-3">
                {categories[activeCategory].skills.map((skill, idx) => (
                  <SkillGauge key={skill.name} name={skill.name} level={skill.level} delay={idx * 0.1} />
                ))}
              </div>
            </div>

            {/* Right: Technical HUD Scanner */}
            <div className="md:col-span-7 flex justify-center items-center">
              <div className="relative w-64 h-64 md:w-96 md:h-96">
                {/* Rotating Rings */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-dashed border-accent/20 rounded-full"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-4 border border-dashed border-primary/20 rounded-full"
                />
                
                {/* Central Scanner */}
                <div className="absolute inset-0 flex items-center justify-center p-12">
                  <div className="relative w-full h-full rounded-full border border-accent/10 glass-morphism flex items-center justify-center overflow-hidden">
                    <motion.div 
                      key={activeCategory}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center px-4 space-y-1"
                    >
                      <Terminal size={32} className="mx-auto text-accent/40 mb-2 md:mb-4" />
                      <div className="font-mono text-[7px] md:text-[8px] text-secondary/40 uppercase tracking-[0.4em]">Data Integrity</div>
                      <div className="text-sm md:text-lg font-black text-primary uppercase tracking-tighter leading-tight max-w-[150px] md:max-w-[200px] mx-auto">
                        {categories[activeCategory].id}_STATUS
                      </div>
                    </motion.div>
                    
                    {/* Scanning Line */}
                    <motion.div 
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 w-full h-[1px] bg-accent shadow-[0_0_15px_var(--accent-glow)] z-20"
                    />
                  </div>
                </div>

                {/* Floating Skill Bubbles */}
                {categories[activeCategory].skills.map((skill, idx) => {
                  const angles = [45, 135, 225, 315];
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.2 }}
                      className="absolute w-8 h-8 flex items-center justify-center"
                      style={{
                        top: `calc(50% + ${Math.sin(angles[idx] * (Math.PI / 180)) * 140}px)`,
                        left: `calc(50% + ${Math.cos(angles[idx] * (Math.PI / 180)) * 140}px)`,
                      }}
                    >
                      <div className="w-full h-full glass-morphism rounded-full border border-accent/20 flex items-center justify-center relative group">
                        <Cpu size={16} className="text-accent group-hover:animate-spin" />
                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[10px] md:text-xs font-mono font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest text-accent bg-black/80 px-2 py-1 rounded">
                          {skill.name}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* System Footer Stats */}
          <div className="pt-12 border-t border-primary/5 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Stability", val: "99.9%" },
              { label: "Efficiency", val: "88.4%" },
              { label: "Optimization", val: "High" },
              { label: "Uptime", val: "∞" }
            ].map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <span className="text-[10px] md:text-xs font-mono text-secondary/40 uppercase tracking-widest font-bold">{stat.label}</span>
                <div className="text-xl md:text-3xl font-black text-primary tracking-tighter">{stat.val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
