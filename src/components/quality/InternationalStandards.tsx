import { Globe, Award, CheckCircle2, Droplets, Recycle, Ruler, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export default function InternationalStandards() {
  const specs = [
    { title: "Moisture", value: "15% Max", icon: Droplets, color: "text-accent-teal" },
    { title: "Impurity", value: "< 3%", icon: Recycle, color: "text-accent-gold" },
    { title: "Length", value: "10-25cm", icon: Ruler, color: "text-accent-teal" },
    { title: "Color", value: "Golden", icon: Sun, color: "text-accent-gold" },
  ];

  return (
    <section className="py-24 md:py-32 bg-primary text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <Globe className="absolute -top-20 -left-20 w-64 md:w-96 h-64 md:h-96" />
        <Award className="absolute -bottom-20 -right-20 w-64 md:w-96 h-64 md:h-96" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="space-y-8 md:space-y-12">
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-accent-gold font-bold tracking-[0.3em] uppercase text-xs">Global Benchmarks</h2>
              <h3 className="text-4xl md:text-6xl font-bold font-serif leading-tight">International <br /> Standards</h3>
            </div>
            <p className="text-green-100/60 text-lg md:text-xl font-light leading-relaxed">
              Our facility is equipped with modern testing labs to ensure every batch meets the specific moisture, impurity, and length requirements of our global partners.
            </p>
            <div className="space-y-4 md:space-y-6">
              {[
                "ISO 9001:2015 Compliant Processes",
                "Strict Moisture Control (< 15%)",
                "Low Impurity Levels (< 3%)",
                "Customizable Fiber Lengths",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-accent-gold flex items-center justify-center text-primary shrink-0">
                    <CheckCircle2 size={14} />
                  </div>
                  <span className="text-base md:text-lg font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {specs.map((spec, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border border-white/10 text-center">
                <spec.icon className={cn("mx-auto mb-4 md:mb-6 w-8 h-8 md:w-10 md:h-10", spec.color)} />
                <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">{spec.title}</p>
                <p className="text-xl md:text-2xl font-bold">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
