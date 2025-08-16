"use client";

import React, { useRef, FC, ReactNode } from "react";
import { FiArrowRight } from "react-icons/fi";
import gsap from "gsap";

interface AnimatedContactLinkProps {
  href: string;
  children: ReactNode;
}

const AnimatedContactLink: FC<AnimatedContactLinkProps> = ({
  href,
  children,
}) => {
  const arrowBoxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    gsap.to(arrowBoxRef.current, {
      scaleX: 1,
      opacity: 1,
      duration: 0.4,
      ease: "power3.out",
    });
    gsap.to(textRef.current, {
      x: 40,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(arrowBoxRef.current, {
      scaleX: 0,
      opacity: 0,
      duration: 0.4,
      ease: "power3.inOut",
    });
    gsap.to(textRef.current, {
      x: 0,
      duration: 0.4,
      ease: "power3.inOut",
    });
  };

  return (
    <a
      href={href}
      className="font-sans relative block text-md font-medium transition-colors hover:text-black py-1"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={arrowBoxRef}
        className="absolute left-0 top-0 bottom-0 my-auto h-8 w-8 flex items-center justify-center bg-[#401d01] text-white origin-left"
        style={{ transform: "scaleX(0)", opacity: 0 }}
      >
        <FiArrowRight className="transform -rotate-45" />
      </div>
      <span ref={textRef} className="relative block">
        {children}
      </span>
    </a>
  );
};

export default AnimatedContactLink;
