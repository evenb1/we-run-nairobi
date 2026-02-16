"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Building2, User, Mail, Globe, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PartnershipForm() {
  const [formState, setFormState] = useState({
    brand: "",
    website: "",
    contactName: "",
    email: "",
    type: "sponsorship",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Connect to your email service (Formspree, EmailJS, or backend) here
    console.log("Form Submitted:", formState);
    alert("Thanks for reaching out! We'll be in touch.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <section id="partner" className="py-24 bg-neutral-900 relative overflow-hidden">
      
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* LEFT SIDE: The Pitch */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-2 block">
                Collaborate
              </span>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase mb-6 leading-none">
                Partner With <br /> The Culture
              </h2>
              <p className="text-neutral-400 text-lg leading-relaxed max-w-md">
                We bridge the gap between lifestyle, fitness, and urban culture.               </p>
            </motion.div>

            {/* Quick Stats for Brands */}
            <div className="grid grid-cols-2 gap-6">
               <div className="p-6 bg-black/40 border border-white/5 rounded-xl">
                  <div className="text-3xl font-display font-bold text-white mb-1">3.5K+</div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wider">Active Community</div>
               </div>
               <div className="p-6 bg-black/40 border border-white/5 rounded-xl">
                  <div className="text-3xl font-display font-bold text-white mb-1">Weekly</div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wider">Activations & Runs</div>
               </div>
            </div>

          </div>

          {/* RIGHT SIDE: The Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-black border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Brand Name */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 ml-1">Brand Name</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-3.5 text-neutral-500 w-4 h-4" />
                    <input 
                      type="text" 
                      name="brand"
                      placeholder="Nike / Red Bull..." 
                      className="w-full bg-neutral-900 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder:text-neutral-600"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Website */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 ml-1">Website / IG</label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-3.5 text-neutral-500 w-4 h-4" />
                    <input 
                      type="text" 
                      name="website"
                      placeholder="@yourbrand" 
                      className="w-full bg-neutral-900 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder:text-neutral-600"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Person */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 ml-1">Contact Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 text-neutral-500 w-4 h-4" />
                    <input 
                      type="text" 
                      name="contactName"
                      placeholder="Jane Doe" 
                      className="w-full bg-neutral-900 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder:text-neutral-600"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 text-neutral-500 w-4 h-4" />
                    <input 
                      type="email" 
                      name="email"
                      placeholder="jane@brand.com" 
                      className="w-full bg-neutral-900 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder:text-neutral-600"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Partnership Type */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 ml-1">Partnership Interest</label>
                <div className="relative">
                  <select 
                    name="type"
                    className="w-full bg-neutral-900 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all appearance-none cursor-pointer"
                    onChange={handleChange}
                  >
                    <option value="sponsorship">Event Sponsorship</option>
                    <option value="activation">Brand Activation / Pop-up</option>
                    <option value="product">Product Seeding / Gifting</option>
                    <option value="content">Content Collaboration</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="absolute right-4 top-4 pointer-events-none">
                    <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 ml-1">The Vision</label>
                <div className="relative">
                   <MessageSquare className="absolute left-4 top-3.5 text-neutral-500 w-4 h-4" />
                   <textarea 
                     name="message"
                     rows={4}
                     placeholder="Tell us what you have in mind..." 
                     className="w-full bg-neutral-900 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder:text-neutral-600 resize-none"
                     onChange={handleChange}
                     required
                   />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-orange-600 hover:bg-orange-500 text-white font-display font-bold uppercase tracking-widest py-6 text-lg rounded-xl transition-all duration-300"
              >
                Send Request <Send size={18} className="ml-2" />
              </Button>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}