import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ setActiveSection }) => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-surface-container pt-16">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <img 
          alt="Cinematic Logistics" 
          className="w-full h-full object-cover opacity-80" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3H51JD6nZhwSznt3M3DLiKc1zP2M7E2p_vPvez3xpnIl8PgTLf4NT5m5OB2R_haPQG0rPaYXnSnOYNhrlGlAC6GC42CsUTg5iteEJgxatO_qinq0Y0OqQZ5izGlRpTI76d84o-6VBdHvvxuLzRlhKF_eGv42ezTc4O66y4i63gdzHxpDBFOl43L1vH9Zhgn5Fg08R3Qp3k-oeD4fQLxpl4wQCJY8hWBM21bC628n3j5Nfhei5i8C4PpaTM_mfugoCcjjzfozYfNE"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface/40 via-transparent to-surface/90"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-tertiary/10 rounded-full blur-[150px]"></div>
      </div>

      {/* Hero Content */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 w-[90%] max-w-4xl mx-auto"
      >
        <div className="bg-white/60 backdrop-blur-[40px] border border-white/50 rounded-3xl p-12 md:p-24 shadow-[0_10px_40px_rgba(0,97,165,0.08)] text-center flex flex-col items-center gap-8">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-display text-4xl md:text-7xl font-extrabold text-on-surface leading-tight"
          >
            Smart Supply Chain <br/> Intelligence
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="font-headline-md text-xl md:text-3xl text-primary max-w-2xl font-medium"
          >
            Predict. Prevent. Optimize.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-8"
          >
            <button 
              onClick={() => setActiveSection('network')}
              className="group relative px-10 py-5 bg-gradient-to-r from-primary to-surface-tint rounded-full text-on-primary font-bold overflow-hidden shadow-[0_8px_30px_rgba(0,97,165,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,97,165,0.35)] active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-3">
                Explore System
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
