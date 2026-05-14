import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor({ isLowEnd = false }: { isLowEnd?: boolean }) {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isPointer, setIsPointer] = React.useState(false);
  const [currentLayout, setCurrentLayout] = React.useState<"premium" | "eco">("premium");
  const [isDarkMode, setIsDarkMode] = React.useState(true);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  React.useEffect(() => {
    const handleLayoutSwitch = () => {
      setCurrentLayout(prev => prev === "premium" ? "eco" : "premium");
    };
    const handleThemeToggle = () => {
      setIsDarkMode(prev => !prev);
    };
    const handleThemeSync = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    window.addEventListener("switch-layout", handleLayoutSwitch);
    window.addEventListener("trigger-theme-toggle", handleThemeToggle);
    window.addEventListener("sync-theme", handleThemeSync);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer');
      
      setIsPointer(!!isClickable);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("switch-layout", handleLayoutSwitch);
      window.removeEventListener("trigger-theme-toggle", handleThemeToggle);
      window.removeEventListener("sync-theme", handleThemeSync);
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  const themeColors = {
    premium: {
      main: "#D4AF37",
      border: "rgba(212, 175, 55, 0.3)",
      glow: "rgba(212, 175, 55, 0.1)",
      bgGlow: "rgba(212, 175, 55, 0.1)"
    },
    eco: {
      main: isDarkMode ? "#22c55e" : "#15803d",
      border: isDarkMode ? "rgba(34, 197, 94, 0.3)" : "rgba(21, 128, 61, 0.3)",
      glow: isDarkMode ? "rgba(34, 197, 94, 0.1)" : "rgba(21, 128, 61, 0.1)",
      bgGlow: isDarkMode ? "rgba(34, 197, 94, 0.05)" : "rgba(21, 128, 61, 0.05)"
    }
  };

  const colors = themeColors[currentLayout];

  return (
    <div className="fixed inset-0 pointer-events-none z-[10000] hidden md:block">
      {/* Light Follow Effect - Disabled on low end */}
      {!isLowEnd && (
        <motion.div
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            left: -150,
            top: -150,
          }}
          animate={{
            backgroundColor: colors.bgGlow
          }}
          transition={{ duration: 0.5 }}
          className="w-[300px] h-[300px] blur-[100px] rounded-full"
        />
      )}
      
      <motion.div
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          left: -20,
          top: -20,
        }}
        animate={{
          scale: isPointer ? 1.5 : 1,
          border: isPointer ? `2px solid ${colors.main}` : `1px solid ${colors.border}`,
          backgroundColor: isPointer ? colors.glow : "transparent",
        }}
        transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.5 }}
        className="w-10 h-10 rounded-full"
      />
      <motion.div
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          left: -3,
          top: -3,
        }}
        animate={{
          scale: isPointer ? 0.5 : 1,
          backgroundColor: colors.main,
          boxShadow: `0 0 10px ${colors.main}`,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.5 }}
        className="w-1.5 h-1.5 rounded-full"
      />
    </div>
  );
}
