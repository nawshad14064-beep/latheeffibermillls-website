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
      {/* Globe Sphere - Enhanced 3D Look */}
      <div className="relative group">
        {/* Outer Atmosphere Glow */}
        <div className="absolute inset-[-40px] md:inset-[-100px] rounded-full bg-accent-gold/10 blur-[100px] pointer-events-none" />
        
        {/* The Sphere Container - Oblate Spheroid Shape (Wider than Tall) */}
        <motion.div 
          style={{ 
            rotateY: autoRotate,
            rotateZ: 23.5 // Earth's tilt
          }}
          className="relative w-[300px] h-[260px] md:w-[800px] md:h-[700px] rounded-[50%] border border-accent-gold/40 flex items-center justify-center overflow-hidden bg-primary shadow-[0_0_100px_rgba(212,175,55,0.2)] isolate"
        >
          {/* Spherical Inner Shading - Enhanced for depth */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(212,175,55,0.25)_0%,rgba(0,0,0,0.9)_100%)] z-10 pointer-events-none" />
          
          {/* Fresnel / Rim Light - Highlights the edges */}
          <div className="absolute inset-0 rounded-[50%] border-[12px] border-white/5 blur-[2px] z-20 pointer-events-none" />
          <div className="absolute inset-0 rounded-[50%] shadow-[inset_0_0_80px_rgba(212,175,55,0.4)] z-20 pointer-events-none" />

          {/* Latitudes & Longitudes - Curved simulation */}
          <div className="absolute inset-0 opacity-40 z-0">
            {/* Longitude lines with rotation and spherical warping */}
            {[...Array(12)].map((_, i) => (
              <div 
                key={`lng-${i}`} 
                className="absolute inset-0 border-x border-accent-gold/15 rounded-[50%] transform-gpu" 
                style={{ 
                  transform: `rotateY(${i * 30}deg) scaleX(${Math.cos((i * 30 * Math.PI) / 180)})`,
                  opacity: Math.abs(Math.sin((i * 30 * Math.PI) / 180)) > 0.5 ? 0.3 : 1
                }} 
              />
            ))}
            {/* Latitude lines - Stacked ellipses for 3D look */}
            {[...Array(8)].map((_, i) => {
              const yPos = (i + 1) * 11;
              const scale = Math.sin((yPos / 100) * Math.PI);
              return (
                <div 
                  key={`lat-${i}`} 
                  className="absolute left-1/2 -translate-x-1/2 border-y border-accent-gold/15 rounded-[50%]" 
                  style={{ 
                    top: `${yPos}%`, 
                    height: `${4}px`, 
                    width: `${scale * 100}%`,
                    opacity: scale * 0.8
                  }} 
                />
              );
            })}
          </div>

          {/* Atmosphere Highlight */}
          <div className="absolute top-0 left-1/4 w-1/2 h-1/4 bg-white/10 blur-[40px] rounded-full z-10" />
          
          {/* Dynamic Grid Overlay */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 contrast-150 brightness-50 mix-blend-overlay pointer-events-none" />
        </motion.div>

        {/* Outer Orbit Rings - For extra depth */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-20px] md:inset-[-60px] border border-accent-gold/10 rounded-full border-dashed pointer-events-none"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-40px] md:inset-[-120px] border border-white/5 rounded-full pointer-events-none"
        />
      </div>

      {/* Interactive Markers - Positioned relative to the container */}
      {BUSINESS_LINKS.map((link) => (
        <motion.div
          key={link.id}
          className="absolute z-10"
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
