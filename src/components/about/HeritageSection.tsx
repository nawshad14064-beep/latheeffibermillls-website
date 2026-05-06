import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function HeritageSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 mb-32 md:mb-40">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
        <div className="space-y-10 md:space-y-14">
          <div className="space-y-6 md:space-y-10">
            <h2 className="text-accent-gold font-bold tracking-[0.5em] uppercase text-[10px]">The Latheef Story</h2>
            <h3 className="text-4xl md:text-[10rem] font-display text-white leading-[0.75] tracking-tighter uppercase">A Journey of <br /><span className="text-accent-amber italic">25 Years</span></h3>
          </div>
          <div className="space-y-6 md:space-y-10 text-lg md:text-3xl text-white/60 font-serif italic leading-relaxed">
            <p>
              Founded in 1998, Latheef Fiber Mills began with a simple vision: to harness the untapped potential of Sri Lanka's coconut husks while providing sustainable livelihoods for our local community.
            </p>
            <p>
              Today, we stand as a cornerstone of the Sri Lankan fiber industry, operating from the heart of the coconut triangle. Our facility combines traditional sun-drying methods with modern industrial processing.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6 md:gap-12 pt-8 md:pt-12">
            {[
              { label: "Founded", value: "1998", color: "text-primary" },
              { label: "Global Markets", value: "15+", color: "text-accent-amber" },
              { label: "Daily Capacity", value: "50T", color: "text-accent-teal" },
              { label: "Eco-Friendly", value: "100%", color: "text-primary" },
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10, scale: 1.02 }}
                className="p-8 md:p-12 bg-white/5 backdrop-blur-xl rounded-[2.5rem] md:rounded-[4rem] shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-white/10 group hover:border-accent-gold transition-all duration-500"
              >
                <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 mb-2 md:mb-4 group-hover:text-accent-gold transition-colors">{stat.label}</p>
                <p className={cn("text-4xl md:text-6xl font-display font-bold", stat.color === "text-primary" ? "text-white" : stat.color)}>{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="relative">
          <div className="aspect-[4/5] rounded-[3rem] md:rounded-[6rem] overflow-hidden shadow-3xl border-[8px] md:border-[16px] border-white/10 group">
            <img 
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=60&w=1200" 
              alt="Fiber Processing" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </div>
          <motion.div 
            animate={{ rotate: [0, 5, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -bottom-8 md:-bottom-16 -left-8 md:-left-16 w-48 md:w-72 h-48 md:h-72 bg-primary rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-12 text-white shadow-3xl flex flex-col justify-center border-4 md:border-8 border-white/10"
          >
            <p className="text-5xl md:text-7xl font-display font-bold mb-2 text-accent-gold">25+</p>
            <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em] leading-relaxed">Years of Industrial Excellence</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
