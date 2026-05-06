import * as React from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";

interface MouseParallaxProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export default function MouseParallax({ children, strength = 20, className }: MouseParallaxProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 100 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const translateX = useTransform(springX, [-100, 100], [-strength, strength]);
  const translateY = useTransform(springY, [-100, 100], [-strength, strength]);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const mouseX = (e.clientX / innerWidth - 0.5) * 200;
      const mouseY = (e.clientY / innerHeight - 0.5) * 200;
      x.set(mouseX);
      y.set(mouseY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  return (
    <motion.div style={{ x: translateX, y: translateY }} className={className}>
      {children}
    </motion.div>
  );
}
