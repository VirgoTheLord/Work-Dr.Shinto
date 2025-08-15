"use client";

import React, { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import Image from "next/image";

const lerp = (start: number, end: number, factor: number) =>
  start + (end - start) * factor;

interface ParallaxImageProps {
  src?: string;
  alt: string;
  speed?: number;
  bgColor?: string;
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  speed = 0.2,
  bgColor = "transparent",
}) => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const bounds = useRef<{ top: number; bottom: number } | null>(null);
  const currentTranslateY = useRef(0);
  const targetTranslateY = useRef(0);
  const refId = useRef<number | null>(null);

  useEffect(() => {
    const updateBounds = () => {
      if (wrapperRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect();
        bounds.current = {
          top: rect.top + window.scrollY,
          bottom: rect.bottom + window.scrollY,
        };
      }
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);
    const animate = () => {
      const el = src ? imageRef.current : divRef.current;
      if (el) {
        currentTranslateY.current = lerp(
          currentTranslateY.current,
          targetTranslateY.current,
          0.1
        );
        if (
          Math.abs(currentTranslateY.current - targetTranslateY.current) > 0.01
        ) {
          el.style.transform = `translateY(${currentTranslateY.current}px) scale(1.2)`;
        }
      }
      refId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateBounds);
      if (refId.current) cancelAnimationFrame(refId.current);
    };
  }, [src]);

  useLenis(({ scroll }) => {
    if (!bounds.current) return;
    const relativeScroll = scroll - bounds.current.top;
    targetTranslateY.current = relativeScroll * speed;
  });

  return (
    <div ref={wrapperRef} className="relative w-full h-full overflow-hidden">
      {src ? (
        <Image
          ref={imageRef}
          src={src}
          alt={alt}
          fill
          className="object-cover will-change-transform"
          style={{ transform: "translateY(0) scale(1.2)" }}
        />
      ) : (
        <div
          ref={divRef}
          className="w-full h-full will-change-transform"
          style={{
            backgroundColor: bgColor,
            transform: "translateY(0) scale(1.2)",
          }}
          role="img"
          aria-label={alt}
        />
      )}
    </div>
  );
};

export default ParallaxImage;
