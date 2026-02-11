"use client";

import { motion } from 'framer-motion';
import { Instagram, Twitter, Mail, MapPin, Video, Music, Music2 } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  // Navigation Links
  // Note: Schedule and Gallery are PAGES, others are SECTIONS.
  const exploreLinks = [
    { name: 'About', href: '#about' },       // Section
    { name: 'Routes', href: '#routes' },     // Section
    { name: 'Schedule', href: '/calendar' }, // Page
    { name: 'Gallery', href: '/gallery' },   // Page
  ];

  return (
    <footer className="bg-neutral-950 text-white pt-24 pb-12 overflow-hidden relative">
      
      {/* Decorative Gradient Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* TOP SECTION: Branding & Links */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 mb-24">
           
           {/* Branding / Tagline */}
           <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tight mb-6">
                  The Pulse of Nairobi
                </h3>
                <p className="text-neutral-400 text-lg max-w-sm leading-relaxed">
                  We don't just run the city - we live it. <br/>
                  Come for the miles, stay for the vibe.
                </p>
              </div>
              
              {/* Added a subtle location indicator */}
              <div className="hidden md:flex items-center gap-2 text-neutral-600 mt-8 font-mono text-xs uppercase tracking-widest">
                <MapPin size={14} />
                <span>Nairobi, Kenya</span>
              </div>
           </div>

           {/* Navigation & Contact */}
           <div className="grid grid-cols-2 gap-8">
              
              {/* Menu */}
              <div>
                <h4 className="font-bold uppercase tracking-widest text-xs text-neutral-500 mb-6">Explore</h4>
                <ul className="space-y-4 font-display font-medium text-lg">
                  {exploreLinks.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="hover:text-neutral-400 transition-colors block w-fit">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div id='contact'>
                <h4 className="font-bold uppercase tracking-widest text-xs text-neutral-500 mb-6">Connect</h4>
                <ul className="space-y-4">
                  <li>
                    <a href="mailto:hello@werunnairobi.com" className="flex items-center gap-2 hover:text-neutral-400 transition-colors text-sm md:text-base">
                      <Mail size={16} />
                      hello@werunnairobi.com
                    </a>
                  </li>
                  <li className="text-neutral-400 text-sm md:text-base font-mono">
                    +254 700 115 830
                  </li>
                  <li className="pt-4 flex gap-4">
                    {/* Instagram */}
                    <Link 
                        href="https://instagram.com/werunnairobi" 
                        target="_blank"
                        className="p-3 bg-white/5 rounded-full hover:bg-white hover:text-black transition-all duration-300 group"
                        title="Instagram"
                    >
                        <Instagram size={20}/>
                    </Link>

                    {/* TikTok (Using Video icon as proxy) */}
                    <Link 
                        href="https://tiktok.com/@werunnairobi" 
                        target="_blank"
                        className="p-3 bg-white/5 rounded-full hover:bg-white hover:text-black transition-all duration-300"
                        title="TikTok"
                    >
                         <Music2 size={20}/>
                    </Link>

        
                  </li>
                </ul>
              </div>

           </div>
        </div>

        {/* BOTTOM SECTION: Big Text */}
        <div className="border-t border-white/10 pt-12">
           <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 text-sm text-neutral-500 uppercase tracking-widest font-mono">
              <div>© {currentYear} We Run Nairobi.</div>
              <div className="flex gap-6">
                 <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                 <Link href="#" className="hover:text-white transition-colors">Terms</Link>
              </div>
           </div>

           {/* MASSIVE FOOTER TEXT */}
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="text-[13vw] leading-[0.8] font-display font-bold text-center text-white/5 select-none tracking-tighter mix-blend-overlay whitespace-nowrap"
           >
             WE RUN NAIROBI
           </motion.h1>
        </div>

      </div>
    </footer>
  );
}