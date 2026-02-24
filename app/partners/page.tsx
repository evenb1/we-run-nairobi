"use client";

import { motion } from 'framer-motion';
import { ArrowUpRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CldImage } from 'next-cloudinary';
import Image from 'next/image';
import Link from 'next/link';
import { PARTNER_ACTIVATIONS } from '@/lib/partners-data';

export default function PartnersPage() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen text-white pb-32 pt-24 selection:bg-[#FC4C02] selection:text-white overflow-hidden">
      
      {/* --- KINETIC HERO SECTION --- */}
      <section className="relative w-full min-h-[60vh] flex flex-col justify-center mb-24 md:mb-32 px-4 md:px-0">
        <div className="absolute inset-0 flex flex-col justify-center overflow-hidden pointer-events-none opacity-[0.03] z-0 select-none">
          <h1 className="text-[15vw] leading-none font-display font-black whitespace-nowrap text-white transform -translate-x-10">
            PARTNERSHIPS PARTNERSHIPS
          </h1>
          <h1 className="text-[15vw] leading-none font-display font-black whitespace-nowrap text-white transform translate-x-10">
            WE RUN NAIROBI WRN
          </h1>
        </div>

        <div className="container mx-auto relative z-10 px-2 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-6xl mt-16"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="h-[2px] w-12 bg-[#FC4C02]" />
              <span className="text-white/60 font-mono text-xs md:text-sm uppercase tracking-[0.3em]">Corporate Alignments</span>
            </div>
            
            <h1 className="text-6xl md:text-[8rem] lg:text-[10rem] font-display font-black uppercase leading-[0.85] tracking-tighter text-white mb-10">
              WE MOVE <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40 italic">
                CULTURE.
              </span>
            </h1>
            
            <p className="text-xl md:text-3xl font-light text-white/50 font-body leading-relaxed max-w-3xl border-l-2 border-[#FC4C02] pl-6">
              We don't do traditional sponsorships. We do <span className="text-white font-medium">cultural integration</span>. Put your brand directly into the lifestyle of Nairobi's most dedicated urban athletes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- CASE STUDIES --- */}
      <section className="container mx-auto px-6 mb-32">
        <div className="flex items-center gap-4 mb-24">
          <span className="w-12 h-[1px] bg-white/20" /> 
          <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-white/40">
            Featured Activations
          </h2>
        </div>

        <div className="space-y-32 md:space-y-48">
          {PARTNER_ACTIVATIONS.map((activation, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              // Reduced gap heavily from md:gap-20 to lg:gap-12 to pull content together
              className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center" 
            >
              {/* Media Side (Constrained Video or Image Grid) */}
              <div className={`lg:col-span-6 w-full ${index % 2 !== 0 ? 'lg:order-last' : ''}`}>
                
                {activation.media.type === 'video' ? (
                  /* Enlarged Constrained Portrait Video Player */
                  // Bumped up max widths to 320px and 420px
                  <div className="relative w-full max-w-[320px] md:max-w-[420px] mx-auto aspect-[9/16] rounded-3xl overflow-hidden bg-[#111] border border-white/10 shadow-2xl">
                    <video 
                      src={activation.media.url} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  /* 3-Image Bento Grid */
                  <div className="grid grid-cols-2 gap-3 md:gap-4 h-[500px] md:h-[650px]">
                    <div className="col-span-1 h-full relative rounded-2xl md:rounded-3xl overflow-hidden bg-[#111]">
                      {activation.media.ids[0] && (
                        <CldImage src={activation.media.ids[0]} alt={`${activation.brand} 1`} fill className="object-cover " />
                      )}
                    </div>
                    <div className="col-span-1 grid grid-rows-2 gap-3 md:gap-4">
                      <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-[#111]">
                        {activation.media.ids[1] && (
                          <CldImage src={activation.media.ids[1]} alt={`${activation.brand} 2`} fill className="object-cover " />
                        )}
                      </div>
                      <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-[#111]">
                        {activation.media.ids[2] && (
                          <CldImage src={activation.media.ids[2]} alt={`${activation.brand} 3`} fill className="object-cover" />
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Text Side */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                
                {/* Enlarged Monochrome Brand Logo */}
                <div className="relative h-20 md:h-28 w-64 md:w-80 mb-10">
                  {activation.isLocalLogo ? (
                    <Image src={activation.logo} alt={activation.brand} fill className="object-contain object-left brightness-0 invert opacity-80" />
                  ) : (
                    <CldImage src={activation.logo} alt={activation.brand} fill className="object-contain object-left brightness-0 invert opacity-80" />
                  )}
                </div>

                <p className="text-[#FC4C02] font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] mb-4">
                  {activation.tagline}
                </p>
                <h3 className="text-4xl md:text-6xl font-display font-bold uppercase leading-[1.1] mb-8 text-white">
                  {activation.campaign}
                </h3>
                <p className="text-white/60 font-body text-lg md:text-2xl leading-relaxed">
                  {activation.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="container mx-auto px-6">
        <div className="bg-[#111] border border-[#FC4C02]/20 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden group hover:border-[#FC4C02]/50 transition-colors duration-500">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FC4C02] blur-[150px] opacity-10 group-hover:opacity-20 transition-opacity duration-700 rounded-full pointer-events-none" />
          <div className="relative z-10 text-center md:text-left">
            <h2 className="text-5xl md:text-7xl font-display font-black uppercase italic text-white mb-4 leading-none">
              Build <br className="hidden md:block" /> With Us.
            </h2>
            <p className="text-white/60 font-body text-lg max-w-md">
              Request our full 2026 partnership deck and discuss activation opportunities for your brand.
            </p>
          </div>
          <div className="relative z-10 w-full md:w-auto">
            <Link href="mailto:werunnairobi@gmail.com">
              <Button size="lg" className="w-full md:w-auto bg-[#FC4C02] hover:bg-white hover:text-black text-white font-display font-bold uppercase tracking-widest text-sm h-16 px-10 rounded-xl transition-all duration-300 flex items-center gap-3">
                <Mail size={18} />
                Get The Deck
                <ArrowUpRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}