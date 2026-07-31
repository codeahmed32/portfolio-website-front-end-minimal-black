import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const location = useLocation();

  const handlePrefetch = (prefetchFn) => {
    try {
      prefetchFn();
    } catch {
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between py-6 px-6 md:px-12 pointer-events-none">
      {/* Leftmost Floating Brand Name */}
      <Link 
        to="/" 
        className="font-sans text-xl uppercase tracking-widest font-bold text-white pointer-events-auto hover:opacity-70 transition-opacity"
      >
        DevPortfolio
      </Link>

      {/* Main Centered Minimalist Navbar Container */}
      <nav 
        id="navbar-main" 
        className="bg-[#030303] rounded-full pointer-events-auto  flex items-center h-12 shadow-2xl"
      >
        {/* Desktop Navigation Layer */}
        <div className="hidden md:flex items-center gap-8">
          {TABS.map((tab) => {
            const isActive = location.pathname === tab.path;
            return (
              <NavLink
                id={`navbar-tab-${tab.name}`}
                key={tab.name}
                to={tab.path}
                onMouseEnter={() => handlePrefetch(tab.prefetch)}
                className={`font-sans text-xs uppercase tracking-widest transition-colors scale-95 hover:text-white relative py-1 cursor-pointer ${
                  isActive ? "text-white font-bold" : "text-neutral-400"
                }`}
              >
                {tab.name}
                {isActive && (
                  <motion.div 
                    layoutId="activeTabUnderline" 
                    transition={SPRING_TRANSITION}
                    className="absolute bottom-0 left-0 right-0 h-px bg-white"
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
          className="md:hidden flex flex-col items-center justify-center gap-1.5 w-8 h-8 relative z-50 cursor-pointer active:scale-90 transition-transform"
        >
          <span className={`block h-0.5 w-6 bg-white transform transition-transform duration-300 origin-center ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-6 bg-white transition-opacity duration-200 ${isOpen ? "opacity-0" : "opacity-100"}`} />
          <span className={`block h-0.5 w-6 bg-white transform transition-transform duration-300 origin-center ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Spacer Element */}
      <div className="hidden md:block w-16 pointer-events-none" />

      {/* Mobile Dropdown Layer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute top-20 left-4 right-4 bg-[#030303] border border-neutral-900 rounded-2xl p-6 md:hidden flex flex-col gap-2 shadow-2xl pointer-events-auto transform-gpu"
          >
            {TABS.map((tab) => {
              const isMobileActive = location.pathname === tab.path;
              return (
                <Link
                  key={tab.name}
                  to={tab.path}
                  onClick={() => setIsOpen(false)}
                  onMouseEnter={() => handlePrefetch(tab.prefetch)}
                  className={`text-left font-sans text-sm uppercase tracking-widest py-3 border-b border-neutral-900 transition-colors w-full cursor-pointer ${
                    isMobileActive ? "text-white font-bold pl-2 border-white/50" : "text-neutral-400"
                  }`}
                >
                  {tab.name}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}