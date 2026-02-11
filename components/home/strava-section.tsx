"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Activity, Trophy, TrendingUp, Flame, User } from 'lucide-react';
import { CountUp } from '@/components/ui/CountUp';
import { Button } from '@/components/ui/button';

const recentActivities = [
  { name: 'David K.', distance: '8.2', time: '42:15', pace: "5'09\"", avatar: 'D' },
  { name: 'Mary N.', distance: '5.1', time: '28:30', pace: "5'35\"", avatar: 'M' },
  { name: 'Peter O.', distance: '12.0', time: '58:45', pace: "4'54\"", avatar: 'P' },
  { name: 'Jane W.', distance: '6.5', time: '35:20', pace: "5'26\"", avatar: 'J' },
];

const leaderboard = [
  { rank: 1, name: 'Michael M.', km: 87.5, runs: 12 },
  { rank: 2, name: 'Faith K.', km: 72.3, runs: 10 },
  { rank: 3, name: 'Brian O.', km: 68.9, runs: 9 },
];

export function StravaSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="strava" className="py-24 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="topography" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="10" cy="10" r="5" fill="none" stroke="currentColor" strokeWidth="0.3" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#topography)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <Activity className="text-foreground" size={24} />
            <span className="text-foreground font-medium tracking-widest uppercase text-sm">
              Strava Integration
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-4 uppercase">
            Track Your Progress
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl font-body">
            Connected to Strava. See what the community is running and where you stack up.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Club Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="bg-card border border-border p-6 rounded-lg shadow-sm">
              <h3 className="font-display text-xl tracking-wider mb-6 flex items-center gap-2">
                <TrendingUp className="text-foreground" size={20} />
                This Month
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-body">Total Distance</span>
                  <span className="text-2xl font-display font-bold">
                    <CountUp end={18750} suffix=" KM" />
                  </span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: '78%' } : {}}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-foreground"
                  />
                </div>
                <div className="flex justify-between items-center border-t border-border pt-4">
                  <span className="text-muted-foreground font-body">Active Runners</span>
                  <span className="text-xl font-display font-bold">
                    <CountUp end={312} />
                  </span>
                </div>
                <div className="flex justify-between items-center border-t border-border pt-2">
                  <span className="text-muted-foreground font-body">Total Runs</span>
                  <span className="text-xl font-display font-bold">
                    <CountUp end={847} />
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border p-6 rounded-lg shadow-sm">
              <h3 className="font-display text-xl tracking-wider mb-6 flex items-center gap-2">
                <Flame className="text-foreground" size={20} />
                Streak Leaders
              </h3>
              <div className="space-y-3">
                {['Active 28 days', 'Active 21 days', 'Active 14 days'].map((streak, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <span className="text-foreground font-display font-bold w-4">{i + 1}</span>
                    <div className="w-8 h-8 border border-foreground/30 rounded-full flex items-center justify-center bg-muted">
                      <User size={14} className="text-foreground" />
                    </div>
                    <span className="text-muted-foreground font-body">{streak}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-card border border-border p-6 h-full rounded-lg shadow-sm">
              <h3 className="font-display text-xl tracking-wider mb-6 flex items-center gap-2">
                <Activity className="text-foreground" size={20} />
                Recent Activity
              </h3>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-4 p-3 bg-secondary/50 hover:bg-foreground hover:text-background transition-colors group rounded-md cursor-pointer"
                  >
                    <div className="w-10 h-10 border border-foreground/30 group-hover:border-background/30 rounded-full flex items-center justify-center font-display font-bold">
                      {activity.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="font-display font-bold">{activity.name}</div>
                      <div className="text-sm text-muted-foreground group-hover:text-background/70 font-mono">
                        {activity.distance} km • {activity.time}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-display font-bold">{activity.pace}</div>
                      <div className="text-xs text-muted-foreground group-hover:text-background/70 uppercase">/km</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Leaderboard */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="bg-card border border-border p-6 h-full rounded-lg shadow-sm flex flex-col">
              <h3 className="font-display text-xl tracking-wider mb-6 flex items-center gap-2">
                <Trophy className="text-foreground" size={20} />
                Leaderboard
              </h3>
              <div className="space-y-4 flex-1">
                {leaderboard.map((runner, index) => (
                  <motion.div
                    key={runner.rank}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className={`p-4 border rounded-md ${index === 0 ? 'border-foreground bg-foreground/5' : 'border-border bg-secondary/30'}`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`text-3xl font-display font-bold ${index === 0 ? 'text-foreground' : 'text-muted-foreground'}`}>
                        #{runner.rank}
                      </span>
                      <div className="flex-1">
                        <div className="font-display font-bold">{runner.name}</div>
                        <div className="text-sm text-muted-foreground font-body">{runner.runs} runs</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-display font-bold">{runner.km}</div>
                        <div className="text-xs text-muted-foreground uppercase">km</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Button className="w-full mt-6 bg-foreground hover:bg-background text-background hover:text-foreground border border-foreground font-display font-bold tracking-wider transition-all uppercase py-6 rounded-none">
                Join on Strava
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}