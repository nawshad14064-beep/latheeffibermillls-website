import { motion } from "motion/react";
import { Linkedin } from "lucide-react";

export default function FloatingLinkedIn() {
  return (
    <motion.a
      href="https://www.linkedin.com/in/nawshad-latheef-14064n/"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ 
        scale: 1.1, 
        backgroundColor: "#0077B5",
        color: "#ffffff"
      }}
      whileTap={{ scale: 0.9 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: 2
      }}
      className="fixed bottom-10 right-10 z-50 w-16 h-16 bg-black/40 backdrop-blur-xl text-accent-gold rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex items-center justify-center border border-white/10 group"
    >
      <Linkedin size={28} className="group-hover:animate-pulse" />
      <div className="absolute right-full mr-4 px-4 py-2 bg-accent-gold text-primary text-[10px] font-bold uppercase tracking-widest rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/20">
        Connect on LinkedIn
      </div>
    </motion.a>
  );
}
