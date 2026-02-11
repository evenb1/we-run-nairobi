"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PlusCircle, MapPin, Clock, Calendar as CalendarIcon, ArrowUpRight, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// CONFIGURATION
const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY || "";
const CALENDAR_ID = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID || "";

export default function CalendarPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // FETCH EVENTS
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const now = new Date().toISOString();
        const response = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?key=${GOOGLE_API_KEY}&timeMin=${now}&singleEvents=true&orderBy=startTime&maxResults=6`
        );
        const data = await response.json();
        if (data.items) {
          setEvents(data.items);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Failed to fetch calendar events", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Formatters
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).format(date);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit' }).format(date);
  };

  return (
    <div className="bg-neutral-950 min-h-screen pt-32 pb-24 text-white font-body selection:bg-orange-500 selection:text-white relative overflow-hidden">
      
      {/* --- BACKGROUND DESIGN ELEMENTS --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Topographic / Map Accents (Abstract Lines) */}
        <svg className="absolute top-0 right-0 opacity-10 w-[800px] h-[800px] text-white" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <path d="M0 100 C 20 20 50 20 100 100 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <path d="M0 100 C 20 40 50 40 100 100 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </svg>

        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-900/10 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* PAGE HEADER */}
        <div className="max-w-4xl mx-auto text-center mb-16">
         

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold uppercase mb-6"
          >
            Race Days & <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500">Club Runs</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-neutral-400 text-lg max-w-2xl mx-auto font-light leading-relaxed"
          >
            Never miss a start line. From our weekly sessions to major marathons, everything is happening here.
          </motion.p>
        </div>

        {/* GOOGLE CALENDAR EMBED (Visual Month View) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-5xl mx-auto mb-24 relative group"
        >
          {/* Glowing Border Effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
          
          <div className="relative bg-neutral-900/90 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden shadow-2xl">
            <div className="h-12 bg-neutral-950/50 border-b border-white/5 flex items-center px-4 justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
              </div>
              <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                <CalendarIcon size={12} /> Live Database
              </div>
            </div>

            <div className="w-full aspect-[4/3] md:aspect-[16/9] lg:h-[700px] bg-white">
              <iframe 
                src={`https://calendar.google.com/calendar/embed?src=${encodeURIComponent(CALENDAR_ID)}&ctz=Africa%2FNairobi&showTitle=0&showPrint=0&showTabs=1&showCalendars=0&showTz=0`}
                style={{ border: 0 }}
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no"
                className="w-full h-full"
              ></iframe>
            </div>
            
             <div className="p-4 bg-neutral-900 border-t border-white/10 flex justify-end items-center">
               <Button 
                 variant="outline" 
                 className="border-orange-500/50 text-orange-500 hover:bg-orange-500 hover:text-white uppercase font-bold text-xs tracking-widest gap-2 transition-all"
                 onClick={() => window.open(`https://calendar.google.com/calendar/u/0/r?cid=${encodeURIComponent(CALENDAR_ID)}`, "_blank")}
               >
                 <PlusCircle size={14} /> Add to Your Calendar
               </Button>
            </div>
          </div>
        </motion.div>

        {/* DYNAMIC UPCOMING EVENTS SECTION */}
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-10 border-b border-white/10 pb-4">
            <div>
                <h2 className="text-3xl font-display font-bold uppercase">Upcoming Runs</h2>
                <div className="h-1 w-20 bg-orange-500 mt-2 rounded-full" />
            </div>
            <div className="hidden md:block text-right opacity-60">
                <p className="text-xs font-mono uppercase tracking-widest">Nairobi, KE</p>
                <p className="text-xs font-mono">GMT+3</p>
            </div>
          </div>

          {/* LOADING STATE */}
          {loading && (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-orange-500 w-10 h-10" />
            </div>
          )}

          {/* ERROR STATE */}
          {!loading && error && (
            <div className="text-center py-10 bg-neutral-900/50 rounded-xl border border-red-500/20">
              <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-4" />
              <p className="text-neutral-400">Could not load events. Please check the calendar above.</p>
            </div>
          )}

          {/* EVENTS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {!loading && events.map((event, i) => (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-neutral-900/80 backdrop-blur-md border border-white/10 p-6 rounded-2xl group hover:border-orange-500/50 hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden"
              >
                {/* Card Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex justify-between items-start mb-4 relative z-10">
                    <span className="text-orange-500 font-mono text-[10px] md:text-xs uppercase tracking-wider py-1 px-2 bg-orange-500/10 border border-orange-500/20 rounded-md">
                        {formatDate(event.start.dateTime || event.start.date)}
                    </span>
                    {event.location && (
                      <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`} target="_blank" rel="noreferrer">
                        <ArrowUpRight className="text-neutral-600 group-hover:text-white transition-colors cursor-pointer" size={20} />
                      </a>
                    )}
                </div>
                
                <h3 className="text-xl font-display font-bold uppercase mb-2 line-clamp-2 relative z-10 group-hover:text-orange-500 transition-colors">
                  {event.summary}
                </h3>
                
                <p className="text-neutral-400 text-sm mb-6 flex-grow line-clamp-3 relative z-10">
                  {event.description ? event.description.replace(/(<([^>]+)>)/gi, "") : "No details provided."}
                </p>

                <div className="space-y-3 pt-6 border-t border-white/5 mt-auto relative z-10">
                    <div className="flex items-center gap-3">
                        <Clock size={16} className="text-neutral-500" />
                        <span className="text-white font-bold text-sm">
                          {event.start.dateTime ? formatTime(event.start.dateTime) : "All Day"}
                        </span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-3">
                          <MapPin size={16} className="text-neutral-500 shrink-0" />
                          <span className="text-neutral-300 text-xs truncate">
                            {event.location}
                          </span>
                      </div>
                    )}
                </div>
              </motion.div>
            ))}
            
            {/* EMPTY STATE */}
            {!loading && events.length === 0 && !error && (
               <div className="col-span-3 text-center py-20 bg-white/5 rounded-2xl border border-dashed border-white/10">
                 <p className="text-neutral-500 text-lg">No upcoming events found on the calendar.</p>
               </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}