import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, MessageSquare, X, Phone as WhatsAppIcon, Layers, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import ChatAssistant from "./ChatAssistant";

export default function FloatingActionDock() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentLayout, setCurrentLayout] = useState<"premium" | "eco">("eco");
  const [isDarkMode, setIsDarkMode] = useState(true);

  const switchLayout = () => {
    const next = currentLayout === "premium" ? "eco" : "premium";
    setCurrentLayout(next);
    window.dispatchEvent(new CustomEvent("switch-layout"));
  };

  const toggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    document.documentElement.classList.toggle("dark");
    window.dispatchEvent(new CustomEvent("trigger-theme-toggle"));
  };

  React.useEffect(() => {
    const handleLayoutSwitch = () => {
      setCurrentLayout(prev => prev === "premium" ? "eco" : "premium");
    };
    window.addEventListener("switch-layout", handleLayoutSwitch);
    
    const handleThemeSync = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };
    window.addEventListener("sync-theme", handleThemeSync);

    const handleTrigger = () => setIsChatOpen(true);
    window.addEventListener("trigger-ai-chat", handleTrigger);
    
    return () => {
      window.removeEventListener("switch-layout", handleLayoutSwitch);
      window.removeEventListener("sync-theme", handleThemeSync);
      window.removeEventListener("trigger-ai-chat", handleTrigger);
    };
  }, []);

  const actions = [
    {
      id: "whatsapp",
      icon: <WhatsAppIcon size={22} />,
      label: "WhatsApp",
      hoverColor: "hover:shadow-[0_0_30px_rgba(37,211,102,0.3)]",
      textColor: "text-[#25D366]",
      href: "https://wa.me/94778822241",
      action: null
    },
    {
      id: "linkedin",
      icon: <Linkedin size={22} />,
      label: "LinkedIn",
      hoverColor: "hover:shadow-[0_0_30px_rgba(0,119,181,0.3)]",
      textColor: "text-[#0077B5]",
      href: "https://www.linkedin.com/company/latheef-fiber-mills",
      action: null
    },
    {
      id: "theme",
      icon: isDarkMode ? <Sun size={22} /> : <Moon size={22} />,
      label: isDarkMode ? "Light Mode" : "Dark Mode",
      hoverColor: currentLayout === "premium" ? "hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]" : "hover:shadow-[0_0_30px_rgba(21,128,61,0.3)]",
      textColor: currentLayout === "premium" ? "text-white" : (isDarkMode ? "text-green-400" : "text-slate-800"),
      href: null,
      action: toggleTheme
    },
    {
      id: "layout",
      icon: <Layers size={22} />,
      label: currentLayout === "premium" ? "Switch to Eco" : "Switch to Premium",
      hoverColor: currentLayout === "premium" ? "hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]" : "hover:shadow-[0_0_30px_rgba(21,128,61,0.3)]",
      textColor: currentLayout === "premium" ? "text-accent-gold" : "text-green-700",
      href: null,
      action: switchLayout
    },
    {
      id: "ai",
      icon: <MessageSquare size={22} />,
      label: "AI Support",
      hoverColor: currentLayout === "premium" ? "hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]" : "hover:shadow-[0_0_30px_rgba(21,128,61,0.3)]",
      textColor: currentLayout === "premium" ? "text-accent-gold" : "text-green-700",
      href: null,
      action: () => setIsChatOpen(true)
    }
  ];

  return (
    <>
      <div 
        className="fixed bottom-36 right-4 md:bottom-32 md:right-4 z-[100] flex flex-col items-end gap-4"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              className="flex flex-col gap-3 mb-2"
            >
              {actions.map((act) => (
                <motion.a
                  key={act.id}
                  href={act.href || "#"}
                  target={act.href ? "_blank" : undefined}
                  rel={act.href ? "noopener noreferrer" : undefined}
                  onClick={(e) => {
                    if (act.action) {
                      e.preventDefault();
                      act.action();
                    }
                  }}
                  variants={{
                    hidden: { opacity: 0, x: 50, scale: 0.5 },
                    visible: { opacity: 1, x: 0, scale: 1 }
                  }}
                  whileHover={{ 
                    scale: 1.2, 
                    x: -4,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                  className={cn(
                    "flex items-center gap-3 py-1 px-1 group transition-all duration-500",
                    act.textColor
                  )}
                >
                  <span className={cn(
                    "text-[9px] font-black uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]",
                    currentLayout === "premium" ? "text-white" : "text-green-900"
                  )}>
                    {act.label}
                  </span>
                  <div className="w-10 h-10 flex items-center justify-center p-2 rounded-full transition-all duration-300 group-hover:bg-white/10 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                    {act.icon}
                  </div>
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.05, rotate: 90 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "w-16 h-16 backdrop-blur-3xl border rounded-[1.5rem] flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] group overflow-hidden relative transition-all duration-500",
            currentLayout === "premium" 
              ? "bg-primary/40 border-white/10 text-accent-gold" 
              : "bg-green-700/80 border-green-600 text-white"
          )}
        >
          {/* Animated Background Glow */}
          <div className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity",
            currentLayout === "premium" ? "bg-gradient-to-br from-accent-gold/20 to-transparent" : "bg-gradient-to-br from-white/20 to-transparent"
          )} />
          
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                className="grid grid-cols-2 gap-1.5"
              >
                 <div className={cn(
                   "w-1.5 h-1.5 rounded-full group-hover:scale-150 transition-transform duration-500",
                   currentLayout === "premium" ? "bg-accent-gold" : "bg-white"
                 )} />
                 <div className={cn(
                   "w-1.5 h-1.5 rounded-full group-hover:scale-150 transition-transform duration-500 delay-75",
                   currentLayout === "premium" ? "bg-white/20" : "bg-white/40"
                 )} />
                 <div className={cn(
                   "w-1.5 h-1.5 rounded-full group-hover:scale-150 transition-transform duration-500 delay-150",
                   currentLayout === "premium" ? "bg-white/20" : "bg-white/40"
                 )} />
                 <div className={cn(
                   "w-1.5 h-1.5 rounded-full group-hover:scale-150 transition-transform duration-500 delay-225",
                   currentLayout === "premium" ? "bg-accent-gold" : "bg-white"
                 )} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Reusing Chat Component logic but controlled from here */}
      <ChatAssistant forcedOpen={isChatOpen} onOpenChange={setIsChatOpen} />
    </>
  );
}
