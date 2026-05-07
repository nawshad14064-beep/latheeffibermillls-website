import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Camera, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface GalleryPreviewProps {
  playClick: () => void;
  playHover: () => void;
}

export default function GalleryPreview({ playClick, playHover }: GalleryPreviewProps) {
  const images = [
    { url: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800", span: "md:col-span-8" },
    { url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800", span: "md:col-span-4" },
    { url: "https://images.unsplash.com/photo-1590593162211-f98f76d28ec5?auto=format&fit=crop&q=80&w=800", span: "md:col-span-4" },
    { url: "https://images.unsplash.com/photo-1550537687-c91072c4792d?auto=format&fit=crop&q=80&w=800", span: "md:col-span-8" }
  ];

  return (
    <section className="py-16 md:py-48 max-w-7xl mx-auto px-6">
      <div className="text-center mb-20 md:mb-32 space-y-6 md:space-y-8">
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-3 px-5 md:px-6 py-2 bg-theme-card border border-theme-card rounded-full text-accent-gold text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em]">
            <Camera size={14} />
            <span>Visual Narrative</span>
          </div>
        </div>
        <h2 className="text-4xl md:text-9xl font-bold text-theme-title font-serif tracking-tighter leading-[0.9] md:leading-[0.8] uppercase">Inside <br /> <span className="text-accent-gold italic">Latheef</span></h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px] mb-16 md:mb-24">
        {images.map((image, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className={cn("relative rounded-[2rem] md:rounded-[3rem] overflow-hidden group", image.span)}
          >
            <img 
              src={image.url} 
              alt="Gallery Preview" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/0 transition-colors" />
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center">
        <Link 
          to="/gallery"
          onMouseEnter={playHover}
          onClick={playClick}
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "bg-white text-primary hover:bg-accent-gold hover:text-white rounded-full px-12 md:px-16 h-16 md:h-20 text-lg md:text-xl font-bold shadow-2xl transition-all group"
          )}
        >
          View Full Gallery
          <ArrowRight className="ml-3 md:ml-4 group-hover:translate-x-3 transition-transform w-5 h-5 md:w-6 md:h-6" />
        </Link>
      </div>
    </section>
  );
}
