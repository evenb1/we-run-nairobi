"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';

const videos = [
  "/videos/clip8.mp4",
  "/videos/clip3.mp4",
  "/videos/clip11.mp4",  
  "/videos/clip14.mp4",
  "/videos/clip17.mp4",
  "/videos/clip9.mp4",
  "/videos/clip2.mp4",
  "/videos/clip12.mp4",
  "/videos/clip5.mp4",
  "/videos/clip7.mp4",
  "/videos/clip15.mp4",
  "/videos/clip13.mp4",
  "/videos/clip19.mp4",
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

export function VideoReelSection() {
  // 1. We need a State to hold the negative drag limit
  const [width, setWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 2. Calculate the draggable width once the component mounts
  useEffect(() => {
    if (containerRef.current) {
      // Formula: Total Scrollable Width - Visible Window Width
      // We subtract an extra cushion (e.g., 40px) to ensure the last item isn't cut off
      setWidth(containerRef.current.scrollWidth - containerRef.current.offsetWidth);
    }
    
    // Optional: Recalculate on resize
    const handleResize = () => {
        if (containerRef.current) {
            setWidth(containerRef.current.scrollWidth - containerRef.current.offsetWidth);
        }
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

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
            &larr; Drag to explore &rarr;
         </motion.p>
      </div>

      {/* 3. Attach the Ref here. 
        Because the child is wide, this div technically has a massive 'scrollWidth'.
      */}
      <div ref={containerRef} className="pl-4 md:pl-[max(1rem,calc((100vw-1280px)/2))] w-full"> 
        <motion.div 
          className="flex gap-6 cursor-grab active:cursor-grabbing"
          drag="x"
          // 4. Use the calculated width for the left constraint
          dragConstraints={{ right: 0, left: -width }} 
          dragElastic={0.1} 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {videos.map((src, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, zIndex: 10, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95 }}
              className="relative flex-shrink-0 w-[300px] h-[533px] md:w-[400px] md:h-[711px] rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl"
            >
              <video
                src={src}
                className="w-full h-full object-cover pointer-events-none"
                autoPlay
                muted
                loop
                playsInline
                preload="none"
              />
              <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}