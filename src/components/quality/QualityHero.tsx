import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function QualityHero() {
  return (
    <section className="max-w-7xl mx-auto px-4 mb-24 md:mb-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="space-y-6 md:space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent-gold/10 border border-accent-gold/20 rounded-full text-accent-gold text-[10px] font-bold uppercase tracking-[0.2em]"
          >
            <ShieldCheck size={14} />
            <span>Zero Defect Policy</span>
          </motion.div>
          <h1 className="text-4xl md:text-9xl font-bold text-primary font-serif leading-[0.85] tracking-tighter">
            Quality <br />
            <span className="text-accent-teal italic">Without</span> <br />
            Compromise
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed max-w-md">
            From raw husk collection to final bale dispatch, our quality control process is embedded in every fiber we produce.
          </p>
        </div>
        <div className="relative">
          <div className="aspect-square rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-3xl">
            <img 
              src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=60&w=1200" 
              alt="Quality Inspection" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -top-6 md:-top-12 -right-6 md:-right-12 w-32 md:w-48 h-32 md:h-48 bg-primary rounded-full flex items-center justify-center text-white shadow-2xl">
            <div className="text-center">
              <p className="text-2xl md:text-4xl font-bold">100%</p>
              <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest">Inspected</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
