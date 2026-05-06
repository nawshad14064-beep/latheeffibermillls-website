import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";

export default function MissionVision() {
  return (
    <section className="max-w-7xl mx-auto px-4 mb-32 md:mb-40">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <motion.div 
          whileHover={{ y: -10 }}
          className="bg-primary p-12 md:p-20 rounded-[3rem] md:rounded-[5rem] text-white space-y-8 md:space-y-10 relative overflow-hidden shadow-3xl group"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent-gold/20 rounded-full blur-[100px] group-hover:scale-125 transition-transform duration-700" />
          <div className="w-16 h-16 md:w-20 md:h-20 bg-accent-gold rounded-3xl flex items-center justify-center shadow-2xl border-4 border-white/20">
            <Target size={32} />
          </div>
          <h3 className="text-4xl md:text-6xl font-display font-bold tracking-tighter">Our Mission</h3>
          <p className="text-xl md:text-2xl text-green-100/70 font-serif italic leading-relaxed">
            To produce and export high-quality eco-friendly fiber products while maintaining sustainability and environmental responsibility.
          </p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -10 }}
          className="bg-accent-teal p-12 md:p-20 rounded-[3rem] md:rounded-[5rem] text-white space-y-8 md:space-y-10 relative overflow-hidden shadow-3xl group"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-[100px] group-hover:scale-125 transition-transform duration-700" />
          <div className="w-16 h-16 md:w-20 md:h-20 bg-primary rounded-3xl flex items-center justify-center shadow-2xl border-4 border-white/20">
            <Eye size={32} />
          </div>
          <h3 className="text-4xl md:text-6xl font-display font-bold tracking-tighter">Our Vision</h3>
          <p className="text-xl md:text-2xl text-white/80 font-serif italic leading-relaxed">
            To become a globally recognized leader in eco-friendly fiber product exports, representing Sri Lanka’s natural resources with pride.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
