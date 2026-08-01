import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PROJECTS } from "../data";
import Footer from "./Footer";

const VISIBLE_PROJECTS = PROJECTS.slice(0, 4);
const FEATURED_PROJECT = PROJECTS[0]; // Spotlight project

const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  },
  item: {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  }
};

export default function Home({ setActiveTab, setSelectedProject }) {
  const handleProjectClick = (proj) => {
    setSelectedProject(proj);
    setActiveTab("work");
  };

  return (
    <div className="w-full flex flex-col gap-20 md:gap-28">
      {/* Hero Section */}
      <motion.section
        id="hero-section"
        variants={ANIMATION_VARIANTS.container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
      >
        {/* Left Primary Content Column */}
        <div className="lg:col-span-7 text-left flex flex-col gap-6">
          <motion.h1
            variants={ANIMATION_VARIANTS.item}
            className="font-sans text-5xl md:text-7xl font-bold text-white tracking-tighter leading-tight"
          >
            CRAFTING DIGITAL<br />ELEGANCE.
          </motion.h1>
          <motion.p
            variants={ANIMATION_VARIANTS.item}
            className="font-sans text-lg md:text-xl text-neutral-400 leading-relaxed max-w-xl font-normal"
          >
            A creative studio dedicated to high-contrast experiences, clean modern interfaces, and functional software engineering.
          </motion.p>
          
          {/* Action Controls */}
          <motion.div variants={ANIMATION_VARIANTS.item} className="flex items-center gap-4 pt-2">
            <button
              id="hire-me-hero-btn"
              onClick={() => setActiveTab("contact")}
              className="bg-white text-black hover:bg-neutral-200 rounded-lg px-8 py-3.5 font-sans text-xs uppercase tracking-wider font-bold transition-all duration-200 inline-flex items-center gap-2 group cursor-pointer shadow-sm"
            >
              <span>Hire Me</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            
            <button
              id="view-archive-hero-btn"
              onClick={() => setActiveTab("work")}
              className="border border-neutral-800 bg-neutral-950/50 text-neutral-300 hover:text-white hover:border-neutral-600 rounded-lg px-8 py-3.5 font-sans text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer"
            >
              View Work
            </button>
          </motion.div>
        </div>

        {/* Right Interactive Spotlight Card */}
        {FEATURED_PROJECT && (
          <motion.div
            variants={ANIMATION_VARIANTS.item}
            onClick={() => handleProjectClick(FEATURED_PROJECT)}
            className="hidden lg:col-span-5 lg:flex flex-col justify-between border border-neutral-800 bg-neutral-950/80 hover:border-neutral-600 rounded-xl p-6 h-full min-h-[320px] text-left group cursor-pointer transition-all duration-300 relative overflow-hidden"
          >
            <div className="flex justify-between items-start">
              <span className="font-sans text-[10px] uppercase tracking-widest text-neutral-500 font-bold border border-neutral-800 px-2.5 py-1 rounded">
                Featured Release
              </span>
              <div className="w-8 h-8 rounded-full border border-neutral-800 group-hover:border-white flex items-center justify-center text-neutral-400 group-hover:text-white transition-all">
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>

            <div className="flex flex-col gap-2 my-auto py-6">
              <span className="font-sans text-xs text-neutral-500 uppercase tracking-wider">
                {FEATURED_PROJECT.category} — {FEATURED_PROJECT.year}
              </span>
              <h3 className="font-sans text-2xl font-bold text-white tracking-tight group-hover:text-neutral-200 transition-colors">
                {FEATURED_PROJECT.title}
              </h3>
              <p className="font-sans text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                {FEATURED_PROJECT.description || "High-performance software solution built with modern architecture standards."}
              </p>
            </div>

            <div className="border-t border-neutral-900 pt-4 flex items-center justify-between text-neutral-500 font-sans text-xs">
              <span>View Case Study</span>
              <span className="text-white font-mono">{FEATURED_PROJECT.id}</span>
            </div>
          </motion.div>
        )}
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
          <span className="font-sans text-xs tracking-wider text-neutral-500 font-medium">01 — 04</span>
        </div>

        <div className="flex flex-col divide-y divide-neutral-900">
          {VISIBLE_PROJECTS.map((proj) => (
            <div
              id={`project-row-${proj.id}`}
              key={proj.id}
              onClick={() => handleProjectClick(proj)}
              className="group cursor-pointer py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-neutral-950/80 px-4 transition-all duration-200 rounded-lg border border-transparent hover:border-neutral-900"
            >
              <div className="flex items-center gap-6 transform group-hover:translate-x-1 transition-transform duration-200 ease-out">
                <span className="font-sans text-xs text-neutral-500 font-medium tracking-tight">{proj.id}</span>
                <h3 className="font-sans text-xl md:text-2xl font-semibold text-neutral-200 group-hover:text-white transition-colors tracking-tight">
                  {proj.title}
                </h3>
              </div>
              <div className="flex items-center justify-between w-full md:w-auto md:gap-8">
                <span className="font-sans text-xs uppercase tracking-wider text-neutral-400 font-medium">{proj.category}</span>
                <span className="font-sans text-xs text-neutral-500 group-hover:text-neutral-300 transition-colors font-medium">{proj.year}</span>
                <div className="flex items-center gap-1 text-neutral-500 group-hover:text-white transition-colors">
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Philosophy Card Banner */}
      <motion.section
        id="philosophy-banner"
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="border border-neutral-800 p-8 md:p-14 relative overflow-hidden bg-neutral-950 rounded-xl text-left"
      >
        <div className="absolute right-0 top-0 text-[100px] md:text-[160px] font-bold text-neutral-900/20 select-none font-sans pointer-events-none transform translate-x-12 -translate-y-12">
          Design
        </div>
        
        <div className="relative z-10 flex flex-col gap-8 max-w-2xl">
          <span className="font-sans text-xs uppercase tracking-widest text-neutral-400 font-semibold">
            Philosophy & Architecture
          </span>
          <h2 className="font-sans text-2xl md:text-4xl font-bold text-white leading-tight tracking-tight uppercase">
            "Embracing minimalism to highlight what matters."
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="border border-neutral-900 bg-neutral-900/30 p-4 rounded-lg">
              <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold font-sans">Architecture</p>
              <p className="text-sm font-semibold text-neutral-200 mt-1 font-sans">Full-Stack MERN</p>
            </div>
            <div className="border border-neutral-900 bg-neutral-900/30 p-4 rounded-lg">
              <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold font-sans">Focus</p>
              <p className="text-sm font-semibold text-neutral-200 mt-1 font-sans">Data & Systems</p>
            </div>
            <div className="border border-neutral-900 bg-neutral-900/30 p-4 rounded-lg">
              <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold font-sans">Execution</p>
              <p className="text-sm font-semibold text-neutral-200 mt-1 font-sans">High Contrast UI</p>
            </div>
          </div>

          <div className="border-t border-neutral-900 pt-4 flex justify-between text-neutral-500 font-sans text-xs font-medium">
            <span>Est. 2025</span>
          </div>
        </div>
      </motion.section>

      {/* Footer Call to Action Banner */}
      <motion.section
        id="cta-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-t border-neutral-900 pt-16 text-left"
      >
        <div className="flex flex-col gap-4">
          <h2 className="font-sans text-2xl md:text-4xl font-bold text-white leading-tight tracking-tight">
            Have a project in mind?<br />Let's work together.
          </h2>
          <p className="font-sans text-sm md:text-base text-neutral-400 leading-relaxed max-w-md font-normal">
            Currently accepting new inquiries and engineering opportunities.
          </p>
        </div>
        <div className="flex flex-col items-start md:items-end">
          <button
            onClick={() => setActiveTab("contact")}
            className="group bg-white text-black hover:bg-neutral-200 rounded-lg px-8 py-3.5 font-sans text-xs uppercase tracking-wider font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <span>Hire Me</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}