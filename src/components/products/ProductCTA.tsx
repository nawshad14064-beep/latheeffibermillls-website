import { Link } from "react-router-dom";
import { Globe, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function ProductCTA() {
  return (
    <section className="py-24 md:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-accent-teal rounded-[3rem] md:rounded-[5rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-3xl">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <Globe className="absolute -top-20 -left-20 w-64 md:w-96 h-64 md:h-96" />
            <Leaf className="absolute -bottom-20 -right-20 w-64 md:w-96 h-64 md:h-96" />
          </div>
          
          <div className="relative z-10 space-y-8 md:space-y-12">
            <h2 className="text-5xl md:text-7xl font-bold font-serif leading-tight tracking-tighter">
              Ready for a <br />
              <span className="text-primary italic">Smart Quote?</span>
            </h2>
            <p className="text-white/80 text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
              Let our AI assistant help you configure the perfect export package for your destination and industry.
            </p>
            <Link 
              to="/get-quote" 
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "bg-primary hover:bg-green-950 text-white rounded-full px-12 md:px-16 h-16 md:h-20 text-lg md:text-xl font-bold shadow-2xl shadow-primary/20"
              )}
            >
              Get AI-Powered Quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
