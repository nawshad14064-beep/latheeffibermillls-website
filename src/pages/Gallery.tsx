import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Image as ImageIcon, Maximize2, ExternalLink, Palmtree } from "lucide-react";
import { cn } from "@/lib/utils";
import { galleryCategories, galleryImages } from "../data/galleryData";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = React.useState("all");

  const filteredImages = activeCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-mesh relative overflow-hidden">
      {/* iOS Style Background Blobs */}
      <div className="blob w-[500px] h-[500px] bg-accent-teal top-[-10%] left-[-10%] opacity-20" />
      <div className="blob w-[400px] h-[400px] bg-accent-gold bottom-[-5%] right-[-5%] opacity-20" />
      <div className="blob w-[300px] h-[300px] bg-primary top-[40%] right-[10%] opacity-20" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-32 space-y-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-accent-gold text-white shadow-2xl border border-white/20"
          >
            <Camera size={18} />
            <span className="text-[10px] font-bold uppercase tracking-[0.5em]">Visual Showcase</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[4rem] md:text-[14rem] font-display text-primary leading-[0.75] tracking-tighter uppercase mb-12"
          >
            Our <br /> <span className="text-accent-amber italic">Gallery</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl text-gray-700 max-w-3xl mx-auto font-serif italic leading-relaxed"
          >
            A visual journey through our facilities, products, and the natural resources of Sri Lanka.
          </motion.p>
        </div>

        {/* Category Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-24 p-4 glass rounded-[4rem] max-w-5xl mx-auto border-white/80 shadow-3xl"
        >
          {galleryCategories.map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-12 py-5 rounded-full text-[10px] font-bold uppercase tracking-[0.4em] transition-all duration-500",
                activeCategory === cat.id 
                  ? "bg-primary text-white shadow-2xl shadow-primary/30" 
                  : "text-primary hover:text-accent-gold hover:bg-white/50"
              )}
            >
              {cat.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-12 gap-10 auto-rows-[350px] mb-40"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className={cn(
                  "group relative rounded-[5rem] overflow-hidden shadow-3xl border-8 border-white cursor-pointer image-reveal-container image-grain",
                  image.span || "md:col-span-4"
                )}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-12">
                  <div className="space-y-4 translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-2">
                      <span className="px-4 py-1.5 rounded-full bg-accent-gold text-white text-[10px] font-bold uppercase tracking-widest shadow-lg">
                        {image.category}
                      </span>
                    </div>
                    <h3 className="text-4xl font-display font-bold text-white tracking-tighter">{image.title}</h3>
                    <p className="text-white/70 text-lg font-serif italic leading-snug line-clamp-2">{image.description}</p>
                    <div className="pt-6 flex gap-4">
                      <button className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-accent-gold hover:border-accent-gold transition-all shadow-xl">
                        <Maximize2 size={24} />
                      </button>
                      <button className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-accent-gold hover:border-accent-gold transition-all shadow-xl">
                        <ExternalLink size={24} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="absolute top-10 right-10 w-14 h-14 rounded-2xl glass-ios flex items-center justify-center text-primary opacity-100 group-hover:opacity-0 transition-all duration-500 shadow-xl border-white/60">
                  <ImageIcon size={24} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 p-12 rounded-[4rem] glass-ios text-center relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:rotate-12 transition-transform">
            <Palmtree size={200} className="text-primary" />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-4xl font-black text-primary mb-6 tracking-tight">Want to see more?</h2>
            <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto font-light">
              Follow us on our social media platforms for daily updates from our plantations and production facilities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-10 py-4 bg-primary text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-green-950 transition-all shadow-xl shadow-primary/20">
                Follow on Instagram
              </button>
              <button className="px-10 py-4 glass-ios text-primary rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white transition-all">
                Visit LinkedIn
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
