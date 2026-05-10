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
      const ua = nav.userAgent.toLowerCase();
      
      // Safari detection - often needs more optimization for backdrop filters
      const isSafari = ua.indexOf('safari') > -1 && ua.indexOf('chrome') === -1;
      
      const isLowPower = (nav.hardwareConcurrency && nav.hardwareConcurrency <= 4) || 
                         (nav.deviceMemory && nav.deviceMemory <= 4);
      
      // On Safari, we might want to trigger low-end optimizations more easily if performance is an issue
      setIsLowEnd(isLowPower || width < 768 || (isSafari && width < 1024));
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return { isMobile, isLowEnd };
}
