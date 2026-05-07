import { motion } from "framer-motion";
import { Award, Leaf, Globe } from "lucide-react";
import { useDevice } from "@/hooks/useDevice";

export default function JourneySection() {
  const { isMobile } = useDevice();
  const milestones = [
    { year: "1985", title: "The Beginning", desc: "Started as a small local fiber mill in the heart of Sri Lanka.", icon: Leaf },
    { year: "1998", title: "Export Excellence", desc: "Began global operations, reaching our first international markets.", icon: Globe },
    { year: "2015", title: "Modernization", desc: "Installed state-of-the-art hydraulic pressing facilities.", icon: Award },
  ];

  return (
    <section className="py-16 md:py-32 max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="space-y-8 md:space-y-12">
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-accent-gold font-bold uppercase tracking-[0.3em] text-[10px]">Our Legacy</h2>
            <h3 className="text-4xl md:text-7xl font-bold text-theme-title font-serif leading-[1] md:leading-[1.1]">A Journey of <br /> <span className="text-accent-gold italic">Four Decades</span></h3>
          </div>
          <p className="text-lg md:text-xl text-theme-subtitle font-light leading-relaxed max-w-xl">
            From humble beginnings in 1985 to becoming a pillar of Sri Lanka's coir export industry, our commitment to quality has never wavered.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            <div className="p-6 md:p-8 bg-theme-card border border-theme-card rounded-[2rem] md:rounded-[2.5rem]">
              <p className="text-4xl md:text-5xl font-bold text-accent-gold mb-1 md:mb-2">25+</p>
              <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-theme-muted">Years of Export</p>
            </div>
            <div className="p-6 md:p-8 bg-theme-card border border-theme-card rounded-[2rem] md:rounded-[2.5rem]">
              <p className="text-4xl md:text-5xl font-bold text-accent-gold mb-1 md:mb-2">15k</p>
              <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-theme-muted">Tons Annual Output</p>
            </div>
          </div>
        </div>
        
        <div className="relative space-y-6 md:space-y-8">
          {milestones.map((m, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: isMobile ? 0 : 50, y: isMobile ? 30 : 0 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group flex flex-row items-center gap-6 md:gap-8 p-6 md:p-10 bg-theme-card rounded-[2rem] md:rounded-[3rem] border border-theme-card hover:border-accent-gold/30 hover:bg-white/10 transition-all"
            >
              <div className="w-14 h-14 md:w-20 md:h-20 bg-accent-gold text-primary rounded-2xl md:rounded-3xl flex items-center justify-center shrink-0 shadow-lg group-hover:rotate-12 transition-transform">
                <m.icon className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <div>
                <h4 className="text-accent-gold font-bold text-lg md:text-xl mb-0 md:mb-1">{m.year}</h4>
                <p className="text-xl md:text-2xl text-theme-title font-bold mb-1 md:mb-2 tracking-tight">{m.title}</p>
                <p className="text-xs md:text-sm text-theme-body font-light max-w-[200px] md:max-w-xs leading-tight">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
