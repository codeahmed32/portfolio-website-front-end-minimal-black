import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Plus, Minus, Sparkles, ExternalLink } from "lucide-react";
import { fetchProjects } from "../services/api";
import Footer from "./Footer";

const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  },
  panel: {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: "auto" },
    exit: { opacity: 0, height: 0 },
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
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
    <div className="w-full flex flex-col gap-20 md:gap-28">
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
          className="font-sans text-5xl md:text-7xl font-bold text-white tracking-tighter"
        >
          WORK ARCHIVE
        </motion.h1>
        <motion.div
          variants={ANIMATION_VARIANTS.item}
          className="h-1 w-20 bg-white mt-4 rounded-full"
        />
      </motion.section>

      {/* Projects Grid List Section */}
      <motion.section
        id="work-list-section"
        variants={ANIMATION_VARIANTS.container}
        initial="hidden"
        animate="show"
        className="flex flex-col border-t border-b border-neutral-900"
      >
        {loading ? (
          <div className="py-20 text-center text-neutral-500 font-mono text-xs uppercase tracking-widest">
            Loading database records...
          </div>
        ) : projects.length === 0 ? (
          <div className="py-20 text-center text-neutral-500 font-mono text-xs uppercase tracking-widest">
            No projects found in database.
          </div>
        ) : (
          projects.map((proj, index) => {
            const currentId = proj._id || proj.id;
            const selectedId = selectedProject ? (selectedProject._id || selectedProject.id) : null;
            const isSelected = selectedProject && String(selectedId) === String(currentId);
            const truncatedDescription = proj.description && proj.description.length > 80
              ? `${proj.description.slice(0, 80)}...`
              : proj.description || "";

            const displayId = proj.customId || String(index + 1).padStart(2, '0');

            return (
              <div key={currentId} className="border-b border-neutral-900 last:border-b-0">
                {/* Responsive Grid Header Row */}
                <div
                  id={`work-item-${currentId}`}
                  onClick={() => setSelectedProject(isSelected ? null : proj)}
                  className={`group cursor-pointer py-7 px-4 md:px-6 transition-all duration-300 grid grid-cols-12 items-center gap-4 ${isSelected ? "bg-neutral-950" : "hover:bg-neutral-900/40"
                    }`}
                >
                  {/* Left Column: ID & Title */}
                  <div className="col-span-10 md:col-span-5 lg:col-span-4 flex items-center gap-5 md:gap-8">
                    <span className="font-mono text-xs text-neutral-500 font-medium">{displayId}</span>
                    <div className="flex flex-col gap-1 text-left">
                      {proj.category && (
                        <span className="font-sans text-[10px] uppercase tracking-widest text-neutral-500 font-medium md:hidden">
                          {proj.category}
                        </span>
                      )}
                      <h2 className="font-sans text-xl md:text-3xl font-medium text-neutral-300 group-hover:text-white group-hover:translate-x-1.5 transition-all duration-200 tracking-tight">
                        {proj.title}
                      </h2>
                    </div>
                  </div>

                  {/* Middle Column: Category (Medium screens up) */}
                  <div className="hidden md:block md:col-span-3 text-left">
                    {proj.category && (
                      <span className="font-sans text-xs uppercase tracking-wider text-neutral-400 font-medium">
                        {proj.category}
                      </span>
                    )}
                  </div>

                  {/* Right Column: Teaser & Trigger Icon */}
                  <div className="col-span-2 md:col-span-4 lg:col-span-5 flex items-center justify-end gap-6 text-right">
                    {proj.description && (
                      <span className="hidden lg:block font-sans text-xs text-neutral-500 max-w-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {truncatedDescription}
                      </span>
                    )}
                    <div className="p-2 border border-neutral-800 rounded-full group-hover:border-neutral-600 transition-colors text-white shrink-0">
                      {isSelected ? <Minus className="w-4 h-4 text-white" /> : <Plus className="w-4 h-4 text-neutral-400 group-hover:text-white" />}
                    </div>
                  </div>
                </div>

                {/* Inline Drawer Section with Balanced Padding */}
                <AnimatePresence mode="wait">
                  {isSelected && (
                    <motion.div
                      id={`active-project-panel-${currentId}`}
                      initial={ANIMATION_VARIANTS.panel.initial}
                      animate={ANIMATION_VARIANTS.panel.animate}
                      exit={ANIMATION_VARIANTS.panel.exit}
                      transition={ANIMATION_VARIANTS.panel.transition}
                      className="overflow-hidden bg-neutral-950/90 border-t border-neutral-900"
                    >
                      <div className="p-6 md:p-10 lg:p-12 flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12 text-left">
                        {/* Main Info */}
                        <div className="flex flex-col gap-5 max-w-2xl w-full">
                          <div className="flex gap-2 items-center text-neutral-400 font-sans text-xs uppercase tracking-widest font-semibold">
                            <span>Project Overview</span>
                            <Sparkles className="w-3.5 h-3.5 text-white" />
                          </div>
                          <h3 className="font-sans text-2xl md:text-3xl font-semibold text-white tracking-tight">
                            {selectedProject.title}
                          </h3>
                          {selectedProject.description && (
                            <p className="font-sans text-sm md:text-base text-neutral-400 leading-relaxed font-normal">
                              {selectedProject.description}
                            </p>
                          )}
                          {selectedProject.tags && selectedProject.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-2">
                              {selectedProject.tags.map((tag) => (
                                <span key={tag} className="px-3 py-1 border border-neutral-800 bg-neutral-900 text-xs font-mono rounded-full text-neutral-300">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Metadata Sidebar */}
                        <div className="flex flex-col gap-4 border-t md:border-t-0 md:border-l border-neutral-900 pt-6 md:pt-0 pl-0 md:pl-10 w-full md:w-64 shrink-0">
                          {selectedProject.client && (
                            <div>
                              <span className="font-sans text-[10px] uppercase tracking-widest text-neutral-500 block">Client</span>
                              <span className="text-white font-medium text-sm">{selectedProject.client}</span>
                            </div>
                          )}
                          {selectedProject.year && (
                            <div>
                              <span className="font-sans text-[10px] uppercase tracking-widest text-neutral-500 block">Year</span>
                              <span className="text-white font-medium text-sm">{selectedProject.year}</span>
                            </div>
                          )}
                          {selectedProject.category && (
                            <div>
                              <span className="font-sans text-[10px] uppercase tracking-widest text-neutral-500 block">Category</span>
                              <span className="text-white font-medium text-sm">{selectedProject.category}</span>
                            </div>
                          )}

                          {selectedProject.liveUrl && (
                            <a
                              href={selectedProject.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-xs text-white hover:underline mt-1 font-mono"
                            >
                              Live Preview <ExternalLink className="w-3 h-3" />
                            </a>
                          )}

                          <button
                            id="inquire-project-btn"
                            onClick={() => {
                              setActiveTab("contact");
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className="bg-white text-black hover:bg-neutral-200 text-xs font-sans uppercase font-semibold tracking-widest px-5 py-3 rounded-full mt-4 text-center cursor-pointer transition-colors inline-flex items-center justify-center gap-2 w-full"
                          >
                            <span>Inquire Project</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </motion.section>

      {/* Optimized Summary Banner */}
      <motion.section
        id="work-summary-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full border border-neutral-900 bg-neutral-950/40 rounded-2xl p-8 md:p-12 my-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">

          {/* Left Column: Quote & Architecture Philosophy */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-white"></span>
              <span className="font-Sanserif text-[11px] uppercase tracking-widest text-neutral-400">
                Core Engineering Philosophy
              </span>
            </div>

            <blockquote className="font-sans text-xl md:text-3xl font-light text-neutral-200 leading-snug tracking-tight">
              "Every architecture is an exercise in restraint. Removing unnecessary abstractions to build efficient, functional systems that scale seamlessly."
            </blockquote>

            <div className="pt-2 flex items-center gap-4">
              <div className="h-px w-12 bg-neutral-800"></div>
              <span className="font-Sanserif text-xs text-neutral-500 uppercase tracking-wider">
                System Design Manifest
              </span>
            </div>
          </div>

          {/* Right Column: Visual Frame */}
          <div className="lg:col-span-5 w-full">
            <div className="relative aspect-[4/3] w-full bg-neutral-900 overflow-hidden rounded-xl border border-neutral-800 group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQUk2xt7V1onIQRg79wATNEpiKV1c36yd5kcjeURr1rwYXJcpd92hsYpEzcWHP12lNFXKkbJahpqwUB_wJ3-rLWhI-pu_7EIjAzmg0GruKmq5e-Ol9PxVr_haOee0mjcks0HmcTJCJblKN19bW0zLHxMLIaOPFv-3c6zZP5LpXdCy0mqSkuNLbjGgY4xLIONeLXZsZW4lsJ9Vn-suK2J4ivtb3uqiaY10q1c3xrweA4wEtCo-K11arA_AJtKz3f-K_YDJ6O6it0Kb0"
                alt="Brutalist Architecture Concept"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-105 group-hover:brightness-90 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />

            </div>
          </div>

        </div>
      </motion.section>

      <Footer />
    </div>
  );
}