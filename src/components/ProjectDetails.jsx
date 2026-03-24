import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Code2, Layers, Cpu, Zap, ArrowUpRight } from 'lucide-react';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mock project data (ideally this would be in a separate data file)
  const projects = {
    "reva-ai": {
      title: "Reva AI",
      subtitle: "Federated AI Framework for Intelligent Recruitment & Document Authentication",
      category: "AI / Recruitment / Security",
      description: "A comprehensive AI-powered recruitment, assessment, and verification ecosystem designed to automate and optimize candidate evaluation, document authentication, and interview processes.",
      longDescription: "Reva AI integrates multiple intelligent microservices into a federated and tamper-resistant architecture, ensuring privacy, accuracy, and scalability. It unifies NLP, Computer Vision, and Machine Learning to provide a holistic approach to talent assessment and document validation.",
      tech: ["React.js", "Tailwind CSS", "Next.js", "Flask", "FastAPI", "Node.js", "Python", "TensorFlow", "DocTR OCR", "MongoDB", "PostgreSQL"],
      innovations: [
        "Federated AI Framework — Decentralized learning and verification",
        "DocTR OCR Excellence — High-accuracy text extraction",
        "Real-Time AI Interviews — Context-driven questioning",
        "Smart Skill Benchmarking — ML-powered industry comparison"
      ],
      modules: [
        { name: "Main Website", desc: "Central access portal", url: "https://reva-ai-k7nm.onrender.com" },
        { name: "Authenticator", desc: "Secure identity verification", url: "https://reva-ai-authenticator-frontend.vercel.app" },
        { name: "Document Verifier", desc: "OCR-based validation", url: "https://bhuvanesh1112006-reva.hf.space" },
        { name: "Resume Builder", desc: "ATS-optimized creation", url: "https://resume-builder-c5o9.onrender.com/builder" },
        { name: "Interview Simulation", desc: "Real-time AI system", url: "https://ai-interview-ib4n.onrender.com" },
        { name: "Skill Gap Analyzer", desc: "ML benchmarking", url: "https://skill-gap-analysis-2-cfuw.onrender.com" },
        { name: "Skill Assessment", desc: "Evaluation platform", url: "https://reva-ai-skill-assessment.onrender.com" }
      ],
      features: [
        "Data Integrity — Federated AI ensures tamper-resistant operations",
        "Hiring Accuracy — Advanced NLP/ML for precise evaluation",
        "Entity Extraction — Automated parsing of PDF/DOCX resumes",
        "ATS Scoring — Keyword recommendations and fit analysis",
        "Multi-factor Auth — JWT and RBAC for secure access"
      ],
      roadmap: [
        "LinkedIn & Job API Integration",
        "Voice & Video Interview Simulation",
        "Blockchain-enabled credential verification",
        "Multilingual document processing"
      ],
      links: { github: "#", live: "https://reva-ai-k7nm.onrender.com" }
    },
    "reva-ai-authenticator": {
      title: "Reva AI Authenticator",
      category: "Security / Authentication",
      description: "A secure 6-digit OTP code generator used for two-factor authentication (2FA) across the Reva AI ecosystem.",
      longDescription: "Reva AI Authenticator acts as the security backbone for login across the Reva AI platforms. It generates time-based or event-based 6-digit security codes that users must enter to authenticate their login attempts on the main Reva AI platforms, adding a robust layer of protection.",
      tech: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "JWT"],
      features: [
        "6-Digit OTP Generation",
        "Two-Factor Authentication (2FA) Integration",
        "Secure Login Code Validation for Reva AI",
        "Responsive Web Interface"
      ],
      links: { github: "#", live: "https://reva-ai-authenticator-frontend.onrender.com" }
    },
    "ecommerce-product-quality-detection": {
      title: "E-commerce Product Quality Detection",
      category: "Computer Vision / ML",
      description: "Automated quality control for e-commerce platforms using deep learning. Detects damages, incorrect labeling, and packaging issues.",
      longDescription: "This system uses CNN-based architectures to analyze product images during the fulfillment process. It's designed to reduce return rates by identifying defective items before they leave the warehouse. The model was trained on a custom dataset of over 50,000 product images across various categories.",
      tech: ["Python", "PyTorch", "FastAPI", "Docker", "AWS"],
      features: [
        "Real-time damage detection",
        "OCR for label verification",
        "Automated reporting dashboard",
        "Integration with warehouse APIs"
      ],
      links: { github: "#", live: "#" }
    },
    "healthcare-ml-system": {
      title: "Healthcare ML System",
      category: "Machine Learning / HealthTech",
      description: "Predictive analytics for early disease detection and hospital resource management.",
      longDescription: "A sophisticated healthcare platform that uses ensemble learning to predict patient outcomes and optimize bed occupancy. It integrates with electronic health records (EHR) to provide doctors with actionable insights and early warning signs for critical conditions.",
      tech: ["Python", "Scikit-Learn", "Flask", "MongoDB", "Redshift"],
      features: [
        "Early warning scoring (EWS)",
        "Resource allocation optimizer",
        "Patient readmission prediction",
        "Anonymized data analysis"
      ],
      links: { github: "#", live: "#" }
    },
    "skyaura-airways": {
      title: "SkyAura Airways",
      category: "Web App / TravelTech",
      description: "A premium flight booking and management system with a focus on user experience and real-time scheduling.",
      longDescription: "SkyAura is a modern flight management engine that handles complex booking logic, real-time seat availability, and dynamic pricing. The frontend showcases a futuristic, minimalist UI designed to provide a premium booking experience across all devices.",
      tech: ["React", "Firebase", "Stripe API", "Framer Motion", "Tailwind"],
      features: [
        "Interactive seat selection",
        "Secure payment processing",
        "Real-time flight status tracking",
        "Premium membership portal"
      ],
      links: { github: "#", live: "https://skyaura-airways-e0iy.onrender.com" }
    },
    "anemia-ai-detection-system": {
      title: "Anemia AI Detection System",
      category: "Computer Vision / Medical AI",
      description: "Non-invasive anemia detection using conjunctival image analysis and deep learning.",
      longDescription: "A groundbreaking medical application that identifies anemia risk by analyzing the color and texture of the eye's conjunctiva. This provides a quick, low-cost screening tool for remote areas with limited access to blood testing facilities.",
      tech: ["TensorFlow Lite", "React Native", "OpenCV", "Firebase"],
      features: [
        "Mobile-first screening tool",
        "Sub-second analysis speed",
        "Offline processing capability",
        "Cloud-synced diagnostic history"
      ],
      links: { github: "#", live: "#" }
    }
  };

  const project = projects[projectId];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-primary">
        <div className="text-center space-y-6">
          <h2 className="text-4xl font-bold italic">Project Not Found</h2>
          <Link to="/" className="text-accent hover:underline flex items-center justify-center space-x-2 pt-4">
            <ArrowLeft size={20} />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 transition-colors duration-700">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto space-y-12"
        >
          {/* Back Navigation */}
          <Link 
            to="/" 
            className="group flex items-center space-x-2 text-secondary hover:text-accent transition-colors w-max"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-mono uppercase tracking-widest font-bold">Back to Transmission</span>
          </Link>

          {/* Header */}
          <div className="space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-mono text-accent uppercase tracking-[0.3em] font-bold">
                {project.category}
              </span>
              <h1 className="text-4xl md:text-7xl font-bold tracking-tighter text-primary">
                {project.title}
              </h1>
              {project.subtitle && (
                <p className="text-xl md:text-2xl text-secondary font-medium italic opacity-80">
                  {project.subtitle}
                </p>
              )}
            </div>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <motion.a 
                href={project.links.github}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-6 py-3 bg-primary/5 hover:bg-primary/10 border border-primary/10 rounded-full text-primary font-bold transition-all"
              >
                <Github size={20} />
                <span>Source Code</span>
              </motion.a>
              <motion.a 
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-6 py-3 bg-accent text-background rounded-full font-bold shadow-lg shadow-accent/20 transition-all"
              >
                <ExternalLink size={20} />
                <span>Live Preview</span>
              </motion.a>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 pt-8 border-t border-primary/5">
            
            {/* Left: Description */}
            <div className="md:col-span-8 space-y-10">
              <section className="space-y-6">
                <h3 className="text-2xl font-bold text-primary flex items-center space-x-3">
                  <Code2 className="text-accent" size={24} />
                  <span>The Project</span>
                </h3>
                <p className="text-secondary leading-relaxed text-lg italic">
                  {project.description}
                </p>
                <p className="text-secondary/70 leading-relaxed">
                  {project.longDescription}
                </p>
              </section>

              {project.modules && (
                <section className="space-y-8">
                  <h3 className="text-2xl font-bold text-primary flex items-center space-x-3 pt-6">
                    <Layers className="text-accent" size={24} />
                    <span>Live Ecosystem</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.modules.map((module, i) => (
                      <a 
                        key={i} 
                        href={module.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-5 glass-morphism rounded-2xl border border-primary/5 hover:border-accent/30 transition-all group flex flex-col space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-primary group-hover:text-accent transition-colors">{module.name}</span>
                          <ExternalLink size={14} className="text-secondary group-hover:text-accent opacity-0 group-hover:opacity-100 transition-all" />
                        </div>
                        <span className="text-xs text-secondary leading-normal">{module.desc}</span>
                      </a>
                    ))}
                  </div>
                </section>
              )}

              {project.innovations && (
                <section className="space-y-6">
                  <h3 className="text-2xl font-bold text-primary flex items-center space-x-3 pt-6">
                    <Zap className="text-accent" size={24} />
                    <span>Key Innovations</span>
                  </h3>
                  <div className="space-y-4">
                    {project.innovations.map((inn, i) => (
                      <div key={i} className="flex items-center space-x-4 p-4 bg-primary/5 rounded-2xl border border-primary/5">
                        <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_rgba(var(--accent-rgb),0.5)]" />
                        <span className="text-sm text-secondary font-medium">{inn}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section className="space-y-6">
                <h3 className="text-2xl font-bold text-primary flex items-center space-x-3 pt-6">
                  <Cpu className="text-accent" size={24} />
                  <span>Core Capabilities</span>
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-3 text-secondary/80">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {project.roadmap && (
                <section className="space-y-6">
                  <h3 className="text-2xl font-bold text-primary flex items-center space-x-3 pt-6">
                    <ArrowUpRight className="text-accent" size={24} />
                    <span>Future Roadmap</span>
                  </h3>
                  <div className="p-8 glass-morphism rounded-3xl border border-accent/20 bg-accent/5">
                    <ul className="space-y-4">
                      {project.roadmap.map((item, i) => (
                        <li key={i} className="flex items-center space-x-4">
                          <span className="text-accent font-mono text-xs">0{i+1}</span>
                          <span className="text-sm text-secondary font-bold tracking-wide italic">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              )}
            </div>

            {/* Right: Tech Stack */}
            <div className="md:col-span-4 space-y-10">
               <div className="glass-morphism rounded-3xl p-8 border border-primary/10 space-y-6">
                  <h3 className="text-xl font-bold text-primary flex items-center space-x-3">
                    <Layers className="text-accent" size={20} />
                    <span>Tech Stack</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, i) => (
                      <span key={i} className="px-3 py-1.5 bg-primary/5 border border-primary/10 rounded-lg text-xs font-mono text-secondary">
                        {t}
                      </span>
                    ))}
                  </div>
               </div>

               <div className="p-8 rounded-3xl bg-accent/5 border border-accent/20 space-y-4">
                  <h4 className="font-bold text-primary text-sm uppercase tracking-widest">Inquiry</h4>
                  <p className="text-sm text-secondary leading-normal">
                    Interested in the technical architecture or want more information about this project? 
                  </p>
                  <Link to="/#contact" className="inline-block text-accent text-sm font-bold underline underline-offset-4">
                    Reach Out
                  </Link>
               </div>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetails;
