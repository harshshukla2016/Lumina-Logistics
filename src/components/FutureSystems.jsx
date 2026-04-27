import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FutureSystems = ({ isCollapsed }) => {
  const [activeModule, setActiveModule] = useState('blockchain');
  const [blocks, setBlocks] = useState([]);
  const [ecoScore, setEcoScore] = useState(72);

  // Simulate Blockchain Ledger
  useEffect(() => {
    const interval = setInterval(() => {
      const newBlock = {
        hash: '0x' + Math.random().toString(16).slice(2, 10) + '...' + Math.random().toString(16).slice(2, 6),
        node: 'Node-' + Math.floor(Math.random() * 50),
        time: new Date().toLocaleTimeString(),
        status: 'Validated'
      };
      setBlocks(prev => [newBlock, ...prev].slice(0, 8));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const modules = [
    { id: 'blockchain', label: 'Blockchain Ledger', icon: 'account_balance_wallet', desc: 'Immutable transit logs & smart contracts.' },
    { id: 'quantum', label: 'Quantum Routing', icon: 'hub', desc: 'Sub-second global path optimization.' },
    { id: 'iot', label: 'IoT Mesh', icon: 'sensors', desc: 'Cargo-level telemetry & condition mesh.' },
    { id: 'sustainability', label: 'ESG Matrix', icon: 'eco', desc: 'Carbon neutral automated offsetting.' },
  ];

  return (
    <div className={`flex-1 pt-24 p-8 min-h-screen transition-all duration-300 ${isCollapsed ? 'lg:pl-32' : 'lg:pl-80'}`}>
      <header className="mb-12">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-4 border border-primary/20">
          Advanced Protocol v2.0
        </div>
        <h2 className="text-4xl font-black text-on-surface mb-2">Next Gen Systems</h2>
        <p className="text-outline">Implementing future-scope technologies for the 2026-2030 logistics horizon.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
        {modules.map((m) => (
          <button
            key={m.id}
            onClick={() => setActiveModule(m.id)}
            className={`p-6 rounded-[2rem] border transition-all text-left group ${
              activeModule === m.id 
              ? 'bg-primary text-white border-primary shadow-xl shadow-primary/20 scale-[1.02]' 
              : 'bg-white/10 border-white/20 hover:bg-white/20'
            }`}
          >
            <span className={`material-symbols-outlined text-3xl mb-4 ${activeModule === m.id ? 'text-white' : 'text-primary'}`}>
              {m.icon}
            </span>
            <h4 className="font-black uppercase tracking-tighter text-lg mb-1">{m.label}</h4>
            <p className={`text-xs ${activeModule === m.id ? 'text-white/70' : 'text-outline'}`}>{m.desc}</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Module Content */}
        <div className="xl:col-span-2 glass-card rounded-[2.5rem] p-8 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {activeModule === 'blockchain' && (
              <motion.div 
                key="blockchain"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-black uppercase tracking-tighter">Live Transit Ledger</h3>
                  <div className="flex items-center gap-2 text-[10px] font-black text-secondary">
                    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                    SYNCING BLOCKS
                  </div>
                </div>
                <div className="space-y-3">
                  {blocks.map((b, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-primary/30 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined">link</span>
                        </div>
                        <div>
                          <p className="text-xs font-black font-mono text-primary">{b.hash}</p>
                          <p className="text-[10px] text-outline uppercase font-bold">{b.node}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-on-surface">{b.time}</p>
                        <p className="text-[10px] font-black text-secondary uppercase">{b.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeModule === 'quantum' && (
              <motion.div 
                key="quantum"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full flex flex-col items-center justify-center text-center p-12"
              >
                <div className="w-48 h-48 rounded-full border-4 border-dashed border-primary/30 flex items-center justify-center animate-[spin_10s_linear_infinite]">
                   <div className="w-32 h-32 rounded-full border-4 border-primary flex items-center justify-center animate-[spin_5s_linear_infinite_reverse]">
                      <span className="material-symbols-outlined text-6xl text-primary">hub</span>
                   </div>
                </div>
                <h3 className="text-3xl font-black mt-8 uppercase tracking-tighter">Quantum Annealing Active</h3>
                <p className="text-outline mt-2 max-w-md text-sm font-bold">Processing 4.2 million path permutations per second across the global transit mesh.</p>
                <div className="mt-8 grid grid-cols-2 gap-4 w-full">
                  <div className="p-4 bg-white/5 rounded-2xl">
                    <p className="text-2xl font-black text-primary">0.02ms</p>
                    <p className="text-[10px] text-outline uppercase">Solve Time</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl">
                    <p className="text-2xl font-black text-secondary">99.9%</p>
                    <p className="text-[10px] text-outline uppercase">Opt. Index</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeModule === 'iot' && (
              <motion.div 
                key="iot"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-6">Cargo Condition Mesh</h3>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { label: 'Avg Container Temp', value: '4.2°C', icon: 'thermostat', color: 'text-sky-500' },
                    { label: 'Humidity Stability', value: '98%', icon: 'water_drop', color: 'text-blue-500' },
                    { label: 'Shock Anomalies', value: '0', icon: 'sensors', color: 'text-green-500' },
                    { label: 'Active Sensors', value: '124k', icon: 'wifi', color: 'text-primary' },
                  ].map((s, i) => (
                    <div key={i} className="p-6 bg-white/5 rounded-[2rem] border border-white/10">
                      <span className={`material-symbols-outlined mb-2 ${s.color}`}>{s.icon}</span>
                      <p className="text-2xl font-black text-on-surface">{s.value}</p>
                      <p className="text-[10px] text-outline uppercase font-bold tracking-widest">{s.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeModule === 'sustainability' && (
              <motion.div 
                key="sustainability"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter">Carbon Impact Analysis</h3>
                    <p className="text-outline text-xs">Automated ESG compliance & offsetting.</p>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-black text-green-500">{ecoScore}%</p>
                    <p className="text-[10px] text-outline uppercase font-bold">Eco-Efficiency</p>
                  </div>
                </div>
                <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${ecoScore}%` }}
                    className="h-full bg-gradient-to-r from-green-500 to-sky-500"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-green-500/10 rounded-3xl border border-green-500/20">
                    <h4 className="text-xs font-black text-green-500 uppercase mb-2">Automated Offsetting</h4>
                    <p className="text-sm font-bold text-on-surface">1,240 Carbon Credits purchased this cycle to offset Vessel L-402 transit emissions.</p>
                  </div>
                  <div className="p-6 bg-sky-500/10 rounded-3xl border border-sky-500/20">
                    <h4 className="text-xs font-black text-sky-500 uppercase mb-2">Renewable Energy Mix</h4>
                    <p className="text-sm font-bold text-on-surface">84% of port operations powered by integrated solar/wind micro-grids.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Info Card */}
        <div className="glass-card rounded-[2.5rem] p-8 flex flex-col justify-between border-primary/20 bg-primary/5">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white mb-6">
              <span className="material-symbols-outlined">rocket</span>
            </div>
            <h3 className="text-xl font-black uppercase tracking-tighter mb-4">Implementation Status</h3>
            <p className="text-sm text-outline font-bold leading-relaxed">
              The features in this section represent the "Advanced Tier" of Lumina Logistics. 
              They are currently in **Simulated Integration** mode, pulling from mock neural data to demonstrate the 2026 Solution Challenge vision.
            </p>
          </div>
          <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/10">
             <div className="flex justify-between text-[10px] font-black text-outline uppercase mb-2">
                <span>R&D Readiness</span>
                <span>84%</span>
             </div>
             <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="w-[84%] h-full bg-primary" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FutureSystems;
