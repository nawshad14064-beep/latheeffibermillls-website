import * as React from "react";
import { useState } from "react";
import { motion } from "motion/react";
import { Phone, Mail, MapPin, MessageSquare, CheckCircle2, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          product: "General Contact", // Identifier for contact form
          country: "Direct Contact"
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        const errorData = await response.json();
        alert(`Failed to send message: ${errorData.details || "Please try again later."}`);
      }
    } catch (error) {
      console.error("Error sending inquiry:", error);
      alert("An error occurred. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-mesh min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl text-accent-gold text-[10px] font-bold uppercase tracking-[0.3em] border border-white/10"
            >
              <MessageSquare size={14} />
              <span>Get In Touch</span>
            </motion.div>
            <h1 className="text-5xl md:text-9xl font-bold text-white font-serif leading-[0.85] tracking-tighter">
              Let's <br />
              <span className="text-accent-gold italic">Connect</span>
            </h1>
            <p className="text-lg text-white/60 font-light leading-relaxed max-w-md">
              Whether you're looking for a bulk quote or have a technical inquiry, our team is ready to assist you.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: "Email Us", value: "nawshad14064@gmail.com", icon: Mail, color: "bg-accent-gold text-primary" },
              { title: "Call Us", value: "+94 77 882 2241", icon: Phone, color: "bg-white/10 text-white" },
              { title: "Visit Us", value: "Narammala, Pothuhera", icon: MapPin, color: "bg-white/10 text-white", href: "https://share.google/9o5vaS37bkb0wI2FE" },
              { title: "LinkedIn", value: "Nawshad Latheef", icon: Linkedin, color: "bg-white/10 text-white", href: "https://www.linkedin.com/in/nawshad-latheef-14064n/" },
            ].map((item, i) => (
              <a 
                key={i} 
                href={item.href || "#"} 
                target={item.href ? "_blank" : undefined}
                rel={item.href ? "noopener noreferrer" : undefined}
                className="bg-white/5 backdrop-blur-xl p-8 rounded-[3rem] shadow-2xl border border-white/10 group hover:border-accent-gold transition-all"
              >
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-lg", item.color)}>
                  <item.icon size={24} />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">{item.title}</p>
                <p className="text-sm font-bold text-white break-words">{item.value}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-white/5 backdrop-blur-xl p-12 md:p-20 rounded-[4rem] shadow-3xl border border-white/10">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20 space-y-6"
              >
                <div className="w-24 h-24 bg-accent-gold/20 text-accent-gold rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-4xl font-bold text-white font-serif">Message Sent!</h3>
                <p className="text-white/60 text-lg font-light">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-4xl font-bold text-white font-serif">Send a Message</h3>
                  <p className="text-white/40 font-light">Fill out the form below and we'll be in touch shortly.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-white/40 ml-4">Full Name</Label>
                    <Input 
                      id="name" 
                      placeholder="John Doe" 
                      required 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={isSubmitting}
                      className="h-16 rounded-full px-8 bg-white/5 border-white/10 text-white focus:ring-2 focus:ring-accent-gold transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-white/40 ml-4">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="john@example.com" 
                      required 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={isSubmitting}
                      className="h-16 rounded-full px-8 bg-white/5 border-white/10 text-white focus:ring-2 focus:ring-accent-gold transition-all" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-xs font-bold uppercase tracking-widest text-white/40 ml-4">Subject</Label>
                  <Input 
                    id="subject" 
                    placeholder="Bulk Order Inquiry" 
                    required 
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    disabled={isSubmitting}
                    className="h-16 rounded-full px-8 bg-white/5 border-white/10 text-white focus:ring-2 focus:ring-accent-gold transition-all" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-white/40 ml-4">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us about your requirements..." 
                    required 
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    disabled={isSubmitting}
                    className="min-h-[200px] rounded-[2.5rem] p-8 bg-white/5 border-white/10 text-white focus:ring-2 focus:ring-accent-gold transition-all" 
                  />
                </div>
                
                <Button type="submit" size="lg" disabled={isSubmitting} className="w-full bg-accent-gold hover:bg-white text-primary rounded-full h-20 text-xl font-bold shadow-2xl shadow-accent-gold/20 transition-all">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>

          {/* Map & Info */}
          <div className="space-y-12">
            <div className="bg-primary rounded-[4rem] overflow-hidden h-[500px] shadow-3xl relative border border-white/10">
              {/* Placeholder for Map */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white p-12 text-center z-10">
                <div className="space-y-8">
                  <div className="w-20 h-20 bg-accent-gold rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
                    <MapPin size={40} className="text-primary" />
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-4xl font-bold font-serif italic text-accent-gold">Our Factory</h4>
                    <p className="text-white/80 text-2xl font-serif italic leading-relaxed">
                      Latheef Fiber Mills, <br />
                      F5M8+CRH, Narammala, <br />
                      Pothuhera, Sri Lanka, 60182
                    </p>
                  </div>
                </div>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=1200" 
                alt="Map Location" 
                className="w-full h-full object-cover opacity-20"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="bg-accent-gold p-16 rounded-[4rem] text-primary shadow-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10 space-y-10">
                <h4 className="text-4xl font-bold font-serif italic">Business Hours</h4>
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-primary/10 pb-6">
                    <span className="text-xl font-medium">Monday - Friday</span>
                    <span className="text-xl font-bold">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-primary/10 pb-6">
                    <span className="text-xl font-medium">Saturday</span>
                    <span className="text-xl font-bold">9:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-medium">Sunday</span>
                    <span className="text-xl font-bold italic">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
