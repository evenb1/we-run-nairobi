"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "Is there a fee to join?",
    answer: "Zero. We Run Nairobi is 100% free. We believe running should be accessible to everyone. Just show up."
  },
  {
    question: "What pace do you run?",
    answer: "All paces are welcome. We have groups ranging from sub-4:00/km elites to 7:00/km+ party pace. No one gets left behind."
  },
  {
    question: "Do I need to register?",
    answer: "No prior registration is required for our regular weekly runs. Just arrive 15 minutes before the start time to warm up."
  },
  {
    question: "Where do I keep my bag?",
    answer: "For most runs (like BaoBox or Beer District), the venue provides a safe area or we have a support vehicle designated for bag drops."
  },
  {
    question: "Are the routes marked?",
    answer: "Yes. All our major routes are marked with chalk or ribbons, and we usually have lead captains to guide the way."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-neutral-950 text-white">
      <div className="container mx-auto px-4">
        
        <div className="grid md:grid-cols-12 gap-12">
          
          {/* Left Side: Title */}
          <div className="md:col-span-4">
             <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight mb-4">
               Need to <br/> Know
             </h2>
             <p className="text-neutral-400 font-light text-lg">
               Got questions? We've got answers. If you don't see it here, slide into our DMs.
             </p>
          </div>

          {/* Right Side: Accordion */}
          <div className="md:col-span-8">
            <div className="flex flex-col">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                
                return (
                  <div 
                    key={index} 
                    className="border-b border-white/10"
                  >
                    <button 
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full py-8 flex items-center justify-between text-left group"
                    >
                      <span className={`text-xl md:text-2xl font-display font-bold uppercase tracking-wide transition-colors ${isOpen ? 'text-white' : 'text-neutral-400 group-hover:text-white'}`}>
                        {faq.question}
                      </span>
                      <div className={`p-2 rounded-full border border-white/10 transition-all duration-300 ${isOpen ? 'bg-white text-black rotate-90' : 'bg-transparent text-white'}`}>
                        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="pb-8 text-neutral-400 font-light leading-relaxed max-w-2xl">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}