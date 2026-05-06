import { motion } from "framer-motion";
import { Globe } from "lucide-react";

export default function ExportHero() {
  return (
    <section className="max-w-7xl mx-auto px-4 mb-24 md:mb-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="space-y-6 md:space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent-teal/10 border border-accent-teal/20 rounded-full text-accent-teal text-[10px] font-bold uppercase tracking-[0.2em]"
          >
            <Globe size={14} />
            <span>Global Logistics Partner</span>
          </motion.div>
          <h1 className="text-4xl md:text-9xl font-bold text-primary font-serif leading-[0.85] tracking-tighter">
            Global <br />
            <span className="text-accent-gold italic">Logistics</span> <br />
            Expertise
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed max-w-md">
            With over 25 years of export experience, we ensure your fiber arrives on time, in perfect condition, anywhere in the world.
          </p>
        </div>
        <div className="relative">
          <div className="aspect-[4/3] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-3xl">
            <img 
              src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=60&w=1200" 
              alt="Global Shipping" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-6 md:-bottom-12 -left-6 md:-left-12 w-48 md:w-64 h-48 md:h-64 bg-accent-teal rounded-[2rem] md:rounded-[3rem] p-8 md:p-10 text-white shadow-2xl flex flex-col justify-center">
            <p className="text-4xl md:text-5xl font-bold mb-2">15+</p>
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest leading-relaxed">Countries Served Globally</p>
          </div>
        </div>
      </div>
    </section>
  );
}
