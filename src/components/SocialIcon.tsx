"use client";

import React, { useRef, FC, ReactNode } from "react";
import gsap from "gsap";

interface SocialIconProps {
  href: string;
  children: ReactNode;
  "aria-label": string;
}

const SocialIcon: FC<SocialIconProps> = ({ href, children, ...props }) => {
  const iconRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    gsap.to(iconRef.current, {
      rotation: 360,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(iconRef.current, {
      rotation: 0,
      duration: 0.5,
      ease: "power2.inOut",
      overwrite: "auto",
    });
  };

  return (
    <a
      href={href}
      className="group h-12 w-12 flex items-center justify-center rounded-full border-2 border-[#401d01]/20 text-[#401d01]/70 transition-all duration-300 hover:border-[#401d01] hover:bg-[#401d01] hover:text-white"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <span ref={iconRef}>{children}</span>
    </a>
  );
};

export default SocialIcon;
