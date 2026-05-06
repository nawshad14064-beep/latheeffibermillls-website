import { motion } from "framer-motion";
import { Award } from "lucide-react";

export default function ProductHeader() {
  return (
    <section className="max-w-7xl mx-auto px-4 mb-24 md:mb-32 relative overflow-hidden">
      <div className="blob w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-accent-gold/10 -top-40 -right-40" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-end relative z-10">
        <div className="space-y-8 md:space-y-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-4 px-6 md:px-8 py-3 bg-primary text-white rounded-full text-[10px] font-bold uppercase tracking-[0.4em] shadow-2xl shadow-primary/30 border border-white/20"
          >
            <Award size={16} className="text-accent-gold" />
            <span>Certified Export Quality</span>
          </motion.div>
          <h1 className="text-[4rem] md:text-[14rem] font-display text-primary leading-[0.75] tracking-tighter uppercase">
            The <span className="text-accent-amber italic">Fiber</span> <br />
            Collection
          </h1>
        </div>
        <div className="max-w-md pb-6">
          <p className="text-lg md:text-3xl text-gray-700 font-serif italic leading-relaxed">
            Sourced from the heart of Sri Lanka's coconut triangle, engineered for industrial durability.
          </p>
        </div>
      </div>
    </section>
  );
}
