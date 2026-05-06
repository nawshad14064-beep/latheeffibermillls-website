import { Globe, Package, Factory, Leaf } from "lucide-react";
import { motion } from "motion/react";

export default function TrustStrip() {
  const items = [
    { icon: Globe, label: "Global Export", color: "text-accent-gold" },
    { icon: Package, label: "Bulk Supply", color: "text-accent-teal" },
    { icon: Factory, label: "Factory Direct", color: "text-accent-gold" },
    { icon: Leaf, label: "Eco Friendly", color: "text-accent-teal" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-40">
      <div className="glass-ios rounded-full p-4 md:p-6 flex flex-wrap justify-center items-center gap-8 md:gap-16 border border-white/10 shadow-2xl">
        {items.map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-3 group cursor-default"
          >
            <div className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.05)]`}>
              <item.icon size={18} />
            </div>
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-light-grey/40 group-hover:text-accent-gold transition-colors font-sans">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
