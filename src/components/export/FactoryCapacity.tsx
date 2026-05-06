import { Factory } from "lucide-react";

export default function FactoryCapacity() {
  return (
    <section className="py-24 md:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-cream rounded-[3rem] md:rounded-[5rem] p-12 md:p-24 text-center relative overflow-hidden border border-accent-gold/10">
          <div className="relative z-10 space-y-8 md:space-y-10">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-primary rounded-3xl flex items-center justify-center text-white mx-auto shadow-xl">
              <Factory className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-primary font-serif leading-tight">
              Industrial <span className="text-accent-gold italic">Capacity</span>
            </h2>
            <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Our facility is capable of processing and dispatching up to 50 tons of high-grade fiber daily, ensuring we can meet even the largest global demands.
            </p>
            <div className="flex justify-center gap-8 md:gap-12">
              <div>
                <p className="text-4xl md:text-5xl font-bold text-primary">50T</p>
                <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-accent-gold">Daily Output</p>
              </div>
              <div className="w-px h-12 md:h-16 bg-gray-200" />
              <div>
                <p className="text-4xl md:text-5xl font-bold text-primary">100%</p>
                <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-accent-gold">On-Time Dispatch</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
