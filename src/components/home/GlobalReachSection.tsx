import { motion } from "framer-motion";
import { Globe, Ship, Truck } from "lucide-react";

export default function GlobalReachSection() {
  return (
    <section className="py-20 md:py-48 relative overflow-hidden px-6 transition-colors duration-700 bg-section-hero">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-[1200px] aspect-square bg-accent-teal/5 blur-[150px] md:blur-[200px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="relative order-2 lg:order-1 mt-12 lg:mt-0">
            <div className="aspect-square rounded-[3rem] md:rounded-[5rem] overflow-hidden shadow-3xl border-4 md:border-8 border-theme-card">
              <img 
                src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1200" 
                alt="Global Logistics" 
                className="w-full h-full object-cover grayscale brightness-50"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 md:-bottom-12 -right-4 md:-right-12 p-8 md:p-12 bg-accent-teal rounded-[3rem] md:rounded-[4rem] text-white shadow-2xl flex flex-col justify-center max-w-[200px] md:max-w-xs transition-all">
              <p className="text-4xl md:text-6xl font-bold mb-2 md:mb-4 tracking-tighter">15+</p>
              <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.5em] leading-relaxed">Global Shipping Destinations</p>
            </div>
          </div>

          <div className="space-y-12 md:space-y-16 lg:pl-12 order-1 lg:order-2">
            <div className="space-y-6 md:space-y-8">
              <h2 className="text-accent-teal font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-[10px]">Global Logistics</h2>
              <h3 className="text-4xl md:text-8xl font-bold text-theme-title font-serif leading-[1] md:leading-[0.9] tracking-tighter">Beyond <br /> <span className="text-accent-teal italic">Boundaries</span></h3>
              <p className="text-base md:text-xl text-theme-subtitle font-light leading-relaxed max-w-lg">
                Strategically located near major shipping routes, we provide seamless door-to-door delivery across Europe, Asia, and North America.
              </p>
            </div>

            <div className="space-y-6 md:space-y-8">
              {[
                { icon: Ship, title: "Maritime Excellence", desc: "Weekly dispatches via Port of Colombo." },
                { icon: Globe, title: "Global Compliance", desc: "Full adherence to international import standards." },
                { icon: Truck, title: "Port-Ready Logistics", desc: "In-house trucking for synchronized shipping cycles." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="flex gap-6 md:gap-8 group"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-theme-card border border-theme-card flex items-center justify-center text-accent-teal shrink-0 group-hover:bg-accent-teal group-hover:text-white transition-all">
                    <item.icon className="w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-bold text-theme-title mb-1 md:mb-2">{item.title}</h4>
                    <p className="text-xs md:text-sm text-theme-muted font-light">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
