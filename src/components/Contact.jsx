import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, ArrowUpRight } from "lucide-react";

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

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", details: "" });
  const [formStatus, setFormStatus] = useState("idle");

const handleContactSubmit = async (e) => {
  e.preventDefault();
  
  // Validation Check
  if (!formData.name || !formData.email || !formData.details) return;

  setFormStatus("submitting");

  try {
    const response = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        details: formData.details,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setFormStatus("success");
      setFormData({ name: "", email: "", details: "" });
    } else {
      setFormStatus("idle");
      alert(data.error || "Failed to send inquiry.");
    }
  } catch (error) {
    console.error("Submission Error:", error);
    setFormStatus("idle");
    alert("Network error: Backend server running nahi hai ya connection reject hua.");
  }
};

  return (
    <motion.div 
      variants={ANIMATION_VARIANTS.container}
      initial="hidden"
      animate="show"
      className="w-full flex flex-col gap-16"
    >
      {/* Sleek Minimalist Header Title */}
      <section id="contact-title-section" className="text-left">
        <motion.h1 
          variants={ANIMATION_VARIANTS.item}
          className="font-sans text-5xl md:text-7xl font-semibold text-white tracking-tighter"
        >
          Contact Me 
        </motion.h1>
        <motion.p 
          variants={ANIMATION_VARIANTS.item}
          className="text-neutral-400 font-sans text-base md:text-lg max-w-xl mt-4 font-normal"
        >
          Collaborations, inquiries, or project discussions. Feel free to reach out.
        </motion.p>
      </section>

      <div id="contact-grid" className="grid grid-cols-1 md:grid-cols-12 gap-16">
        {/* Form Section */}
        <motion.div variants={ANIMATION_VARIANTS.item} className="md:col-span-7">
          <AnimatePresence mode="wait">
            {formStatus === "success" ? (
              <motion.div 
                id="contact-success-alert"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="border border-neutral-900 bg-neutral-950 p-8 md:p-12 text-center flex flex-col items-center gap-4 text-left rounded-xl"
              >
                <CheckCircle2 className="w-10 h-10 text-white stroke-[1.5]" />
                <h2 className="font-sans text-xl md:text-2xl font-semibold text-white tracking-tight">
                  Message Sent Successfully
                </h2>
                <p className="font-sans text-sm text-neutral-400 max-w-md font-normal">
                  Thank you for getting in touch. I will review your message and get back to you within 24 hours.
                </p>
                <button
                  id="new-inquiry-btn"
                  onClick={() => setFormStatus("idle")}
                  className="bg-white text-black hover:bg-neutral-300 text-xs font-sans uppercase font-semibold tracking-widest px-6 py-2.5 rounded-full mt-4 cursor-pointer transition-colors"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form id="contact-form" onSubmit={handleContactSubmit} className="flex flex-col gap-8 text-left">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold">Full Name</label>
                  <input 
                    id="contact-name-input"
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-[#030303] border-b border-neutral-800 border-t-0 border-l-0 border-r-0 rounded-none py-3 text-white placeholder-neutral-700 focus:outline-none focus:ring-0 focus:border-white transition-colors font-sans text-sm md:text-base"
                    placeholder="John Doe"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold">Email Address</label>
                  <input 
                    id="contact-email-input"
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-[#030303] border-b border-neutral-800 border-t-0 border-l-0 border-r-0 rounded-none py-3 text-white placeholder-neutral-700 focus:outline-none focus:ring-0 focus:border-white transition-colors font-sans text-sm md:text-base"
                    placeholder="email@provider.com"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold">Project Details</label>
                  <textarea 
                    id="contact-details-input"
                    required
                    rows={4}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="bg-[#030303] border-b border-neutral-800 border-t-0 border-l-0 border-r-0 rounded-none py-3 text-white placeholder-neutral-700 focus:outline-none focus:ring-0 focus:border-white transition-colors resize-none font-sans text-sm md:text-base"
                    placeholder="Briefly describe your vision..."
                  />
                </div>

                <div className="pt-4">
                  <button
                    id="contact-submit-btn"
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="bg-white text-black hover:bg-neutral-300 disabled:bg-neutral-800 rounded-full px-10 py-3.5 font-sans text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer w-full md:w-auto"
                  >
                    {formStatus === "submitting" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Submit Inquiry"
                    )}
                  </button>
                </div>
              </form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Right Info Column */}
        <motion.div variants={ANIMATION_VARIANTS.item} className="md:col-span-5 flex flex-col justify-between py-2 text-left gap-12">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold">Direct Email</span>
              <a 
                href="mailto:contact@developer.com"
                className="font-sans text-xl md:text-2xl font-normal text-white hover:text-neutral-300 transition-colors tracking-tight"
              >
                contact@developer.com
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold">Social Channels</span>
              <div className="flex flex-col gap-3">
                <a href="#" className="font-sans text-sm text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5 group">
                  LinkedIn <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
                </a>
                <a href="#" className="font-sans text-sm text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5 group">
                  Twitter / X <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
                </a>
                <a href="#" className="font-sans text-sm text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5 group">
                  GitHub <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          </div>

          <div className="relative w-full h-44 border border-neutral-900 rounded-xl overflow-hidden bg-neutral-950">
            <img 
              src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop" 
              alt="Workspace visual"
              className="w-full h-full object-cover opacity-40 grayscale transition-transform duration-700 hover:scale-105"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}