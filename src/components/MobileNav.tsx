"use client";

import React, { useLayoutEffect, useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";

interface MobileNavProps {
  isOpen: boolean;
  navLinks: { href: string; label: string }[];
  handleLinkClick: (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => void;
  activeSection: string;
}

const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  navLinks,
  handleLinkClick,
  activeSection,
}) => {
  const scope = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const overlay = scope.current?.querySelector(".mobile-overlay");
      const links = gsap.utils.toArray(".mobile-link-container");

      if (!overlay) {
        return;
      }

      tl.current = gsap
        .timeline({ paused: true })
        .fromTo(
          overlay,
          { clipPath: "circle(0% at 100% 0)" },
          {
            clipPath: "circle(150% at 100% 0)",
            duration: 0.7,
            ease: "power3.inOut",
          }
        )
        .fromTo(
          links,
          { y: 30, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.4"
        );
    }, scope);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      tl.current?.play();
    } else {
      document.body.style.overflow = "";
      tl.current?.reverse();
    }
  }, [isOpen]);

  return (
    <div ref={scope}>
      <div className="mobile-overlay fixed top-0 left-0 w-full h-screen bg-[#e0c7ae] z-40 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {navLinks.map((link) => (
            <div
              key={link.href}
              className="mobile-link-container relative flex items-center opacity-0"
            >
              <span
                className={`absolute -left-8 text-3xl text-[#401d01] transition-opacity duration-300 ${
                  activeSection === link.href ? "opacity-100" : "opacity-0"
                }`}
              >
                •
              </span>
              <Link
                href={link.href}
                className="mobile-link text-[#401d01] text-3xl font-black font-braven uppercase tracking-wider"
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                {link.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
