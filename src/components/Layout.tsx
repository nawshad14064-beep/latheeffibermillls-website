import * as React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect, Suspense } from "react";
import { Menu, X, Phone, Mail, MessageCircle, Leaf, Globe, Award, ShieldCheck, Instagram, Facebook, Twitter, Linkedin, MapPin, Moon, Sun } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import useSound from "use-sound";
import ChatAssistant from "./ChatAssistant";
import MobileBottomMenu from "./layout/MobileBottomMenu";
import Magnetic from "./ui/Magnetic";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Gallery", href: "/gallery" },
  { name: "AI Assistant", href: "#ai", isAI: true },
  { name: "Quality", href: "/quality" },
  { name: "Contact", href: "/contact" },
];

export default function Layout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentLayout, setCurrentLayout] = useState<"premium" | "eco">("premium");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Ensure dark mode is active on mount if default is true
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    // Sync with global custom events
    const handleLayoutSwitch = () => {
      setCurrentLayout(prev => prev === "premium" ? "eco" : "premium");
    };
    const handleThemeToggle = () => {
      setIsDarkMode(prev => !prev);
    };
    window.addEventListener("switch-layout", handleLayoutSwitch);
    window.addEventListener("trigger-theme-toggle", handleThemeToggle);
    return () => {
      window.removeEventListener("switch-layout", handleLayoutSwitch);
      window.removeEventListener("trigger-theme-toggle", handleThemeToggle);
    };
  }, []);

  useEffect(() => {
    if (currentLayout === "eco") {
      document.documentElement.style.setProperty("--accent-gold", "#22c55e"); // Bright Green
      document.body.classList.add("layout-eco");
      // Optionally switch to light mode for eco if requested, 
      // but for now we'll keep the user's preferred dark/light state
    } else {
      document.documentElement.style.setProperty("--accent-gold", "#D4AF37"); // Premium Gold
      document.body.classList.remove("layout-eco");
    }
  }, [currentLayout]);

  const toggleLayout = () => {
    window.dispatchEvent(new CustomEvent("switch-layout"));
    playClick();
  };
  const [language, setLanguage] = useState("EN");
  const location = useLocation();

  // Sound effects
  const [playHover] = useSound("https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3", { volume: 0.1 });
  const [playClick] = useSound("https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3", { volume: 0.2 });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
    window.dispatchEvent(new CustomEvent("sync-theme"));
  };

  return (
    <div className={cn(
      "min-h-screen flex flex-col font-sans transition-colors duration-700 overflow-x-hidden",
      currentLayout === "premium" 
        ? "selection:bg-accent-gold selection:text-primary bg-[#0B0B0F] text-white" 
        : cn(
            "selection:bg-green-600 selection:text-white",
            isDarkMode ? "bg-[#051509] text-slate-200" : "bg-slate-50"
          )
    )}>
      <MobileBottomMenu />
      {/* Top Bar - Professional & Informative */}
      <div className={cn(
        "py-2 px-4 hidden md:block border-b transition-colors duration-500",
        currentLayout === "premium" 
          ? "bg-black text-white border-white/5" 
          : isDarkMode ? "bg-[#020a05] text-white border-green-900/30" : "bg-slate-900 text-slate-100 border-slate-700"
      )}>
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em]">
          <div className="flex items-center gap-6">
            <a 
              href="mailto:nawshad14064@gmail.com" 
              onMouseEnter={() => playHover()}
              onClick={() => playClick()}
              className="flex items-center gap-2 hover:text-accent-gold transition-colors"
            >
              <Mail size={12} /> nawshad14064@gmail.com
            </a>
            <a 
              href="tel:+94778822241" 
              onMouseEnter={() => playHover()}
              onClick={() => playClick()}
              className="flex items-center gap-2 hover:text-accent-gold transition-colors"
            >
              <Phone size={12} /> +94 77 882 2241
            </a>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <MapPin size={12} /> Narammala, Sri Lanka
            </span>
            <div className="flex items-center gap-4 border-l border-white/10 pl-6">
              <a href="#" onMouseEnter={() => playHover()} onClick={() => playClick()} className="hover:text-accent-gold transition-colors"><Facebook size={14} /></a>
              <a href="#" onMouseEnter={() => playHover()} onClick={() => playClick()} className="hover:text-accent-gold transition-colors"><Instagram size={14} /></a>
              <a href="https://www.linkedin.com/in/nawshad-latheef-14064n/" target="_blank" rel="noopener noreferrer" onMouseEnter={() => playHover()} onClick={() => playClick()} className="hover:text-accent-gold transition-colors"><Linkedin size={14} /></a>
              <a href="#" onMouseEnter={() => playHover()} onClick={() => playClick()} className="hover:text-accent-gold transition-colors"><Twitter size={14} /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Header - Glassmorphism */}
      <header 
        className={cn(
          "fixed top-0 md:top-8 left-0 right-0 z-50 transition-all duration-500 px-4",
          isScrolled ? "md:top-4" : "md:top-8"
        )}
      >
        <nav 
          className={cn(
            "max-w-7xl mx-auto rounded-full transition-all duration-500 px-8 md:px-12 py-5 flex items-center justify-between border border-white/5 shadow-2xl",
            isScrolled 
              ? "bg-black/60 backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] py-4" 
              : "bg-transparent border-transparent shadow-none"
          )}
        >
          <Link to="/" onMouseEnter={() => playHover()} onClick={() => playClick()} className="flex items-center gap-4 group">
            <div className="w-14 h-14 bg-accent-gold rounded-2xl flex items-center justify-center text-primary group-hover:rotate-12 transition-transform shadow-gold border-2 border-white/10">
              <Leaf size={28} />
            </div>
            <div className="flex flex-col">
              <span className={cn(
                "text-3xl font-display tracking-[0.1em] leading-none uppercase font-black transition-colors duration-500",
                currentLayout === "premium" ? "text-white" : (isDarkMode ? "text-white" : "text-green-900")
              )}>
                LATHEEF
              </span>
              <span className={cn(
                "text-[9px] font-bold uppercase tracking-[0.6em] -mt-1 font-sans transition-colors duration-500",
                currentLayout === "premium" ? "text-accent-gold" : (isDarkMode ? "text-green-400" : "text-green-700")
              )}>
                Fiber Mills
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={toggleLayout}
              onMouseEnter={() => playHover()}
              className={cn(
                "px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.4em] transition-all flex items-center gap-3 border shadow-sm",
                currentLayout === "premium"
                  ? "bg-white/5 border-white/10 text-accent-gold hover:bg-white/10"
                  : isDarkMode 
                    ? "bg-green-900/20 border-green-800 text-green-400 hover:bg-green-900/40"
                    : "bg-green-100 border-green-200 text-green-700 hover:bg-green-200"
              )}
            >
              {currentLayout === "premium" ? <Leaf size={14} /> : <Globe size={14} />}
              {currentLayout === "premium" ? "Switch to Eco Layout" : "Switch to Premium"}
            </button>

            {navItems.map((item) => (
              item.isAI ? (
                <button
                  key="ai-trigger"
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent("trigger-ai-chat"));
                    playClick();
                  }}
                  onMouseEnter={() => playHover()}
                  className="px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.4em] transition-all relative group font-sans text-accent-gold hover:bg-accent-gold/10"
                >
                  {item.name}
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent-gold rounded-full animate-pulse shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                </button>
              ) : (
                <Link
                  key={item.href}
                  to={item.href}
                  onMouseEnter={() => playHover()}
                  onClick={() => playClick()}
                  className={cn(
                    "px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.4em] transition-all relative group font-sans",
                    location.pathname === item.href 
                      ? (currentLayout === "premium" ? "text-primary bg-accent-gold shadow-gold" : "text-white bg-green-700 shadow-lg") 
                      : (currentLayout === "premium" 
                          ? "text-white/60 hover:text-accent-gold" 
                          : (isDarkMode ? "text-slate-400 hover:text-green-400" : "text-slate-600 hover:text-green-900"))
                  )}
                >
                  {item.name}
                </Link>
              )
            ))}
            
            <button 
              onClick={() => {
                toggleDarkMode();
                playClick();
              }}
              onMouseEnter={() => playHover()}
              className="w-12 h-12 rounded-full flex items-center justify-center text-white/60 hover:text-accent-gold hover:bg-white/5 transition-all"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Link 
              to="/get-quote" 
              onMouseEnter={() => playHover()}
              onClick={() => playClick()}
              className={cn(
                buttonVariants({ variant: "default" }),
                "ml-8 bg-accent-gold hover:bg-white hover:text-primary text-primary rounded-full px-12 h-16 text-[10px] font-bold uppercase tracking-[0.5em] shadow-gold border-4 border-white/10 transition-all hover:scale-105 font-sans"
              )}
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white"
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              playClick();
            }}
            onMouseEnter={() => playHover()}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={cn(
                "absolute top-24 left-4 right-4 backdrop-blur-3xl rounded-[2rem] p-8 shadow-3xl md:hidden border transition-all duration-500",
                currentLayout === "premium" ? "bg-black/95 border-white/10" : "bg-white border-green-100 shadow-2xl"
              )}
            >
              <div className="flex flex-col gap-4">
                <button 
                  onClick={toggleLayout}
                  className={cn(
                    "text-xl font-bold p-4 rounded-2xl transition-colors flex items-center justify-between",
                    currentLayout === "premium" 
                      ? "bg-white/5 text-accent-gold" 
                      : (isDarkMode ? "bg-green-900/20 text-green-400" : "bg-green-100 text-green-700")
                  )}
                >
                  Change Layout
                  {currentLayout === "premium" ? <Leaf size={24} /> : <Globe size={24} />}
                </button>
                {navItems.map((item) => (
                  item.isAI ? (
                    <button
                      key="ai-trigger-mobile"
                      onClick={() => {
                        window.dispatchEvent(new CustomEvent("trigger-ai-chat"));
                        setIsMobileMenuOpen(false);
                        playClick();
                      }}
                      onMouseEnter={() => playHover()}
                      className="text-xl font-bold p-4 rounded-2xl transition-colors text-accent-gold hover:bg-white/5 flex items-center justify-between"
                    >
                      {item.name}
                      <span className="w-2 h-2 bg-accent-gold rounded-full animate-pulse shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                    </button>
                  ) : (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={cn(
                        "text-xl font-bold p-4 rounded-2xl transition-colors",
                        location.pathname === item.href ? "bg-accent-gold text-primary" : "text-white/60 hover:bg-white/5"
                      )}
                      onMouseEnter={() => playHover()}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        playClick();
                      }}
                    >
                      {item.name}
                    </Link>
                  )
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow">
        <Suspense fallback={<div className="h-[60vh] flex items-center justify-center bg-primary"><div className="w-12 h-12 border-4 border-accent-gold border-t-transparent rounded-full animate-spin" /></div>}>
          <Outlet />
        </Suspense>
      </main>

      {/* Footer - Pure Black */}
      <footer className={cn(
        "pt-24 md:pt-40 pb-32 md:pb-16 overflow-hidden relative border-t transition-colors duration-500",
        currentLayout === "premium" 
          ? "bg-black text-white border-white/5" 
          : (isDarkMode ? "bg-[#020a05] text-white border-green-900/30" : "bg-slate-900 text-slate-100 border-slate-700")
      )}>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-20 mb-20 md:mb-32">
            <div className="md:col-span-5 space-y-8 md:space-y-12">
              <Link to="/" onMouseEnter={() => playHover()} onClick={() => playClick()} className="flex items-center gap-4 group">
                <div className="w-16 h-16 md:w-24 md:h-24 bg-accent-gold rounded-2xl md:rounded-[3rem] flex items-center justify-center text-primary group-hover:rotate-12 transition-transform shadow-[0_0_40px_rgba(212,175,55,0.3)] border-4 border-white/10">
                  <Leaf className="w-8 h-8 md:w-12 md:h-12" />
                </div>
                <div className="flex flex-col">
                  <span className={cn(
                    "text-4xl md:text-6xl font-display tracking-tighter leading-none uppercase transition-colors duration-500",
                    currentLayout === "premium" ? "text-white" : (isDarkMode ? "text-white" : "text-green-900")
                  )}>
                    LATHEEF
                  </span>
                  <span className={cn(
                    "text-[10px] md:text-[14px] font-bold uppercase tracking-[0.5em] md:tracking-[0.6em] -mt-1 transition-colors duration-500",
                    currentLayout === "premium" ? "text-accent-gold" : (isDarkMode ? "text-green-400" : "text-green-700")
                  )}>
                    Fiber Mills
                  </span>
                </div>
              </Link>
              <p className="text-xl md:text-3xl text-light-grey/60 font-serif italic leading-relaxed max-w-md">
                Leading exporters of premium Sri Lankan coir products, committed to sustainability and global industrial excellence since 1998.
              </p>
              <div className="flex flex-wrap gap-4 md:gap-6">
                {[Facebook, Instagram, Linkedin, Twitter, Mail].map((Icon, i) => (
                  <motion.a 
                    key={i} 
                    href={Icon === Linkedin ? "https://www.linkedin.com/in/nawshad-latheef-14064n/" : "#"} 
                    target={Icon === Linkedin ? "_blank" : undefined}
                    rel={Icon === Linkedin ? "noopener noreferrer" : undefined}
                    whileHover={{ y: -12, scale: 1.2, rotate: 5 }}
                    onMouseEnter={() => playHover()}
                    onClick={() => playClick()}
                    className="w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent-gold hover:text-primary transition-all shadow-[0_0_20px_rgba(212,175,55,0)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]"
                  >
                    <Icon className="w-6 h-6 md:w-8 md:h-8" />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 space-y-8 md:space-y-12">
              <h4 className="text-accent-gold font-bold uppercase tracking-[0.4em] md:tracking-[0.5em] text-[10px]">Quick Links</h4>
              <ul className="space-y-6 md:space-y-8">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link 
                      to={item.href} 
                      onMouseEnter={() => playHover()}
                      onClick={() => playClick()}
                      className="text-xl md:text-2xl text-light-grey/40 hover:text-accent-gold transition-colors flex items-center gap-4 group font-serif italic"
                    >
                      <div className="w-1.5 h-1.5 bg-accent-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-5 space-y-8 md:space-y-12">
              <h4 className="text-accent-gold font-bold uppercase tracking-[0.4em] md:tracking-[0.5em] text-[10px]">Global Headquarters</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-16">
                <div className="space-y-4 md:space-y-8">
                  <div className="flex items-center gap-4 md:gap-5 text-accent-gold">
                    <MapPin className="shrink-0" size={20} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] md:tracking-[0.5em]">Address</span>
                  </div>
                  <p className="text-xl md:text-2xl text-light-grey/60 font-serif italic leading-relaxed">
                    Narammala, Kurunegala<br />
                    Sri Lanka, 60182
                  </p>
                </div>
                <div className="space-y-4 md:space-y-8">
                  <div className="flex items-center gap-4 md:gap-5 text-accent-gold">
                    <Phone className="shrink-0" size={20} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] md:tracking-[0.5em]">Contact</span>
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    <p className="text-xl md:text-2xl text-light-grey/60 font-serif italic">+94 77 882 2241</p>
                    <p className="text-lg md:text-2xl text-light-grey/60 font-serif italic truncate">nawshad14064@gmail.com</p>
                  </div>
                </div>
              </div>
              <div className="p-8 md:p-12 bg-white/5 rounded-[2.5rem] md:rounded-[4rem] border border-white/10 shadow-inner">
                <p className="text-lg md:text-xl text-light-grey/40 italic font-serif">"Eco-Friendly Solutions from Sri Lanka to the World"</p>
              </div>
            </div>
          </div>

          <div className="pt-12 md:pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-10 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-light-grey/20">
            <p className="text-center md:text-left">© 2026 Latheef Fiber Mills. All Rights Reserved.</p>
            <div className="flex flex-wrap justify-center gap-6 md:gap-12">
              <a href="#" onMouseEnter={() => playHover()} onClick={() => playClick()} className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" onMouseEnter={() => playHover()} onClick={() => playClick()} className="hover:text-white transition-colors">Terms</a>
              <a href="#" onMouseEnter={() => playHover()} onClick={() => playClick()} className="hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
