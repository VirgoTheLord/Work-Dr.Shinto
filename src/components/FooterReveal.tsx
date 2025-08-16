"use client";

import React, { useState, useEffect } from "react";
import Contact from "./Contact";
import Footer from "./Footer";

/**
 * This component now acts as a simple layout wrapper for the Contact and Footer sections.
 * It also handles loading the GSAP library from a CDN to make it available to child components.
 */
const ContactFooterSection = () => {
  const [areScriptsLoaded, setAreScriptsLoaded] = useState(false);

  useEffect(() => {
    // Check if GSAP is already available
    if (window.gsap && window.ScrollTrigger) {
      setAreScriptsLoaded(true);
      return;
    }

    const loadScript = (src: string, onLoad: () => void) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = onLoad;
      document.body.appendChild(script);
      return script;
    };

    // Load GSAP, then ScrollTrigger
    loadScript(
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js",
      () => {
        loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js",
          () => {
            // Ensure the plugin is registered globally
            window.gsap.registerPlugin(window.ScrollTrigger);
            setAreScriptsLoaded(true);
          }
        );
      }
    );

    // Basic cleanup
    return () => {
      const scripts = document.querySelectorAll('script[src*="gsap"]');
      scripts.forEach((s) => s.parentElement?.removeChild(s));
    };
  }, []);

  // Render children only after scripts are loaded to prevent errors
  return (
    <div className="bg-[#F8F5F2]">
      <Contact />
      {areScriptsLoaded ? <Footer /> : <div>Loading Footer...</div>}
    </div>
  );
};

export default ContactFooterSection;
