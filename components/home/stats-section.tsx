"use client";

import { motion, useSpring, useTransform, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

const stats = [
  { label: 'RUNNERS', value: 2000, suffix: '+' },
  { label: 'CIRCUITS', value: 100, suffix: '+' },
  { label: 'YEARS', value: 5, suffix: '+' },
  { label: 'MARATHONERS', value: 50, suffix: '+' },
];

function Counter({ value, suffix }: { value: number, suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const spring = useSpring(0, { mass: 1, stiffness: 60, damping: 20, duration: 2000 });
  const displayValue = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <div className="relative bg-background pt-24 pb-0 z-20">
      
      {/* ADJUSTMENT: 
          Moved up to (-mt-20 md:-mt-32). 
          This is the "Sweet Spot" - nice overlap, but leaves the Hero breathable.
      */}
      <div className="relative -mt-20 md:-mt-32 mb-0 z-30 transform -skew-y-2 origin-top-right">
        
        <div className="bg-white text-black py-16 md:py-24 w-full shadow-2xl shadow-[inset_0_10px_40px_rgba(0,0,0,0.05)]">
           <div className="container mx-auto px-4 transform skew-y-2 origin-top-right">
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h3 className="text-6xl md:text-8xl font-display font-bold tracking-tighter mb-2 text-black">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </h3>
                    
                    <p className="font-display text-sm md:text-base tracking-[0.2em] uppercase font-bold text-neutral-400">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>

           </div>
        </div>
      </div>
      
    </div>
  );
}