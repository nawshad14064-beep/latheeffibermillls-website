import { ShieldCheck, Recycle, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

export default function QualityStandards() {
  return (
    <section className="py-24 md:py-32 bg-primary text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-teal rounded-full blur-[150px] opacity-20 -translate-y-1/2 translate-x-1/2" />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 space-y-6 md:space-y-8">
          <h2 className="text-accent-gold font-bold tracking-[0.4em] uppercase text-[10px]">Quality Assurance</h2>
          <h3 className="text-5xl md:text-[8rem] font-display leading-none uppercase tracking-tighter">Industrial <br /> <span className="text-accent-amber italic">Standards</span></h3>
          <p className="text-green-100/60 text-xl md:text-2xl font-serif italic">Every bale of fiber undergoes rigorous testing to meet international export benchmarks.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            { title: "Moisture Control", desc: "Maintained below 15% for optimal durability.", icon: ShieldCheck, color: "bg-accent-teal" },
            { title: "Impurity Removal", desc: "Less than 3% impurities through advanced cleaning.", icon: Recycle, color: "bg-accent-gold" },
            { title: "Natural Drying", desc: "100% sun-dried to preserve fiber integrity.", icon: Leaf, color: "bg-primary" },
          ].map((item, i) => (
            <div key={i} className="bg-black/40 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] border border-white/10 group hover:bg-black/60 transition-all duration-500">
              <div className={cn("w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-white mb-6 md:mb-8 shadow-lg", item.color)}>
                <item.icon size={24} />
              </div>
              <h4 className="text-xl md:text-2xl font-bold mb-4">{item.title}</h4>
              <p className="text-green-100/50 font-light leading-relaxed text-sm md:text-base">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
