"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Contact from "./Contact";
import Footer from "./Footer"; // This should be the new half-page footer

gsap.registerPlugin(ScrollTrigger);

const FooterReveal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contactSectionRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "bottom bottom",
          // The animation will complete over a scroll distance of 50% of the viewport height
          end: "+=50%",
          scrub: true,
          pin: true,
        },
      });

      // Animate the Contact section moving up by half the screen height
      tl.to(contactSectionRef.current, { y: "-50vh", ease: "none" });

      // Simultaneously fade out the overlay that sits on top of the footer
      tl.to(overlayRef.current, { opacity: 0, ease: "none" }, 0);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    // This container provides the necessary scrollable space (150vh)
    // for the 50vh reveal animation to occur after the 100vh contact section.
    <div ref={containerRef} className="relative h-[160vh] w-full">
      {/* This sticky container is the viewport for the animation */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* The Footer is positioned absolutely at the bottom of the sticky container */}
        <div className="absolute bottom-0 left-0 h-[50vh] w-full">
          <Footer />
        </div>

        {/* The overlay sits on top of the footer and fades out */}
        <div
          ref={overlayRef}
          className="pointer-events-none absolute bottom-0 left-0 z-10 h-[50vh] w-full bg-black/70"
        ></div>

        {/* The Contact section sits on top of everything inside the sticky container */}
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
