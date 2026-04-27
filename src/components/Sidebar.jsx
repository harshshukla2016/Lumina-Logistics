import React from 'react';
import { motion } from 'framer-motion';

const Sidebar = ({ activeSection, setActiveSection, triggerOptimization, isCollapsed, toggleSidebar, setShowSettings, setShowSupport }) => {
  const menuItems = [
    { icon: 'space_dashboard', label: 'Dashboard', id: 'intelligence' },
    { icon: 'public', label: 'Global Routes', id: 'network' },
    { icon: 'warning', label: 'Risk Analysis', id: 'disruption' },
    { icon: 'auto_awesome', label: 'Optimization', id: 'solutions' },
    { icon: 'biotech', label: 'Next Gen', id: 'future' },
  ];

  return (
    <aside 
      className={`fixed left-6 top-24 bottom-6 rounded-2xl border border-white/50 bg-white/30 dark:bg-slate-900/30 backdrop-blur-[40px] shadow-2xl shadow-sky-500/5 divide-y divide-white/20 hidden lg:flex flex-col h-[calc(100vh-120px)] p-4 space-y-2 z-40 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="pb-6 px-2 relative">
        <div className="flex items-center space-x-3 mb-2">
          <div className={`rounded-full bg-primary-container flex items-center justify-center overflow-hidden transition-all ${isCollapsed ? 'w-8 h-8' : 'w-10 h-10'}`}>
            <img 
              alt="System Operator" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyOgSMjsyqRUo-emHyESt0kfZaXYm3vIPcPFUCRLBh2xED365TyPVT0aZoS8M8mZ1546_N77DlFUJIiKtOvEtlILWViXGivflTON2oM-T3_KPDx1yYOWRst7I7Sr0pLIDAdjY2-nId8hUkWCpp_IUve2j1PbwXsYAsuS_qJkPhiA0DbnC_9AauS7-XXA_l5Z3MlO3J_QMWX4upSo9fQWAF7vQzsyOch-yTqXhqlVZTTr2HPRYeeNjDatINejRIUxUb-03yRzdXBbE"
            />
          </div>
          {!isCollapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="text-lg font-bold text-slate-800 dark:text-slate-100 font-['Inter']">Mission Control</div>
              <div className="text-xs text-slate-500">Active Network: 98.4%</div>
            </motion.div>
          )}
        </div>

        {/* Collapse Toggle */}
        <button 
          onClick={toggleSidebar}
          className="absolute -right-8 top-0 w-8 h-8 bg-white/80 dark:bg-slate-900/80 rounded-r-lg border-y border-r border-white/50 flex items-center justify-center text-slate-500 hover:text-primary transition-colors shadow-lg"
        >
          <span className="material-symbols-outlined text-sm">
            {isCollapsed ? 'chevron_right' : 'chevron_left'}
          </span>
        </button>
      </div>
      
      <nav className="flex-1 py-4 space-y-2 font-['Inter'] text-sm font-medium">
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setActiveSection(item.id)}
            title={isCollapsed ? item.label : ''}
            className={`w-full flex items-center py-3 px-4 rounded-lg transition-all duration-200 group ${
              isCollapsed ? 'justify-center' : 'space-x-3'
            } ${
              activeSection === item.id 
                ? 'bg-gradient-to-r from-sky-500/20 to-transparent border-l-4 border-sky-500 text-sky-700 dark:text-sky-300'
                : 'text-slate-500 dark:text-slate-400 hover:bg-white/20 hover:translate-x-1'
            }`}
          >
            <span className={`material-symbols-outlined ${activeSection === item.id ? 'fill-1' : ''}`}>
              {item.icon}
            </span>
            {!isCollapsed && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {item.label}
              </motion.span>
            )}
          </button>
        ))}
      </nav>

      <div className="pt-4 pb-2">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={triggerOptimization}
          className={`w-full bg-primary/10 text-primary hover:bg-primary/20 py-3 rounded-xl font-label-bold transition-all border border-primary/20 flex items-center justify-center ${isCollapsed ? 'px-0' : 'px-4'}`}
        >
          {isCollapsed ? (
            <span className="material-symbols-outlined">rocket_launch</span>
          ) : (
            <span>Optimize Fleet</span>
          )}
        </motion.button>
      </div>

      <div className="pt-2 space-y-1 font-['Inter'] text-sm font-medium border-t border-white/20">
        <button 
          onClick={() => setShowSettings(true)}
          className={`w-full flex items-center py-3 px-4 hover:bg-white/20 hover:translate-x-1 transition-all duration-200 rounded-lg text-slate-500 dark:text-slate-400 ${isCollapsed ? 'justify-center' : 'space-x-3'}`}
        >
          <span className="material-symbols-outlined">settings</span>
          {!isCollapsed && <span>Settings</span>}
        </button>
        <button 
          onClick={() => setShowSupport(true)}
          className={`w-full flex items-center py-3 px-4 hover:bg-white/20 hover:translate-x-1 transition-all duration-200 rounded-lg text-slate-500 dark:text-slate-400 ${isCollapsed ? 'justify-center' : 'space-x-3'}`}
        >
          <span className="material-symbols-outlined">help</span>
          {!isCollapsed && <span>Support</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
