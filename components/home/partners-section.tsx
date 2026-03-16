"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

const partners = [
  { name: "Red Bull", url: "/logos/redbull.svg", isLocal: true },
  { name: "On Running", url: "/logos/onlogo.svg", isLocal: true },
  { name: "BaoBox", url: "https://ik.imagekit.io/znzj2xg4q/we-run/logos/baobox_55DzumDyH.png", isLocal: false },
  { name: "Beer District", url: "https://ik.imagekit.io/znzj2xg4q/we-run/logos/beerdistrict_Ic70bGlNl.jpeg", isLocal: false },
  { name: "Itel", url: "https://ik.imagekit.io/znzj2xg4q/we-run/logos/itel__WiYMIlwY.webp", isLocal: false },
  { name: "Nivea", url: "https://ik.imagekit.io/znzj2xg4q/we-run/logos/nivea_d-S0QA-Njp.png", isLocal: false },
  { name: "Barbados", url: "https://ik.imagekit.io/znzj2xg4q/we-run/logos/barbados_mRvFvRArQ.png", isLocal: false },
  { name: "Stanchart", url: "https://ik.imagekit.io/znzj2xg4q/we-run/logos/stanchart_LEwiwLnTB.png", isLocal: false },
  { name: "Kofisi", url: "https://ik.imagekit.io/znzj2xg4q/we-run/karura/KOFISI-Logo_5UEekSziw.png", isLocal: false },
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
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

        <motion.div
          className="flex items-center gap-16 md:gap-24 flex-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 80,
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
                  src={partner.url}
                  alt={partner.name}
                  fill
                  className="object-contain"
                />
              ) : (
                <img
                  src={partner.url}
                  alt={partner.name}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}