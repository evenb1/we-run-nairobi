"use client";

import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Activity, Trophy, TrendingUp, ExternalLink, Clock, Zap, Award, Repeat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

interface StravaData {
  club: {
    name: string;
    memberCount: number;
    city: string;
    country: string;
  };
  stats: {
    totalDistanceThisWeek: string;
    activitiesCount: number;
  };
  recentActivities: Array<{
    name: string;
    distance: string;
    time: string;
    pace: string;
    initials: string;
    activityName: string;
  }>;
  leaderboard: Array<{
    rank: number;
    name: string;
    km: number;
    runs: number;
    initials: string;
  }>;
  featuredRunner: {
    name: string;
    initials: string;
    distance: string;
    time: string;
    location: string;
  } | null;
  lastUpdated: string | null;
}

const fallbackData: StravaData = {
  club: { name: 'We Run Nairobi', memberCount: 3872, city: 'Nairobi', country: 'Kenya' },
  stats: { totalDistanceThisWeek: '4520', activitiesCount: 30 },
  recentActivities: [
    { name: 'David K.', distance: '12.5', time: '1h 05m', pace: "5'09\"", initials: 'DK', activityName: 'Morning Run' },
    { name: 'Mary N.', distance: '8.0', time: '45m', pace: "5'35\"", initials: 'MN', activityName: 'Evening Run' },
    { name: 'Peter O.', distance: '21.1', time: '1h 58m', pace: "4'54\"", initials: 'PO', activityName: 'Long Run' },
    { name: 'Jane W.', distance: '5.0', time: '28m', pace: "5'26\"", initials: 'JW', activityName: 'Easy Run' },
    { name: 'Maina W.', distance: '10.2', time: '52m', pace: "5'05\"", initials: 'MW', activityName: 'Tempo Run' },
    { name: 'Sarah K.', distance: '15.0', time: '1h 12m', pace: "4'48\"", initials: 'SK', activityName: 'Saturday Run' },
  ],
  leaderboard: [
    { rank: 1, name: 'Michael M.', km: 87.5, runs: 12, initials: 'MM' },
    { rank: 2, name: 'Faith K.', km: 72.3, runs: 10, initials: 'FK' },
    { rank: 3, name: 'Brian O.', km: 68.9, runs: 9, initials: 'BO' },
    { rank: 4, name: 'Maina W.', km: 64.2, runs: 8, initials: 'MW' },
    { rank: 5, name: 'Sarah K.', km: 61.8, runs: 8, initials: 'SK' },
  ],
  featuredRunner: {
    name: 'Peter Ochieng',
    initials: 'PO',
    distance: '21.1',
    time: '3 runs',
    location: 'Nairobi, Kenya',
  },
  lastUpdated: null,
};

function InitialsAvatar({ initials, size }: { initials: string; size: 'sm' | 'lg' | 'xl' }) {
  const sizes = {
    sm: 'w-10 h-10 text-xs',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-20 h-20 md:w-24 md:h-24 text-xl md:text-2xl', // Scaled for mobile
  };
  return (
    <div className={`${sizes[size]} rounded-full bg-[#FC4C02]/20 border-2 border-[#FC4C02]/40 flex items-center justify-center shrink-0`}>
      <span className="font-display font-bold text-[#FC4C02] leading-none select-none">{initials}</span>
    </div>
  );
}

function TimeAgo({ timestamp }: { timestamp: string | null }) {
  const [label, setLabel] = useState('');
  useEffect(() => {
    if (!timestamp) return;
    const diff = Math.floor((Date.now() - new Date(timestamp).getTime()) / 60000);
    if (diff < 1) setLabel('just now');
    else if (diff < 60) setLabel(`${diff}m ago`);
    else setLabel(`${Math.floor(diff / 60)}h ago`);
  }, [timestamp]);
  if (!label) return null;
  return <span className="text-white/20 text-xs font-mono">· updated {label}</span>;
}

function CountUp({ end, suffix = '' }: { end: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { bounce: 0, duration: 2000 });
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString() + suffix);
  useEffect(() => { if (isInView) spring.set(end); }, [isInView, end, spring]);
  return <motion.span ref={ref}>{display}</motion.span>;
}

