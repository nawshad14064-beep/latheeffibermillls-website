import ThreeDIcon from "../3d/ThreeDIcon";

export default function CoreValues() {
  const values = [
    { title: "Sustainability", desc: "Every step of our process is designed to minimize environmental impact.", type: "leaf", color: "#4ade80" },
    { title: "Quality First", desc: "We never compromise on the industrial benchmarks of our fiber.", type: "shield", color: "#D4AF37" },
    { title: "Global Reach", desc: "Connecting Sri Lankan resources to manufacturers worldwide.", type: "ship", color: "#2dd4bf" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 mb-24 md:mb-32">
      <div className="text-center mb-16 md:mb-20 space-y-4 md:space-y-6">
        <h2 className="text-accent-gold font-bold tracking-[0.3em] uppercase text-xs">Our Foundation</h2>
        <h3 className="text-4xl md:text-6xl font-bold text-white font-serif">Core Values</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {values.map((value, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-white/10 group hover:border-accent-gold transition-all flex flex-col items-center text-center">
            <div className="mb-8">
              <ThreeDIcon type={value.type as any} color={value.color} />
            </div>
            <h4 className="text-xl md:text-2xl font-bold text-white mb-4">{value.title}</h4>
            <p className="text-white/40 font-light leading-relaxed text-sm md:text-base">{value.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
