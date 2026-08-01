import React from "react";
import { motion } from "framer-motion";

const STATS = [
  { label: "Experience", value: "8+ Months" },
  { label: "Role Focus", value: "Full Stack Dev" },
  { label: "Location", value: "Remote / PK" }
];

const PROFICIENCIES = [
  "React", "Vite", "Node.js", "Express", "MongoDB", "Tailwind CSS", "JavaScript", "Git"
];

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

export default function About() {
  return (
    <motion.div 
      variants={ANIMATION_VARIANTS.container}
      initial="hidden"
      animate="show"
      className="w-full flex flex-col gap-16 md:gap-24"
    >
      {/* Title Header */}
      <section id="about-title-section" className="text-left">
        <motion.h1 
          variants={ANIMATION_VARIANTS.item}
          className="font-sans text-5xl md:text-7xl font-bold text-white tracking-tighter"
        >
          ABOUT ME
        </motion.h1>
        <motion.div 
          variants={ANIMATION_VARIANTS.item}
          className="h-1 w-20 bg-white mt-4 rounded-full"
        />
      </section>

      {/* Main Grid Content */}
      <section id="about-content-section" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column - Image & Integrated Quick Meta */}
        <motion.div variants={ANIMATION_VARIANTS.item} className="lg:col-span-5 flex flex-col gap-6 text-left">
          <div className="relative group overflow-hidden border border-neutral-800 rounded-xl aspect-square bg-neutral-950">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgnRbu-0lI2sAKkrVQRDF4jYPLE5yxw91xOwjwnEtSB1W3-NQx6crhupk9_2dUMbj_Tmw5ortWipLJM5qGLcHaf7a2W3Tp3v16wZ1kSskrauVdtLjGq88G4RsoHmnqYohQRQmMid_sQmkTISBWFq3WPI4uPrY-HfZjIhnmr8JIkpiTBRVUyodnrCTHqpRGZn1CLNdWN4FUQtgNdMCVJPf900x5GJuq5-qknPh9ALmLa7fl0aarveliIulYnadSsihwUKh85jthsuq_" 
              alt="Portrait monochrome"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-80" />
            
          </div>

          {/* Integrated Horizontal Stats Strip */}
          <div className="grid grid-cols-3 gap-2 border border-neutral-900 bg-neutral-950/50 p-4 rounded-xl text-center md:text-left">
            {STATS.map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="text-neutral-500 font-sans text-[10px] uppercase tracking-widest">{label}</span>
                <span className="text-white font-sans text-xs md:text-sm font-medium">{value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column - Narrative Content */}
        <motion.div variants={ANIMATION_VARIANTS.item} className="lg:col-span-7 flex flex-col justify-between text-left space-y-8">
          
          <div className="space-y-6">
            {/* Primary Hero Lead */}
            <p className="font-sans text-xl md:text-2xl font-light text-neutral-100 leading-snug tracking-tight">
              I am a Full Stack Developer focused on building scalable web applications and high-performance interactive interfaces.
            </p>

            {/* Sub Narrative */}
            <div className="space-y-4 text-neutral-400 font-sans text-sm md:text-base leading-relaxed font-normal">
              <p>
                My focus lies at the exact intersection of minimalist design and solid software architecture. I leverage modern web technologies to construct maintainable, high-speed applications.
              </p>
              <p>
                My engineering approach is simple: eliminate unnecessary abstractions to keep systems lean, fast, and easy to scale.
              </p>
            </div>
          </div>

          {/* Proficiencies Tags Section */}
          <div className="pt-6 border-t border-neutral-900 flex flex-col gap-4">
            <span className="font-sans text-xs uppercase tracking-widest text-neutral-400 font-semibold">
              Technical Stack & Tools
            </span>
            
            {/* SaaS Style Dynamic Tech Badges */}
            <div className="flex flex-wrap gap-2.5">
              {PROFICIENCIES.map((skill) => (
                <span 
                  key={skill}
                  className="px-4 py-2 border border-neutral-800 bg-neutral-900/80 text-sm font-sans font-medium rounded-md text-neutral-300 hover:bg-white hover:text-black hover:border-white transition-all duration-300 ease-out cursor-default shadow-sm hover:shadow-white/10"
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