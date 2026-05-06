import { cn } from "@/lib/utils";

export default function ProductionProcess() {
  const steps = [
    { step: "01", title: "Husk Selection", desc: "Only mature, high-density husks are selected for processing.", color: "bg-primary" },
    { step: "02", title: "Natural Retting", desc: "Traditional water retting to separate fibers without chemicals.", color: "bg-accent-teal" },
    { step: "03", title: "Sun Drying", desc: "100% natural sun drying to maintain fiber strength and color.", color: "bg-accent-gold" },
    { step: "04", title: "Bale Pressing", desc: "High-pressure hydraulic pressing for efficient global shipping.", color: "bg-primary" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 mb-24 md:mb-32">
      <div className="text-center mb-16 md:mb-20 space-y-4 md:space-y-6">
        <h2 className="text-accent-gold font-bold tracking-[0.3em] uppercase text-xs">The Process</h2>
        <h3 className="text-4xl md:text-6xl font-bold text-white font-serif">Precision Engineering</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
        {steps.map((item, i) => (
          <div key={i} className="relative group">
            <div className="bg-white/5 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-white/10 h-full relative z-10 hover:-translate-y-2 transition-transform duration-500">
              <div className={cn("w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-white font-bold mb-6 md:mb-8 shadow-lg", item.color)}>
                {item.step}
              </div>
              <h4 className="text-xl md:text-2xl font-bold text-white mb-4">{item.title}</h4>
              <p className="text-white/40 font-light leading-relaxed text-sm md:text-base">{item.desc}</p>
            </div>
            {i < 3 && (
              <div className="hidden md:block absolute top-1/2 left-full w-8 h-px bg-white/10 z-0" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
