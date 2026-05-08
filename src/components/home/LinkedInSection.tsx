import { motion } from "framer-motion";
import { Linkedin, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface LinkedInSectionProps {
  playClick: () => void;
  playHover: () => void;
}

export default function LinkedInSection({ playClick, playHover }: LinkedInSectionProps) {
  return (
    <section className="py-16 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-theme-card backdrop-blur-xl rounded-[2.5rem] md:rounded-[4rem] p-6 md:p-24 border border-theme-card relative overflow-hidden group shadow-xl">
          <div className="absolute top-0 right-0 p-6 md:p-12 opacity-5 group-hover:rotate-12 transition-transform">
            <Linkedin className="w-[120px] h-[120px] md:w-[200px] md:h-[200px] text-theme-title" />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-16 text-center md:text-left">
            <div className="w-28 h-28 md:w-48 md:h-48 rounded-[2rem] md:rounded-[3rem] bg-accent-gold overflow-hidden shrink-0 shadow-2xl border-4 border-theme-card">
              <img 
                src="https://lh3.googleusercontent.com/d/1UdXBQsOJ2Osw8VJYGwZ_ateIlp2BH8PX" 
                alt="Nawshad Latheef" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="space-y-6 md:space-y-8 flex-grow">
              <div className="space-y-2">
                <h2 className="text-accent-gold font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-[10px]">Founder's Insight</h2>
                <h3 className="text-3xl md:text-6xl font-bold text-theme-title font-serif leading-tight tracking-tight">Nawshad <br /> <span className="text-accent-gold italic">Latheef</span></h3>
              </div>
              <p className="text-lg md:text-xl text-theme-body font-light leading-relaxed font-serif italic">
                "Our mission is to bridge the gap between traditional Sri Lankan craftsmanship and modern global industrial demands through sustainable fiber solutions."
              </p>
              <a 
                href="https://www.linkedin.com/in/nawshad-latheef-14064n/"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHover}
                onClick={playClick}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "bg-[#0077B5] hover:bg-white hover:text-[#0077B5] text-white rounded-full px-6 md:px-12 h-14 md:h-16 text-[10px] md:text-sm font-bold uppercase tracking-widest flex items-center gap-4 transition-all shadow-xl"
                )}
              >
                Connect on LinkedIn
                <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
