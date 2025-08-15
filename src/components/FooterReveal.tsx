"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Contact from "./Contact";
import Footer from "./Footer";

gsap.registerPlugin(ScrollTrigger);

const FooterReveal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contactSectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "bottom bottom",
          // NEW: Animation completes over a shorter scroll distance (50% of viewport height).
          end: "+=50%",
          scrub: 1,
          pin: true,
        },
      });

      tl.to(contactSectionRef.current, {
        y: "-50vh",
        // NEW: Increased the border radius for a more visible curve.
        borderRadius: "100px 100px 0 0",
        ease: "power1.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    // NEW: Reduced the container height for a shorter, snappier scroll animation.
    <div ref={containerRef} className="relative h-[150vh] w-full bg-[#F8F5F2]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute bottom-0 left-0 h-[50vh] w-full">
          <Footer />
        </div>
        <div
          ref={contactSectionRef}
          className="relative z-20 h-full bg-[#F8F5F2]"
        >
          <Contact />
        </div>
      </div>
    </div>
  );
};

export default FooterReveal;
