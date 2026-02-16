"use client";

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, ChevronRight, ChevronLeft, Navigation, X, ExternalLink, Camera, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// --- DATA STRUCTURE ---
interface RunType {
    id: string;
    title: string;
    description: string;
    when: string;
    time: string;
    location: string;
    distances: string;
    image: string;     // Main Thumbnail
    gallery: string[]; // Hero Carousel Images
    mapUrl: string;    // External Button Link
    mapEmbed: string;  // Iframe Link
}

const runTypes: RunType[] = [
  {
    id: 'karura',
    title: 'KARURA FOREST',
    description: 'Trail running through nature. Meet at the field next to tennis courts.',
    when: 'THIS SATURDAY',
    time: '7:30 AM',
    location: 'Gate A, Limuru Rd',
    distances: '5 / 10 / 15 KM',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop',
    gallery: [
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200',
        'https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=1200',
        'https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=1200',
    ],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Karura+Forest+Gate+A+Limuru+Road',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8730088627435!2d36.814629775780006!3d-1.247260335586396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f170000b39e3b%3A0x5c64ec570397e766!2sKarura%20Forest%20Gate%20A!5e0!3m2!1sen!2ske!4v1770874592829!5m2!1sen!2ske', 
  },
  {
    id: 'bao-box',
    title: 'BAO BOX RUN',
    description: 'Urban run along General Mathenge ending with good vibes and food.',
    when: 'EVERY SATURDAY',
    time: '7:30 AM',
    location: 'Gen. Mathenge Dr',
    distances: '6 / 10 / 15 KM',
    image: '/baobox.webp',
    gallery: [
        '/baobox.webp',
        'https://images.unsplash.com/photo-1571358655738-c182dc8c996d?q=80&w=1200',
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200',
    ],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Bao+Box+General+Mathenge',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.86831692985!2d36.787195375779895!3d-1.2503519355895827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f173a1357bc9b%3A0x6b8743e1274c418e!2sBao%20Box!5e0!3m2!1sen!2ske!4v1770874627701!5m2!1sen!2ske',
  },
  {
    id: 'beer-district',
    title: 'BEER DISTRICT',
    description: 'Saturday run + dawn sessions at Delta Towers.',
    when: 'EVERY SATURDAY',
    time: '7:30 AM',
    location: 'Delta Towers, Westlands',
    distances: '6 / 10 / 12 / 15 KM',
    image: '/BD/3.jpg',
     gallery: [
      
        '/BD/2.jpg',
        
        '/BD/4.jpg',
        '/BD/5.jpg',
    ],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Beer+District+Delta+Towers',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8438435826797!2d36.79939537577996!3d-1.2663555356063454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f17c9e6423597%3A0xf14948a5f019daa7!2s254%20Beer%20District!5e0!3m2!1sen!2ske!4v1770874650725!5m2!1sen!2ske',
  },
  {
    id: 'kofisi',
    title: 'KOFISI',
    description: 'Scenic riverside run starting from Riverside Square.',
    when: 'NEXT SATURDAY',
    time: '7:30 AM',
    location: 'KOFISI, Riverside Dr',
    distances: '6 / 8 / 10 / 12 / 14 KM',
    image: '/kofisi/1.jpg',
    gallery: [
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200',
        'https://images.unsplash.com/photo-1533560904424-a0c617f9a86d?q=80&w=1200',
        'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1200',
    ],
    mapUrl: 'https://www.google.com/maps/search/KOFISI+Riverside+Square',
    mapEmbed: 'https://www.google.com/maps/embed', 
  }
];

