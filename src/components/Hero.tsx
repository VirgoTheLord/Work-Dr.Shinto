"use client";

import React, {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { AnimatedButtonWrapper } from "./AnimatedButtonWrapper";
import { useAnimationContext } from "@/context/AnimationContext";

gsap.registerPlugin(SplitText);

const images = ["/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg"];
const FIRST_NAME = "Dr. Shinto";
const LAST_NAME = "Rajappan.";

// ✨ FIX: Changed React.PropsWithChildren<{}> to React.PropsWithChildren
// This resolves the '@typescript-eslint/no-empty-object-type' error.
const Hero = forwardRef<HTMLDivElement, React.PropsWithChildren>(
  (props, ref) => {
    const { isAnimationReady } = useAnimationContext();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const scopeRef = useRef<HTMLDivElement | null>(null);
    const subtitleRef = useRef<HTMLParagraphElement | null>(null);
    const detailsRef = useRef<HTMLParagraphElement | null>(null);
    const buttonsRef = useRef<HTMLDivElement | null>(null);
    const firstNameRef = useRef<HTMLSpanElement | null>(null);
    const lastNameRef = useRef<HTMLSpanElement | null>(null);

    // Preload images + rotate
    useEffect(() => {
      images.forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });

      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 5000);
      return () => clearInterval(interval);
    }, []);

    // Crossfade background images
    useEffect(() => {
      gsap.to(".carousel-image", {
        autoAlpha: (i: number) => (i === currentImageIndex ? 1 : 0),
        duration: 1.5,
        ease: "power2.inOut",
      });
    }, [currentImageIndex]);

    // Hero text animation
    useLayoutEffect(() => {
      if (
        !isAnimationReady ||
        !subtitleRef.current ||
        !detailsRef.current ||
        !buttonsRef.current ||
        !firstNameRef.current ||
        !lastNameRef.current
      ) {
        return;
      }

      const ctx = gsap.context(() => {
        const splitFirstName = new SplitText(firstNameRef.current, {
          type: "chars",
        });
        const splitLastName = new SplitText(lastNameRef.current, {
          type: "chars",
        });

        // Set overflow hidden on parents for the clipping mask effect.
        gsap.set([firstNameRef.current, lastNameRef.current], {
          overflow: "hidden",
        });

        // Set the initial state of the characters to be ABOVE the viewport.
        gsap.set([splitFirstName.chars, splitLastName.chars], {
          yPercent: -100,
          autoAlpha: 0,
        });

        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

        tl.fromTo(
          subtitleRef.current,
          { autoAlpha: 0, y: -30 },
          { autoAlpha: 1, y: 0, duration: 0.8, delay: 0.2 }
        )
          .set(
            [firstNameRef.current, lastNameRef.current],
            { autoAlpha: 1 },
            "-=0.4"
          )
          .to(
            splitFirstName.chars,
            {
              autoAlpha: 1,
              yPercent: 0,
              duration: 0.6,
              stagger: 0.05,
            },
            "<"
          )
          .to(
            splitLastName.chars,
            {
              autoAlpha: 1,
              yPercent: 0,
              duration: 0.6,
              stagger: 0.05,
            },
            "-=0.5"
          )
          .fromTo(
            detailsRef.current,
            { autoAlpha: 0, y: 30 },
            { autoAlpha: 1, y: 0, duration: 0.8 },
            "-=0.3"
          )
          .fromTo(
            buttonsRef.current,
            { autoAlpha: 0, y: 30 },
            { autoAlpha: 1, y: 0, duration: 0.8 },
            "<0.2"
          );

        return () => {
          splitFirstName.revert();
          splitLastName.revert();
        };
      }, scopeRef);

      return () => ctx.revert();
    }, [isAnimationReady]);

    return (
      <div
        ref={(node) => {
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
          scopeRef.current = node;
        }}
        className="min-h-screen relative w-full flex flex-col justify-center items-start px-6 md:px-10 pt-20 pb-32 sm:py-20"
      >
        {/* background carousel */}
        <div className="absolute inset-0 z-0">
          {images.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt="Background"
              fill
              priority={index === 0}
              className="carousel-image object-cover opacity-0"
            />
          ))}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* foreground */}
        <div className="relative z-10 w-full font-raleway">
          <p
            ref={subtitleRef}
            style={{ visibility: "hidden" }}
            className="text-xs sm:text-sm uppercase tracking-widest font-raleway text-white/70"
          >
            Creative Developer & Designer
          </p>

          <h1 className="font-braven text-white text-6xl font-black sm:text-7xl md:text-8xl lg:text-[9vw] leading-tight mt-2">
            <div className="flex flex-col sm:flex-row sm:gap-x-4 md:gap-10">
              <span
                ref={firstNameRef}
                className="whitespace-pre"
                style={{ visibility: "hidden" }}
              >
                {FIRST_NAME}
              </span>
              <span
                ref={lastNameRef}
                className="whitespace-pre"
                style={{ visibility: "hidden" }}
              >
                {LAST_NAME}
              </span>
            </div>
          </h1>

          <p
            ref={detailsRef}
            style={{ visibility: "hidden" }}
            className="mt-4 text-base md:text-lg text-white/85"
          >
            Freelance • Kerala, India
          </p>

          <div
            ref={buttonsRef}
            style={{ visibility: "hidden" }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <AnimatedButtonWrapper href="#contact" variant="primary">
              Book a Consult
            </AnimatedButtonWrapper>
            <AnimatedButtonWrapper href="#videos" variant="secondary">
              Watch Videos
            </AnimatedButtonWrapper>
          </div>
        </div>
      </div>
    );
  }
);

Hero.displayName = "Hero";
export default Hero;
