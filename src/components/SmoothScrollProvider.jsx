import React, { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    // 1. Force inject class configuration to document head instantly
    document.documentElement.classList.add("lenis", "lenis-smooth");

    const lenis = new Lenis({
      duration: 1.4, // Increased weight to make it instantly noticeable
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Strong ease out curve
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.1, // Boosts touch intensity
      touchMultiplier: 1.5,
    });

    // 2. Direct core clock animation frames sync binding
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    // 3. Absolute DOM tracking trigger layout reset
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });
    resizeObserver.observe(document.body);

    window.lenis = lenis;

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      lenis.destroy();
      window.lenis = null;
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };
  }, []);

  return <>{children}</>;
}