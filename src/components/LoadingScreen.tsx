import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/Untitled design (3).webp";

export function LoadingScreen() {
  const [done, setDone] = useState(true);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("loaded") === "1") return;
    setDone(false);
    const start = Date.now();
    const duration = 700;
    const id = setInterval(() => {
      const p = Math.min(100, Math.round(((Date.now() - start) / duration) * 100));
      setPct(p);
      if (p >= 100) {
        clearInterval(id);
        sessionStorage.setItem("loaded", "1");
        setTimeout(() => setDone(true), 150);
      }
    }, 30);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          <div className="flex flex-col items-center text-center px-6">
            <img src={logo} alt="BASU LILA" className="h-32 md:h-40 w-auto object-contain mb-8" />
            <div className="font-mincho text-xs md:text-sm text-foreground/70 tracking-[0.3em]">
              安心・信頼・つながり
            </div>
            <div className="mt-8 w-56 md:w-72 h-px bg-border overflow-hidden">
              <div className="h-full bg-foreground transition-all duration-75" style={{ width: `${pct}%` }} />
            </div>
            <div className="mt-2 text-[10px] text-muted-foreground tabular-nums">{pct}%</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
