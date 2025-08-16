"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "./Hero";
import About from "./About";

gsap.registerPlugin(ScrollTrigger);

const HeroAboutTransition = () => {
  const containerRef = useRef(null);
  // heroRef is not used in the animation, but is kept for component structure
  const heroRef = useRef(null);
  const aboutRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          // The end value "+=100%" dynamically calculates based on the trigger's height.
          // On mobile, this will be 135vh of scroll. On desktop, 100vh.
          end: "+=100%",
          scrub: 1,
          pin: true,
        },
      });

      tl.fromTo(
        aboutRef.current,
        {
          yPercent: 100,
          scale: 0.8,
        },
        {
          yPercent: 0,
          scale: 1,
          ease: "power1.inOut",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      // This is the key change for responsiveness.
      // Default height is 135vh (mobile-first).
      // On medium screens (md: 768px) and up, the height becomes 100vh (h-screen).
      className="relative w-full h-[135vh] md:h-screen overflow-hidden"
    >
      <div ref={heroRef} className="w-full h-full">
        <Hero />
      </div>
      <div
        ref={aboutRef}
        className="absolute top-0 left-0 w-full h-full z-50 bg-gray-100 text-neutral-800 overflow-hidden"
      >
        <About />
      </div>
    </div>
  );
};

export default HeroAboutTransition;
