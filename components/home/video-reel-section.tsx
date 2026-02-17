"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';

const videoIds = [
  "clip8_qdkm4t",
  "clip3_ieywge",
  "clip11_zbj9rk",  
  "clip14_niati1",
  "clip17_mcym4c",
  "clip9_edovn9",
  "clip2_v4gqdz",
  "clip12_uyit0d",
  "clip5_qcfux5",
  "clip7_uvxs91",
  "clip15_vutzu6",
  "clip13_ws1hd0",
  "clip19_fyyknd",
];

const CLOUD_NAME = "dsfgfu2kn";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { 
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

export function VideoReelSection() {
  const [width, setWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (scrollRef.current) {
        setWidth(scrollRef.current.scrollWidth - scrollRef.current.offsetWidth);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="py-24 bg-neutral-950 overflow-hidden">
      <div className="container mx-auto px-4 mb-10">
         <motion.h2 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="text-4xl md:text-6xl font-display font-bold text-white uppercase mb-4"
         >
          In Motion
         </motion.h2>
         <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-neutral-500 text-sm md:text-base font-mono"
         >
            {isMobile ? "← Drag to explore →" : "Scroll to explore →"}
         </motion.p>
      </div>

      {/* Main Wrapper: 
          On PC: Uses native overflow-x-auto for mouse scrolling.
          On Mobile: Overflow hidden so Framer Motion can handle the drag.
      */}
      <div 
        ref={scrollRef} 
        className={`w-full ${!isMobile ? 'overflow-x-auto no-scrollbar cursor-default' : 'overflow-hidden'}`}
      >
        <motion.div 
          className={`flex gap-6 pl-4 md:pl-[max(1rem,calc((100vw-1280px)/2))] pr-10 ${isMobile ? 'cursor-grab active:cursor-grabbing w-max' : 'w-max pb-6'}`}
          // Only enable drag if we are on mobile
          drag={isMobile ? "x" : false}
          dragConstraints={{ right: 0, left: -width }} 
          dragElastic={0.1} 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {videoIds.map((id, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="relative flex-shrink-0 w-[300px] h-[533px] md:w-[400px] md:h-[711px] rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl"
            >
              <video
src={`https://res.cloudinary.com/${CLOUD_NAME}/video/upload/q_auto,f_auto/v1/${id}`}                className="w-full h-full object-cover pointer-events-none"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
              <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}