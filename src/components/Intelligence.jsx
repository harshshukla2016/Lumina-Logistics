import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GoogleGenAI } from '@google/genai';

const Intelligence = ({ isCollapsed }) => {
  const [logs, setLogs] = useState([
    'Optimized North Atlantic route for Vessel L-402',
    'Predicted 15% surge in Pacific corridor throughput',
    'Synchronized temperature sensors for Unit 819',
  ]);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);

  useEffect(() => {
    const fetchLogs = async () => {
      const apiKey = localStorage.getItem('gemini_api_key');
      if (!apiKey) return;
      
      setIsLoadingLogs(true);
      try {
        const ai = new GoogleGenAI({ apiKey: apiKey });
        const response = await ai.models.generateContent({
          model: "gemini-1.5-pro",
          contents: "You are Lumina AI. Generate exactly 3 highly technical, short, one-sentence decision logs regarding supply chain optimization, route prediction, and node synchronization. Format them as a simple text list separated by the pipe character '|'. Do not include numbers or bullet points.",
        });
        
        const newLogs = response.text.split('|').map(log => log.trim()).filter(log => log.length > 0).slice(0, 3);
        if (newLogs.length > 0) {
          setLogs(newLogs);
        }
      } catch (err) {
        console.error("AI Log Error:", err);
      } finally {
        setIsLoadingLogs(false);
      }
    };
    fetchLogs();
  }, []);
  const metrics = [
    { label: 'Neural Throughput', value: '850 TOPs', trend: '+12%' },
    { label: 'Prediction Accuracy', value: '99.2%', trend: '+0.4%' },
    { label: 'Data Nodes Synchronized', value: '42/42', trend: 'Stable' },
  ];

  return (
    <div className={`flex-1 pt-24 p-8 min-h-screen transition-all duration-300 ${isCollapsed ? 'lg:pl-32' : 'lg:pl-80'}`}>
      <header className="mb-12">
        <h2 className="text-4xl font-black text-on-surface mb-2">Predictive Intelligence</h2>
        <p className="text-outline">Deep learning neural mesh analyzing global throughput patterns.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {metrics.map((m, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 rounded-3xl border border-white/40"
          >
            <p className="text-[10px] font-black text-outline uppercase tracking-widest mb-2">{m.label}</p>
            <div className="flex justify-between items-end">
              <h3 className="text-3xl font-black text-primary">{m.value}</h3>
              <span className="text-xs font-bold text-secondary">{m.trend}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="glass-card p-8 rounded-[2rem] min-h-[300px] relative overflow-hidden">
          <h3 className="text-xl font-bold mb-6">Throughput Probability Mesh</h3>
          <div className="flex items-end gap-2 h-48">
            {[40, 70, 45, 90, 65, 80, 95, 55, 75, 60].map((h, i) => (
              <motion.div 
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                className="flex-1 bg-gradient-to-t from-primary/40 to-primary rounded-t-lg"
              />
            ))}
          </div>
          <div className="mt-4 flex justify-between text-[10px] font-bold text-outline uppercase tracking-widest">
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
          </div>
        </div>

        <div className="glass-card p-8 rounded-[2rem] border-l-4 border-primary bg-primary/5">
          <div className="flex items-center gap-2 mb-6 text-primary">
            <span className="material-symbols-outlined">psychology</span>
            <h3 className="text-xl font-bold uppercase tracking-tighter">AI Core Decision Log</h3>
          </div>
          <div className="space-y-6">
            {isLoadingLogs ? (
              <div className="flex items-center gap-4 text-sm text-outline animate-pulse">
                <span className="material-symbols-outlined text-primary spin">sync</span>
                Retrieving Live Neural Logs...
              </div>
            ) : (
              logs.map((log, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{log}</p>
                </div>
              ))
            )}
          </div>
          <button className="mt-8 text-primary font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2 group">
            Access Full Neural Log
            <span className="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Intelligence;
