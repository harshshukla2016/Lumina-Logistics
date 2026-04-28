import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GoogleGenAI } from '@google/genai';

const GlobalNetwork = ({ isCollapsed }) => {
  const [networkInsight, setNetworkInsight] = useState("Minor weather disruption detected in North Atlantic corridor. AI has pre-routed 14 vessels to maintain delivery schedules.");
  const [isLoadingInsight, setIsLoadingInsight] = useState(false);

  useEffect(() => {
    const fetchInsight = async () => {
      const apiKey = localStorage.getItem('gemini_api_key');
      if (!apiKey) return;
      
      setIsLoadingInsight(true);
      try {
        const ai = new GoogleGenAI({ apiKey: apiKey });
        const response = await ai.models.generateContent({
          model: "gemini-1.5-pro",
          contents: "You are Lumina AI Global Network Monitor. Generate a 2-sentence highly technical predictive insight regarding a global shipping network anomaly and the preemptive routing adjustments taken to maintain schedule. Mention specific global corridors and exact vessel counts.",
        });
        setNetworkInsight(response.text);
      } catch (err) {
        console.error("AI Insight Error:", err);
      } finally {
        setIsLoadingInsight(false);
      }
    };
    fetchInsight();
  }, []);
  const stats = [
    { label: 'Active Vessels', value: '1,248', color: 'text-primary' },
    { label: 'Global Efficiency', value: '98.4%', color: 'text-secondary' },
    { label: 'Network Risk', value: '12/100', color: 'text-tertiary' },
  ];

  return (
    <div className={`relative w-full h-screen pt-24 overflow-hidden transition-all duration-300 ${isCollapsed ? 'lg:pl-32' : 'lg:pl-80'}`}>
      {/* Background Globe Simulation */}
      <div className="absolute inset-0 z-0 flex items-center justify-center p-8">
        <div className="relative w-full h-full rounded-2xl overflow-hidden glass-card">
          <img 
            alt="Global Globe" 
            className="w-full h-full object-cover opacity-80"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOdVltkF_DNLbGBm_rktzwraeoHJV7uMQha-VQileOBKf9hWw-aGZtwHxr5SaBEfiRNjPjEOugfnKEoOnzzMX4Y_UOyx_inEWBX5erDel4gBrl4s1p9eBTU6jU_nqbEuXXbYQQoDox9Q6rdx73YYUpbLbqRceskl_j1uC9lXEkk-tmZsN-sOUSGDEXs0dQFy66zM8mGTWRRkL14-4kxfBQatlreeUNr3wauf8AkxI_rLpk3gnVWpculE3FzL02OF1i9wKdsNdbLcY"
          />
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] mix-blend-overlay"></div>
        </div>
      </div>

      {/* Floating Content */}
      <div className="relative z-10 w-full h-full p-12 flex flex-col justify-between pointer-events-none">
        <header className="flex flex-col md:flex-row justify-between items-start pointer-events-auto gap-6">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-headline-md text-3xl font-bold text-on-surface"
            >
              Live Network Status
            </motion.h2>
            <p className="font-body-md text-outline mt-1">Real-time global routing and node integrity</p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-xl p-4 flex gap-8 pointer-events-auto"
          >
            {stats.map((stat, idx) => (
              <React.Fragment key={idx}>
                <div>
                  <p className="font-label-sm text-outline uppercase text-[10px] tracking-widest">{stat.label}</p>
                  <p className={`font-headline-md text-2xl font-bold ${stat.color} mt-1`}>{stat.value}</p>
                </div>
                {idx < stats.length - 1 && <div className="w-px bg-outline-variant/30 h-10 my-auto" />}
              </React.Fragment>
            ))}
          </motion.div>
        </header>

        <div className="flex flex-col lg:flex-row justify-between items-end gap-6 pointer-events-auto">
          {/* Legend */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-xl p-6 w-full max-w-[320px]"
          >
            <h4 className="font-label-bold text-on-surface mb-4 font-semibold uppercase tracking-wider text-xs">Network Legend</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_8px_rgba(0,97,165,0.6)]"></div>
                <span className="font-body-md text-sm text-on-surface-variant">Primary Hubs</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-secondary-fixed shadow-[0_0_8px_rgba(172,237,253,0.6)]"></div>
                <span className="font-body-md text-sm text-on-surface-variant">Active Transit Routes</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-tertiary-container shadow-[0_0_8px_rgba(168,151,227,0.6)]"></div>
                <span className="font-body-md text-sm text-on-surface-variant">AI Optimized Paths</span>
              </li>
            </ul>
          </motion.div>

          {/* Anomaly Alert */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card rounded-xl p-6 w-full max-w-[400px] border-l-4 border-l-tertiary"
          >
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-tertiary text-3xl">model_training</span>
              <div>
                <h4 className="font-label-bold text-on-surface font-semibold">Predictive Insight</h4>
                <p className="font-body-md text-sm text-on-surface-variant mt-2 leading-relaxed">
                  {isLoadingInsight ? (
                    <span className="flex items-center gap-2 animate-pulse text-outline">
                      <span className="material-symbols-outlined text-sm spin">sync</span>
                      Scanning global nodes...
                    </span>
                  ) : (
                    networkInsight
                  )}
                </p>
                <button className="mt-4 text-primary font-bold text-sm hover:underline flex items-center gap-1">
                  View Reroute Plan <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GlobalNetwork;
