import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from '@google/genai';

const Solutions = ({ isOptimizing, setIsOptimizing, isCollapsed }) => {
  const [isComplete, setIsComplete] = useState(false);
  const [aiReport, setAiReport] = useState("Awaiting optimization sequence...");

  const activeSolutions = [
    { id: 'S-204', type: 'Fleet Optimization', status: 'Running', impact: '+15% efficiency', icon: 'auto_awesome' },
    { id: 'S-911', type: 'Emergency Rerouting', status: 'Standby', impact: 'N/A', icon: 'emergency' },
    { id: 'S-442', type: 'Temperature Guardian', status: 'Active', impact: 'Zero loss', icon: 'thermostat' },
  ];

  const handleOptimize = async () => {
    setIsOptimizing(true);
    setIsComplete(false);

    const apiKey = localStorage.getItem('gemini_api_key');
    if (!apiKey) {
      // Fallback to simulation if no API key
      setTimeout(() => {
        setIsOptimizing(false);
        setIsComplete(true);
        setAiReport("Simulated Optimization: Rerouting Vessel L-402 via the Cape of Good Hope to avoid Suez congestion. Estimated savings: $1.2M.");
        setTimeout(() => setIsComplete(false), 5000);
      }, 3000);
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey: apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-1.5-pro",
        contents: "You are Lumina AI's core optimizer. Generate a short 2-sentence highly technical logistics optimization plan to avoid a current disruption anomaly (e.g., port strike, storm, canal blockage). Mention specific vessel names, routes, and estimated cost savings in millions. Be concise.",
      });
      setAiReport(response.text);
    } catch (err) {
      console.error(err);
      setAiReport(`Neural Optimizer failed: ${err.message}. Please verify your API key in the Copilot.`);
    } finally {
      setIsOptimizing(false);
      setIsComplete(true);
      setTimeout(() => setIsComplete(false), 5000);
    }
  };

  return (
    <div className={`flex-1 pt-24 p-8 min-h-screen transition-all duration-300 ${isCollapsed ? 'lg:pl-32' : 'lg:pl-80'}`}>
      <header className="mb-12">
        <h2 className="text-4xl font-black text-on-surface mb-2">Network Solutions</h2>
        <p className="text-outline">Deploying automated fleet management and node optimization protocols.</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8 flex flex-col gap-6">
          <div className="glass-card p-8 rounded-[2rem] border border-white/40">
            <h3 className="text-xl font-bold mb-8 uppercase tracking-tighter">Active Optimization Protocols</h3>
            <div className="space-y-4">
              {activeSolutions.map((sol, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-between p-6 rounded-2xl bg-surface-variant/20 border border-outline-variant/10 group hover:bg-primary/5 transition-colors"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">{sol.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-on-surface">{sol.id} - {sol.type}</h4>
                      <p className="text-[10px] font-black text-outline uppercase tracking-widest mt-1">{sol.impact}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${sol.status === 'Running' ? 'bg-secondary/20 text-secondary' : sol.status === 'Active' ? 'bg-primary/20 text-primary' : 'bg-outline-variant/20 text-outline'}`}>
                      {sol.status}
                    </span>
                    <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors cursor-pointer">more_vert</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="xl:col-span-4 flex flex-col gap-6">
          <div className="glass-card p-8 rounded-[2rem] bg-gradient-to-br from-secondary/10 to-transparent border border-secondary/20 shadow-xl relative overflow-hidden">
            <AnimatePresence>
              {isOptimizing && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4 text-center p-6"
                >
                  <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-xs font-black uppercase tracking-widest text-secondary">Analyzing Network Anomalies...</p>
                </motion.div>
              )}
              {isComplete && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 bg-secondary text-on-secondary flex flex-col items-center justify-center gap-4 text-center p-6"
                >
                  <span className="material-symbols-outlined text-5xl">check_circle</span>
                  <p className="text-xs font-black uppercase tracking-widest">Network Optimized Successfully</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary mb-6">
              <span className="material-symbols-outlined">rocket_launch</span>
            </div>
            <h3 className="text-xl font-black text-secondary uppercase tracking-tighter mb-4">Deploy New Solution</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-8">
              Analyze current network anomalies and deploy AI-optimized fleet adjustments in seconds.
            </p>
            <button 
              onClick={handleOptimize}
              disabled={isOptimizing}
              className="w-full py-4 bg-secondary text-on-secondary rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-secondary/30 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isOptimizing ? 'Deploying...' : 'Launch Optimizer'}
            </button>
          </div>

          <div className="glass-card p-8 rounded-[2rem] border border-white/40">
            <h4 className="text-xs font-black text-outline uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-sm">auto_spark</span>
              AI Live Optimization Report
            </h4>
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-2xl">
              <p className="text-sm font-bold text-on-surface leading-relaxed">
                {aiReport}
              </p>
            </div>
            <div className="mt-6">
              <h4 className="text-[10px] font-black text-outline uppercase tracking-[0.3em] mb-2">Network Savings</h4>
              <div className="text-4xl font-black text-primary mb-2">$2.4M</div>
              <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">Efficiency GAIN: 14.8%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solutions;
