import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function EcoFriendlyBanner() {
  return (
    <section className="py-24 md:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/5 backdrop-blur-xl rounded-[3rem] md:rounded-[5rem] p-12 md:p-24 text-center relative overflow-hidden border border-white/10">
          <div className="relative z-10 space-y-8 md:space-y-10">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-accent-gold rounded-3xl flex items-center justify-center text-primary mx-auto shadow-xl">
              <Leaf className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white font-serif leading-tight">
              Sustainable by <span className="text-accent-gold italic">Design</span>
            </h2>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Our production process uses zero harmful chemicals and relies on natural Sri Lankan sunlight, ensuring our fiber is as pure as nature intended.
            </p>
            <Link 
              to="/contact" 
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "bg-accent-gold hover:bg-white text-primary rounded-full px-12 md:px-16 h-16 md:h-20 text-lg md:text-xl font-bold shadow-2xl shadow-accent-gold/20"
              )}
            >
              Request Quality Report
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
