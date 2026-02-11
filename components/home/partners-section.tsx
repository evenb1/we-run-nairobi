"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

// UPDATE THIS ARRAY WITH YOUR REAL FILE PATHS
const partners = [
  { name: "Runners Point", src: "/logos/runnerspoint.png" },
  { name: "BaoBox", src: "/logos/baobox.png" },
  { name: "Beer District", src: "/logos/beerdistrict.jpeg" },
  { name: "Partner 4", src: "/logos/itel.webp" },
  { name: "Partner 5", src: "/logos/nivea.png" },
  { name: "Partner 6", src: "/logos/barbados.png" },
  { name: "Partner 7", src: "/logos/stanchart.png" },
    { name: "Partner 8", src: "/logos/redbull.svg" },
  { name: "Partner 9", src: "/logos/onlogo.svg" },

];

export function PartnersSection() {
  return (
    <section className="py-16 bg-white border-b border-neutral-100 overflow-hidden">
      <div className="container mx-auto px-4 mb-10 text-center">
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-400">
          Running With
        </p>
      </div>

      <div className="relative flex w-full overflow-hidden">
        
        {/* Gradient Masks (Fade Effect on Edges) */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

        {/* The Infinite Marquee Track */}
        <motion.div
          className="flex items-center gap-16 md:gap-24 flex-nowrap"
          // We animate X based on a percentage to ensure it loops smoothly regardless of screen size
          // -50% assumes we have duplicated the list enough to cover the screen twice
          animate={{ x: ["0%", "-50%"] }} 
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 30, // Slower duration for 7 logos feels more premium
          }}
          style={{ width: "fit-content" }}
        >
          {/* We repeat the list 4 times to ensure no gaps on wide screens */}
          {[...partners, ...partners, ...partners, ...partners].map((partner, index) => (
            <div 
              key={index} 
              className="relative w-32 h-16 md:w-40 md:h-20 flex-shrink-0 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
            >
              <Image 
                src={partner.src} 
                alt={partner.name}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}