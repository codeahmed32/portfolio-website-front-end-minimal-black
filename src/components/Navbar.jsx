import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Link, NavLink, useLocation } from "react-router-dom";

const TABS = [
  { name: "home", path: "/", prefetch: () => import("./Home.jsx") },
  { name: "work", path: "/work", prefetch: () => import("./Work.jsx") },
  { name: "about", path: "/about", prefetch: () => import("./About.jsx") },
  { name: "contact", path: "/contact", prefetch: () => import("./Contact.jsx") }
];

const SPRING_TRANSITION = {
  type: "spring",
  stiffness: 380,
  damping: 30
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  // Smart Scroll Direction Detection
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
      setIsOpen(false); // Auto-close mobile dropdown on scroll down
    } else {
      setHidden(false);
    }
  });

  const handlePrefetch = (prefetchFn) => {
    try {
      prefetchFn();
    } catch {
      // Intentional prefetch fail suppression
    }
  };

  return (
    <motion.header 
      variants={{
        visible: { y: 0 },
        hidden: { y: "-120%" }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between py-4 px-6 md:px-12 pointer-events-none"
    >
      {/* Leftmost Brand Name */}
      <Link 
        to="/" 
        className="font-sans text-lg uppercase tracking-widest font-bold text-white pointer-events-auto hover:opacity-70 transition-opacity"
      >
        Portfolio
      </Link>

      {/* Main Centered Floating Pill Navbar */}
      <nav 
        id="navbar-main" 
        className="pointer-events-auto flex items-center px-6 h-11 bg-neutral-950/80 backdrop-blur-md border border-neutral-800/80 rounded-full shadow-2xl"
      >
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {TABS.map((tab) => {
            const isActive = location.pathname === tab.path;
            return (
              <NavLink
                id={`navbar-tab-${tab.name}`}
                key={tab.name}
                to={tab.path}
                onMouseEnter={() => handlePrefetch(tab.prefetch)}
                className={`font-sans text-xs uppercase tracking-wider transition-colors relative py-1 cursor-pointer ${
                  isActive ? "text-white font-bold" : "text-neutral-400 hover:text-white"
                }`}
              >
                {tab.name}
                {isActive && (
                  <motion.div 
                    layoutId="activeTabUnderline" 
                    transition={SPRING_TRANSITION}
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white rounded-full"
                  />
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Mobile Hamburger Trigger */}
        <button 
          aria-label="Toggle Navigation Panel"
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden flex flex-col items-center justify-center gap-1.5 w-7 h-7 relative z-50 cursor-pointer active:scale-90 transition-transform"
        >
          <span className={`block h-0.5 w-5 bg-white transform transition-transform duration-300 origin-center ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-5 bg-white transition-opacity duration-200 ${isOpen ? "opacity-0" : "opacity-100"}`} />
          <span className={`block h-0.5 w-5 bg-white transform transition-transform duration-300 origin-center ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Balance Spacer */}
      <div className="hidden md:block w-20 pointer-events-none" />

      {/* Mobile Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-16 left-4 right-4 bg-neutral-950/95 backdrop-blur-xl border border-neutral-800 rounded-xl p-5 md:hidden flex flex-col gap-1 shadow-2xl pointer-events-auto transform-gpu"
          >
            {TABS.map((tab) => {
              const isMobileActive = location.pathname === tab.path;
              return (
                <Link
                  key={tab.name}
                  to={tab.path}
                  onClick={() => setIsOpen(false)}
                  onMouseEnter={() => handlePrefetch(tab.prefetch)}
                  className={`text-left font-sans text-xs uppercase tracking-wider py-3 px-3 rounded-lg transition-all w-full cursor-pointer ${
                    isMobileActive ? "text-white font-bold bg-neutral-900 border-l-2 border-white" : "text-neutral-400 hover:text-white hover:bg-neutral-900/50"
                  }`}
                >
                  {tab.name}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}