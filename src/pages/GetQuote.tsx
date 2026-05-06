import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle2, Globe, Package, User, Mail, MessageSquare, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export default function GetQuote() {
  const [step, setStep] = React.useState(1);
  const [submitted, setSubmitted] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    country: "",
    product: "",
    quantity: "",
    message: ""
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const steps = [
    { id: 1, title: "Basic Info", icon: User },
    { id: 2, title: "Product Details", icon: Package },
    { id: 3, title: "Finalize", icon: Send }
  ];

  return (
    <div className="pt-32 pb-24 bg-[#050505] min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent-gold/10 text-accent-gold text-[10px] font-bold uppercase tracking-[0.3em] border border-accent-gold/20"
          >
            <Sparkles size={14} className="animate-pulse" />
            <span>AI-Powered Quotation</span>
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-bold text-white font-serif tracking-tighter">
            Get a <span className="text-accent-gold italic">Smart</span> Quote
          </h1>
          <p className="text-xl text-white/40 font-light max-w-2xl mx-auto">
            Tell us your requirements and our system will calculate the best industrial grade and shipping options for you.
          </p>
        </div>

        {/* Multi-step Form Container */}
        <div className="bg-white/5 backdrop-blur-3xl rounded-[4rem] border border-white/10 p-8 md:p-16 shadow-3xl relative overflow-hidden">
          {/* Progress Bar */}
          {!submitted && (
            <div className="flex justify-between mb-16 relative">
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/5 -translate-y-1/2 z-0" />
              <div 
                className="absolute top-1/2 left-0 h-[2px] bg-accent-gold -translate-y-1/2 z-0 transition-all duration-500" 
                style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
              />
              {steps.map((s) => (
                <div key={s.id} className="relative z-10 flex flex-col items-center gap-4">
                   <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 border-2",
                    step >= s.id ? "bg-accent-gold border-accent-gold text-primary" : "bg-[#0a0a0a] border-white/10 text-white/20"
                  )}>
                    <s.icon size={20} />
                  </div>
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-widest transition-colors",
                    step >= s.id ? "text-accent-gold" : "text-white/20"
                  )}>
                    {s.title}
                  </span>
                </div>
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20 space-y-8"
              >
                <div className="w-32 h-32 bg-accent-gold/20 text-accent-gold rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(212,175,55,0.2)]">
                  <CheckCircle2 size={64} />
                </div>
                <div className="space-y-4">
                  <h3 className="text-5xl font-bold text-white font-serif">Request Received!</h3>
                  <p className="text-white/60 text-xl font-light max-w-md mx-auto">
                    Our AI is analyzing your requirements. A dedicated export manager will contact you within 12 hours with a custom proposal.
                  </p>
                </div>
                <Button 
                  onClick={() => window.location.href = "/"}
                  className="bg-white text-primary rounded-full px-12 h-16 text-lg font-bold hover:bg-accent-gold transition-all"
                >
                  Back to Home
                </Button>
              </motion.div>
            ) : (
              <motion.form 
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleSubmit}
                className="space-y-12"
              >
                {step === 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <Label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-4">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-6 top-1/2 -translate-y-1/2 text-accent-gold" size={20} />
                        <Input 
                          placeholder="John Doe" 
                          className="h-20 pl-16 rounded-3xl bg-white/5 border-white/10 text-white focus:ring-2 focus:ring-accent-gold transition-all"
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <Label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-4">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-accent-gold" size={20} />
                        <Input 
                          type="email"
                          placeholder="john@example.com" 
                          className="h-20 pl-16 rounded-3xl bg-white/5 border-white/10 text-white focus:ring-2 focus:ring-accent-gold transition-all"
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2 space-y-4">
                      <Label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-4">Country / Region</Label>
                      <div className="relative">
                        <Globe className="absolute left-6 top-1/2 -translate-y-1/2 text-accent-gold" size={20} />
                        <Input 
                          placeholder="United Kingdom" 
                          className="h-20 pl-16 rounded-3xl bg-white/5 border-white/10 text-white focus:ring-2 focus:ring-accent-gold transition-all"
                          value={formData.country}
                          onChange={e => setFormData({...formData, country: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <Label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-4">Product Type</Label>
                      <select 
                        className="w-full h-20 px-8 rounded-3xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-accent-gold transition-all appearance-none"
                        value={formData.product}
                        onChange={e => setFormData({...formData, product: e.target.value})}
                        required
                      >
                        <option value="" className="bg-primary">Select Product</option>
                        <option value="twisted" className="bg-primary">Twisted Coir Fiber</option>
                        <option value="mixed" className="bg-primary">Mixed Fiber</option>
                        <option value="rolls" className="bg-primary">Coir Rolls</option>
                        <option value="pith" className="bg-primary">Fiber Pith</option>
                      </select>
                    </div>
                    <div className="space-y-4">
                      <Label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-4">Estimated Quantity (Tons)</Label>
                      <Input 
                        type="number"
                        placeholder="e.g. 25" 
                        className="h-20 px-8 rounded-3xl bg-white/5 border-white/10 text-white focus:ring-2 focus:ring-accent-gold transition-all"
                        value={formData.quantity}
                        onChange={e => setFormData({...formData, quantity: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <Label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-4">Additional Requirements</Label>
                    <div className="relative">
                      <MessageSquare className="absolute left-6 top-8 text-accent-gold" size={20} />
                      <Textarea 
                        placeholder="Tell us about your specific needs, shipping preferences, or industrial application..." 
                        className="min-h-[200px] pl-16 pt-8 rounded-[2.5rem] bg-white/5 border-white/10 text-white focus:ring-2 focus:ring-accent-gold transition-all"
                        value={formData.message}
                        onChange={e => setFormData({...formData, message: e.target.value})}
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-8">
                  {step > 1 && (
                    <Button 
                      type="button"
                      onClick={prevStep}
                      variant="outline"
                      className="rounded-full px-12 h-16 border-white/10 text-white hover:bg-white/5"
                    >
                      Previous
                    </Button>
                  )}
                  <div className="ml-auto">
                    {step < 3 ? (
                      <Button 
                        type="button"
                        onClick={nextStep}
                        className="bg-accent-gold text-primary rounded-full px-16 h-16 text-lg font-bold hover:bg-white transition-all"
                      >
                        Next Step
                      </Button>
                    ) : (
                      <Button 
                        type="submit"
                        className="bg-accent-gold text-primary rounded-full px-20 h-20 text-xl font-bold hover:bg-white shadow-[0_20px_50px_rgba(212,175,55,0.3)] transition-all"
                      >
                        Generate Smart Quote
                      </Button>
                    )}
                  </div>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Background Decorative Element */}
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-accent-gold/10 blur-[100px] rounded-full pointer-events-none" />
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
          <div className="flex flex-col items-center gap-2">
            <Globe size={24} className="text-white" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white">Global Shipping</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <CheckCircle2 size={24} className="text-white" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white">Quality Certified</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Sparkles size={24} className="text-white" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white">AI Optimized</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <User size={24} className="text-white" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white">Expert Support</span>
          </div>
        </div>
      </div>
    </div>
  );
}
