"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import Contact from "./Contact";
import Footer from "./Footer";

// FIX: Augment the global Window interface to inform TypeScript about GSAP
declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

const FooterReveal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contactSectionRef = useRef<HTMLDivElement>(null);
  const [isGsapLoaded, setIsGsapLoaded] = useState(false);

  // Effect to load GSAP and ScrollTrigger from a CDN
  useEffect(() => {
    if (window.gsap) {
      setIsGsapLoaded(true);
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

    loadScript(
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js",
      () => {
        loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js",
          () => {
            setIsGsapLoaded(true);
          }
        );
      }
    );

    return () => {
      const scripts = document.querySelectorAll('script[src*="gsap"]');
      scripts.forEach((s) => s.parentElement?.removeChild(s));
    };
  }, []);

  useLayoutEffect(() => {
    if (!isGsapLoaded) return;

    // FIX: No more need for '(window as any)'
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    // Use matchMedia to apply animations only to desktop screens
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // This animation only runs on screens wider than 768px
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "bottom bottom",
          end: "+=50%",
          scrub: 1,
          pin: true,
        },
      });

      tl.to(contactSectionRef.current, {
        y: "-50vh",
        borderRadius: "100px 100px 0 0",
        ease: "power1.out",
      });
    });

    return () => mm.revert();
  }, [isGsapLoaded]);

  return (
    <div ref={containerRef} className="w-full bg-[#F8F5F2]">
      <div className="relative lg:sticky top-0 lg:h-screen w-full lg:overflow-hidden">
        <div
          ref={contactSectionRef}
          className="relative z-20 w-full bg-[#F8F5F2]"
        >
          <Contact />
        </div>
        <div className="relative lg:absolute bottom-0 left-0 z-10 w-full lg:h-[50vh]">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default FooterReveal;
