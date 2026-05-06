import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor({ isLowEnd = false }: { isLowEnd?: boolean }) {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isPointer, setIsPointer] = React.useState(false);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  React.useEffect(() => {
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
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[10000] hidden md:block">
      {/* Light Follow Effect - Disabled on low end */}
      {!isLowEnd && (
        <motion.div
          style={{
            translateX: cursorXSpring,
            translateY: cursorYSpring,
            left: -150,
            top: -150,
          }}
          className="w-[300px] h-[300px] bg-accent-gold/10 blur-[100px] rounded-full"
        />
      )}
      
      <motion.div
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          left: -20,
          top: -20,
        }}
        animate={{
          scale: isPointer ? 1.5 : 1,
          border: isPointer ? "2px solid #D4AF37" : "1px solid rgba(212, 175, 55, 0.3)",
          backgroundColor: isPointer ? "rgba(212, 175, 55, 0.1)" : "transparent",
        }}
        className="w-10 h-10 rounded-full transition-colors duration-300"
      />
      <motion.div
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          left: -3,
          top: -3,
        }}
        animate={{
          scale: isPointer ? 0.5 : 1,
          backgroundColor: "#D4AF37",
        }}
        className="w-1.5 h-1.5 rounded-full shadow-[0_0_10px_#D4AF37]"
      />
    </div>
  );
}
