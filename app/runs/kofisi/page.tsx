"use client";

import { motion } from 'framer-motion';
import { 
  Clock, 
  MapPin, 
  Navigation, 
  ChevronLeft, 
  ExternalLink, 
  Calendar,
  ArrowRight,
  Maximize2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function KofisiPage() {
  const runData = {
    title: 'KOFISI',
    location: 'Riverside Square, Nairobi',
    description: 'A premium riverside experience. Starting from the heart of Riverside Square, this route offers a mix of urban elevation and scenic garden paths. Perfectly suited for runners looking for a mid-distance challenge with high-quality surfaces.',
    stats: [
      { label: 'Pace', value: '4:30 - 6:30', icon: Navigation },
      { label: 'Elevation', value: '120m Gain', icon: ArrowRight },
      { label: 'Surface', value: 'Tarmac/Trail', icon: MapPin },
    ],
    gallery: [
      '/kofisi/1.jpg', // Hero
      '/BD/2.jpg',
      '/BD/3.jpg',
      '/BD/4.jpg',
      '/BD/5.jpg',
      'https://images.unsplash.com/photo-1533560904424-a0c617f9a86d?q=80&w=1200',
      'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1200',
    ],
  };

  return (
    <main className="bg-black min-h-screen text-white selection:bg-white selection:text-black">
   

      {/* --- CINEMATIC HERO --- */}
      <section className="relative h-screen w-full overflow-hidden bg-neutral-900">
        <motion.div 
          initial={{ scale: 1.1 }} 
          animate={{ scale: 1 }} 
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <Image 
            src={runData.gallery[0]} 
            alt="Hero" 
            fill 
            priority
            className="object-cover opacity-80"
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
        
        <div className="absolute bottom-12 left-0 w-full px-6 md:px-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl"
          >
            <h1 className="text-7xl md:text-[12vw] font-display font-black leading-[0.8] uppercase italic -ml-1">
              {runData.title}
            </h1>
          </motion.div>
          
          <motion.div 
             initial={{ opacity: 0 }} 
             animate={{ opacity: 1 }} 
             transition={{ delay: 0.5 }}
             className="flex gap-12 border-l border-white/20 pl-8 pb-4"
          >
            <div>
              <p className="text-[10px] font-mono uppercase text-white/40 mb-2">Next Run</p>
              <p className="text-xl font-bold font-display uppercase tracking-wider">Sat, 7:30AM</p>
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase text-white/40 mb-2">Distance</p>
              <p className="text-xl font-bold font-display uppercase tracking-wider">Up to 14KM</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- IMAGE-LED MASONRY SECTION --- */}
      <section className="py-24 px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main Description */}
          <div className="md:col-span-5 mb-12 md:mb-0 pr-8">
            <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-white/40 mb-8 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-white/20" /> The Environment
            </h2>
            <p className="text-2xl md:text-3xl font-light leading-snug font-body mb-12">
              {runData.description}
            </p>
            
            <div className="space-y-8 pt-12 border-t border-white/10">
              {runData.stats.map((stat, i) => (
                <div key={i} className="flex items-center justify-between group cursor-default">
                  <div className="flex items-center gap-4">
                    <stat.icon size={18} className="text-white/20 group-hover:text-white transition-colors" />
                    <span className="text-xs font-mono uppercase tracking-widest text-white/40">{stat.label}</span>
                  </div>
                  <span className="text-lg font-display font-bold uppercase">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Masonry Gallery */}
          <div className="md:col-span-7 grid grid-cols-2 gap-6">
            <div className="relative h-[500px] rounded-sm overflow-hidden group">
               <Image src={runData.gallery[1]} alt="Run detail" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
               <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            </div>
            <div className="space-y-6">
               <div className="relative h-[240px] rounded-sm overflow-hidden group">
                  <Image src={runData.gallery[2]} alt="Run detail" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
               </div>
               <div className="relative h-[240px] rounded-sm overflow-hidden group">
                  <Image src={runData.gallery[3]} alt="Run detail" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
               </div>
            </div>
            <div className="col-span-2 relative h-[400px] rounded-sm overflow-hidden group">
               <Image src={runData.gallery[4]} alt="Wide detail" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
               <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-black/60 backdrop-blur-md p-3 border border-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 size={16} />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTAINED MAP SECTION --- */}
      <section className="py-24 px-6 md:px-12 bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div>
              <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-white/40 mb-2">Location</h2>
              <p className="text-2xl font-display font-bold uppercase">Riverside Square</p>
            </div>
            <Link href="https://maps.google.com" target="_blank">
              <Button variant="outline" className="border-white/10 hover:bg-white hover:text-black font-mono text-[10px] uppercase tracking-widest">
                Open in Google Maps <ExternalLink size={14} className="ml-2" />
              </Button>
            </Link>
          </div>
          <div className="w-full h-[500px] rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d762.7452874409406!2d36.78932927249363!3d-1.268971682312971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1714b5483c07%3A0x535f2b92a9c0cb03!2sKOFISI%20Square!5e0!3m2!1sen!2ske!4v1771180199047!5m2!1sen!2ske" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Kofisi Location"
            />
          </div>
        </div>
      </section>

      {/* --- MINIMAL FOOTER --- */}
      <footer className="py-20 bg-black text-center border-t border-white/5">
        <div className="max-w-2xl mx-auto px-6">
          <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em]">We Run Nairobi // No Pace Left Behind</p>
        </div>
      </footer>
    </main>
  );
}