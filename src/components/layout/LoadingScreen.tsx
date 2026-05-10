import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [loading, setLoading] = React.useState(true);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const startTime = Date.now();
    const duration = 1000; // 1 second target for initial load

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const calculatedProgress = Math.min(Math.floor((elapsed / duration) * 100), 100);
      
      setProgress(calculatedProgress);

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(() => setLoading(false), 200);
      }
    }, 16); // 60fps check

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-primary flex flex-col items-center justify-center text-white"
        >
          <div className="relative mb-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
              className="w-32 h-32 border-4 border-accent-gold rounded-full flex items-center justify-center"
            >
              <span className="text-4xl font-display font-bold text-accent-gold">LFM</span>
            </motion.div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-t-4 border-white rounded-full"
            />
          </div>

          <div className="space-y-4 text-center">
            <h2 className="text-2xl font-display tracking-[0.5em] uppercase">Latheef Fiber Mills</h2>
            <p className="text-accent-gold/60 font-serif italic">Crafting Nature's Legacy...</p>
          </div>

          <div className="absolute bottom-24 w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-accent-gold"
            />
          </div>
          
          <div className="absolute bottom-12 text-[10px] tracking-[0.3em] uppercase text-white/40">
            {progress}% Experience Loading
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
