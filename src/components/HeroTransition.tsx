"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "./Hero";
import About from "./About";

gsap.registerPlugin(ScrollTrigger);

const HeroAboutTransition = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const aboutRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
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
          borderRadius: "0px",
        },
        {
          yPercent: 0,
          scale: 1,
          borderRadius: "0px",
          ease: "power1.inOut",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[125vh] overflow-hidden"
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
