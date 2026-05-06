import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Send, Box, CheckCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface FinalCTAProps {
  playClick: () => void;
  playHover: () => void;
}

export default function FinalCTA({ playClick, playHover }: FinalCTAProps) {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    country: "",
    product: "Coir Fiber Roll",
    message: ""
  });
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    setStatus("loading");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setStatusMessage(data.message || "Thank you! Your inquiry has been sent.");
        setFormData({ name: "", email: "", country: "", product: "Coir Fiber Roll", message: "" });
      } else {
        throw new Error(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setStatusMessage("Failed to send inquiry. Please try again later.");
    }

    // Reset status after a few seconds
    setTimeout(() => {
      if (status === "success" || status === "error") {
        setStatus("idle");
      }
    }, 5000);
  };

  return (
    <section className="py-20 md:py-32 bg-[#0B0B0F] relative overflow-hidden px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="space-y-8 md:space-y-12">
            <h2 className="text-4xl md:text-9xl font-bold font-serif leading-[0.95] md:leading-[0.85] tracking-tighter text-white">
              Ready to <br />
              <span className="text-accent-gold italic">Import?</span>
            </h2>
            <p className="text-light-grey/60 text-lg md:text-2xl max-w-xl font-light leading-relaxed">
              Join our network of global partners and experience the premium quality of Sri Lankan coir fiber.
            </p>
            
            {/* Small Rotating Cube Animation */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 md:w-48 md:h-48 bg-accent-gold/5 border border-accent-gold/20 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center relative group"
            >
              <Box className="w-10 h-10 md:w-12 md:h-12 text-accent-gold group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 bg-accent-gold/10 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          </div>

          <div className="glass-ios rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-12 border border-white/5 relative overflow-hidden shadow-3xl bg-black/60">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center text-center py-20 space-y-6"
                >
                  <div className="w-24 h-24 rounded-full bg-accent-gold/20 flex items-center justify-center text-accent-gold">
                    <CheckCircle size={64} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-bold text-white">Message Sent!</h3>
                    <p className="text-light-grey/60 max-w-xs mx-auto">
                      {statusMessage}
                    </p>
                  </div>
                  <button 
                    onClick={() => setStatus("idle")}
                    className="text-accent-gold text-sm font-bold uppercase tracking-widest hover:underline"
                  >
                    Send another inquiry
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 relative z-10" 
                  onSubmit={handleSubmit}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-light-grey/40 ml-4">Full Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="John Doe" 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl px-6 text-white placeholder:text-white/20 focus:outline-none focus:border-accent-gold/50 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-light-grey/40 ml-4">Email Address</label>
                      <input 
                        required
                        type="email" 
                        placeholder="john@example.com" 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl px-6 text-white placeholder:text-white/20 focus:outline-none focus:border-accent-gold/50 transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-light-grey/40 ml-4">Country</label>
                      <input 
                        required
                        type="text" 
                        placeholder="United Kingdom" 
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl px-6 text-white placeholder:text-white/20 focus:outline-none focus:border-accent-gold/50 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-light-grey/40 ml-4">Product of Interest</label>
                      <select 
                        value={formData.product}
                        onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                        className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl px-6 text-white focus:outline-none focus:border-accent-gold/50 transition-colors appearance-none"
                      >
                        <option value="Coir Fiber Roll" className="bg-[#0B0B0F]">Coir Fiber Roll</option>
                        <option value="Coco Peat Block" className="bg-[#0B0B0F]">Coco Peat Block</option>
                        <option value="Coir Rope" className="bg-[#0B0B0F]">Coir Rope</option>
                        <option value="Coco Mulch" className="bg-[#0B0B0F]">Coco Mulch</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-light-grey/40 ml-4">Your Message</label>
                    <textarea 
                      required
                      placeholder="Hi, I'm interested in importing..." 
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white placeholder:text-white/20 focus:outline-none focus:border-accent-gold/50 transition-colors resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-red-400 text-xs text-center">{statusMessage}</p>
                  )}

                  <button 
                    type="submit"
                    disabled={status === "loading"}
                    onMouseEnter={playHover}
                    className={cn(
                      buttonVariants({ variant: "default", size: "lg" }),
                      "w-full bg-accent-gold hover:bg-white hover:text-primary text-primary rounded-2xl h-20 text-xl font-bold shadow-gold group flex items-center justify-center gap-4 transition-all duration-500 font-sans",
                      status === "loading" && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {status === "loading" ? (
                      <Loader2 size={24} className="animate-spin" />
                    ) : (
                      <>
                        Send Inquiry
                        <Send size={20} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
            
            {/* Background Glow */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-accent-gold/10 blur-[100px] rounded-full pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
