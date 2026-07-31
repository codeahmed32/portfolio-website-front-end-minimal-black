import React from "react";
import { motion } from "framer-motion";

const PARAGRAPHS = [
  "I am a Full Stack Developer focusing on building scalable web applications and high-performance interactive interfaces. My focus lies at the intersection of visual minimalism and clean software engineering.",
  "I leverage modern technologies to construct high-speed, maintainable systems. My approach relies on eliminating unnecessary complexity to leave only what is essential for execution.",
  "Every project in this space is built with high attention to detail, strict type standards, and optimal operational performance."
];

const STATS = [
  { label: "Experience", value: "8+ Months" },
  { label: "Position", value: "Full Stack Developer" }
];

const PROFICIENCIES = [
  "React / Vite", "Node.js / Express", "MongoDB", "Tailwind CSS"
];

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

export default function About() {
  return (
    <motion.div 
      variants={ANIMATION_VARIANTS.container}
      initial="hidden"
      animate="show"
      className="w-full flex flex-col gap-16"
    >
      {/* Sleek Minimalist Header */}
      <section id="about-title-section" className="text-left">
        <motion.h1 
          variants={ANIMATION_VARIANTS.item}
          className="font-sans text-5xl md:text-7xl font-semibold text-white tracking-tighter"
        >
          About Me
        </motion.h1>
        <motion.div 
          variants={ANIMATION_VARIANTS.item}
          className="h-1 w-20 bg-white mt-4 rounded-full"
        />
      </section>

      {/* Two Column Layout Grid */}
      <section id="about-content-section" className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        {/* Left Column - Image and Stats */}
        <motion.div variants={ANIMATION_VARIANTS.item} className="md:col-span-5 flex flex-col gap-8 text-left">
          <div className="relative group overflow-hidden border border-neutral-800 aspect-[4/5] bg-neutral-950">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgnRbu-0lI2sAKkrVQRDF4jYPLE5yxw91xOwjwnEtSB1W3-NQx6crhupk9_2dUMbj_Tmw5ortWipLJM5qGLcHaf7a2W3Tp3v16wZ1kSskrauVdtLjGq88G4RsoHmnqYohQRQmMid_sQmkTISBWFq3WPI4uPrY-HfZjIhnmr8JIkpiTBRVUyodnrCTHqpRGZn1CLNdWN4FUQtgNdMCVJPf900x5GJuq5-qknPh9ALmLa7fl0aarveliIulYnadSsihwUKh85jthsuq_" 
              alt="Portrait monochrome"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/60 to-transparent" />
          </div>

          {/* Minimal Clean Stats Grid */}
          <div className="flex flex-col">
            {STATS.map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center py-4 border-b border-neutral-900">
                <span className="text-neutral-500 font-sans text-xs uppercase tracking-widest">{label}</span>
                <span className="text-white font-sans text-sm font-normal tracking-wide">{value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column - Narrative content */}
        <motion.div variants={ANIMATION_VARIANTS.item} className="md:col-span-7 flex flex-col gap-6 text-left max-w-2xl">
          {PARAGRAPHS.map((text) => (
            <p key={text.substring(0, 20)} className="font-sans text-base text-neutral-400 leading-relaxed font-normal">
              {text}
            </p>
          ))}

          <div className="mt-8 pt-8 border-t border-neutral-900 flex flex-col gap-4">
            <h3 className="font-sans text-xs uppercase tracking-widest text-neutral-400 font-semibold">Selected Proficiencies</h3>
            <div className="flex flex-wrap gap-2">
              {PROFICIENCIES.map((skill) => (
                <span 
                  key={skill}
                  className="px-3.5 py-1 border border-neutral-800 bg-neutral-950 text-xs font-sans rounded-full text-neutral-400 hover:text-white hover:border-neutral-500 transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}