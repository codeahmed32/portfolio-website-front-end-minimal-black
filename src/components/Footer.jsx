import React from "react";

// Move static links outside component to eliminate render recreation
const SOCIAL_LINKS = [
  { label: "Twitter / X", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "GitHub", href: "#" }
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer-main" className="border-t border-neutral-900 bg-[#030303] py-12 px-6 md:px-12 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        {/* Branding & Legal */}
        <div className="flex flex-col gap-1 text-left">
          <span className="font-sans text-sm font-semibold text-white tracking-widest uppercase">
            NOIR ARCHIVE
          </span>
          <p className="font-sans text-xs text-neutral-500 font-normal">
            © {currentYear} Noir Archive. All rights reserved.
          </p>
        </div>

        {/* Navigation / Links */}
        <div className="flex gap-6">
          {SOCIAL_LINKS.map(({ label, href }) => (
            <a 
              key={label}
              href={href} 
              className="font-sans text-xs text-neutral-400 hover:text-white transition-colors font-medium"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}