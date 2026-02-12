"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Instagram, ArrowUpRight, Activity, Music2 } from 'lucide-react'; // Added Music2 for TikTok
import Image from 'next/image';
import tribe from "../../public/tribe.jpg"; 

export function CommunitySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section ref={ref} className="py-24 bg-neutral-950 text-white relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <span className="text-orange-500 font-medium tracking-widest uppercase text-sm mb-2 block">
              The Community
            </span>
            <h2 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter leading-none">
              More Than <br/> Just Miles
            </h2>
          </div>
          <p className="text-neutral-400 max-w-sm text-lg font-light leading-relaxed">
We're runners, creatives, and dreamers reclaiming the streets of Nairobi, one stride at a time.          </p>
        </motion.div>

        {/* Bento Grid layout */}
        <motion.div 
          variants={containerVars}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]"
        >
          
          {/* MAIN PHOTO CARD (Left Side - 8 Cols) */}
          <motion.div variants={itemVars} className="md:col-span-8 relative group overflow-hidden rounded-2xl bg-neutral-900 border border-white/10 h-[300px] md:h-full">
            <Image 
              src={tribe}
              alt="Group Run High Five"
              placeholder="blur"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 md:p-12">
               <h3 className="text-3xl md:text-5xl font-display font-bold uppercase mb-2">The Tribe</h3>
               <p className="text-neutral-300 max-w-md text-sm md:text-base">
                 It doesn't matter if you run a 3:00/km or a 7:00/km. No one runs alone. We start together, we finish together.
               </p>
            </div>
          </motion.div>

          {/* SOCIALS COLUMN (Right Side - 4 Cols) */}
          <div className="md:col-span-4 flex flex-col gap-6 h-full">
             
             {/* 1. STRAVA (Top Half) */}
             <motion.a 
                href="https://www.strava.com/clubs/werunnairobi"
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVars} 
                className="flex-[1.4] bg-[#fc4c02] rounded-2xl p-8 relative overflow-hidden group cursor-pointer hover:bg-[#e34402] transition-colors block"
             >
                <div className="relative z-10 flex flex-col h-full justify-between">
                   <div className="flex justify-between items-start">
                      <Activity className="w-10 h-10 text-white/90" />
                      <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300" />
                   </div>
                   <div>
                     <div className="text-6xl font-display font-bold mb-1">3.5K+</div>
                     <div className="font-medium tracking-wider uppercase text-sm opacity-90">Members on Strava</div>
                   </div>
                </div>
                {/* Decorative Pattern */}
                <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12">
                   <Activity className="w-48 h-48" />
                </div>
             </motion.a>

             {/* 2. INSTAGRAM & TIKTOK ROW (Bottom Half) */}
             <div className="flex-1 flex gap-6">
                
                {/* Instagram */}
                <motion.a 
                  variants={itemVars}
                  href="https://www.instagram.com/werunnairobi"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="flex-1 bg-neutral-900 border border-white/10 rounded-2xl relative overflow-hidden group cursor-pointer"
                >
                    <Image 
                      src="/2.png"
                      alt="Instagram"
                      fill
                      className="object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                    
                    <div className="relative z-10 p-6 flex flex-col h-full justify-between">
                       <div className="flex justify-between items-start">
                          <Instagram className="w-6 h-6 text-white" />
                          <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                       </div>
                       <div>
                         <h4 className="text-lg font-display font-bold uppercase">Join The Culture</h4>
                         <p className="text-neutral-400 text-[10px] uppercase tracking-widest">@werunnairobi</p>
                       </div>
                    </div>
                </motion.a>

                {/* TikTok */}
                <motion.a 
                  variants={itemVars}
                  href="https://www.tiktok.com/@werunnairobi"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="flex-1 bg-neutral-900 border border-white/10 rounded-2xl relative overflow-hidden group cursor-pointer hover:border-white/30 transition-colors"
                >
                    {/* TikTok Gradient Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10 p-6 flex flex-col h-full justify-between">
                       <div className="flex justify-between items-start">
                          <Music2 className="w-6 h-6 text-white" />
                          <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                       </div>
                       <div>
                         <h4 className="text-lg font-display font-bold uppercase">TikTok</h4>
                         <p className="text-neutral-400 text-[10px] uppercase tracking-widest">@werunnairobi</p>
                       </div>
                    </div>
                </motion.a>
                
             </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}