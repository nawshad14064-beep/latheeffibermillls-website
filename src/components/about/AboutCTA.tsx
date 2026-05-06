import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function AboutCTA() {
  return (
    <section className="max-w-7xl mx-auto px-4">
      <div className="bg-white/5 backdrop-blur-xl rounded-[3rem] md:rounded-[5rem] p-12 md:p-24 text-center relative overflow-hidden border border-white/10">
        <div className="relative z-10 space-y-8 md:space-y-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white font-serif leading-tight">
            Experience the <br />
            <span className="text-accent-gold italic">Latheef Difference</span>
          </h2>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Join our network of global partners and discover why we've been a trusted name in fiber exports for over two decades.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link 
              to="/products" 
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "bg-accent-gold hover:bg-white text-primary rounded-full px-10 md:px-12 h-14 md:h-16 text-base md:text-lg font-bold shadow-xl shadow-accent-gold/20"
              )}
            >
              View Products
            </Link>
            <Link 
              to="/contact" 
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-white/20 text-white hover:bg-white hover:text-primary rounded-full px-10 md:px-12 h-14 md:h-16 text-base md:text-lg font-bold"
              )}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
