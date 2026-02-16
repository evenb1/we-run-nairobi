"use client";

import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Activity, Trophy, TrendingUp, Flame, ExternalLink, MapPin, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
// --- DATA ---
const recentActivities = [
  { name: 'David K.', distance: '12.5', time: '1h 05m', pace: "5'09\"", avatar: 'https://i.pravatar.cc/150?u=David' },
  { name: 'Mary N.', distance: '8.0', time: '45m', pace: "5'35\"", avatar: 'https://i.pravatar.cc/150?u=Mary' },
  { name: 'Peter O.', distance: '21.1', time: '1h 58m', pace: "4'54\"", avatar: 'https://i.pravatar.cc/150?u=Peter' },
  { name: 'Jane W.', distance: '5.0', time: '28m', pace: "5'26\"", avatar: 'https://i.pravatar.cc/150?u=Jane' },
  { name: 'Maina W.', distance: '10.2', time: '52m', pace: "5'05\"", avatar: 'https://i.pravatar.cc/150?u=Maina' },
  { name: 'Sarah K.', distance: '15.0', time: '1h 12m', pace: "4'48\"", avatar: 'https://i.pravatar.cc/150?u=Sarah' },
];

const leaderboard = [
  { rank: 1, name: 'Michael M.', km: 87.5, runs: 12, avatar: 'https://i.pravatar.cc/150?u=Michael' },
  { rank: 2, name: 'Faith K.', km: 72.3, runs: 10, avatar: 'https://i.pravatar.cc/150?u=Faith' },
  { rank: 3, name: 'Brian O.', km: 68.9, runs: 9, avatar: 'https://i.pravatar.cc/150?u=Brian' },
  { rank: 4, name: 'Maina W.', km: 64.2, runs: 8, avatar: 'https://i.pravatar.cc/150?u=Maina' },
  { rank: 5, name: 'Sarah K.', km: 61.8, runs: 8, avatar: 'https://i.pravatar.cc/150?u=Sarah' },
];

