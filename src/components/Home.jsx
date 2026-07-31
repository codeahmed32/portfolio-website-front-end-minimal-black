import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PROJECTS } from "../data";
import Footer from "./Footer";

// Clean static constants declared outside component scope
const VISIBLE_PROJECTS = PROJECTS.slice(0, 4);

const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  },
  item: {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  }
};

export default function Home({ setActiveTab, setSelectedProject }) {
  const handleProjectClick = (proj) => {
    setSelectedProject(proj);
    setActiveTab("work");
  };

  return (
    <div className="w-full flex flex-col gap-24">
      {/* Hero Section */}
      <motion.section 
        id="hero-section"
        variants={ANIMATION_VARIANTS.container}
        initial="hidden"
        animate="show"
        className="max-w-4xl text-left flex flex-col gap-6"
      >
        <motion.h1 
          variants={ANIMATION_VARIANTS.item}
          className="font-sans text-5xl md:text-7xl font-semibold text-white tracking-tighter leading-tight"
        >
          CRAFTING DIGITAL<br />ELEGANCE.
        </motion.h1>
        <motion.p 
          variants={ANIMATION_VARIANTS.item}
          className="font-sans text-lg md:text-xl text-neutral-400 leading-relaxed max-w-2xl font-normal"
        >
          A creative studio dedicated to high-contrast experiences, clean modern interfaces, and functional software engineering.
        </motion.p>
        <motion.div variants={ANIMATION_VARIANTS.item}>
          <button
            id="view-archive-hero-btn"
            onClick={() => setActiveTab("work")}
            className="bg-white text-black hover:bg-neutral-300 rounded-full px-8 py-3.5 font-sans text-xs uppercase tracking-widest font-semibold transition-colors inline-flex items-center gap-2 group cursor-pointer"
          >
            View Archive
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </motion.section>

      {/* Selected Projects Stack */}
      <motion.section 
        id="selected-projects-section"
        variants={ANIMATION_VARIANTS.container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex flex-col gap-6"
      >
        <div className="flex justify-between items-center border-b border-neutral-900 pb-4">
          <span className="font-sans text-xs uppercase tracking-widest text-neutral-400 font-semibold">Selected Projects</span>
          <span className="font-sans text-xs tracking-wider text-neutral-400">01 — 04</span>
        </div>

        <div className="flex flex-col divide-y divide-neutral-900">
          {VISIBLE_PROJECTS.map((proj) => (
            <motion.div
              id={`project-row-${proj.id}`}
              key={proj.id}
              onClick={() => handleProjectClick(proj)}
              whileHover={{ x: 8 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="group cursor-pointer py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-neutral-950 px-2 transition-colors rounded-lg"
            >
              <div className="flex items-center gap-6">
                <span className="font-sans text-xs text-neutral-500 font-medium tracking-tight">{proj.id}</span>
                <h3 className="font-sans text-xl md:text-2xl font-medium text-neutral-300 group-hover:text-white transition-colors tracking-tight">
                  {proj.title}
                </h3>
              </div>
              <div className="flex items-center justify-between w-full md:w-auto md:gap-12">
                <span className="font-sans text-xs uppercase tracking-wider text-neutral-500">{proj.category}</span>
                <span className="font-sans text-xs text-neutral-500 group-hover:text-white transition-colors">{proj.year}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Philosophy Card Banner */}
      <motion.section
        id="philosophy-banner"
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="border border-neutral-900 p-8 md:p-16 relative overflow-hidden bg-neutral-950 rounded-xl"
      >
        <div className="absolute right-0 top-0 text-[100px] md:text-[160px] font-semibold text-neutral-900/40 select-none font-sans pointer-events-none transform translate-x-12 -translate-y-12">
          Ahmed
        </div>
        <div className="relative z-10 flex flex-col gap-4 max-w-2xl text-left">
          <span className="font-sans text-xs uppercase tracking-widest text-neutral-400 font-semibold">What Iam Doing is</span>
          <h2 className="font-sans text-2xl md:text-4xl font-semibold text-white leading-tight tracking-tight">
            "EMBRACING MINIMALISM TO HIGHLIGHT WHAT MATTERS."
          </h2>
          <div className="border-t border-neutral-900 pt-4 mt-6 flex justify-between text-neutral-500 font-sans text-xs">
            <span>Started Since. 2025</span>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        id="cta-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end border-t border-neutral-900 pt-16"
      >
        <div className="flex flex-col gap-4 text-left">
          <h2 className="font-sans text-2xl md:text-4xl font-semibold text-white leading-tight tracking-tight">
            Have a project in mind?<br />Let's work together.
          </h2>
          <p className="font-sans text-sm md:text-base text-neutral-400 leading-relaxed max-w-md font-normal">
            Currently accepting new inquiries and freelance collaborations.
          </p>
        </div>
        <div className="flex flex-col items-start md:items-end gap-6 text-left md:text-right">
          <button
            onClick={() => setActiveTab("contact")}
            className="font-sans text-xl md:text-2xl text-white font-medium hover:text-neutral-300 transition-colors tracking-tight underline underline-offset-4 cursor-pointer"
          >
            Get in touch →
          </button>
        </div>
      </motion.section>

      {/* Footer Component Integrated */}
      <Footer />
    </div>
  );
}