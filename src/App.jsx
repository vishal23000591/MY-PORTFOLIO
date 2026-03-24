import React, { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { AnimatePresence, motion } from 'framer-motion'
import TargetCursor from './components/TargetCursor'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import MainContent from './components/MainContent'
import ProjectDetails from './components/ProjectDetails'
import ThemeToggle from './components/ThemeToggle'
import AiAssistant from './components/AiAssistant'
import CommandPalette from './components/CommandPalette'

// Scroll reset component for route changes
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  
  return null;
};

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    // Apply theme to body
    document.documentElement.setAttribute('data-theme', theme)
    
    // Update accent glow specifically for JS effects if needed
    const root = document.documentElement;
    if (theme === 'light') {
      root.style.setProperty('--accent-glow', 'rgba(59, 130, 246, 0.2)');
    } else {
      root.style.setProperty('--accent-glow', 'rgba(0, 255, 255, 0.3)');
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <Router>
      <ScrollToTop />
      <main className="min-h-screen bg-background text-primary selection:bg-accent selection:text-black font-sans relative transition-colors duration-700">
        <TargetCursor 
          spinDuration={2}
          hideDefaultCursor
          parallaxOn
          hoverDuration={0.2}
        />
        
        <AnimatePresence mode="wait">
          {isLoading && (
            <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
          )}
        </AnimatePresence>

        {!isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10"
          >
            {/* Subtle Ambient Glow */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
              <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px]"></div>
              <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-accent/5 rounded-full blur-[100px]"></div>
            </div>

            <Navbar themeToggle={<ThemeToggle theme={theme} toggleTheme={toggleTheme} />} />
            
            <Routes>
              <Route path="/" element={<MainContent theme={theme} />} />
              <Route path="/project/:projectId" element={<ProjectDetails theme={theme} />} />
            </Routes>

            <Footer />
            <AiAssistant />
            <CommandPalette theme={theme} toggleTheme={toggleTheme} />
          </motion.div>
        )}
      </main>
    </Router>
  )
}

export default App
