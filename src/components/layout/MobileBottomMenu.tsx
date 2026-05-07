import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Info, Package, Image, ShieldCheck, Globe, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import useSound from "use-sound";

const menuItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Package, label: "Products", href: "/products" },
  { icon: Globe, label: "Export", href: "/export" },
  { icon: Phone, label: "Quote", href: "/get-quote" },
];

export default function MobileBottomMenu() {
  const location = useLocation();

  // Sound effects
  const [playHover] = useSound("https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3", { volume: 0.1 });
  const [playClick] = useSound("https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3", { volume: 0.2 });

  return (
    <div className="fixed bottom-6 left-6 right-6 z-[60] md:hidden">
      <div className="bg-theme-card backdrop-blur-2xl border border-theme-card rounded-3xl p-2 flex justify-between items-center shadow-3xl">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              onMouseEnter={() => playHover()}
              onClick={() => playClick()}
              className="relative flex-1 flex flex-col items-center py-2"
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-accent-gold rounded-2xl z-0"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon 
                size={20} 
                className={cn(
                  "relative z-10 transition-colors",
                  isActive ? "text-primary" : "text-theme-subtitle"
                )} 
              />
              <span className={cn(
                "text-[8px] font-bold uppercase tracking-widest relative z-10 mt-1",
                isActive ? "text-primary" : "text-theme-body"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
