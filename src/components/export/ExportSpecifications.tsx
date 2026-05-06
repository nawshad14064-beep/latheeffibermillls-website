import { Package, Container, Anchor } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ExportSpecifications() {
  const specs = [
    { title: "Bale Weight", value: "125kg - 150kg", icon: Package, color: "bg-primary" },
    { title: "Container Load", value: "20 - 24 Tons", icon: Container, color: "bg-accent-teal" },
    { title: "Packing", value: "Hydraulic Pressed", icon: Anchor, color: "bg-accent-gold" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 mb-24 md:mb-32">
      <div className="text-center mb-16 md:mb-20 space-y-4 md:space-y-6">
        <h2 className="text-accent-gold font-bold tracking-[0.3em] uppercase text-xs">Specifications</h2>
        <h3 className="text-4xl md:text-6xl font-bold text-white font-serif">Export Standards</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {specs.map((spec, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-white/10 text-center group hover:border-accent-gold transition-all">
            <div className={cn("w-16 h-16 md:w-20 md:h-20 rounded-3xl flex items-center justify-center text-white mx-auto mb-6 md:mb-8 shadow-xl", spec.color)}>
              <spec.icon className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h4 className="text-xl md:text-2xl font-bold text-white mb-4">{spec.title}</h4>
            <p className="text-3xl md:text-4xl font-bold text-white">{spec.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
