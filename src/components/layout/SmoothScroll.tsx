import * as React from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children, isLowEnd = false }: { children: React.ReactNode; isLowEnd?: boolean }) {
  React.useEffect(() => {
    const lenis = new Lenis({
      duration: isLowEnd ? 0.8 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: isLowEnd ? 1.5 : 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
