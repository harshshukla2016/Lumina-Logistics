import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GoogleGenAI } from '@google/genai';

const DisruptionDetection = ({ isCollapsed }) => {
  const [aiInsight, setAiInsight] = useState("Rerouting prevented a potential temperature compliance breach for Unit 819. Efficiency metrics updated globally.");
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
          contents: "You are Lumina AI. Generate a 1-sentence highly technical AI insight regarding a recent severe weather disruption and the successful rerouting of a cargo unit carrying pharmaceuticals. Mention temperature compliance.",
        });
        setAiInsight(response.text);
      } catch (err) {
        console.error("AI Insight Error:", err);
      } finally {
        setIsLoadingInsight(false);
      }
    };
    fetchInsight();
  }, []);
  return (
    <main className={`transition-all duration-300 pt-24 min-h-screen p-8 flex flex-col gap-8 max-w-screen-2xl mx-auto ${isCollapsed ? 'lg:ml-32' : 'lg:ml-64'}`}>
      <header>
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-on-surface mb-2"
        >
          Disruption Detection
        </motion.h1>
        <p className="text-lg text-outline">Real-time smart rerouting active for Western Corridor.</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 min-h-[600px]">
        {/* Map Visualization */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="xl:col-span-8 glass-panel rounded-2xl relative overflow-hidden flex flex-col min-h-[400px]"
        >
          <div className="absolute inset-0 z-0">
            <img 
              alt="City Map" 
              className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9h5UPvm1B0l-_DTruzhn_z0w58LoMy25VrAZGvO9JG9uzh1tra2L_ZoRyLtXZmdHx74_wRmVKwaW--qhn0QtHYh_9_iXa50V0xMAme86hkmM5-_3zSmVStRHaknxmMyTkTgJO0iHKda0Ig1zjn4bnVr2060xTz8vDQ_G6j-s7mYlQv9NehSMImSdidr6Ra-ZZQ961WwsL7K5dCp7fpTKXMpB68PPOledLM9e8dp6Vb8jB0hiQL5zsIE_9dqlqHCI30tSV8pVzvDc"
            />
            {/* SVG Routes */}
            <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
              <path className="route-glow-warning" d="M 100 500 C 300 400, 400 300, 700 100" fill="none" stroke="rgba(112, 119, 131, 0.4)" strokeDasharray="8 8" strokeWidth="4" />
            </svg>
            <svg className="absolute inset-0 w-full h-full z-20" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
              <motion.path 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="route-glow" 
                d="M 100 500 C 200 550, 500 400, 700 100" 
                fill="none" 
                stroke="#4da6ff" 
                strokeWidth="6" 
              />
              <circle cx="250" cy="510" fill="#ffffff" filter="drop-shadow(0 0 4px #4da6ff)" r="8" />
              <circle cx="400" cy="450" fill="#ffffff" filter="drop-shadow(0 0 4px #4da6ff)" r="8" />
            </svg>
          </div>

          <div className="relative z-30 p-6 flex justify-between items-start">
            <div className="glass-panel rounded-xl p-4 flex items-start gap-4 border-l-4 border-l-[#ffaa00]">
              <div className="w-10 h-10 rounded-full bg-[#ffaa00]/20 flex items-center justify-center text-[#ffaa00]">
                <span className="material-symbols-outlined">cloud_sync</span>
              </div>
              <div>
                <h3 className="font-bold text-on-surface">Severe Weather Alert</h3>
                <p className="text-xs text-outline mt-1">I-90 Eastbound - Heavy rain causing delays.</p>
              </div>
            </div>

            <div className="glass-panel rounded-xl p-4 flex flex-col items-end">
              <span className="text-[10px] text-outline uppercase tracking-wider font-bold">New ETA</span>
              <div className="text-2xl font-bold text-primary mt-1">14:30 PST</div>
              <span className="text-[10px] text-[#206775] bg-[#acedfd]/30 px-2 py-1 rounded mt-2">+12 min efficiency gained</span>
            </div>
          </div>
        </motion.div>

        {/* Side Panel */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-panel rounded-2xl p-6 flex-1"
          >
            <h2 className="text-2xl font-bold text-on-surface mb-6">Smart Reroute Active</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-outline-variant/30 bg-surface/50 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-outline-variant"></div>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-xs font-bold text-outline uppercase">Original Route</h4>
                    <p className="text-base text-on-surface mt-1 font-medium">Via I-90 E</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-error">Delayed</span>
                    <p className="text-xs text-outline mt-1">+45 min</p>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 relative overflow-hidden shadow-[0_0_15px_rgba(77,166,255,0.1)]">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-xs font-bold text-primary uppercase">Optimized Route</h4>
                    <p className="text-base text-on-surface mt-1 font-medium">Via SR-520</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-[#206775]">Clear</span>
                    <p className="text-xs text-outline mt-1">On Time</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xs font-bold text-outline mb-4 uppercase tracking-widest">Affected Assets</h3>
              <div className="space-y-3">
                {[
                  { id: 'Unit 402', category: 'Electronics' },
                  { id: 'Unit 819', category: 'Pharmaceuticals' },
                ].map((asset, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-variant/30 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-outline">local_shipping</span>
                      <span className="text-sm text-on-surface font-medium">{asset.id} - {asset.category}</span>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel rounded-2xl p-6 relative overflow-hidden"
          >
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-tertiary-container/20 rounded-full blur-2xl"></div>
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-tertiary">auto_awesome</span>
              <h3 className="text-sm font-bold text-tertiary uppercase tracking-wider">Lumina AI Insight</h3>
            </div>
            <p className="text-sm text-on-surface mb-4 leading-relaxed">
              {isLoadingInsight ? (
                <span className="flex items-center gap-2 animate-pulse text-outline">
                  <span className="material-symbols-outlined text-sm spin">sync</span>
                  Analyzing disruption impact...
                </span>
              ) : (
                aiInsight
              )}
            </p>
            <button className="text-tertiary font-bold text-sm flex items-center gap-1 hover:underline">
              View Full Report
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default DisruptionDetection;
