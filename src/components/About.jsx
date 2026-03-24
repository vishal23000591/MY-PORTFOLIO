import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen, MapPin } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-background transition-colors duration-700">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto space-y-20">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              className="md:col-span-4"
            >
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-primary uppercase">About <span className="text-accent">Me</span></h2>
              <div className="mt-4 flex flex-col space-y-2 text-secondary text-xs font-mono uppercase tracking-widest">
                <div className="flex items-center space-x-2">
                  <MapPin size={12} className="text-accent" />
                  <span>Chennai, India</span>
                </div>
                <div className="flex items-center space-x-2">
                  <GraduationCap size={12} className="text-accent" />
                  <span>Saveetha Engineering College</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:col-span-8 space-y-6 text-secondary leading-relaxed text-lg font-medium opacity-90"
            >
              <p>
                Performance-driven and self-motivated 3rd Year B.E. student in Computer Science and Engineering (IoT) at Saveetha Engineering College.
              </p>
              <p>
                Passionate about AI, ML, Full Stack, and IoT. I am focused on building impactful tech solutions that can positively impact the overall goals of an organization.
              </p>
              <p>
                Seeking a position in a technical role where I can apply my technical and analytical skills to enrich my skills, especially in areas of machine learning and data science.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
