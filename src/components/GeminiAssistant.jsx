import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GeminiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_api_key') || '');
  const [isKeyValid, setIsKeyValid] = useState(!!localStorage.getItem('gemini_api_key'));
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello, Commander. I am Lumina AI, powered by Google Gemini. How can I assist with your supply chain logistics today?' }
  ]);
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
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-pro",
        systemInstruction: "You are Lumina AI, an advanced logistics and supply chain assistant. You help the user (Commander) manage a global fleet of vessels, detect disruptions, optimize routes, and analyze telemetry data. Be concise, professional, and slightly futuristic in tone."
      });

      const history = messages.slice(1).map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      const chat = model.startChat({
        history: history,
      });

      const result = await chat.sendMessage(userMessage);
      const responseText = result.response.text();
      
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
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 shadow-2xl shadow-sky-500/30 flex items-center justify-center text-white relative group"
        >
          <span className="material-symbols-outlined text-3xl">auto_spark</span>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></span>
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
            <div className="bg-gradient-to-r from-blue-600/20 to-sky-500/20 p-4 border-b border-white/10 flex justify-between items-center backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-lg">auto_spark</span>
                </div>
                <div>
                  <h3 className="font-black text-slate-800 dark:text-white leading-none">Lumina AI</h3>
                  <p className="text-[10px] font-bold text-sky-500 uppercase tracking-widest mt-1">Powered by Google Gemini</p>
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
