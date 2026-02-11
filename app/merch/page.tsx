"use client";

import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import Link from 'next/link';

export default function MerchPage() {
  return (
    <div className="relative min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center overflow-hidden">
      
      {/* --- BACKGROUND PATTERNS --- */}
      
      {/* 1. Technical Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)',
             backgroundSize: '40px 40px' 
           }} 
      />

      {/* 2. Spotlight / Glow Effect */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_60%)] pointer-events-none" />

      {/* 3. Floating Abstract Shapes (Decorative) */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] border border-dashed border-white/10 rounded-full z-0 pointer-events-none"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[700px] border border-white/5 rounded-full z-0 pointer-events-none"
      />

      {/* --- MAIN CONTENT --- */}
      <main className="relative z-10 text-center px-4">
        
        {/* Brand Tag */}
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
        >
            <span className="font-mono text-xs md:text-sm uppercase tracking-[0.4em] text-neutral-500">
                We Run Nairobi
            </span>
        </motion.div>

        {/* Massive Headline */}
        <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="text-[12vw] md:text-[9vw] font-display font-bold leading-[0.85] tracking-tighter text-white uppercase"
        >
            Coming<br/>
            <span className="text-neutral-600 text-stroke-white">Soon</span>
        </motion.h1>

      </main>

    </div>
  );
}