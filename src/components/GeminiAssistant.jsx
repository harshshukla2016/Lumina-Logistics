import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from '@google/genai';

const GeminiAssistant = ({ triggerOptimization, setActiveSection, setShowSettings, setShowSupport }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gemini');
  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_api_key') || '');
  const [isKeyValid, setIsKeyValid] = useState(!!localStorage.getItem('gemini_api_key'));
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello, Commander. I am Lumina AI Core. Please select your preferred AI engine above. How can I assist with your supply chain logistics today?' }
  ]);

  const coreActionInstructions = `
You have direct integration with the Lumina Logistics UI. Do not ask the user for specific data to optimize. Instead, take immediate action using the following tags anywhere in your response:
- [ACTION: OPTIMIZE] -> Triggers global fleet optimization and navigates to Solutions.
- [ACTION: NETWORK] -> Navigates to the Global Network map.
- [ACTION: DISRUPTION] -> Navigates to Disruption Detection.
- [ACTION: FUTURE] -> Navigates to Next Gen Systems.
- [ACTION: SETTINGS] -> Opens the app Settings modal.
If the user asks you to "optimize the logistics", simply say "Initiating global fleet optimization sequence based on real-time anomaly data." and include [ACTION: OPTIMIZE]. Use your simulated access to immediately fulfill requests without asking for manual data entry.`;

  const aiModels = {
    gemini: { 
      name: 'Gemini 1.5 Pro', 
      subtitle: 'General Logistics Intelligence', 
      icon: 'smart_toy', 
      color: 'bg-blue-500',
      prompt: "You are Lumina AI powered by Gemini 1.5 Pro. You act as a general logistics and supply chain assistant. Be concise, professional, and slightly futuristic." + coreActionInstructions
    },
    vertex: { 
      name: 'Vertex AI Core', 
      subtitle: 'Advanced Predictive Analytics', 
      icon: 'analytics', 
      color: 'bg-indigo-500',
      prompt: "You are Vertex AI Logistics Core. You specialize in deep predictive analytics, mathematical optimization, and risk modeling for global supply chains. Use highly analytical, data-driven language." + coreActionInstructions
    },
    cloud: { 
      name: 'Google Cloud Vision', 
      subtitle: 'Satellite & Node Telemetry', 
      icon: 'satellite_alt', 
      color: 'bg-teal-500',
      prompt: "You are Google Cloud Vision AI. You specialize in analyzing satellite imagery, port infrastructure health, and real-time visual telemetry of the logistics network. Focus on physical node status and environmental factors." + coreActionInstructions
    }
  };
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSaveKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('gemini_api_key', apiKey.trim());
      setIsKeyValid(true);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || !isKeyValid) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: apiKey });

      const formattedHistory = messages.slice(1).map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));
      
      // Append the new user message to the history
      formattedHistory.push({
        role: 'user',
        parts: [{ text: userMessage }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-1.5-pro",
        contents: formattedHistory,
        config: {
          systemInstruction: aiModels[selectedModel].prompt
        }
      });
      
      let responseText = response.text;
      
      // Execute UI actions based on AI tags
      if (responseText.includes('[ACTION: OPTIMIZE]')) {
        if (triggerOptimization) triggerOptimization();
      }
      if (responseText.includes('[ACTION: NETWORK]')) {
        if (setActiveSection) setActiveSection('network');
      }
      if (responseText.includes('[ACTION: DISRUPTION]')) {
        if (setActiveSection) setActiveSection('disruptions');
      }
      if (responseText.includes('[ACTION: FUTURE]')) {
        if (setActiveSection) setActiveSection('future');
      }
      if (responseText.includes('[ACTION: SETTINGS]')) {
        if (setShowSettings) setShowSettings(true);
      }

      // Remove tags from the displayed text
      responseText = responseText.replace(/\[ACTION: [A-Z]+\]/g, '').trim();
      
      setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: `Error communicating with Lumina AI Core: ${error.message}. Please check your API key.` }]);
      if (error.message.includes('API key')) {
        setIsKeyValid(false);
        localStorage.removeItem('gemini_api_key');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-[100]">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 shadow-2xl shadow-sky-500/30 flex items-center justify-center text-white relative group border border-white/20"
        >
          <span className="material-symbols-outlined text-2xl group-hover:animate-pulse">smart_toy</span>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></span>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-28 right-8 w-96 h-[500px] glass-card rounded-3xl border border-white/20 shadow-3xl z-[100] flex flex-col overflow-hidden"
          >
            <div className={`bg-gradient-to-r from-${aiModels[selectedModel].color.split('-')[1]}-600/20 to-slate-800/50 p-4 border-b border-white/10 flex justify-between items-center backdrop-blur-md transition-colors`}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full ${aiModels[selectedModel].color} flex items-center justify-center text-white transition-colors`}>
                  <span className="material-symbols-outlined text-lg">{aiModels[selectedModel].icon}</span>
                </div>
                <div>
                  <select 
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="bg-transparent font-black text-slate-800 dark:text-white leading-none appearance-none cursor-pointer focus:outline-none hover:text-sky-500 transition-colors"
                  >
                    <option value="gemini">Gemini 1.5 Pro</option>
                    <option value="vertex">Vertex AI</option>
                    <option value="cloud">Google Cloud AI</option>
                  </select>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                    {aiModels[selectedModel].subtitle}
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-900/50">
              {!isKeyValid ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 p-4">
                  <span className="material-symbols-outlined text-5xl text-sky-500 mb-2">vpn_key</span>
                  <h4 className="font-black text-slate-800 dark:text-white">API Key Required</h4>
                  <p className="text-xs text-slate-500">To enable live neural intelligence, please enter your Google Gemini API Key.</p>
                  <input 
                    type="password" 
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter Gemini API Key"
                    className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  <button 
                    onClick={handleSaveKey}
                    className="w-full py-2 bg-sky-500 text-white rounded-xl font-bold text-sm hover:bg-sky-600 transition-colors"
                  >
                    Connect Core
                  </button>
                </div>
              ) : (
                <>
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                        msg.role === 'user' 
                        ? 'bg-sky-500 text-white rounded-tr-sm' 
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-white/10 rounded-tl-sm shadow-sm'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex items-center gap-2">
                        <div className="w-2 h-2 bg-sky-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-sky-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-sky-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {isKeyValid && (
              <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-white/10">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask Lumina AI..."
                    className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 dark:text-white"
                  />
                  <button 
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <span className="material-symbols-outlined text-lg">send</span>
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GeminiAssistant;
