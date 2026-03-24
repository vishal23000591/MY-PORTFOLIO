import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle2 } from 'lucide-react';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "vishalsuresh1975@gmail.com",
      link: "mailto:vishalsuresh1975@gmail.com",
      description: "Drop a line anytime"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Phone",
      value: "+91 9840924658",
      link: "tel:+919840924658",
      description: "Mon-Fri, 9am-6pm"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Location",
      value: "Chennai, India",
      link: "#",
      description: "Open to remote work"
    }
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Web Development',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (data.success) {
        setIsSent(true);
        setFormData({ name: '', email: '', subject: 'Web Development', message: '' });
        setTimeout(() => setIsSent(false), 5000);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error connecting to the server. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-background transition-colors duration-700">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            
            {/* Left Content: Info & Socials */}
            <div className="space-y-16">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <span className="text-accent font-mono text-sm uppercase tracking-[0.3em] mb-4 block">Get in touch</span>
                  <h2 className="text-6xl font-bold tracking-tighter text-primary leading-tight">
                    Let's build something <br />
                    <span className="text-accent italic">extraordinary</span>.
                  </h2>
                </motion.div>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-secondary text-xl leading-relaxed max-w-md"
                >
                  Whether you have a specific project in mind or just want to explore possibilities, my inbox is always open.
                </motion.p>
              </div>

              <div className="grid grid-cols-1 gap-8">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.link}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="flex items-center space-x-6 group"
                  >
                    <div className="w-16 h-16 rounded-2xl glass-morphism border border-primary/10 flex items-center justify-center text-secondary group-hover:text-accent group-hover:border-accent/40 group-hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.2)] transition-all duration-500">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-accent font-bold mb-1">{item.label}</p>
                      <p className="text-xl font-bold text-primary group-hover:text-accent transition-colors">{item.value}</p>
                      <p className="text-sm text-secondary/60 mt-0.5">{item.description}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              <div className="flex items-center space-x-6 pt-8">
                <p className="text-sm font-bold uppercase tracking-widest text-secondary/40">Follow me</p>
                <div className="h-px w-12 bg-primary/10"></div>
                <div className="flex space-x-4">
                  {[
                    { icon: <Github size={20} />, link: "https://github.com/vishal23000591" },
                    { icon: <Linkedin size={20} />, link: "https://linkedin.com/in/vishal-s-bab6a6301/" }
                  ].map((social, i) => (
                    <motion.a 
                      key={i}
                      href={social.link}
                      whileHover={{ y: -5, scale: 1.1 }}
                      className="w-12 h-12 rounded-xl glass-morphism border border-primary/10 flex items-center justify-center text-secondary hover:text-accent hover:border-accent/30 transition-all"
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Content: Contact Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-accent/5 rounded-[40px] blur-2xl pointer-events-none"></div>
              <div className="glass-morphism rounded-[32px] p-12 border border-primary/10 relative overflow-hidden backdrop-blur-xl shadow-2xl">
                
                <AnimatePresence mode="wait">
                  {!isSent ? (
                    <motion.form 
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      onSubmit={handleSubmit}
                      className="space-y-8"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2 group">
                          <label className="text-xs font-bold uppercase tracking-widest text-secondary/40 ml-1 transition-colors group-focus-within:text-accent">Name</label>
                          <input 
                            required
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            className="w-full bg-[var(--surface)] border border-primary/10 rounded-2xl px-6 py-5 outline-none focus:border-accent/40 focus:bg-accent/[0.07] text-primary transition-all placeholder:text-secondary/40 shadow-inner"
                          />
                        </div>
                        <div className="space-y-2 group">
                          <label className="text-xs font-bold uppercase tracking-widest text-secondary/40 ml-1 transition-colors group-focus-within:text-accent">Email</label>
                          <input 
                            required
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email address"
                            className="w-full bg-[var(--surface)] border border-primary/10 rounded-2xl px-6 py-5 outline-none focus:border-accent/40 focus:bg-accent/[0.07] text-primary transition-all placeholder:text-secondary/40 shadow-inner"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2 group">
                        <label className="text-xs font-bold uppercase tracking-widest text-secondary/40 ml-1 transition-colors group-focus-within:text-accent">Subject</label>
                        <select 
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full bg-[var(--surface)] border border-primary/10 rounded-2xl px-6 py-5 outline-none focus:border-accent/40 focus:bg-accent/[0.07] text-primary transition-all appearance-none cursor-pointer shadow-inner"
                        >
                          <option value="Web Development" className="bg-background text-primary">Web Development</option>
                          <option value="AI/ML Integration" className="bg-background text-primary">AI/ML Integration</option>
                          <option value="Mobile App Development" className="bg-background text-primary">Mobile App Development</option>
                          <option value="UI/UX Design" className="bg-background text-primary">UI/UX Design</option>
                          <option value="Something else" className="bg-background text-primary">Something else</option>
                        </select>
                      </div>

                      <div className="space-y-4 group">
                        <div className="flex justify-between items-end px-1">
                          <label className="text-xs font-bold uppercase tracking-widest text-secondary/40 transition-colors group-focus-within:text-accent">Message</label>
                          <span className="text-[10px] font-mono text-secondary/20">{formData.message.length}/500</span>
                        </div>
                        <div className="relative group/textarea">
                          <textarea 
                            required
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            maxLength={500}
                            placeholder="Tell me about your project or vision..."
                            rows="6"
                            className="w-full bg-[var(--surface)] border border-primary/10 rounded-[24px] px-8 py-6 outline-none focus:border-accent/40 focus:bg-accent/[0.07] text-primary transition-all placeholder:text-secondary/40 resize-none leading-relaxed shadow-inner"
                          ></textarea>
                          {/* Decorative Inner Glow on Focus */}
                          <div className="absolute inset-0 rounded-[24px] pointer-events-none border border-accent/0 group-focus-within/textarea:border-accent/20 transition-all duration-500"></div>
                        </div>
                      </div>
                      
                      <motion.button
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.01, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full py-7 bg-accent text-background font-black rounded-[24px] uppercase tracking-[0.3em] text-xs hover:opacity-90 transition-all shadow-2xl shadow-accent/20 flex items-center justify-center space-x-4 disabled:opacity-50 disabled:cursor-not-allowed group/btn overflow-hidden relative"
                      >
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-shimmer"></div>
                        
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin"></div>
                        ) : (
                          <>
                            <span className="relative z-10">Launch Transmission</span>
                            <Send size={18} className="relative z-10 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                          </>
                        )}
                      </motion.button>
                    </motion.form>
                  ) : (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-20 flex flex-col items-center text-center space-y-6"
                    >
                      <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center text-accent mb-4">
                        <CheckCircle2 size={48} className="animate-bounce" />
                      </div>
                      <h3 className="text-3xl font-bold text-primary">Message Received!</h3>
                      <p className="text-secondary max-w-xs">
                        Thank you for reaching out. I'll get back to you within 24 hours.
                      </p>
                      <button 
                        onClick={() => setIsSent(false)}
                        className="text-accent font-bold uppercase tracking-widest text-xs hover:underline underline-offset-8 mt-4"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
