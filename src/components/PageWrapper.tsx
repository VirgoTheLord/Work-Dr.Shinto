"use client";

import React, { useState, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Preloader from "./Preloader";
import { useAnimationContext } from "@/context/AnimationContext"; // Adjust path if needed

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { setAnimationReady } = useAnimationContext();
  const mainContentRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const tl = gsap.timeline();

    const counter = { value: 0 };
    const updateProgress = () => {
      const percentElement = document.getElementById("preloader-percent");
      if (percentElement) {
        percentElement.textContent = `${Math.round(counter.value)}%`;
      }
    };

    tl.fromTo(
      "#preloader-text-fill",
      { clipPath: "polygon(0 0, 0% 0, 0% 100%, 0 100%)" },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 1.5,
        ease: "power2.inOut",
      }
    )
      .to(
        counter,
        {
          value: 100,
          duration: 1.5,
          ease: "power2.inOut",
          onUpdate: updateProgress,
        },
        "<"
      )
      .to("#preloader", {
        yPercent: -100,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          // Unmount the preloader component for cleanup
          setIsLoading(false);
        },
      })
      .to(
        mainContentRef.current,
        {
          opacity: 1,
          duration: 0.5,
          onComplete: () => {
            // Signal that the page is ready for other animations
            setAnimationReady();
          },
        },
        "-=0.5"
      );
    // ✨ FIX: Added 'setAnimationReady' to the dependency array
  }, [setAnimationReady]);

  return (
    <div>
      {/* Conditionally render preloader so it can be removed from the DOM */}
      {isLoading && <Preloader />}
      <main ref={mainContentRef} className="hide-main-content">
        {children}
      </main>
    </div>
  );
};

export default PageWrapper;
