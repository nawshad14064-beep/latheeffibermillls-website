import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import MouseParallax from "../ui/MouseParallax";
import Magnetic from "../ui/Magnetic";
import GlobeVisualization from "../ui/GlobeVisualization";

interface HeroSectionProps {
  isMobile: boolean;
  isLowEnd: boolean;
  heroImageY: any;
  heroRotate: any;
  heroImageScale: any;
  playClick: () => void;
  playHover: () => void;
}

function InteractiveLetters({ text, className, mousePos }: { text: string; className?: string; mousePos: { x: number; y: number } }) {
  return (
    <motion.span 
      className={cn("inline-block", className)}
      animate={{ 
        x: mousePos.x,
        y: mousePos.y,
        rotateX: -mousePos.y * 0.5,
        rotateY: mousePos.x * 0.5
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          animate={{
            x: mousePos.x * (i * 0.02),
            y: mousePos.y * (i * 0.02),
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// These are placeholders for decorative elements
export default function HeroSection({ 
  isMobile, 
  isLowEnd, 
  heroImageY, 
  heroRotate, 
  heroImageScale,
  playClick,
  playHover
}: HeroSectionProps) {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    if (isLowEnd) return;
    const handleMouseMove = (e: MouseEvent) => {
      const xPct = (e.clientX / window.innerWidth - 0.5) * 30;
      const yPct = (e.clientY / window.innerHeight - 0.5) * 30;
      setMousePos({ x: xPct, y: yPct });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isLowEnd]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
      {/* Cinematic Background - Minimal & Premium */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          style={{ y: heroImageY, scale: heroImageScale, rotate: heroRotate }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=2000" 
            alt="Lanka Fiber Mills Background" 
            className="w-full h-full object-cover opacity-10"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-accent-gold/5 blur-[200px] rounded-full pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-white/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] z-10" />
      </div>

      {/* Big Heading Behind Model - Medium Parallax */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        {!isLowEnd ? (
          <MouseParallax strength={30} className="w-full text-center">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 0.03, scale: 1, y: 0 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="text-[6rem] md:text-[25rem] font-black uppercase tracking-[-0.08em] text-accent-gold select-none font-display leading-none"
            >
              LEGACY
            </motion.h1>
          </MouseParallax>
        ) : (
          <div className="w-full text-center opacity-5">
            <h1 className="text-[6rem] md:text-[25rem] font-black uppercase tracking-[-0.08em] text-accent-gold select-none font-display leading-none">
              LEGACY
            </h1>
          </div>
        )}
      </div>

      {/* Globe Visualization - Center Piece */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="w-full h-full max-w-5xl mx-auto opacity-40">
          <GlobeVisualization />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full absolute inset-0 z-30 flex flex-col items-center justify-center text-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8 md:space-y-12"
        >
          {/* Trust Badge - Fast Parallax */}
          {!isLowEnd ? (
            <MouseParallax strength={60} className="pointer-events-auto flex justify-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 py-2 md:py-3 bg-accent-gold/10 backdrop-blur-xl text-white rounded-full text-[10px] md:text-[12px] font-bold uppercase tracking-[0.3em] md:tracking-[0.5em] border border-accent-gold/20 shadow-gold font-sans"
              >
                <Award size={14} className="text-accent-gold animate-pulse" />
                <span>Since 1985 • Global Standard</span>
              </motion.div>
            </MouseParallax>
          ) : (
            <div className="pointer-events-auto flex justify-center">
              <div className="inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 py-2 md:py-3 bg-accent-gold/10 text-white rounded-full text-[10px] md:text-[12px] font-bold uppercase tracking-[0.3em] md:tracking-[0.5em] border border-accent-gold/20 font-sans">
                <Award size={14} className="text-accent-gold" />
                <span>Since 1985 • Global Standard</span>
              </div>
            </div>
          )}
          
          <div className="pointer-events-auto px-4">
            {!isLowEnd ? (
              <MouseParallax strength={40}>
                <h2 className="text-4xl md:text-[8rem] font-bold text-white font-display leading-[0.95] md:leading-[0.9] tracking-tighter uppercase drop-shadow-2xl perspective-1000">
                  <InteractiveLetters text="Sri Lanka's Finest" mousePos={mousePos} /> <br />
                  <InteractiveLetters 
                    text="Coir Legacy" 
                    className="text-accent-gold text-shadow-gold italic" 
                    mousePos={mousePos}
                  />
                </h2>
                <motion.p 
                  animate={{ 
                    x: mousePos.x * 0.3,
                    y: mousePos.y * 0.3
                  }}
                  className="text-sm md:text-xl text-light-grey/60 max-w-2xl mx-auto font-light mt-6 md:mt-8 leading-relaxed font-sans tracking-wide"
                >
                  Empowering global industries with the world's most resilient and sustainable Sri Lankan coir fiber.
                </motion.p>
              </MouseParallax>
            ) : (
              <div>
                <h2 className="text-4xl md:text-[8rem] font-bold text-white font-display leading-[0.95] md:leading-[0.9] tracking-tighter uppercase">
                  Sri Lanka's Finest <br />
                  <span className="text-accent-gold italic">Coir Legacy</span>
                </h2>
                <p className="text-sm md:text-xl text-light-grey/60 max-w-2xl mx-auto font-light mt-6 md:mt-8 leading-relaxed font-sans tracking-wide">
                  Empowering global industries with the world's most resilient and sustainable Sri Lankan coir fiber.
                </p>
              </div>
            )}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-6 md:gap-8 justify-center items-center pointer-events-auto pt-4 md:pt-8"
          >
            <Magnetic>
              <Link 
                to="/products" 
                onClick={playClick}
                onMouseEnter={playHover}
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "bg-accent-gold hover:bg-white hover:text-primary rounded-full px-10 md:px-16 h-16 md:h-20 text-lg md:text-xl font-bold shadow-gold group flex items-center gap-4 md:gap-6 transition-all duration-500 hover:scale-105 font-sans"
                )}
              >
                Explore Products 
                <ArrowRight className="group-hover:translate-x-3 transition-transform" size={20} />
              </Link>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4 text-white/40"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Scroll to Discover</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-1 h-12 bg-gradient-to-b from-accent-gold to-transparent rounded-full"
        />
      </motion.div>
    </section>
  );
}