// --- UTILITY: COUNT UP COMPONENT ---
function CountUp({ end, suffix = '' }: { end: number, suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { bounce: 0, duration: 2000 });
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString() + suffix);

  useEffect(() => {
    if (isInView) spring.set(end);
  }, [isInView, end, spring]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

export function StravaSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="strava" className="py-24 bg-[#0a0a0a] relative overflow-hidden border-t border-white/5">
      
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="grid" width="4" height="4" patternUnits="userSpaceOnUse">
                <path d="M 4 0 L 0 0 0 4" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            >
            <div className="flex items-center gap-2 mb-4 text-[#FC4C02]">
                <Image src="/logos/strava.png" alt="Strava logo" width={80} height={100} className="object-contain" />
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white uppercase leading-none">
                WRN PULSE
            </h2>
            </motion.div>
            
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                 <p className="text-white/60 text-lg max-w-md font-body text-right md:text-left">
                    Real-time activity from the We Run Nairobi community. <br/>
                    <span className="text-[#FC4C02]">Proof of work.</span>
                </p>
            </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* COLUMN 1: Distance & Scrollable Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-6 h-[600px]"
          >
            {/* Monthly Stats Card - Simplified */}
            <div className="bg-[#111] border border-white/10 p-8 rounded-2xl relative overflow-hidden group shrink-0">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                   <TrendingUp size={80} />
              </div>
              <h3 className="font-display text-xl tracking-wider mb-6 flex items-center gap-2 text-white">
                <TrendingUp className="text-[#FC4C02]" size={20} />
                THIS WEEK
              </h3>
              <div className="space-y-4">
                <div>
                    <span className="text-white/40 text-xs uppercase tracking-widest font-mono mb-1 block text-left">Total Distance</span>
                    <span className="text-5xl font-display font-bold text-white">
                        <CountUp end={4520} suffix=" KM" />
                    </span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: '78%' } : {}}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                    className="h-full bg-[#FC4C02]"
                  />
                </div>
              </div>
            </div>

            {/* Scrollable Recent Activity (Replacing Streaks) */}
            <div className="bg-[#111] border border-white/10 p-6 rounded-2xl flex-1 flex flex-col overflow-hidden">
                <h3 className="font-display text-sm tracking-widest mb-6 flex items-center gap-2 text-white/60 uppercase shrink-0">
                    <Activity className="text-[#FC4C02]" size={16} />
                    Recent Activity
                </h3>
                <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar">
                    {recentActivities.map((activity, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all group">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 shrink-0">
                            <img src={activity.avatar} alt={activity.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-white font-bold text-sm truncate">{activity.name}</div>
                            <div className="text-[10px] text-white/40 font-mono uppercase tracking-tighter">
                                {activity.distance}km • {activity.time}
                            </div>
                        </div>
                        <div className="text-right shrink-0">
                            <div className="text-white font-mono text-xs">{activity.pace}</div>
                            <div className="text-[8px] text-white/30 uppercase tracking-widest">/km</div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
          </motion.div>

          {/* COLUMN 2: Runner of the Week Spotlight (Replacing Just In) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#111] border border-white/10 p-0 rounded-2xl h-[600px] flex flex-col overflow-hidden group"
          >
            {/* Map Background Placeholder */}
            <div className="h-1/2 w-full bg-[#1a1a1a] relative overflow-hidden p-6 flex flex-col justify-between">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    {/* Simulated GPS Polyline */}
                    <svg className="w-full h-full text-[#FC4C02]" viewBox="0 0 100 100">
                        <path d="M 20 80 Q 40 10 60 50 T 90 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 2" />
                    </svg>
                </div>
                
                <div className="relative z-10 flex justify-between items-start">
                    <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-mono text-[#FC4C02] uppercase tracking-widest">
                        Runner of the week
                    </div>
                    <div className="bg-black/60 backdrop-blur-md p-2 rounded-full border border-white/10 text-white">
                        <MapPin size={16} />
                    </div>
                </div>

                <div className="relative z-10">
                    <h4 className="text-white font-display text-3xl font-bold uppercase leading-none">The <br/> Nairobi <br/> Loop</h4>
                    <p className="text-white/40 text-xs font-mono mt-2 uppercase tracking-widest">Karura Forest Trails</p>
                </div>
            </div>

            <div className="p-8 flex-1 flex flex-col justify-between">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#FC4C02] rotate-3 group-hover:rotate-0 transition-transform duration-500">
                        <img src="https://i.pravatar.cc/150?u=Peter" alt="Runner" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-display font-bold text-white uppercase">Peter Ochieng</h3>
                        <p className="text-white/40 text-sm italic">"Chasing the sunrise at Karura."</p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 border-y border-white/5 py-6 my-6">
                    <div className="text-center">
                        <div className="text-[#FC4C02] mb-1"><Zap size={18} className="mx-auto" /></div>
                        <div className="text-white font-display font-bold">21.1</div>
                        <div className="text-[10px] text-white/30 uppercase tracking-widest font-mono">Distance</div>
                    </div>
                    <div className="text-center border-x border-white/5">
                        <div className="text-[#FC4C02] mb-1"><Clock size={18} className="mx-auto" /></div>
                        <div className="text-white font-display font-bold">1:58h</div>
                        <div className="text-[10px] text-white/30 uppercase tracking-widest font-mono">Time</div>
                    </div>
                    <div className="text-center">
                        <div className="text-[#FC4C02] mb-1"><Flame size={18} className="mx-auto" /></div>
                        <div className="text-white font-display font-bold">14</div>
                        <div className="text-[10px] text-white/30 uppercase tracking-widest font-mono">Streak</div>
                    </div>
                </div>

                <Button className="w-full border-white/10 bg-white/5 hover:bg-[#FC4C02] hover:text-white transition-all text-white/60 font-display font-bold uppercase tracking-widest text-xs h-12">
                    View Activity Detail
                </Button>
            </div>
          </motion.div>

          {/* COLUMN 3: Leaderboard (Top 5) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col h-[600px]"
          >
            <div className="bg-[#111] border border-white/10 p-6 rounded-2xl flex-1 flex flex-col relative overflow-hidden">
               <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FC4C02] blur-[80px] opacity-10 pointer-events-none" />

              <h3 className="font-display text-xl tracking-wider mb-8 flex items-center gap-2 text-white relative z-10">
                <Trophy className="text-[#FC4C02]" size={20} />
                LEADERBOARD
              </h3>
              
              <div className="space-y-2 flex-1 relative z-10 overflow-hidden">
                {leaderboard.map((runner, index) => (
                  <motion.div
                    key={runner.rank}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-xl border flex items-center gap-4 transition-all
                        ${index === 0 
                            ? 'bg-gradient-to-r from-[#FC4C02]/20 to-transparent border-[#FC4C02]/30' 
                            : 'bg-white/[0.02] border-white/5'
                        }
                    `}
                  >
                    <div className={`text-2xl font-display font-bold italic w-8 text-center
                        ${index === 0 ? 'text-[#FC4C02]' : 'text-white/30'}
                    `}>
                      #{runner.rank}
                    </div>
                    
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 shrink-0">
                        <img src={runner.avatar} alt={runner.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="font-display font-bold text-white text-sm truncate">{runner.name}</div>
                      <div className="text-xs text-white/40 font-body">{runner.runs} runs</div>
                    </div>
                    
                    <div className="text-right shrink-0">
                      <div className="text-xl font-display font-bold text-white">{runner.km}</div>
                      <div className="text-[10px] text-white/30 uppercase tracking-wider">km</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt- relative z-10">
                <Link href="https://strava.com/clubs/werunnairobi" target="_blank">
                    <Button className="w-full bg-[#FC4C02] hover:bg-[#e34402] text-white font-display font-bold tracking-wider uppercase h-14 text-sm">
                        Join on Strava <ExternalLink size={16} className="ml-2"/>
                    </Button>
                </Link>
               
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}