export function StravaSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [data, setData] = useState<StravaData>(fallbackData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/strava')
      .then((res) => res.json())
      .then((apiData) => {
        if (apiData && !apiData.error) setData(apiData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const mostConsistent = data.leaderboard.length > 0
    ? [...data.leaderboard].sort((a, b) => b.runs - a.runs)[0]
    : null;

  return (
    <section ref={ref} id="strava" className="py-16 md:py-24 bg-[#0a0a0a] relative overflow-hidden border-t border-white/5">

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid" width="4" height="4" patternUnits="userSpaceOnUse">
            <path d="M 4 0 L 0 0 0 4" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Image src="/logos/strava.png" alt="Strava" width={80} height={100} className="object-contain" />
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
            <p className="text-white/60 text-base md:text-lg max-w-md font-body text-left md:text-right">
              Real-time activity from the We Run Nairobi community.{' '}
              {!loading && (
                <span className="text-white/40 text-sm flex flex-wrap items-center gap-1 mt-1 justify-start md:justify-end">
                  {data.club.memberCount.toLocaleString()} members · {data.stats.activitiesCount} runs this week{' '}
                  <TimeAgo timestamp={data.lastUpdated} />
                </span>
              )}
              <span className="text-[#FC4C02] ml-1">Proof of work.</span>
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* COLUMN 1: Stats + Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-6 md:h-[600px]"
          >
            {/* Stats Card */}
            <div className="bg-[#111] border border-white/10 p-6 md:p-8 rounded-2xl relative overflow-hidden group shrink-0">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <TrendingUp size={80} />
              </div>
              <h3 className="font-display text-xl tracking-wider mb-6 flex items-center gap-2 text-white">
                <TrendingUp className="text-[#FC4C02]" size={20} />
                THIS WEEK
              </h3>
              <div className="space-y-4">
                <div>
                  <span className="text-white/40 text-xs uppercase tracking-widest font-mono mb-1 block">
                    Total Distance
                  </span>
                  <span className="text-4xl md:text-5xl font-display font-bold text-white">
                    <CountUp end={parseInt(data.stats.totalDistanceThisWeek)} suffix=" KM" />
                  </span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: '78%' } : {}}
                    transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                    className="h-full bg-[#FC4C02]"
                  />
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-[#111] border border-white/10 p-6 rounded-2xl md:flex-1 flex flex-col overflow-hidden h-[400px] md:h-auto">
              <h3 className="font-display text-sm tracking-widest mb-4 flex items-center gap-2 text-white/60 uppercase shrink-0">
                <Activity className="text-[#FC4C02]" size={16} />
                Latest Runs
              </h3>
              <div className="space-y-2 overflow-y-auto pr-1 custom-scrollbar">
                {data.recentActivities.map((activity, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all"
                  >
                    <InitialsAvatar initials={activity.initials} size="sm" />
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-bold text-sm truncate">{activity.name}</div>
                      <div className="text-[10px] text-white/30 font-mono truncate italic">{activity.activityName}</div>
                      <div className="text-[10px] text-white/40 font-mono uppercase tracking-tighter">
                        {activity.distance}km · {activity.time}
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

          {/* COLUMN 2: Runner of the Week + Most Consistent */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-6 md:h-[600px]"
          >
            {/* Runner of the Week */}
            <div className="bg-[#111] border border-white/10 rounded-2xl flex-1 flex flex-col overflow-hidden group relative min-h-[400px] md:min-h-0">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#FC4C02] blur-[100px] opacity-10 rounded-full" />
              </div>

              {data.featuredRunner ? (
                <div className="p-6 md:p-8 flex flex-col h-full relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="bg-[#FC4C02]/10 px-3 py-1.5 rounded-full border border-[#FC4C02]/20 text-[10px] font-mono text-[#FC4C02] uppercase tracking-widest">
                      This Week
                    </div>
                    <Trophy className="text-[#FC4C02]" size={18} />
                  </div>

                  <div className="flex flex-col items-center text-center flex-1 justify-center gap-6">
                    <div className="rotate-3 group-hover:rotate-0 transition-transform duration-500">
                      <InitialsAvatar initials={data.featuredRunner.initials} size="xl" />
                    </div>
                    <div>
                      <div className="text-white/40 text-xs uppercase tracking-widest font-mono mb-2">Runner of the Week</div>
                      <h3 className="text-2xl md:text-3xl font-display font-bold text-white uppercase leading-tight">
                        {data.featuredRunner.name}
                      </h3>
                      <p className="text-white/30 text-sm mt-1">{data.featuredRunner.location}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 border-t border-white/5 pt-6 mt-6">
                    <div className="text-center">
                      <div className="text-[#FC4C02] mb-1"><Zap size={16} className="mx-auto" /></div>
                      <div className="text-white font-display font-bold text-sm md:text-base">{data.featuredRunner.distance}km</div>
                      <div className="text-[9px] text-white/30 uppercase tracking-widest font-mono">Total</div>
                    </div>
                    <div className="text-center border-x border-white/5">
                      <div className="text-[#FC4C02] mb-1"><Clock size={16} className="mx-auto" /></div>
                      <div className="text-white font-display font-bold text-sm md:text-base">{data.featuredRunner.time}</div>
                      <div className="text-[9px] text-white/30 uppercase tracking-widest font-mono">Runs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[#FC4C02] mb-1"><Award size={16} className="mx-auto" /></div>
                      <div className="text-white font-display font-bold text-sm md:text-base">#1</div>
                      <div className="text-[9px] text-white/30 uppercase tracking-widest font-mono">Rank</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-white/40">
                  No activity this week
                </div>
              )}
            </div>

            {/* Most Consistent Runner */}
            {mostConsistent && (
              <div className="bg-[#111] border border-white/10 rounded-2xl p-6 shrink-0">
                <div className="flex items-center gap-4">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10 shrink-0">
                    <Repeat className="text-[#FC4C02]" size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-white/40 uppercase tracking-widest font-mono mb-1">Most Consistent</div>
                    <div className="text-white font-display font-bold truncate text-sm md:text-base">{mostConsistent.name}</div>
                    <div className="text-white/40 text-[10px] md:text-xs">{mostConsistent.runs} runs · {mostConsistent.km}km</div>
                  </div>
                  <InitialsAvatar initials={mostConsistent.initials} size="sm" />
                </div>
              </div>
            )}
          </motion.div>

          {/* COLUMN 3: Leaderboard */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col md:h-[600px]"
          >
            <div className="bg-[#111] border border-white/10 p-6 rounded-2xl md:flex-1 flex flex-col relative overflow-hidden min-h-[500px] md:min-h-0">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FC4C02] blur-[80px] opacity-10 pointer-events-none" />

              <h3 className="font-display text-xl tracking-wider mb-8 flex items-center gap-2 text-white relative z-10">
                <Trophy className="text-[#FC4C02]" size={20} />
                LEADERBOARD
              </h3>

              <div className="space-y-2 flex-1 relative z-10 overflow-hidden">
                {data.leaderboard.map((runner, index) => (
                  <motion.div
                    key={runner.rank}
                    whileHover={{ scale: 1.02 }}
                    className={`p-3 md:p-4 rounded-xl border flex items-center gap-3 md:gap-4 transition-all ${
                      index === 0
                        ? 'bg-gradient-to-r from-[#FC4C02]/20 to-transparent border-[#FC4C02]/30'
                        : 'bg-white/[0.02] border-white/5'
                    }`}
                  >
                    <div className={`text-xl md:text-2xl font-display font-bold italic w-6 md:w-8 text-center ${index === 0 ? 'text-[#FC4C02]' : 'text-white/30'}`}>
                      #{runner.rank}
                    </div>
                    <InitialsAvatar initials={runner.initials} size="sm" />
                    <div className="flex-1 min-w-0">
                      <div className="font-display font-bold text-white text-xs md:text-sm truncate">{runner.name}</div>
                      <div className="text-[10px] md:text-xs text-white/40">{runner.runs} runs</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-lg md:text-xl font-display font-bold text-white">{runner.km}</div>
                      <div className="text-[8px] md:text-[10px] text-white/30 uppercase tracking-wider">km</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 relative z-10">
                <Link href="https://www.strava.com/clubs/werunnairobi" target="_blank">
                  <Button className="w-full bg-[#FC4C02] hover:bg-[#e34402] text-white font-display font-bold tracking-wider uppercase h-14 text-sm">
                    Join on Strava <ExternalLink size={16} className="ml-2" />
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