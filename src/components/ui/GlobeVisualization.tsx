import * as React from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Globe, MapPin, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface BusinessLink {
  id: string;
  region: string;
  coords: { x: number; y: number };
  description: string;
}

const BUSINESS_LINKS: BusinessLink[] = [
  { id: "eu", region: "Europe", coords: { x: 45, y: 30 }, description: "Premium Industrial Partners" },
  { id: "as", region: "Asia Pacific", coords: { x: 75, y: 45 }, description: "Core Manufacturing Hub" },
  { id: "na", region: "North America", coords: { x: 20, y: 35 }, description: "Emerging Sustainable Markets" },
  { id: "sl", region: "Sri Lanka", coords: { x: 72, y: 65 }, description: "Global Export HQ" },
];

export default function GlobeVisualization() {
  const { scrollYProgress } = useScroll();
  const rotateScroll = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const [autoRotate, setAutoRotate] = React.useState(0);
  const [hoveredLink, setHoveredLink] = React.useState<BusinessLink | null>(null);

  React.useEffect(() => {
    let frame: number;
    const animate = () => {
      setAutoRotate(prev => (prev + 0.2) % 360);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center perspective-2000">
      {/* Globe Sphere - Decorative */}
      <motion.div 
        style={{ 
          rotateY: autoRotate,
          rotateZ: 23.5 // Earth's tilt
        }}
        className="relative w-[320px] h-[320px] md:w-[700px] md:h-[700px] rounded-full border border-accent-gold/30 flex items-center justify-center overflow-hidden bg-gradient-to-br from-white/5 to-transparent backdrop-blur-[2px]"
      >
        {/* Latitudes & Longitudes */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(12)].map((_, i) => (
            <div 
              key={`lat-${i}`} 
              className="absolute w-full h-[1px] bg-accent-gold/20" 
              style={{ top: `${(i + 1) * 7.7}%` }} 
            />
          ))}
          {[...Array(12)].map((_, i) => (
            <div 
              key={`lng-${i}`} 
              className="absolute h-full w-[1px] bg-accent-gold/20" 
              style={{ left: `${(i + 1) * 7.7}%` }} 
            />
          ))}
        </div>

        {/* Glow Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(212,175,55,0.1)_0%,transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-accent-gold/5 to-transparent" />
      </motion.div>

      {/* Interactive Markers - Positioned relative to the container */}
      {BUSINESS_LINKS.map((link) => (
        <motion.div
          key={link.id}
          className="absolute z-40"
          style={{
            left: `${link.coords.x}%`,
            top: `${link.coords.y}%`,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.5 }}
        >
          <div 
            className="group relative cursor-pointer"
            onMouseEnter={() => setHoveredLink(link)}
            onMouseLeave={() => setHoveredLink(null)}
          >
            {/* Pulsing Marker */}
            <div className="relative">
              <div className="w-4 h-4 md:w-6 md:h-6 bg-accent-gold rounded-full shadow-[0_0_20px_rgba(212,175,55,0.8)] animate-pulse" />
              <div className="absolute inset-x-0 inset-y-0 w-full h-full bg-accent-gold rounded-full animate-ping opacity-50" />
            </div>

            {/* Hover Content */}
            <AnimatePresence>
              {hoveredLink?.id === link.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 p-4 md:p-6 bg-black/90 backdrop-blur-2xl border border-accent-gold/30 rounded-2xl md:rounded-3xl shadow-2xl min-w-[200px] z-50 overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-accent-gold" />
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2 text-accent-gold">
                      <MapPin size={16} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{link.region}</span>
                    </div>
                    <ExternalLink size={14} className="text-white/20" />
                  </div>
                  <p className="text-white text-sm font-bold mb-1">{link.region} Operations</p>
                  <p className="text-white/40 text-[10px] font-light leading-snug">{link.description}</p>
                  
                  <div className="mt-4 pt-4 border-t border-white/10 flex justify-end">
                    <div className="text-[8px] font-bold uppercase tracking-widest text-accent-gold">View Logistics Data</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ))}

      {/* Center Label */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none z-30">
        <Globe className="text-accent-gold/20 mb-4 animate-spin-slow" size={100} />
      </div>
    </div>
  );
}
