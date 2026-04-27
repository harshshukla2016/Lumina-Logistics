import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ activeSection, setActiveSection, triggerOptimization }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const navItems = [
    { label: 'Intelligence', id: 'intelligence' },
    { label: 'Network', id: 'network' },
    { label: 'Disruption', id: 'disruption' },
    { label: 'Solutions', id: 'solutions' },
    { label: 'Next Gen', id: 'future' },
  ];

  const notifications = [
    { title: 'Optimization Complete', time: '2m ago', type: 'success' },
    { title: 'New Risk Detected', time: '15m ago', type: 'warning' },
    { title: 'Vessel L-402 Docked', time: '1h ago', type: 'info' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border-b border-white/20 z-[60] px-8 flex items-center justify-between">
      <div className="flex items-center gap-12">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => setActiveSection('hero')}
        >
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-on-primary font-black group-hover:rotate-12 transition-transform">L</div>
          <span className="font-headline-sm font-black tracking-tighter text-on-surface uppercase">Lumina Logistics</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`font-label-md transition-all relative py-2 ${
                activeSection === item.id 
                ? 'text-primary' 
                : 'text-outline hover:text-on-surface'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div 
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 relative">
        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-10 h-10 rounded-full hover:bg-white/40 flex items-center justify-center transition-colors relative"
          >
            <span className="material-symbols-outlined text-outline">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full border-2 border-white"></span>
          </button>
          
          <AnimatePresence>
            {showNotifications && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-12 right-0 w-80 glass-card rounded-2xl p-4 shadow-2xl border border-white/40 z-[70]"
              >
                <h4 className="text-xs font-black uppercase tracking-widest text-outline mb-4">Notifications</h4>
                <div className="space-y-4">
                  {notifications.map((n, i) => (
                    <div key={i} className="flex gap-3 hover:bg-white/20 p-2 rounded-xl transition-colors cursor-pointer">
                      <div className={`w-2 h-2 rounded-full mt-1.5 ${n.type === 'success' ? 'bg-secondary' : n.type === 'warning' ? 'bg-tertiary' : 'bg-primary'}`} />
                      <div>
                        <p className="text-sm font-bold text-on-surface leading-none">{n.title}</p>
                        <p className="text-[10px] text-outline mt-1">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-2 text-[10px] font-black uppercase tracking-widest text-primary hover:underline">View All</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative">
          <button 
            onClick={() => setShowProfile(!showProfile)}
            className="w-10 h-10 rounded-full hover:bg-white/40 flex items-center justify-center transition-colors overflow-hidden border border-white/40"
          >
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="Profile" className="w-full h-full object-cover" />
          </button>

          <AnimatePresence>
            {showProfile && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-12 right-0 w-64 glass-card rounded-2xl p-4 shadow-2xl border border-white/40 z-[70]"
              >
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/20">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary font-black">H</div>
                  <div>
                    <p className="text-sm font-black text-on-surface">Harsh Shukla</p>
                    <p className="text-[10px] text-outline">System Admin</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-outline hover:bg-white/20 transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">person</span> Account Settings
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-outline hover:bg-white/20 transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">security</span> Privacy
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-tertiary hover:bg-tertiary/10 transition-colors flex items-center gap-2 mt-2">
                    <span className="material-symbols-outlined text-sm">logout</span> Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button 
          onClick={triggerOptimization}
          className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-label-bold hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95 text-sm"
        >
          Launch Control
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
