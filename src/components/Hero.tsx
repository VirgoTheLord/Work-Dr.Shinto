"use client";

import React, { forwardRef, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { AnimatedButtonWrapper } from "./AnimatedButtonWrapper";

const images = ["/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg"];

const Hero = forwardRef<HTMLDivElement, React.PropsWithChildren<{}>>(
  (props, ref) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const imageContainerRef = useRef(null);

    const nameRef1 = useRef(null);
    const nameRef2 = useRef(null);
    const subtitleRef = useRef(null);
    const detailsRef = useRef(null);
    const buttonsRef = useRef(null);

    useEffect(() => {
      images.forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });

      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);

      return () => clearInterval(interval);
    }, []);

    useEffect(() => {
      if (imageContainerRef.current) {
        const imageElements = gsap.utils.toArray(
          ".carousel-image"
        ) as HTMLElement[];

        gsap.to(imageElements[currentImageIndex], {
          autoAlpha: 1,
          duration: 1.5,
          ease: "power2.inOut",
        });

        gsap.to(
          imageElements.filter((_, i) => i !== currentImageIndex),
          {
            autoAlpha: 0,
            duration: 1.5,
            ease: "power2.inOut",
          }
        );
      }
    }, [currentImageIndex]);

    useEffect(() => {
      if (
        nameRef1.current &&
        nameRef2.current &&
        subtitleRef.current &&
        detailsRef.current &&
        buttonsRef.current
      ) {
        gsap.registerPlugin(SplitText);
        const split1 = SplitText.create(nameRef1.current, { type: "chars" });
        const split2 = SplitText.create(nameRef2.current, { type: "chars" });
        const tl = gsap.timeline();

        tl.from(subtitleRef.current, {
          yPercent: -50,
          autoAlpha: 0,
          duration: 0.7,
          ease: "power2.out",
          delay: 0.2,
        })
          .from(
            split1.chars,
            {
              yPercent: -100,
              autoAlpha: 0,
              stagger: 0.03,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.5"
          )
          .from(
            split2.chars,
            {
              yPercent: -100,
              autoAlpha: 0,
              stagger: 0.03,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.6"
          )
          .from(
            [detailsRef.current, buttonsRef.current],
            {
              yPercent: 50,
              autoAlpha: 0,
              stagger: 0.2,
              duration: 0.7,
              ease: "power2.out",
            },
            "-=0.7"
          );
      }
    }, []);

    return (
      <div
        ref={ref}
        className="min-h-screen relative w-full flex flex-col justify-center items-start px-6 md:px-10 pt-20 pb-32 sm:py-20 overflow-hidden"
      >
        <div className="absolute inset-0 z-0" ref={imageContainerRef}>
          {images.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt="Background"
              fill
              priority={index === 0}
              className={`carousel-image object-cover ${
                index === 0 ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 w-full">
          <div className="font-raleway">
            <p
              ref={subtitleRef}
              className="text-xs sm:text-sm uppercase tracking-widest font-raleway text-white/60"
            >
              Creative Developer & Designer
            </p>
            <h1 className="font-braven text-white text-6xl font-black sm:text-7xl md:text-8xl lg:text-[9vw] leading-tight mt-2">
              <div className="flex flex-col sm:flex-row sm:gap-x-4 md:gap-10">
                <span ref={nameRef1}>Dr. Shinto</span>
                <span ref={nameRef2}>Rajappan.</span>
              </div>
            </h1>
            <p
              ref={detailsRef}
              className="mt-4 text-base md:text-lg text-white/80"
            >
              Freelance • Kerala, India
            </p>
            <div ref={buttonsRef} className="mt-8 flex flex-wrap gap-4">
              <AnimatedButtonWrapper href="#contact" variant="primary">
                Book a Consult
              </AnimatedButtonWrapper>
              <AnimatedButtonWrapper href="#videos" variant="secondary">
                Watch Videos
              </AnimatedButtonWrapper>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default Hero;
