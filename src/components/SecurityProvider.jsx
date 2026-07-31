import React, { useEffect } from "react";

export default function SecurityProvider({ children }) {
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();

    const handleKeyDown = (e) => {
      if (
        e.keyCode === 123 || 
        (e.ctrlKey && e.shiftKey && e.keyCode === 73) || 
        (e.ctrlKey && e.shiftKey && e.keyCode === 74) || 
        (e.ctrlKey && e.keyCode === 85) 
      ) {
        e.preventDefault();
        return false;
      }
    };


    const continuousDebugger = setInterval(() => {
      (function () {
        return false;
      }.constructor("debugger")());
    }, 100);

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
      clearInterval(continuousDebugger);
    };
  }, []);

  return <>{children}</>;
}