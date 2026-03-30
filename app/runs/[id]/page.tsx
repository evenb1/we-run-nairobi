"use client";

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useLayoutEffect } from 'react'; 
import { ChevronLeft, ExternalLink, Activity, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { RUNS } from '@/lib/runs-data';

const IK = "https://ik.imagekit.io/znzj2xg4q/we-run";

const getImageUrl = (id: string) => {
  if (!id) return '';
  if (id.startsWith('http')) return id;
  if (id.startsWith('/')) return id;
  const map: Record<string, string> = {
    'we-run-nairobi/karura/karura': `${IK}/karura/karura_oU_KVKcYL.jpeg`,
    'we-run-nairobi/baobox': `${IK}/root/baobox_leWBKSxUU.webp`,
    'we-run-nairobi/BD/1': `${IK}/BD/1_O1saSAcr3.jpg`,
    'we-run-nairobi/BD/2': `${IK}/BD/2_GlR8zs1EL.jpg`,
    'we-run-nairobi/BD/3': `${IK}/BD/3_6Pm4L1kDQ.jpg`,
    'we-run-nairobi/BD/4': `${IK}/BD/4_ekOfJferi.jpg`,
    'we-run-nairobi/BD/5': `${IK}/BD/5_cCzfHDuJr.jpg`,
    'we-run-nairobi/kofisi/1': `${IK}/kofisi/1_6ryp5opuq.jpg`,
    'we-run-nairobi/kofisi/4': `${IK}/kofisi/4_eb0yvBFyEQ.jpg`,
    'we-run-nairobi/kofisi/5': `${IK}/kofisi/5_rQk2BTf1q.jpg`,
    'we-run-nairobi/kofisi/6': `${IK}/kofisi/6_JSJY9gMt2.jpg`,
    'we-run-nairobi/kofisi/7': `${IK}/kofisi/7_vfx74wyKpf.jpg`,
    'WERUN_X_BARBADOS-194_tdq6mh': `${IK}/root/BARB_xtsaKGani.jpg`,
    'karura_i1iiil': `${IK}/karura/karura_oU_KVKcYL.jpeg`,
    'baobox_fqwtqn': `${IK}/root/baobox_leWBKSxUU.webp`,
    'BD_f4yadh': `${IK}/BD/3_6Pm4L1kDQ.jpg`,
    'Kofisi_qajcdd': `${IK}/kofisi/1_6ryp5opuq.jpg`,
  };
  return map[id] || `${IK}/root/${id}`;
};

export default function DynamicRunPage() {
  const params = useParams();
  const router = useRouter();
  const run = RUNS.find(r => r.id === params.id);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!run) {
    return (
      <div className="bg-black h-screen flex flex-col items-center justify-center font-display uppercase tracking-widest gap-4 text-white">
        <p>Run Not Found</p>
        <Button onClick={() => router.push('/')} variant="outline">Go Home</Button>
      </div>
    );
  }

  return (
    <main className="bg-black min-h-screen text-white selection:bg-white selection:text-black">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-8 pointer-events-none">
        <div className="max-w-[1800px] mx-auto flex justify-between items-center">
          <button 
            onClick={() => router.push('/#schedule')}
            className="pointer-events-auto flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] bg-black/40 backdrop-blur-xl px-5 py-3 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all group"
          >
            <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
            Back
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-screen w-full overflow-hidden bg-neutral-900">
        <motion.div initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.5 }} className="absolute inset-0">
          <img
            src={getImageUrl(run.gallery[0])}
            alt={run.title}
              loading="lazy"

            className="w-full h-full object-cover opacity-70"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
        <div className="absolute bottom-12 left-0 w-full px-6 md:px-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <p className="text-xs font-mono uppercase tracking-[0.4em] text-white/60 mb-4 flex items-center gap-2">
              <span className="w-4 h-[1px] bg-white/40" /> {run.location}
            </p>
            <h1 className="text-6xl md:text-[10vw] font-display font-black leading-[0.8] uppercase italic -ml-1">
              {run.title}
            </h1>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex gap-8 md:gap-12 border-l border-white/20 pl-8 pb-4">
            <div>
              <p className="text-[10px] font-mono uppercase text-white/40 mb-2">Kickoff</p>
              <p className="text-xl font-bold font-display uppercase tracking-wider">{run.time}</p>
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase text-white/40 mb-2">Distance</p>
              <p className="text-xl font-bold font-display uppercase tracking-wider">{run.distances}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 max-w-7xl mx-auto">
          
          {/* Left */}
          <div className="md:col-span-5 flex flex-col">
            <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-white/40 mb-8 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-white/20" /> The Environment
            </h2>
            <p className="text-2xl md:text-3xl font-light leading-snug font-body mb-12">
              {run.longDescription}
            </p>
            
            <div className="space-y-8 pt-12 border-t border-white/10 mb-12">
              {run.stats.map((stat, i) => (
                <div key={i} className="flex items-center justify-between group cursor-default">
                  <div className="flex items-center gap-4">
                    <stat.icon size={18} className="text-white/20 group-hover:text-white transition-colors" />
                    <span className="text-xs font-mono uppercase tracking-widest text-white/40">{stat.label}</span>
                  </div>
                  <span className="text-lg font-display font-bold uppercase tracking-wider">{stat.value}</span>
                </div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative w-full aspect-[4/3] rounded-sm overflow-hidden"
            >
              <img
                src={getImageUrl(run.routeImage || run.image)}
                alt="Strava Route"
                  loading="lazy"

                className="w-full h-full object-contain p-4 transition-all duration-700"
              />
              <div className="absolute top-4 right-4 flex items-center gap-2 backdrop-blur-md px-3 py-2 rounded-full border border-white/10">
                <Activity size={12} className="text-orange-500" />
                <span className="text-[9px] font-mono uppercase tracking-widest">Map Route</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="p-6 pt-0"
            >
              <div className="flex items-center gap-2 mb-2">
                <Info size={14} className="text-orange-500" />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold">Route Details</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed font-body">
                This track is modular. All distance targets — <span className="text-white">{run.distances}</span> — are integrated into this single route. Turnaround markers and lead runners will guide you to your specific target.
              </p>
            </motion.div>
          </div>

          {/* Right — Masonry */}
          <div className="md:col-span-7 grid grid-cols-2 gap-4 md:gap-6">
            <div className="relative h-[400px] md:h-[600px] rounded-sm overflow-hidden group bg-neutral-900">
              <img
                src={getImageUrl(run.gallery[1] || run.image)}
                alt="Detail"
                  loading="lazy"

                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="space-y-4 md:space-y-6">
              <div className="relative h-[190px] md:h-[285px] rounded-sm overflow-hidden group bg-neutral-900">
                <img
                  src={getImageUrl(run.gallery[2] || run.image)}
                  alt="Detail"
                    loading="lazy"

                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="relative h-[190px] md:h-[285px] rounded-sm overflow-hidden group bg-neutral-900">
                <img
                  src={getImageUrl(run.gallery[3] || run.image)}
                  alt="Detail"
                    loading="lazy"

                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>
            <div className="col-span-2 relative h-[300px] md:h-[450px] rounded-sm overflow-hidden group bg-neutral-900">
              <img
                src={getImageUrl(run.gallery[4] || run.image)}
                alt="Wide"
                  loading="lazy"

                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-24 px-6 md:px-12 bg-neutral-950 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="space-y-2">
              <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-white/40">Location</h2>
              <p className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tighter">{run.location}</p>
            </div>
            <Link href={run.mapUrl} target="_blank">
              <Button variant="outline" className="border-white/10 hover:bg-white hover:text-black font-mono text-[10px] uppercase tracking-widest px-8 py-7 rounded-none transition-all">
                Open in Google Maps <ExternalLink size={14} className="ml-2" />
              </Button>
            </Link>
          </div>
          <div className="w-full h-[400px] md:h-[600px] grayscale-50 hover:grayscale-0 rounded-sm overflow-hidden border border-white/5 shadow-2xl contrast-125">
            <iframe src={run.mapEmbed} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Run Location" />
          </div>
        </div>
      </section>

      <footer className="py-24 bg-black text-center">
        <div className="max-w-2xl mx-auto px-6 space-y-8">
          <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em] leading-loose">
            We Run Nairobi // Built for the urban athlete <br/>
            All runs are community-led and free to join
          </p>
          <div className="w-12 h-[1px] bg-white/10 mx-auto" />
        </div>
      </footer>
    </main>
  );
}