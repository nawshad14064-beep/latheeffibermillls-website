import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <section className="max-w-7xl mx-auto px-4 mb-24 md:mb-32 relative">
      <div className="relative rounded-[3rem] md:rounded-[6rem] overflow-hidden h-[500px] md:h-[700px] shadow-3xl border-[8px] md:border-[16px] border-white group">
        <img 
          src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=60&w=2000" 
          alt="Sri Lankan Coconut Plantation" 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/40 to-transparent" />
        <div className="absolute inset-0 p-8 md:p-24 flex flex-col justify-center text-white">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6 md:space-y-10 max-w-4xl"
          >
            <span className="inline-block px-6 md:px-8 py-3 bg-accent-gold text-white rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em] shadow-2xl border border-white/20">
              Our Legacy Since 1998
            </span>
            <h1 className="text-[4rem] md:text-[14rem] font-display text-white leading-[0.75] tracking-tighter uppercase">
              Rooted in <br />
              <span className="text-accent-amber italic">Nature</span>
            </h1>
            <p className="text-lg md:text-4xl text-white/90 font-serif italic leading-relaxed max-w-2xl">
              We are more than exporters; we are custodians of Sri Lanka's natural heritage.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
