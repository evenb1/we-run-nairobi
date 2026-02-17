"use client";

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Calendar, Clock, ChevronRight, ChevronLeft, Navigation, X, ExternalLink, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { RUNS, RunType } from '@/lib/runs-data'; // IMPORTED HERE

export function ScheduleSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const router = useRouter();
  
  const [selectedRun, setSelectedRun] = useState<RunType | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (selectedRun) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedRun]);

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
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="text-foreground" size={24} />
            <span className="text-foreground font-medium tracking-widest uppercase text-sm">Weekly Schedule</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-4 uppercase">Find Your Run</h2>
          <p className="text-muted-foreground text-lg max-w-xl font-body">From dawn patrols to trail adventures, there's a run for every mood and pace.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {RUNS.map((run, index) => (
            <motion.div
              key={run.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden bg-card rounded-lg border border-white/10 hover:border-white/30 cursor-pointer transition-all"
              onClick={() => setSelectedRun(run)}
            >
              <div className="relative h-72 w-full overflow-hidden bg-neutral-900">
                <CldImage src={run.image} alt={run.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/20 to-transparent z-10" />
              </div>
              <div className="p-8 relative z-20">
                <h3 className="text-3xl font-display font-bold mb-2 uppercase">{run.title}</h3>
                <p className="text-muted-foreground mb-6 font-body text-sm line-clamp-2">{run.description}</p>
                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground font-mono uppercase mb-6">
                   <span className="flex items-center gap-2"><Clock size={14}/> {run.time}</span>
                   <span className="flex items-center gap-2"><Navigation size={14}/> {run.distances}</span>
                </div>
                <Button variant="ghost" className="p-0 h-auto text-foreground hover:text-white uppercase text-xs font-bold tracking-widest">
                  Quick View <ChevronRight size={16} className="ml-1" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedRun && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedRun(null)}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-[100] flex items-center justify-center p-0 md:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111] w-full max-w-5xl md:rounded-2xl shadow-2xl overflow-hidden relative flex flex-col my-auto"
            >
              <button onClick={() => setSelectedRun(null)} className="absolute top-4 right-4 z-50 p-3 bg-black/60 rounded-full border border-white/10 text-white">
                <X size={20} />
              </button>

              <div className="relative h-64 md:h-[400px] shrink-0 overflow-hidden bg-neutral-900">
                <AnimatePresence mode='wait'>
                  <motion.div key={currentImageIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
                    <CldImage src={selectedRun.gallery[currentImageIndex]} alt={selectedRun.title} fill className="object-cover" priority />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-between px-4">
                  <button onClick={prevImage} className="p-2 bg-black/40 hover:bg-white/20 rounded-full text-white"><ChevronLeft /></button>
                  <button onClick={nextImage} className="p-2 bg-black/40 hover:bg-white/20 rounded-full text-white"><ChevronRight /></button>
                </div>
              </div>

              <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white/10">
                <div className="p-6 md:p-10 flex-1">
                  <h3 className="text-4xl font-display font-bold text-white uppercase mb-4">{selectedRun.title}</h3>
                  <p className="text-white/60 mb-8 font-body leading-relaxed">{selectedRun.longDescription}</p>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="space-y-1">
                        <span className="text-[10px] text-white/40 uppercase tracking-tighter font-mono">Paces/Distance</span>
                        <p className="text-white font-bold">{selectedRun.distances}</p>
                    </div>
                    <div className="space-y-1">
                        <span className="text-[10px] text-white/40 uppercase tracking-tighter font-mono">Start Time</span>
                        <p className="text-white font-bold">{selectedRun.time}</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button onClick={() => router.push(`/runs/${selectedRun.id}`)} className="flex-1 bg-white text-black hover:bg-neutral-200 uppercase font-bold tracking-widest py-6">
                        Full Details <Info className="ml-2 w-4 h-4" />
                    </Button>
                    <Link href={selectedRun.mapUrl} target="_blank" className="flex-1">
                        <Button variant="outline" className="w-full border-white/20 text-white uppercase font-bold tracking-widest py-6">
                            Directions <ExternalLink className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                  </div>
                </div>
                <div className="w-full md:w-[40%] h-[300px] md:h-auto bg-neutral-900 overflow-hidden relative">
                    <iframe src={selectedRun.mapEmbed} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" className=" contrast-125 opacity-70 hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}