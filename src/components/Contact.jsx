import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, ArrowUpRight, Mail, Send } from "lucide-react";

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

const SOCIAL_LINKS = [
  { name: "LinkedIn", href: "#" },
  { name: "Twitter / X", href: "#" },
  { name: "GitHub", href: "#" }
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", details: "" });
  const [formStatus, setFormStatus] = useState("idle");

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.details) return;

    setFormStatus("submitting");

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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
      alert("Network error: Backend server unavailable.");
    }
  };

  return (
    <motion.div 
      variants={ANIMATION_VARIANTS.container}
      initial="hidden"
      animate="show"
      className="w-full flex flex-col gap-16 md:gap-20"
    >
      {/* Title Section */}
      <section id="contact-title-section" className="text-left">
        <motion.h1 
          variants={ANIMATION_VARIANTS.item}
          className="font-sans text-5xl md:text-7xl font-bold text-white tracking-tighter"
        >
          CONTACT ME
        </motion.h1>
        <motion.div 
          variants={ANIMATION_VARIANTS.item}
          className="h-1 w-20 bg-white mt-4 rounded-full"
        />
        <motion.p 
          variants={ANIMATION_VARIANTS.item}
          className="text-neutral-400 font-sans text-base md:text-lg max-w-xl mt-6 font-normal leading-relaxed"
        >
          Collaborations, inquiries, or project discussions. Feel free to reach out directly.
        </motion.p>
      </section>

      {/* Main Form & Info Grid */}
      <div id="contact-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Form Section */}
        <motion.div variants={ANIMATION_VARIANTS.item} className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {formStatus === "success" ? (
              <motion.div 
                id="contact-success-alert"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="border border-neutral-800 bg-neutral-950/80 p-8 md:p-12 text-center flex flex-col items-center gap-4 rounded-xl"
              >
                <CheckCircle2 className="w-12 h-12 text-white stroke-[1.5]" />
                <h2 className="font-sans text-2xl font-bold text-white tracking-tight">
                  Message Sent Successfully
                </h2>
                <p className="font-sans text-sm text-neutral-400 max-w-md font-normal leading-relaxed">
                  Thank you for getting in touch. I will review your message and respond within 24 hours.
                </p>
                <button
                  id="new-inquiry-btn"
                  onClick={() => setFormStatus("idle")}
                  className="bg-white text-black hover:bg-neutral-200 text-xs font-sans uppercase font-bold tracking-wider px-6 py-3 rounded-lg mt-4 transition-all duration-200 cursor-pointer"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form id="contact-form" onSubmit={handleContactSubmit} className="flex flex-col gap-6 text-left">
                
                {/* Full Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest text-neutral-400 font-semibold font-sans">
                    Full Name
                  </label>
                  <input 
                    id="contact-name-input"
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-neutral-950/80 border border-neutral-800 rounded-lg px-4 py-3.5 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-400 focus:bg-neutral-900 transition-all font-sans text-sm"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest text-neutral-400 font-semibold font-sans">
                    Email Address
                  </label>
                  <input 
                    id="contact-email-input"
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-neutral-950/80 border border-neutral-800 rounded-lg px-4 py-3.5 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-400 focus:bg-neutral-900 transition-all font-sans text-sm"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Project Details */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest text-neutral-400 font-semibold font-sans">
                    Project Details
                  </label>
                  <textarea 
                    id="contact-details-input"
                    required
                    rows={5}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full bg-neutral-950/80 border border-neutral-800 rounded-lg px-4 py-3.5 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-400 focus:bg-neutral-900 transition-all resize-none font-sans text-sm leading-relaxed"
                    placeholder="Describe your vision or scope..."
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    id="contact-submit-btn"
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="w-full md:w-auto bg-white text-black hover:bg-neutral-200 disabled:bg-neutral-800 disabled:text-neutral-500 rounded-lg px-8 py-3.5 font-sans text-xs uppercase tracking-wider font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    {formStatus === "submitting" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <Send className="w-3.5 h-3.5 stroke-[2.5]" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Right Column: Direct Contact & Social surface cards */}
        <motion.div variants={ANIMATION_VARIANTS.item} className="lg:col-span-5 flex flex-col gap-8 text-left">
          
          {/* Direct Email Card */}
          <div className="border border-neutral-800 bg-neutral-950/50 p-6 rounded-xl flex flex-col gap-3">
            <div className="flex items-center gap-2 text-neutral-400">
              <Mail className="w-4 h-4 text-neutral-400" />
              <span className="text-xs uppercase tracking-widest font-semibold font-sans">Direct Email</span>
            </div>
            <a 
              href="mailto:contact@developer.com"
              className="font-sans text-lg md:text-xl font-medium text-white hover:text-neutral-300 transition-colors tracking-tight"
            >
              contact@developer.com
            </a>
          </div>

          {/* Social Channels SaaS Box Grid */}
          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold font-sans">
              Social Channels
            </span>
            <div className="flex flex-col gap-2.5">
              {SOCIAL_LINKS.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  className="px-4 py-3 border border-neutral-800 bg-neutral-950/50 hover:bg-white hover:text-black hover:border-white text-neutral-300 rounded-lg font-sans text-sm font-medium transition-all duration-300 ease-out flex items-center justify-between group cursor-pointer"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-black transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Visual Showcase Card */}
          <div className="relative w-full h-44 border border-neutral-800 rounded-xl overflow-hidden bg-neutral-950 group">
            <img 
              src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop" 
              alt="Workspace visual"
              className="w-full h-full object-cover opacity-40 grayscale transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
          </div>

        </motion.div>
      </div>
    </motion.div>
  );
}