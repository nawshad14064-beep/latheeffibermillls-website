import { motion } from "framer-motion";
import { Award, ArrowRight, Box, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import * as React from "react";
import { useDevice } from "../../hooks/useDevice";

const CoirFiber3D = React.lazy(() => import("./CoirFiber3D"));

const products = [
  {
    id: "twisted-fiber",
    title: "Twisted Coir Fiber",
    image: "https://lh3.googleusercontent.com/d/14hxJTspVDJJpgoH_lcuBCZe0B9vO1Zjo",
    alt: "Premium Sri Lankan Twisted Coir Fiber for Industrial Upholstery",
    description: "Our flagship product. Export-grade premium twisted fiber processed from authentic Sri Lankan coconut husks for maximum durability and industrial versatility.",
    tag: "Best Seller",
    specs: [
      { label: "Moisture", value: "15% - 18% Max" },
      { label: "Length", value: "10cm - 25cm" }
    ]
  },
  {
    id: "mixed-fiber",
    title: "Mixed Coir Fiber",
    image: "https://lh3.googleusercontent.com/d/1C93c2r1h-nPb84-gA4ZGQVnz9FRykpj3",
    alt: "Industrial Grade Mixed Coir Fiber for Mattresses and Bedding",
    description: "Export quality Sri Lankan mixed coir fiber with low impurity levels. A cost-effective, sustainable solution for upholstery and bedding industries.",
    tag: "Industrial Grade",
    specs: [
      { label: "Quality", value: "Export Standard" },
      { label: "Impurity", value: "Low (< 3%)" }
    ]
  },
  {
    id: "coir-rolls",
    title: "Erosion Control Coir Rolls",
    image: "https://lh3.googleusercontent.com/d/1jdTc4eMMI358PELXGnyWMZODSTezh8MZ",
    alt: "Biodegradable Coir Rolls for Erosion Control and Sustainable Landscaping",
    description: "100% natural, biodegradable Sri Lankan coir rolls designed for superior soil bio-engineering and sustainable agricultural landscaping.",
    tag: "Eco-Solution",
    specs: [
      { label: "Application", value: "Agriculture" },
      { label: "Material", value: "100% Natural" }
    ]
  },
  {
    id: "fiber-pith",
    title: "Premium Coir Pith",
    image: "https://images.unsplash.com/photo-1592150621344-c7943424ad28?auto=format&fit=crop&q=80&w=1200",
    alt: "Washed and Compressed Coir Pith Coco Peat for Hydroponics",
    description: "High-expansion coir pith (coco peat) blocks from Sri Lanka. The perfect organic growing medium for modern hydroponics and commercial nurseries.",
    tag: "Horticulture",
    specs: [
      { label: "Type", value: "Washed / Unwashed" },
      { label: "Expansion", value: "High Expansion" }
    ]
  }
];

export default function ProductGrid() {
  const { isMobile, isLowEnd } = useDevice();

  return (
    <section className="max-w-7xl mx-auto px-4 mb-32 md:mb-40">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
        {/* 3D Experience Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="md:col-span-12 lg:col-span-4 h-[500px] md:h-[700px] bg-primary rounded-[3rem] md:rounded-[5rem] overflow-hidden relative group border-8 border-white/10 shadow-3xl"
        >
          <div className="absolute inset-0 z-0 opacity-40">
            <React.Suspense fallback={<div className="w-full h-full bg-primary animate-pulse" />}>
              <CoirFiber3D type="roll" isMobile={isLowEnd} />
            </React.Suspense>
          </div>
          <div className="absolute inset-0 p-12 flex flex-col justify-between text-white z-10 pointer-events-none">
            <div className="flex justify-between items-start">
              <span className="px-6 py-2 bg-accent-gold text-primary rounded-full text-[10px] font-bold uppercase tracking-widest">
                Interactive 3D
              </span>
              <Box size={32} className="text-accent-gold" />
            </div>
            <div className="space-y-6">
              <h3 className="text-5xl font-display font-bold uppercase leading-none">
                The <br /> <span className="text-accent-gold italic">Fiber</span> <br /> Structure
              </h3>
              <p className="text-lg text-white/60 font-serif italic">
                Explore the microscopic durability of our premium Sri Lankan fibers in full 3D.
              </p>
            </div>
          </div>
        </motion.div>

        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className={cn(
              "group relative rounded-[3rem] md:rounded-[5rem] overflow-hidden shadow-3xl bg-black/40 border-4 md:border-8 border-white/10",
              i === 0 ? "md:col-span-12 lg:col-span-8 h-[500px] md:h-[700px]" : "md:col-span-6 lg:col-span-4 h-[500px] md:h-[700px]"
            )}
          >
            <div className="absolute inset-0">
              <img 
                src={product.image} 
                alt={product.alt || product.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />
            </div>
            
            <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-between text-white">
              <div className="flex justify-between items-start">
                <span className="px-4 md:px-6 py-2 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-widest">
                  {product.tag}
                </span>
                <div className="w-12 h-12 md:w-16 md:h-16 bg-accent-gold rounded-2xl flex items-center justify-center shadow-2xl border-4 border-white/20">
                  <Award size={isMobile ? 24 : 32} />
                </div>
              </div>
              
              <div className="space-y-6 md:space-y-10">
                <h3 className={cn("font-display font-bold leading-none tracking-tighter uppercase", i === 0 ? "text-5xl md:text-[10rem]" : "text-4xl md:text-7xl")}>
                  {product.title}
                </h3>
                <p className="text-lg md:text-2xl text-white/80 font-serif italic max-w-xl leading-relaxed line-clamp-2 md:line-clamp-none">
                  {product.description}
                </p>
                
                <div className="pt-6 md:pt-12 border-t border-white/20 grid grid-cols-2 gap-6 md:gap-12">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="group/spec">
                      <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-accent-gold mb-2 md:mb-3 group-hover/spec:translate-x-2 transition-transform">{spec.label}</p>
                      <p className="text-lg md:text-2xl font-bold font-serif">{spec.value}</p>
                    </div>
                  ))}
                </div>

                <Link 
                  to="/get-quote" 
                  className="inline-flex items-center gap-3 text-accent-gold font-bold uppercase tracking-[0.3em] text-[10px] group/link pt-4"
                >
                  Request Quote <ArrowRight size={16} className="group-hover/link:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}

        {/* AI Recommendation Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="md:col-span-12 bg-black/40 backdrop-blur-3xl rounded-[4rem] p-12 md:p-20 border border-white/10 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="space-y-6 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-gold/10 text-accent-gold text-[10px] font-bold uppercase tracking-widest border border-accent-gold/20">
                <Sparkles size={14} className="animate-pulse" />
                <span>AI Recommendation</span>
              </div>
              <h3 className="text-4xl md:text-6xl font-bold text-white font-serif leading-tight">
                Not sure which <span className="text-accent-gold italic">grade</span> fits your industry?
              </h3>
              <p className="text-xl text-white/40 font-light">
                Our AI analyzes global industrial trends to suggest the most cost-effective and durable fiber for your specific application.
              </p>
            </div>
            <Link 
              to="/get-quote" 
              className="px-16 h-24 bg-accent-gold hover:bg-white text-primary rounded-full text-xl font-bold flex items-center gap-6 shadow-3xl shadow-accent-gold/20 transition-all hover:scale-105 whitespace-nowrap"
            >
              Ask AI Assistant <ArrowRight size={24} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
