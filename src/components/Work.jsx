import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Sparkles } from "lucide-react";
import { fetchProjects } from "../services/api";
import Footer from "./Footer";

// Declare static variants outside the render cycle
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
  },
  panel: {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: "auto" },
    exit: { opacity: 0, height: 0 },
    transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] }
  }
};

export default function Work() {
  const { selectedProject, setSelectedProject, setActiveTab } = useOutletContext();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="w-full flex flex-col gap-16">
      {/* Title Section */}
      <motion.section
        id="work-title-section"
        variants={ANIMATION_VARIANTS.container}
        initial="hidden"
        animate="show"
        className="text-left"
      >
        <motion.h1
          variants={ANIMATION_VARIANTS.item}
          className="font-sans text-6xl md:text-7xl font-bold text-white tracking-tighter"
        >
          WORK
        </motion.h1>
        <motion.div
          variants={ANIMATION_VARIANTS.item}
          className="h-1 w-20 bg-white mt-4 rounded-full"
        />
      </motion.section>

      {/* Projects Stack List */}
      <motion.section
        id="work-list-section"
        variants={ANIMATION_VARIANTS.container}
        initial="hidden"
        animate="show"
        className="flex flex-col divide-y divide-neutral-900 border-t border-b border-neutral-900"
      >
        {loading ? (
          <div className="py-12 text-center text-neutral-500 font-mono text-xs uppercase tracking-widest">
            Loading database records...
          </div>
        ) : projects.length === 0 ? (
          <div className="py-12 text-center text-neutral-500 font-mono text-xs uppercase tracking-widest">
            No projects found in database.
          </div>
        ) : (
          projects.map((proj, index) => {
            const currentId = proj._id || proj.id;
            const selectedId = selectedProject ? (selectedProject._id || selectedProject.id) : null;
            const isSelected = selectedProject && String(selectedId) === String(currentId);
            const truncatedDescription = proj.description && proj.description.length > 70
              ? `${proj.description.slice(0, 70)}...`
              : proj.description || "";

            // Display index as padded ID (e.g. 01, 02) if customId missing
            const displayId = proj.customId || String(index + 1).padStart(2, '0');

            return (
              <motion.div
                id={`work-item-${currentId}`}
                key={currentId}
                onClick={() => setSelectedProject(isSelected ? null : proj)}
                whileHover={{ x: 8 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className={`group cursor-pointer py-8 flex justify-between items-center transition-colors px-4 rounded-lg ${
                  isSelected ? "bg-neutral-950" : "hover:bg-neutral-950/60"
                }`}
              >
                <div className="flex flex-col gap-1 text-left">
                  <span className="font-sans text-xs uppercase tracking-widest text-neutral-500 font-medium group-hover:text-neutral-400 transition-colors">
                    {displayId} / {proj.category}
                  </span>
                  <h2 className="font-sans text-2xl md:text-4xl font-medium text-neutral-300 group-hover:text-white transition-colors tracking-tight">
                    {proj.title}
                  </h2>
                </div>

                <div className="flex items-center gap-8">
                  <span className="hidden md:block font-sans text-xs text-neutral-500 max-w-xs text-right opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {truncatedDescription}
                  </span>
                  <motion.div
                    animate={{ rotate: isSelected ? 90 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="text-white opacity-60 group-hover:opacity-100 transition-opacity"
                  >
                    <ArrowRight className="w-6 h-6" />
                  </motion.div>
                </div>
              </motion.div>
            );
          })
        )}
      </motion.section>

      {/* Expandable Project Specifications Panel */}
      <AnimatePresence mode="wait">
        {selectedProject && (
          <motion.div
            id={`active-project-panel-${selectedProject._id || selectedProject.id}`}
            initial={ANIMATION_VARIANTS.panel.initial}
            animate={ANIMATION_VARIANTS.panel.animate}
            exit={ANIMATION_VARIANTS.panel.exit}
            transition={ANIMATION_VARIANTS.panel.transition}
            className="overflow-hidden border border-neutral-900 bg-neutral-950 rounded-xl"
          >
            <div className="p-6 md:p-12 flex flex-col md:flex-row justify-between items-start gap-8 relative text-left">
              <button
                id="close-spec-btn"
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col gap-6 max-w-xl">
                <div className="flex gap-2 items-center text-neutral-400 font-sans text-xs uppercase tracking-widest font-semibold">
                  <span>Project Details</span>
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
                <h3 className="font-sans text-3xl font-semibold text-white tracking-tight">
                  {selectedProject.title}
                </h3>
                <p className="font-sans text-sm text-neutral-400 leading-relaxed font-normal">
                  {selectedProject.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {selectedProject.tags?.map((tag) => (
                    <span key={tag} className="px-3 py-1 border border-neutral-900 bg-neutral-900/50 text-xs font-mono rounded-full text-neutral-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4 border-l border-neutral-900 pl-6 md:pl-12 w-full md:w-64">
                <div>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-neutral-500 block">Client</span>
                  <span className="text-white font-medium text-sm">{selectedProject.client || "Internal"}</span>
                </div>
                <div>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-neutral-500 block">Year</span>
                  <span className="text-white font-medium text-sm">{selectedProject.year}</span>
                </div>
                <div>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-neutral-500 block">Service</span>
                  <span className="text-white font-medium text-sm">{selectedProject.category}</span>
                </div>
                <button
                  id="inquire-project-btn"
                  onClick={() => {
                    setActiveTab("contact");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="bg-white text-black hover:bg-neutral-300 text-xs font-sans uppercase font-semibold tracking-widest px-4 py-2.5 rounded-full mt-4 text-center cursor-pointer transition-colors"
                >
                  Inquire Details
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Summary Banner */}
      <motion.section
        id="work-summary-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        <div className="text-left">
          <p className="font-sans text-base text-neutral-400 leading-relaxed max-w-md font-normal">
            Every architecture is an exercise in restraint. Removing unnecessary abstractions to build efficient, functional systems that scale seamlessly.
          </p>
        </div>
        <div className="w-full aspect-video bg-neutral-950 overflow-hidden group border border-neutral-900 rounded-xl">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQUk2xt7V1onIQRg79wATNEpiKV1c36yd5kcjeURr1rwYXJcpd92hsYpEzcWHP12lNFXKkbJahpqwUB_wJ3-rLWhI-pu_7EIjAzmg0GruKmq5e-Ol9PxVr_haOee0mjcks0HmcTJCJblKN19bW0zLHxMLIaOPFv-3c6zZP5LpXdCy0mqSkuNLbjGgY4xLIONeLXZsZW4lsJ9Vn-suK2J4ivtb3uqiaY10q1c3xrweA4wEtCo-K11arA_AJtKz3f-K_YDJ6O6it0Kb0"
            alt="Minimalist design visual"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale brightness-50 group-hover:scale-105 group-hover:brightness-75 transition-all duration-700 ease-out"
          />
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}