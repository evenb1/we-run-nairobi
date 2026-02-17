"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CldImage } from 'next-cloudinary';

const partners = [
  // LOCAL ASSETS (Pulling from your public/logos/ folder)
  { name: "Red Bull", id: "/logos/redbull.svg", isLocal: true },
  { name: "On Running", id: "/logos/onlogo.svg", isLocal: true },
  
  // CLOUDINARY ASSETS (Using your confirmed paths)
  { name: "BaoBox", id: "we-run-nairobi/logos/baobox", isLocal: false },
  { name: "Beer District", id: "we-run-nairobi/logos/beerdistrict", isLocal: false },
  { name: "Itel", id: "we-run-nairobi/logos/itel", isLocal: false },
  { name: "Nivea", id: "we-run-nairobi/logos/nivea", isLocal: false },
  { name: "Barbados", id: "we-run-nairobi/logos/barbados", isLocal: false },
  { name: "Stanchart", id: "we-run-nairobi/logos/stanchart", isLocal: false },
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
        {/* Gradient Edge Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

       <motion.div
  className="flex items-center gap-16 md:gap-24 flex-nowrap"
  animate={{ x: ["0%", "-50%"] }} 
  transition={{
    repeat: Infinity,
    ease: "linear",
    duration: 80, // Increased from 30 to 80 for a smoother, slower glide
  }}
  style={{ width: "fit-content" }}
>
          {[...partners, ...partners, ...partners, ...partners].map((partner, index) => (
            <div 
              key={index} 
              className="relative w-32 h-16 md:w-40 md:h-20 flex-shrink-0 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
            >
              {partner.isLocal ? (
                <Image 
                  src={partner.id} 
                  alt={partner.name}
                  fill
                  className="object-contain"
                />
              ) : (
                <CldImage 
                  src={partner.id} 
                  alt={partner.name}
                  fill
                  className="object-contain"
                />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}