import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function App() {
  // Global states managed at the root layout level
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState("work");

  return (
    <div className="w-full bg-[#030303] text-white selection:bg-white selection:text-black antialiased">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24 w-full">
        {/* React Router Context binds states globally down the route tree */}
        <Outlet context={{ selectedProject, setSelectedProject, activeTab, setActiveTab }} />
      </main>
    </div>
  );
}