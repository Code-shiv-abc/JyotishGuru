"use client";

import { useEffect, useRef } from "react";
import { astrologyTools } from "@/lib/mcp/astrologyTools";

// Extend the Window interface to recognize WebMCP from the external script
declare global {
  interface Window {
    WebMCP?: any;
    WebMCPLoaded?: boolean;
  }
}

export function WebMCPProvider() {
  const initialized = useRef(false);

  useEffect(() => {
    // Only initialize once
    if (initialized.current) return;

    // Check if the script has loaded the WebMCP class onto the window
    const checkWebMCP = setInterval(() => {
      // The script assigns WebMCP to the global object, which is window in the browser
      const WebMCPClass = window.WebMCP || (window as any).WebMCP;

      if (typeof WebMCPClass !== "undefined") {
        clearInterval(checkWebMCP);

        try {
          // We must not re-initialize if the widget already appended itself or initialized.
          // But webmcp.js typically defines `class WebMCP` globally.
          const mcp = new WebMCPClass({
            color: '#fbbf24', // Stardust Gold
            position: 'bottom-right',
            size: '50px',
            padding: '20px'
          });

          // Register all tools defined in the registry
          astrologyTools.forEach(tool => {
            mcp.registerTool(
              tool.name,
              tool.description,
              tool.inputSchema,
              tool.execute
            );
          });

          console.log("WebMCP Initialized and tools registered.");
          initialized.current = true;
        } catch (e) {
          console.error("Failed to initialize WebMCP:", e);
        }
      }
    }, 500); // Check every 500ms

    // Clean up interval on unmount
    return () => clearInterval(checkWebMCP);
  }, []);

  // This component doesn't render anything visible itself
  // The WebMCP script manages the widget DOM elements
  return null;
}
