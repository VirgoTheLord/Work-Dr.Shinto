"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { FaLongArrowAltRight } from "react-icons/fa";

interface AnimatedArrowProps {
  isVisible: boolean;
}

const AnimatedArrow: React.FC<AnimatedArrowProps> = ({ isVisible }) => {
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!arrowRef.current) return;
    if (isVisible) {
      gsap.to(arrowRef.current, {
        opacity: 0.8,
        x: 0,
        duration: 0.4,
        ease: "power3.out",
      });
    } else {
      gsap.to(arrowRef.current, {
        opacity: 0,
        x: 10,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isVisible]);

  return (
    <div
      ref={arrowRef}
      className="absolute bottom-8 right-8 text-[#401d01] opacity-0 translate-x-10 transition-opacity duration-300 ease-in-out"
      style={{ pointerEvents: "none" }}
    >
      <FaLongArrowAltRight className="h-6 w-6" />
    </div>
  );
};

export default AnimatedArrow;
