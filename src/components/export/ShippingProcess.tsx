import { Ship, Truck } from "lucide-react";

export default function ShippingProcess() {
  const steps = [
    { title: "Customs Clearance", desc: "Expert handling of Sri Lankan export documentation." },
    { title: "Port Logistics", desc: "Strategic proximity to Colombo Port for rapid dispatch." },
    { title: "Global Tracking", desc: "Full visibility of your shipment across all major sea routes." },
  ];

  return (
    <section className="py-24 md:py-32 bg-primary text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
        <Ship className="absolute -top-20 -right-20 w-64 md:w-96 h-64 md:h-96" />
        <Truck className="absolute -bottom-20 -left-20 w-64 md:w-96 h-64 md:h-96" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="space-y-8 md:space-y-12">
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-accent-gold font-bold tracking-[0.3em] uppercase text-xs">The Journey</h2>
              <h3 className="text-4xl md:text-6xl font-bold font-serif leading-tight">Seamless <br /> Logistics</h3>
            </div>
            <p className="text-green-100/60 text-lg md:text-xl font-light leading-relaxed">
              Our dedicated export team handles all documentation and logistics, providing real-time updates from our factory to your doorstep.
            </p>
            <div className="space-y-6 md:space-y-8">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-4 md:gap-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-accent-gold flex items-center justify-center text-primary shrink-0 font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-bold mb-2">{step.title}</h4>
                    <p className="text-green-100/40 font-light text-sm md:text-base">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-3xl">
              <img 
                src="https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&q=60&w=1200" 
                alt="Port Operations" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -top-6 md:-top-12 -right-6 md:-right-12 w-32 md:w-48 h-32 md:h-48 bg-accent-gold rounded-full flex items-center justify-center text-primary shadow-2xl">
              <div className="text-center">
                <p className="text-2xl md:text-4xl font-bold">24h</p>
                <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest">Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
