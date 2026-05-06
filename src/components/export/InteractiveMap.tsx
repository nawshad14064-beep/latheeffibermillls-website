import { motion } from "framer-motion";
import Globe3D from "../3d/Globe3D";

export default function InteractiveMap() {
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  return (
    <section className="max-w-full bg-black py-32 md:py-48 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#FFD700]/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-32 space-y-8 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#FFD700] font-light tracking-[1.2em] uppercase text-[10px]"
          >
            Global Presence
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-7xl md:text-9xl font-bold text-white font-serif italic tracking-tighter leading-[0.9]"
          >
            Connecting <br />
            <span className="text-[#FFD700]">Worlds</span>
          </motion.h3>
        </div>

        <div className="h-[700px] md:h-[800px]">
          <Globe3D isMobile={isMobile} />
        </div>
      </div>
    </section>
  );
}
