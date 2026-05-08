import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface FeaturedProductsProps {
  playClick: () => void;
  playHover: () => void;
}

export default function FeaturedProducts({ playClick, playHover }: FeaturedProductsProps) {
  const products = [
    {
      title: "Twisted Coir Fiber",
      category: "Industrial Raw Material",
      image: "https://lh3.googleusercontent.com/d/14hxJTspVDJJpgoH_lcuBCZe0B9vO1Zjo",
      description: "Highly resilient fiber used in mattress and automotive upholstery, processed with precision for global standards."
    },
    {
      title: "Natural Mattress Fiber",
      category: "Home & Hospitality",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
      description: "Pure, sun-dried coir fiber offering exceptional breathability and structural integrity for premium bedding."
    }
  ];

  return (
    <section className="py-16 md:py-48 max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 md:gap-12 mb-20 md:mb-32">
        <div className="space-y-6 md:space-y-10">
          <div className="space-y-3 md:space-y-4">
            <h2 className="text-accent-gold font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-[10px]">Pure Resonance</h2>
            <h3 className="text-4xl md:text-[8rem] font-bold text-theme-title font-serif leading-[0.9] md:leading-[0.8] tracking-tighter uppercase">Our <br /> <span className="text-accent-gold italic">Fiber</span></h3>
          </div>
          <p className="text-base md:text-xl text-theme-subtitle font-light max-w-lg leading-relaxed">
            Distinguished by its golden hue and unmatched durability, our Sri Lankan coir fiber serves essential roles in global high-precision manufacturing.
          </p>
        </div>
        
        <Link 
          to="/products"
          onMouseEnter={playHover}
          onClick={playClick}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "group rounded-full px-8 md:px-12 h-14 md:h-16 border-white/10 hover:border-accent-gold hover:bg-accent-gold hover:text-primary transition-all text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em]"
          ) }
        >
          View Full Range 
          <ChevronRight className="ml-3 md:ml-4 group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
        {products.map((product, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="group relative"
          >
            <div className="relative aspect-[4/5] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden mb-8 md:mb-12 shadow-3xl border-4 md:border-8 border-theme-card">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 md:opacity-60 group-hover:opacity-40 transition-opacity" />
              
              <div className="absolute bottom-8 md:bottom-12 left-8 md:left-12 right-8 md:right-12">
                <p className="text-accent-gold font-bold uppercase tracking-widest text-[9px] md:text-[10px] mb-2 md:mb-4">{product.category}</p>
                <h4 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6 uppercase tracking-tight">{product.title}</h4>
                <Link 
                  to="/products"
                  className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-accent-gold hover:text-primary transition-all"
                >
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
                </Link>
              </div>
            </div>
            <p className="text-base md:text-lg text-theme-body font-light leading-relaxed px-4">{product.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
