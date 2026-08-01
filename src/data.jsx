/**
 * @typedef {Object} Project
 * @property {string} id
 * @property {string} category
 * @property {string} title
 * @property {string} description
 * @property {string} year
 * @property {string} client
 * @property {readonly string[]} tags
 */

/** @type {readonly Project[]} */
export const PROJECTS = Object.freeze([
  {
    id: "01",
    category: "ANALYTICS",
    title: "NEXUS ANALYTICS",
    description: "A comprehensive data visualization suite for enterprise logistics and supply chain optimization.",
    year: "2025",
    client: "Nexus Global",
    tags: Object.freeze(["D3.js", "React", "Rust", "WebAssembly"])
  },
  {
    id: "02",
    category: "BRANDING",
    title: "VELO CREATIVE",
    description: "Redefining visual identity and custom ecommerce architectures for high-performance cycling apparel.",
    year: "2025",
    client: "Velo Co.",
    tags: Object.freeze(["Next.js", "GraphQL", "TailwindCSS", "WebGL"])
  },
  {
    id: "03",
    category: "PRODUCTIVITY",
    title: "DEVDOCS PRO",
    description: "The ultimate offline-first documentation hub and markdown compiler for modern engineering teams.",
    year: "2026",
    client: "DevDocs Inc.",
    tags: Object.freeze(["Electron", "SQLite", "CRDTs", "Node.js"])
  },
  {
    id: "04",
    category: "INTERFACE",
    title: "NEBULA SAAS",
    description: "Cloud infrastructure management and Kubernetes orchestrator with a dark-mode first focus.",
    year: "2026",
    client: "Nebula Systems",
    tags: Object.freeze(["TypeScript", "Go", "Docker", "gRPC"])
  },
  {
    id: "05",
    category: "AI & ML",
    title: "SYNTHIA LABS",
    description: "Exploring the frontiers of synthetic intelligence, natural language generators, and neural nets.",
    year: "2026",
    client: "Synthia Ltd.",
    tags: Object.freeze(["Python", "TensorFlow", "React", "WebRTC"])
  }
]);