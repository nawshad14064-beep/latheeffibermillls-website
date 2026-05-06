import { useState, useEffect } from 'react';

export function useDevice() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);

      // Simple heuristic for low-end: check hardware concurrency or memory if available
      const nav = navigator as any;
      const isLowPower = (nav.hardwareConcurrency && nav.hardwareConcurrency <= 4) || 
                         (nav.deviceMemory && nav.deviceMemory <= 4);
      
      setIsLowEnd(isLowPower || width < 768);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return { isMobile, isLowEnd };
}
