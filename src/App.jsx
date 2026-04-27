import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import GlobalNetwork from './components/GlobalNetwork';
import DisruptionDetection from './components/DisruptionDetection';
import Intelligence from './components/Intelligence';
import Solutions from './components/Solutions';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showSupport, setShowSupport] = useState(false);

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  const triggerOptimization = () => {
    if (activeSection !== 'solutions') {
      setActiveSection('solutions');
    }
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
    }, 3000);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'hero':
        return <Hero key="hero" setActiveSection={setActiveSection} />;
      case 'intelligence':
        return (
          <div key="intelligence" className="flex min-h-screen">
            <Sidebar 
              activeSection={activeSection} 
              setActiveSection={setActiveSection} 
              triggerOptimization={triggerOptimization}
              isCollapsed={isSidebarCollapsed}
              toggleSidebar={toggleSidebar}
              setShowSettings={setShowSettings}
              setShowSupport={setShowSupport}
            />
            <Intelligence isCollapsed={isSidebarCollapsed} />
          </div>
        );
      case 'network':
        return (
          <div key="network" className="flex min-h-screen">
            <Sidebar 
              activeSection={activeSection} 
              setActiveSection={setActiveSection} 
              triggerOptimization={triggerOptimization}
              isCollapsed={isSidebarCollapsed}
              toggleSidebar={toggleSidebar}
              setShowSettings={setShowSettings}
              setShowSupport={setShowSupport}
            />
            <GlobalNetwork isCollapsed={isSidebarCollapsed} />
          </div>
        );
      case 'disruption':
        return (
          <div key="disruption" className="flex min-h-screen">
            <Sidebar 
              activeSection={activeSection} 
              setActiveSection={setActiveSection} 
              triggerOptimization={triggerOptimization}
              isCollapsed={isSidebarCollapsed}
              toggleSidebar={toggleSidebar}
              setShowSettings={setShowSettings}
              setShowSupport={setShowSupport}
            />
            <DisruptionDetection isCollapsed={isSidebarCollapsed} />
          </div>
        );
      case 'solutions':
        return (
          <div key="solutions" className="flex min-h-screen">
            <Sidebar 
              activeSection={activeSection} 
              setActiveSection={setActiveSection} 
              triggerOptimization={triggerOptimization}
              isCollapsed={isSidebarCollapsed}
              toggleSidebar={toggleSidebar}
              setShowSettings={setShowSettings}
              setShowSupport={setShowSupport}
            />
            <Solutions 
              isOptimizing={isOptimizing} 
              setIsOptimizing={setIsOptimizing} 
              isCollapsed={isSidebarCollapsed}
            />
          </div>
        );
      default:
        return <Hero key="default" />;
    }
  };

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary-container selection:text-on-primary-container">
      {/* Ambient Illumination */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] bg-glow-blue opacity-50"></div>
      <div className="fixed top-[20%] right-[10%] w-[800px] h-[800px] pointer-events-none z-[-1] bg-glow-orange opacity-40 mix-blend-multiply"></div>
      
      <Navbar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        triggerOptimization={triggerOptimization}
      />
      
      <AnimatePresence mode="wait">
        {renderSection()}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-8"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-2xl glass-card rounded-[2.5rem] p-12 relative"
            >
              <button onClick={() => setShowSettings(false)} className="absolute top-8 right-8 text-outline hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined text-3xl">close</span>
              </button>
              <h2 className="text-4xl font-black mb-8 text-slate-900 dark:text-white">System Settings</h2>
              <div className="space-y-8">
                <div className="flex items-center justify-between p-6 bg-white/10 rounded-2xl border border-white/20">
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white">Dark Mode Architecture</h4>
                    <p className="text-sm text-slate-500">Synchronize system appearance with OS</p>
                  </div>
                  <div className="w-12 h-6 bg-sky-500 rounded-full relative shadow-inner"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
                </div>
                <div className="flex items-center justify-between p-6 bg-white/10 rounded-2xl border border-white/20">
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white">AI Autonomy Level</h4>
                    <p className="text-sm text-slate-500">Adjust automated decision threshold</p>
                  </div>
                  <input type="range" className="accent-sky-500 w-48" defaultValue="80" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Support Modal */}
      <AnimatePresence>
        {showSupport && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-8"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-xl glass-card rounded-[2.5rem] p-12 text-center border border-white/50"
            >
              <span className="material-symbols-outlined text-6xl text-sky-500 mb-6">support_agent</span>
              <h2 className="text-4xl font-black mb-4 text-slate-900 dark:text-white">Lumina Support</h2>
              <p className="text-slate-500 mb-8 leading-relaxed">Our mission control specialists are available 24/7 to assist with network anomalies and system integration.</p>
              <div className="flex flex-col gap-4">
                <button className="w-full py-4 bg-sky-500 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-sky-600 transition-colors shadow-lg shadow-sky-500/20">Start Live Chat</button>
                <button onClick={() => setShowSupport(false)} className="w-full py-4 bg-white/10 text-slate-600 dark:text-slate-300 rounded-2xl font-black uppercase tracking-widest hover:bg-white/20 transition-colors">Dismiss</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="w-full border-t border-white/20 bg-slate-50/50 dark:bg-slate-950/50 backdrop-blur-md flex flex-col md:flex-row justify-between items-center px-16 py-8 gap-4 mt-auto z-50 relative">
        <div className="text-xs font-light tracking-wide text-sky-500 dark:text-sky-400">
          © 2024 Lumina Logistics. All rights reserved.
        </div>
        <div className="flex gap-6 text-xs font-light tracking-wide">
          <a className="text-slate-400 hover:text-sky-500 transition-colors" href="#">Privacy Policy</a>
          <a className="text-slate-400 hover:text-sky-500 transition-colors" href="#">Terms of Service</a>
          <a className="text-slate-400 hover:text-sky-500 transition-colors" href="#">Security</a>
          <a className="text-slate-400 hover:text-sky-500 transition-colors" href="#">Contact</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
