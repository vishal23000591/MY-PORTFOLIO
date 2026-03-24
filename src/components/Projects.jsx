import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Monitor, Zap, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import skyauraImg from '../assets/skyaura.png';

const Projects = () => {


  const projects = [
    {
      title: "Reva AI",
      description: "Federated AI Framework for Intelligent Recruitment & Document Authentication",
      tech: ["React", "Python", "NLP", "Flask", "Tailwind"],
      links: {
        live: "#",
        github: "#"
      },
      icon: <Monitor className="text-accent" />,
      id: "reva-ai"
    },
    {
      title: "Reva AI Authenticator",
      description: "A secure 6-digit OTP code generator for two-factor authentication (2FA) across the Reva AI ecosystem.",
      tech: ["React", "Express.js", "Node.js", "Tailwind CSS"],
      links: {
        live: "https://reva-ai-authenticator-frontend.onrender.com",
        github: "#"
      },
      icon: <Monitor className="text-accent" />,
      id: "reva-ai-authenticator"
    },
    {
      title: "E-commerce Product Quality Detection",
      description: "Detects expiry, freshness, and quantity using OCR and Computer Vision (YOLO).",
      tech: ["YOLO", "PyTorch", "OCR", "Python", "FastAPI"],
      links: {
        live: "#",
        github: "#"
      },
      icon: <Zap className="text-accent" />,
      id: "ecommerce-product-quality-detection"
    },
    {
      title: "Healthcare ML System",
      description: "Predicts healthcare outcomes and assists patient care decisions using neural networks.",
      tech: ["Python", "TensorFlow", "Pandas", "NumPy"],
      links: {
        live: "#",
        github: "#"
      },
      icon: <Monitor className="text-accent" />,
      id: "healthcare-ml-system"
    },
    {
      title: "SkyAura Airways",
      description: "Full-stack flight booking system with admin analytics dashboard and authentication.",
      tech: ["React", "Node.js", "MongoDB", "Express.js"],
      links: {
        live: "https://skyaura-airways-e0iy.onrender.com",
        github: "#"
      },
      icon: <Monitor className="text-accent" />,
      id: "skyaura-airways"
    },
    {
      title: "Anemia AI Detection System",
      description: "Predicts hemoglobin levels and anemia risk using clinical parameters and deep learning.",
      tech: ["TensorFlow", "FastAPI", "Python", "ML"],
      links: {
        live: "#",
        github: "#"
      },
      icon: <Zap className="text-accent" />,
      id: "anemia-ai-detection-system"
    }
  ];

  return (
    <section id="projects" className="py-24 relative bg-background transition-colors duration-700">
      <div className="container mx-auto px-6">
        <div className="space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-primary uppercase">Featured <span className="text-accent">Projects</span></h2>
              <p className="text-secondary max-w-xl">
                A selection of high-impact projects combining intelligent systems with modern web technologies.
              </p>
            </div>
            <div className="flex items-center space-x-4 text-xs font-mono uppercase tracking-[0.2em] text-secondary">
              <span className="w-12 h-[1px] bg-secondary/30"></span>
              <span>SCROLL TO EXPLORE</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-32">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 50 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}
              >
                {/* Project Image/Visual */}
                <div className="w-full md:w-3/5 aspect-video relative group overflow-hidden rounded-3xl border border-primary/10">
                  <div className={`absolute inset-0 ${project.id === 'skyaura-airways' ? 'hidden' : 'bg-accent/10 group-hover:bg-transparent'} transition-colors duration-700 z-10`}></div>
                  
                  {/* Background Image / Visual */}
                  <div className="w-full h-full bg-surface relative flex items-center justify-center transform group-hover:scale-110 transition-transform duration-1000">
                    {project.id === 'skyaura-airways' ? (
                      <a 
                        href={project.links.live} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="absolute inset-0 z-30 block w-full h-full"
                      >
                        <img 
                          src={skyauraImg} 
                          alt={project.title}
                          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                        />
                      </a>
                    ) : (
                      <span className="text-6xl font-black text-primary/10 uppercase tracking-tighter">{project.title}</span>
                    )}
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20 bg-gradient-to-t from-background to-transparent">
                    <div className="flex space-x-4">
                      <a href={project.links.github} className="p-3 bg-primary text-background rounded-full hover:bg-accent transition-colors">
                        <Github size={20} />
                      </a>
                      <a 
                        href={project.links.live} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="p-3 bg-primary text-background rounded-full hover:bg-accent transition-colors"
                      >
                        <ExternalLink size={20} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="w-full md:w-2/5 space-y-6">
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] bg-accent/5 px-3 py-1 rounded-full">{project.tech.join(' • ')}</span>
                    <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-primary leading-none uppercase">{project.title}</h3>
                  </div>
                  
                  <p className="text-secondary/80 leading-relaxed text-lg font-medium">
                    {project.description}
                  </p>

                  <div className="pt-4">
                    <Link 
                      to={`/project/${project.id}`}
                      className="group/link flex items-center space-x-2 text-primary/80 hover:text-accent transition-colors text-sm font-bold uppercase tracking-widest"
                    >
                      <span>Explore Project</span>
                      <ArrowUpRight size={16} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
