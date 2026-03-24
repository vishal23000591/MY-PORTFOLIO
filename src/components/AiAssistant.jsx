import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';

const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm the Reva AI Assistant. Ask me anything about Vishal's work, skills, or projects!", isBot: true }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const responses = {
    greeting: "Hello! I'm Reva, Vishal's AI assistant. I'm here to help you navigate his portfolio. What would you like to know?",
    identity: "I am Reva, a custom-built AI personal assistant designed to showcase Vishal's skills in AI and web development.",
    mood: "I'm functioning at peak efficiency! Ready to answer your questions about Vishal's work.",
    location: "Vishal is based in Chennai, India, but he's always open to collaborating on global projects!",
    skills: "Vishal is proficient in Python, JavaScript (React/Node.js), C, Java, and MySQL. He also works with AI frameworks like TensorFlow and PyTorch.",
    python: "Python is one of Vishal's core languages. He uses it for AI/ML development, Flask/FastAPI backends, and data science projects.",
    react: "Vishal uses React for building premium web interfaces like this portfolio! He's also skilled in Tailwind CSS and Framer Motion.",
    node: "Vishal uses Node.js and Express for backend development, especially for scalable REST APIs and real-time systems.",
    ml: "Vishal has extensive experience with ML and Deep Learning, using tools like TensorFlow (for Anemia detection), PyTorch (for YOLO-based quality detection), and Scikit-learn.",
    yolo: "Vishal integrated YOLO (You Only Look Once) in his E-commerce Product Quality project for real-time object detection and freshness assessment.",
    projects: "Vishal has several featured projects: Reva AI, E-commerce Product Quality Detection, Healthcare ML System, SkyAura Airways, and Anemia AI Detection. Which one should I detail further?",
    
    // Detailed Projects
    reva: "Reva AI is a Federated AI Framework for recruitment and document authentication. It unifies NLP and Computer Vision for high-accuracy talent assessment. Check it out at: /project/reva-ai",
    revaStack: "The tech stack for Reva AI includes: React, Python (Flask), NLP libraries, and Tailwind CSS for the interface.",
    
    ecommerce: "The E-commerce Quality Detection project uses YOLO and OCR to detect product expiry, freshness, and quantity automatically. Built for smart retail. Explore more: /project/ecommerce-product-quality-detection",
    ecommerceStack: "The tech stack for E-commerce Quality Detection includes: YOLO (Object Detection), PyTorch, Tesseract OCR, Python, and FastAPI.",
    
    healthcare: "The Healthcare ML System is a neural network-based platform that predicts patient outcomes and assists in clinical decisions. Learn more: /project/healthcare-ml-system",
    healthcareStack: "The tech stack for the Healthcare ML System includes: Python, TensorFlow/Keras, Pandas (Data processing), and NumPy.",
    
    skyaura: "SkyAura Airways is a flight booking system with real-time seat selection and admin analytics. Live link: https://skyaura-airways-e0iy.onrender.com | Explore: /project/skyaura-airways",
    skyauraStack: "The tech stack for SkyAura Airways includes: React (Frontend), Node.js/Express (Backend), and MongoDB (Database).",
    
    anemia: "The Anemia AI Detection System uses clinical parameters and deep learning to predict hemoglobin levels and health risks. Details: /project/anemia-ai-detection-system",
    anemiaStack: "The tech stack for Anemia AI Detection includes: TensorFlow (ML), FastAPI (API), Python, and Scikit-learn.",
    
    education: "Vishal is currently pursuing a B.E. in Computer Science and Engineering (IoT) at Saveetha Engineering College (3rd Year). His CGPA is 8.32/10.",
    achievements: "Some of Vishal's key achievements include being a Semi Finalist in Flipkart GRID 6.0 Robotics and a Finalist in Nasscom Automation (Agentic AI).",
    contact: "You can reach Vishal via email or through the social links in the Contact section at the bottom of the page!",
    internship: "Vishal has interned at the NSIC Technical Training Centre and is always looking for new opportunities in AI, ML, or technical roles.",
    availability: "Vishal is currently open to internships and freelance technical projects. Feel free to reach out via his social handles!",
    default: "I'm not exactly sure about that, but I can tell you about Vishal's skills, projects, or education! Try asking about 'Reva AI' or 'Python'."
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = { id: Date.now(), text: inputValue, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const lowerInput = inputValue.toLowerCase();
      let reply = responses.default;

      if (lowerInput.match(/^(hi|hello|hey|hola|greetings|morning|afternoon|evening)/)) reply = responses.greeting;
      else if (lowerInput.includes("who are you") || lowerInput.includes("your name") || lowerInput.includes("what are you")) reply = responses.identity;
      else if (lowerInput.includes("how are you") || lowerInput.includes("how is it going")) reply = responses.mood;
      else if (lowerInput.includes("where") && (lowerInput.includes("from") || lowerInput.includes("live") || lowerInput.includes("location"))) reply = responses.location;
      else if (lowerInput.includes("skill") || lowerInput.includes("tech") || lowerInput.includes("arsenal")) reply = responses.skills;
      else if (lowerInput.includes("python")) reply = responses.python;
      else if (lowerInput.includes("react")) reply = responses.react;
      else if (lowerInput.includes("node")) reply = responses.node;
      else if (lowerInput.includes("yolo") || lowerInput.includes("ocr") || lowerInput.includes("computer vision")) reply = responses.yolo;
      else if (lowerInput.includes("machine learning") || lowerInput.includes(" ml") || lowerInput.includes("deep learning") || lowerInput.includes("ai ")) reply = responses.ml;
      
      // Project Stack Logic
      else if ((lowerInput.includes("stack") || lowerInput.includes("use") || lowerInput.includes("build") || lowerInput.includes("technology")) && lowerInput.includes("reva")) reply = responses.revaStack;
      else if ((lowerInput.includes("stack") || lowerInput.includes("use") || lowerInput.includes("build") || lowerInput.includes("technology")) && lowerInput.includes("ecommerce")) reply = responses.ecommerceStack;
      else if ((lowerInput.includes("stack") || lowerInput.includes("use") || lowerInput.includes("build") || lowerInput.includes("technology")) && lowerInput.includes("healthcare")) reply = responses.healthcareStack;
      else if ((lowerInput.includes("stack") || lowerInput.includes("use") || lowerInput.includes("build") || lowerInput.includes("technology")) && lowerInput.includes("skyaura")) reply = responses.skyauraStack;
      else if ((lowerInput.includes("stack") || lowerInput.includes("use") || lowerInput.includes("build") || lowerInput.includes("technology")) && lowerInput.includes("anemia")) reply = responses.anemiaStack;
      
      // Project Basic Logic
      else if (lowerInput.includes("skyaura") || lowerInput.includes("flight") || lowerInput.includes("booking")) reply = responses.skyaura;
      else if (lowerInput.includes("reva")) reply = responses.reva;
      else if (lowerInput.includes("ecommerce") || lowerInput.includes("quality") || lowerInput.includes("freshness") || lowerInput.includes("expiry")) reply = responses.ecommerce;
      else if (lowerInput.includes("healthcare") || lowerInput.includes("patient") || lowerInput.includes("clinical")) reply = responses.healthcare;
      else if (lowerInput.includes("anemia") || lowerInput.includes("hemoglobin")) reply = responses.anemia;
      else if (lowerInput.includes("project") || lowerInput.includes("work")) reply = responses.projects;
      
      else if (lowerInput.includes("education") || lowerInput.includes("study") || lowerInput.includes("college") || lowerInput.includes("school") || lowerInput.includes("cgpa")) reply = responses.education;
      else if (lowerInput.includes("achievement") || lowerInput.includes("win") || lowerInput.includes("award") || lowerInput.includes("grid") || lowerInput.includes("nasscom")) reply = responses.achievements;
      else if (lowerInput.includes("contact") || lowerInput.includes("email") || lowerInput.includes("reach") || lowerInput.includes("message")) reply = responses.contact;
      else if (lowerInput.includes("intern") || lowerInput.includes("job") || lowerInput.includes("hire") || lowerInput.includes("opportunity") || lowerInput.includes("available")) reply = responses.availability;

      const botMessage = { id: Date.now() + 1, text: reply, isBot: true };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-[100] w-14 h-14 bg-[var(--accent)] text-[var(--bg)] rounded-full flex items-center justify-center shadow-[0_0_20px_var(--accent-glow)] group transition-all"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }}>
              <MessageSquare size={24} />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Pulsing Aura */}
        <div className="absolute inset-0 rounded-full border-2 border-[var(--accent)] animate-ping opacity-20 pointer-events-none"></div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: 50, scale: 0.9, x: 20 }}
            className="fixed bottom-28 right-8 z-[100] w-[350px] md:w-[400px] h-[500px] glass-morphism rounded-3xl border border-[var(--border)] shadow-2xl overflow-hidden flex flex-col backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-[var(--accent)]/20 to-transparent border-b border-[var(--border)] flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent)] flex items-center justify-center text-[var(--bg)] shadow-lg shadow-accent/20">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-bold text-[var(--text-primary)] leading-none italic uppercase tracking-widest text-sm">Reva Assistant</h3>
                <p className="text-[var(--text-secondary)] text-[10px] uppercase tracking-widest mt-1 mt-1 block h-3 overflow-hidden">
                   <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }}>Online & Active</motion.span>
                </p>
              </div>
            </div>

            {/* Messages Area */}
            <div 
              data-lenis-prevent 
              className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar"
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${
                    msg.isBot 
                      ? 'bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)] rounded-tl-none' 
                      : 'bg-[var(--accent)] text-[var(--bg)] font-bold rounded-tr-none shadow-lg shadow-accent/10'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[var(--surface)] p-4 rounded-2xl rounded-tl-none border border-[var(--border)]">
                    <div className="flex space-x-1">
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full" />
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full" />
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-[var(--border)] bg-[var(--bg)]/50">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about skills, projects..."
                  className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-full py-3 pl-5 pr-12 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]/50 transition-colors placeholder:text-[var(--text-secondary)]/50"
                />
                <button
                  onClick={handleSend}
                  className="absolute right-2 p-2 bg-[var(--accent)] text-[var(--bg)] rounded-full hover:scale-105 transition-transform"
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="text-[8px] text-center text-[var(--text-secondary)] mt-3 uppercase tracking-widest opacity-50">
                Powered by Reva AI Logic
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiAssistant;
