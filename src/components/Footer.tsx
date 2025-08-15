"use client";

import React, { useRef, useLayoutEffect } from "react";
import { FiArrowUp } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const arrowIconRef = useRef<HTMLSpanElement>(null);
  const arrowBgRef = useRef<HTMLSpanElement>(null);
  const arrowHoverTl = useRef<gsap.core.Timeline | null>(null);
  const bgHoverTween = useRef<gsap.core.Tween | null>(null);
  const iconColorTween = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        defaults: { opacity: 0, y: 30, ease: "power3.out", duration: 0.8 },
      });

      tl.from(".footer-title", {})
        .from(".footer-desc", {}, "-=0.6")
        .from(".footer-arrow", {}, "-=0.6");

      ScrollTrigger.create({
        trigger: footerRef.current,
        start: "top 80%",
        onEnter: () => tl.play(),
        onLeaveBack: () => tl.reverse(),
      });

      arrowHoverTl.current = gsap
        .timeline({ paused: true, reversed: true })
        .to(arrowRef.current, {
          yPercent: -120,
          duration: 0.3,
          ease: "power2.in",
        })
        .set(arrowRef.current, { yPercent: 120 })
        .to(arrowRef.current, {
          yPercent: 0,
          duration: 0.3,
          ease: "power2.out",
        });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleBackToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleArrowMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    arrowHoverTl.current?.play();
    gsap.to(e.currentTarget, { borderColor: "transparent", duration: 0.3 });

    bgHoverTween.current = gsap.to(arrowBgRef.current, {
      keyframes: [
        { backgroundColor: "#F8F5F2", duration: 0.4 },
        { backgroundColor: "#c7a385", duration: 0.4 },
        { backgroundColor: "#401d01", duration: 0.4 },
        { backgroundColor: "transparent", duration: 0.4 },
      ],
      ease: "none",
      repeat: -1,
    });

    iconColorTween.current = gsap.to(arrowIconRef.current, {
      keyframes: [
        { color: "#401d01", duration: 0.4 },
        { color: "#F8F5F2", duration: 0.4 },
        { color: "#F8F5F2", duration: 0.4 },
        { color: "#F8F5F2", duration: 0.4 },
      ],
      ease: "none",
      repeat: -1,
    });
  };

  const handleArrowMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    arrowHoverTl.current?.reverse();
    gsap.to(e.currentTarget, { borderColor: "#F8F5F2", duration: 0.3 });

    bgHoverTween.current?.kill();
    iconColorTween.current?.kill();

    gsap.to(arrowBgRef.current, {
      backgroundColor: "transparent",
      duration: 0.2,
    });
    gsap.to(arrowIconRef.current, { color: "#F8F5F2", duration: 0.2 });
  };

  return (
    <footer
      ref={footerRef}
      className="h-full w-full bg-[#401d01] text-[#F8F5F2] flex items-center justify-center p-8 overflow-hidden"
    >
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <h2 className="footer-title font-braven text-5xl md:text-8xl">
            Dr. Shinto Rajappan.
          </h2>
          <p className="footer-desc font-raleway text-md opacity-70 mt-2">
            Committed to providing expert radiological insights.
          </p>
        </div>

        <a
          href="#top"
          onClick={handleBackToTop}
          onMouseEnter={handleArrowMouseEnter}
          onMouseLeave={handleArrowMouseLeave}
          className="footer-arrow group relative h-14 w-14 flex-shrink-0 flex items-center justify-center border-2 border-[#F8F5F2]/30 text-[#F8F5F2]/70 transition-colors duration-300 hover:text-white"
          aria-label="Back to Top"
        >
          <span
            ref={arrowBgRef}
            className="absolute inset-0 z-0"
            style={{ backgroundColor: "transparent" }}
          ></span>
          <span ref={arrowRef} className="relative z-10 block">
            <span ref={arrowIconRef}>
              <FiArrowUp className="h-6 w-6" />
            </span>
          </span>
        </a>
      </div>
      <p className="absolute bottom-4 left-0 right-0 text-center font-raleway text-xs opacity-50">
        &copy; {new Date().getFullYear()} Dr. Shinto Rajappan. All rights
        reserved.
      </p>
    </footer>
  );
};

export default Footer;
