"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, Clock, MapPin, ChevronRight, Navigation, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

interface RunType {
    id: string;
    title: string;
    description: string;
    when: string;
    time: string;
    location: string;
    distances: string;
    badge: string; 
    image: string;
    mapUrl: string;
}

const runTypes: RunType[] = [
  {
    id: 'karura',
    title: 'KARURA FOREST',
    description: 'Trail running through nature.',
    when: 'THIS SATURDAY',
    time: '7:30 AM',
    location: 'Gate A, Limuru Rd',
    distances: '5 / 10 / 15 KM',
    badge: 'bg-white text-black',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop',
    // FIXED: Direct search link for Gate A
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Karura+Forest+Gate+A+Limuru+Road', 
  },

  {
    id: 'bao-box',
    title: 'BAO BOX RUN',
    description: 'Urban run ending with good vibes and food.',
    when: 'EVERY SATURDAY',
    time: '7:30 AM',
    location: 'Gen. Mathenge Dr',
    distances: '6 / 10 / 15 KM',
    badge: 'bg-white text-black',
    image: '/baobox.webp',
    // FIXED: Direct search link for Bao Box
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Bao+Box+General+Mathenge',
  },
  {
    id: 'beer-district',
    title: 'BEER DISTRICT',
    description: 'Saturday run + dawn sessions.',
    when: 'EVERY SATURDAY',
    time: '7:30 AM',
    location: 'Delta Towers, Westlands',
    distances: '6 / 10 / 12 / 15 KM',
    badge: 'bg-white text-black',
    image: '/beer-district.png',
    // FIXED: Direct search link for Beer District
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Beer+District+Delta+Towers',
  },
  {
    id: 'tigoni',
    title: 'TIGONI HILLS',
    description: 'Scenic countryside run through tea farms.',
    when: 'NEXT SATURDAY',
    time: '7:30 AM',
    location: 'Tigoni Trails',
    distances: '8 / 10 / 18 KM',
    badge: 'bg-white text-black',
    image: '/tigoni.png',
    // FIXED: General search link for Tigoni
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Tigoni+Tea+Farms',
  }
];

export function ScheduleSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="schedule" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="text-foreground" size={24} />
            <span className="text-foreground font-medium tracking-widest uppercase text-sm">
              Weekly Schedule
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-4 uppercase">
            Find Your Run
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl font-body">
            From dawn patrols to trail adventures, there's a run for every mood and pace.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {runTypes.map((run, index) => (
            <motion.div
              key={run.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="
                group relative overflow-hidden bg-card rounded-lg transition-all duration-500
                border border-white/10 
                hover:-translate-y-1 
                hover:border-white/30 
                hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]
              "
            >
              {/* Image Container */}
              <div className="relative h-72 w-full overflow-hidden">
                <Image
                  src={run.image}
                  alt={run.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Bottom Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-transparent z-10" />
              </div>

              {/* Card Body */}
              <div className="p-8 relative z-20">
                <h3 className="text-3xl font-display font-bold mb-2 uppercase">{run.title}</h3>
                <p className="text-muted-foreground mb-6 font-body text-sm">{run.description}</p>
                
                {/* Info Grid */}
                <div className="flex flex-wrap gap-x-6 gap-y-3 mb-6 text-xs text-muted-foreground font-mono uppercase">
                   <div className="flex items-center gap-2">
                       <Clock size={14}/> 
                       {run.time}
                   </div>
                   <div className="flex items-center gap-2">
                       <Navigation size={14}/> 
                       {run.distances}
                   </div>
                   <div className="flex items-center gap-2 w-full sm:w-auto">
                       <MapPin size={14}/> 
                       {run.location}
                   </div>
                </div>
                
                {/* BUTTON: Open Map in New Tab */}
                <Link href={run.mapUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" className="group/btn p-0 h-auto text-foreground hover:text-white font-display font-bold tracking-wider uppercase text-xs">
                    Get Directions
                    <ChevronRight size={16} className="ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Actions Button Group */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-6">
            <Link href="/calendar">
            <Button 
              className="bg-white text-black hover:bg-neutral-200 font-display font-bold tracking-wider px-8 py-6 rounded-none uppercase w-full md:w-auto"
            >
              View Full Calendar
            </Button>
          </Link>
            <Link href="https://instagram.com/werunnairobi" target="_blank">
                <Button 
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 hover:text-white font-display font-bold tracking-wider px-8 py-6 rounded-none uppercase w-full md:w-auto"
                >
                <Instagram className="mr-2 h-4 w-4" />
                Check Instagram for Updates
                </Button>
            </Link>
        </div>

      </div>
    </section>
  );
}