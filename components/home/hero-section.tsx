"use client";

import { motion } from "framer-motion";
import { ArrowDown, MapPin, Zap, Navigation } from "lucide-react";
import { CldImage } from "next-cloudinary";
import { useEffect, useState } from "react";

// CONFIGURATION
const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY || "";
const CALENDAR_ID = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID || "";

export function HeroSection() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [nextRun, setNextRun] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // FETCH NEXT RUN LOGIC
  useEffect(() => {
    const fetchNextRun = async () => {
      try {
        const now = new Date().toISOString();
        // Increased maxResults to 15 so we have enough future events to check through
        const response = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?key=${GOOGLE_API_KEY}&timeMin=${now}&singleEvents=true&orderBy=startTime&maxResults=15`
        );
        const data = await response.json();
        
        if (data.items && data.items.length > 0) {
          // Find the first event that falls on a Saturday (getDay() === 6)
          const saturdayEvent = data.items.find((item: any) => {
            const eventDate = new Date(item.start.dateTime || item.start.date);
            return eventDate.getDay() === 6; 
          });

          if (saturdayEvent) {
            const event = saturdayEvent;
            const combinedText = ((event.summary || "") + " " + (event.description || "")).toLowerCase();
            const allMatches = combinedText.match(/(\d+(?:\.\d+)?)\s*(?:km|k)\b/g);
            let distanceDisplay = "DISTANCE TBD";
            
            if (allMatches) {
              const numbers = allMatches.map((str: string) => parseFloat(str.replace(/[^\d.]/g, '')));
              const uniqueSorted = [...new Set(numbers)].sort((a, b) => a - b);
              distanceDisplay = uniqueSorted.join(' / ') + ' KM';
            }
            
            let rawLocation = event.location || event.summary?.replace(/^WRN\s*/i, '').trim() || "Nairobi";
            const displayLocation = rawLocation.includes(',') ? rawLocation.split(',')[0].trim() : rawLocation;
            const startDate = new Date(event.start.dateTime || event.start.date);

            setNextRun({
              date: startDate,
              locationName: displayLocation,
              fullLocation: rawLocation,
              summary: event.summary,
              distance: distanceDisplay
            });
          }
        }
      } catch (error) {
        console.error("Error fetching run:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNextRun();
  }, []);

  // COUNTDOWN TIMER
  useEffect(() => {
    if (!nextRun) return;
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = nextRun.date.getTime() - now.getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };
    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();
    return () => clearInterval(timer);
  }, [nextRun]);

  const getTimeString = (dateObj: Date) =>
    new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit' }).format(dateObj);

  const getProtocolTime = (dateObj: Date, minusMinutes: number) =>
    getTimeString(new Date(dateObj.getTime() - minusMinutes * 60000));

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden pt-20 pb-20 xl:pt-0 xl:pb-0">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-neutral-900">
        <CldImage
          src="we-run-nairobi/BARB"
          alt="Runners at dawn"
          fill
          priority
          sizes="100vw"
          quality={80}
          placeholder="blur"
          blurDataURL="https://res.cloudinary.com/dsfgfu2kn/image/upload/w_10,e_blur:1000,q_auto,f_webp/we-run-nairobi/BARB"
          className="object-cover object-center transition-opacity duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      <div className="container relative z-10 h-full flex flex-col xl:flex-row items-center xl:justify-between px-4">
        
        {/* LEFT SIDE */}
        <div className="w-full xl:max-w-4xl xl:pl-20 mt-10 xl:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-12 h-[1px] bg-white/60"></span>
              <span className="text-white/80 font-display uppercase tracking-[0.3em] text-xs font-bold">
                Running The 254
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-display font-bold text-white uppercase tracking-tighter leading-[0.9] mb-12 drop-shadow-2xl">
              Own The <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/20">
                Morning.
              </span>
            </h1>

            <div className="inline-flex flex-col pl-2 md:pl-0">
              <span className="text-white/50 text-xs font-mono uppercase tracking-widest mb-4">
                {loading ? "Syncing..." : "Next Run Starts In"}
              </span>
              <div className="flex items-center">
                {[
                  { value: timeLeft.days, label: 'Days' },
                  { value: timeLeft.hours, label: 'Hrs' },
                  { value: timeLeft.minutes, label: 'Min' },
                  { value: timeLeft.seconds, label: 'Sec' },
                ].map((item, i, arr) => (
                  <div key={i} className="flex items-center">
                    <div className="flex flex-col items-start min-w-[50px] md:min-w-[90px]">
                      <span className="text-4xl md:text-7xl font-display font-bold text-white tabular-nums leading-none">
                        {String(item.value).padStart(2, '0')}
                      </span>
                      <span className="text-[10px] text-white/40 uppercase tracking-widest mt-2 font-medium">
                        {item.label}
                      </span>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="w-[1px] h-8 md:h-14 bg-white/20 mx-3 md:mx-6" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT SIDE: HUD Box */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative w-full max-w-sm mt-16 xl:mt-0 xl:absolute xl:right-4 xl:top-[70%] xl:-translate-y-1/2"
        >
          <div className="w-full bg-black/20 backdrop-blur-[2px] border border-white/10 p-8 relative hover:bg-black/40 transition-colors duration-500">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/40" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/40" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40" />

            <div className="mb-6 flex items-start gap-4">
              <div className="p-2 bg-white/5 border border-white/10">
                <MapPin className="text-white" size={16} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1 font-medium">Location</p>
                <h3 className="text-xl font-display font-bold text-white uppercase leading-none tracking-wide truncate max-w-[220px]">
                  {loading ? "..." : (nextRun ? nextRun.locationName : "LOCATION TBD")}
                </h3>
                <p className="text-xs text-white/60 mt-1 font-mono truncate max-w-[220px]">
                  {loading ? "Loading..." : (nextRun ? nextRun.fullLocation : "No upcoming events")}
                </p>
              </div>
            </div>

            {nextRun && (
              <div className="mb-8 flex items-start gap-4">
                <div className="p-2 bg-white/5 border border-white/10">
                  <Navigation className="text-white" size={16} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1 font-medium">Targets</p>
                  <h3 className="text-lg md:text-xl font-display font-bold text-white uppercase leading-tight tracking-wide break-words">
                    {nextRun.distance}
                  </h3>
                </div>
              </div>
            )}

            <div className="w-full h-[1px] bg-white/10 mb-8" />

            {nextRun && (
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-5 pl-1 font-medium">Protocol</p>
                <div className="space-y-6 relative border-l border-white/10 ml-2">
                  <div className="relative pl-6 group/item">
                    <span className="absolute -left-[3px] top-[6px] w-[5px] h-[5px] bg-black border border-white/40 rounded-full group-hover/item:bg-white transition-colors" />
                    <div className="flex justify-between items-center">
                      <span className="font-display font-bold text-lg text-white/60 group-hover/item:text-white transition-colors">
                        {getProtocolTime(nextRun.date, 20)}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-white/40 group-hover/item:text-white/80">Assembly</span>
                    </div>
                  </div>
                  <div className="relative pl-6 group/item">
                    <span className="absolute -left-[3px] top-[6px] w-[5px] h-[5px] bg-black border border-white/40 rounded-full group-hover/item:bg-white transition-colors" />
                    <div className="flex justify-between items-center">
                      <span className="font-display font-bold text-lg text-white/60 group-hover/item:text-white transition-colors">
                        {getProtocolTime(nextRun.date, 10)}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-white/40 group-hover/item:text-white/80">Warm Up</span>
                    </div>
                  </div>
                  <div className="relative pl-6 group/item">
                    <span className="absolute -left-[3px] top-[8px] w-[5px] h-[5px] bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                    <div className="flex justify-between items-center">
                      <span className="font-display font-bold text-xl text-white">
                        {getTimeString(nextRun.date)}
                      </span>
                      <div className="flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/10 rounded-sm">
                        <Zap size={10} className="text-white fill-white" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white">Start</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="hidden xl:flex absolute bottom-8 left-20 items-center gap-3 text-white/30"
      >
        <ArrowDown size={14} className="animate-bounce" />
        <span className="text-[10px] uppercase tracking-[0.2em] font-display">Scroll</span>
      </motion.div>
    </section>
  );
}