export function ScheduleSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const router = useRouter();
  
  // Modal State
  const [selectedRun, setSelectedRun] = useState<RunType | null>(null);
  // Carousel State
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset carousel when opening a new run
  useEffect(() => {
    setCurrentImageIndex(0);
    if (selectedRun) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedRun]);

  const handleRunCardClick = (run: RunType) => {
    if (run.id === 'kofisi') {
      router.push('/runs/kofisi');
    } else {
      setSelectedRun(run);
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedRun) return;
    setCurrentImageIndex((prev) => (prev === selectedRun.gallery.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedRun) return;
    setCurrentImageIndex((prev) => (prev === 0 ? selectedRun.gallery.length - 1 : prev - 1));
  };

  return (
    <section ref={ref} id="schedule" className="py-24 bg-background relative">
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
                cursor-pointer
              "
              onClick={() => handleRunCardClick(run)}
            >
              {/* Image Container */}
              <div className="relative h-72 w-full overflow-hidden">
                <Image
                  src={run.image}
                  alt={run.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-transparent z-10" />
              </div>

              {/* Card Body */}
              <div className="p-8 relative z-20">
                <h3 className="text-3xl font-display font-bold mb-2 uppercase">{run.title}</h3>
                <p className="text-muted-foreground mb-6 font-body text-sm line-clamp-2">{run.description}</p>
                
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
                       {run.location.split(',')[0]}
                   </div>
                </div>
                
                <Button variant="ghost" className="group/btn p-0 h-auto text-foreground hover:text-white font-display font-bold tracking-wider uppercase text-xs">
                  View Details
                  <ChevronRight size={16} className="ml-1 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
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

      {/* --- MODAL (POPUP) --- */}
      <AnimatePresence>
        {selectedRun && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRun(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-0 md:p-6"
            >
              
              {/* Modal Window */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#111] w-full max-w-5xl md:rounded-2xl shadow-2xl overflow-hidden relative flex flex-col max-h-[100vh] md:max-h-[90vh]"
              >
                
                {/* Close Button (Floating) */}
                <button 
                    onClick={() => setSelectedRun(null)}
                    className="absolute top-4 right-4 z-50 p-2 bg-black/40 backdrop-blur-md hover:bg-white/20 rounded-full transition-colors border border-white/10"
                >
                    <X className="text-white" size={20} />
                </button>

                {/* --- TOP HALF: HERO CAROUSEL --- */}
                <div className="relative h-64 md:h-96 w-full shrink-0 bg-neutral-900 group">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={currentImageIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={selectedRun.gallery[currentImageIndex]}
                                alt={selectedRun.title}
                                fill
                                className="object-cover"
                            />
                             {/* Gradient Overlay for Text Visibility */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-black/30" />
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Arrows */}
                    <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button onClick={prevImage} className="p-2 bg-black/50 backdrop-blur hover:bg-white/20 rounded-full text-white border border-white/10">
                            <ChevronLeft size={24} />
                        </button>
                        <button onClick={nextImage} className="p-2 bg-black/50 backdrop-blur hover:bg-white/20 rounded-full text-white border border-white/10">
                            <ChevronRight size={24} />
                        </button>
                    </div>

                    {/* Dots Indicator */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                        {selectedRun.gallery.map((_, idx) => (
                            <div 
                                key={idx} 
                                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/40'}`}
                            />
                        ))}
                    </div>

                    {/* Title Overlay */}
                     <div className="absolute bottom-6 left-6 md:left-8 z-20">
                        <div className="flex items-center gap-2 mb-2">
                             <span className="bg-white/10 backdrop-blur border border-white/10 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest">
                                 {selectedRun.id}
                             </span>
                        </div>
                        <h3 className="text-3xl md:text-5xl font-display font-bold text-white uppercase drop-shadow-lg">
                            {selectedRun.title}
                        </h3>
                     </div>
                </div>

                {/* --- BOTTOM HALF: SPLIT VIEW --- */}
                <div className="flex-1 flex flex-col md:flex-row bg-[#111] overflow-hidden">
                    
                    {/* LEFT: Info & Stats */}
                    <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto">
                        <p className="text-white/70 text-sm md:text-base mb-8 leading-relaxed font-body">
                            {selectedRun.description}
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                             <div className="p-4 bg-white/5 rounded border border-white/5">
                                <div className="flex items-center gap-2 text-white/50 mb-2">
                                    <Clock size={16} />
                                    <span className="text-xs uppercase tracking-widest font-mono">Time</span>
                                </div>
                                <span className="text-white font-bold text-lg">{selectedRun.time}</span>
                            </div>
                            <div className="p-4 bg-white/5 rounded border border-white/5">
                                <div className="flex items-center gap-2 text-white/50 mb-2">
                                    <Navigation size={16} />
                                    <span className="text-xs uppercase tracking-widest font-mono">Distances</span>
                                </div>
                                <span className="text-white font-bold text-lg">{selectedRun.distances}</span>
                            </div>
                        </div>

                         <div className="flex items-start gap-3 p-4 bg-white/5 rounded border border-white/5 mb-8">
                                <MapPin className="text-white/50 shrink-0 mt-1" size={18} />
                                <div>
                                    <span className="text-xs text-white/50 uppercase tracking-widest font-mono block mb-1">Meeting Point</span>
                                    <span className="text-white font-medium">{selectedRun.location}</span>
                                </div>
                        </div>

                        <Link href={selectedRun.mapUrl} target="_blank" className="mt-auto">
                            <Button className="w-full bg-white text-black hover:bg-neutral-200 font-display font-bold tracking-wider uppercase h-12">
                                Get Directions <ExternalLink className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>

                    {/* RIGHT: Map Embed */}
                    <div className="w-full md:w-1/2 min-h-[300px] bg-neutral-900 border-l border-white/10 relative">
                        <iframe 
                            src={selectedRun.mapEmbed}
                            width="100%" 
                            height="100%" 
                            style={{ border: 0, minHeight: '100%' }} 
                            allowFullScreen 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            className=" opacity-80 hover:opacity-100"
                        />
                         <div className="absolute top-4 left-4 pointer-events-none">
                            <span className="bg-black/80 backdrop-blur border border-white/10 text-white text-[10px] font-bold px-3 py-1 rounded uppercase tracking-widest">
                                Interactive Map
                            </span>
                         </div>
                    </div>

                </div>

              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}