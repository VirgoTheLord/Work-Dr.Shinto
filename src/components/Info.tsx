"use client";

import React, { useState, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { FaArrowRight } from "react-icons/fa";
import ParallaxSection from "./ParallaxSection";

const cardData = [
  {
    title: "Understanding Radiology",
    content:
      "Radiology uses medical imaging technologies like X-rays, CT scans, MRIs, and ultrasound to diagnose and treat diseases. It is a fundamental part of modern medicine, providing detailed views inside the human body.",
    image: "/1.jpg",
  },
  {
    title: "Screening & Early Detection",
    content:
      "Utilizing advanced imaging like mammography, low-dose CT, and ultrasound allows us to detect cancers at their earliest, most treatable stages, often before symptoms even develop. This proactive approach is fundamental to improving patient outcomes.",
    image: "/2.jpg",
  },
  {
    title: "Diagnosis & Staging",
    content:
      "When a concern arises, precision is key. CT, MRI, and PET-CT scans provide a detailed roadmap, helping us clarify the cancer's type, size, location, and stage, which is absolutely critical for creating an effective, personalized treatment plan.",
    image: "/3.jpg",
  },
  {
    title: "Treatment Guidance",
    content:
      "Modern radiology is not just for diagnosis; it's an active part of treatment. We use imaging to guide precise, minimally invasive procedures like targeted biopsies, tumor ablations, and the placement of treatment ports, minimizing impact on the patient.",
    image: "/4.jpg",
  },
];

const Info = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDesktop = useRef(false);
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const timelines = useRef<gsap.core.Timeline[]>([]);

  useLayoutEffect(() => {
    isDesktop.current = window.matchMedia("(min-width: 1024px)").matches;

    cardData.forEach((card) => {
      const img = new window.Image();
      img.src = card.image;
    });
  }, []);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const cards = Array.from(containerRef.current.children) as HTMLDivElement[];

    const ctx = gsap.context(() => {
      timelines.current = [];

      cards.forEach((card) => {
        const title = card.querySelector(".card-title");
        const content = card.querySelector(".card-content");
        const arrowIcon = card.querySelector(".card-arrow-icon");
        const image = card.querySelector(".card-image");
        const number = card.querySelector(".card-number");
        const overlay = card.querySelector(".card-overlay");

        const tl = gsap.timeline({ paused: true });

        tl.to(image, {
          clipPath: "circle(142% at 100% 100%)",
          duration: 0.7,
          ease: "power3.inOut",
        })
          .to(
            overlay,
            { opacity: 0.6, duration: 0.5, ease: "power2.out" },
            "-=0.5"
          )
          .to([title, number], { color: "#ffffff", duration: 0.4 }, "<")
          .to(content, { color: "#e2e8f0", duration: 0.4 }, "<")
          .to(content, { opacity: 1, y: 0, duration: 0.4, delay: 0.1 }, "<")
          .to(
            arrowIcon,
            { autoAlpha: 0, x: 15, rotate: 45, duration: 0.3 },
            "<"
          );

        timelines.current.push(tl);
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    timelines.current.forEach((tl, index) => {
      if (index === activeIndex) {
        tl.play();
      } else {
        tl.reverse();
      }
    });
  }, [activeIndex]);

  const handleMouseEnter = (index: number) => {
    if (isDesktop.current) {
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
      }
      setActiveIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (isDesktop.current) {
      leaveTimeoutRef.current = setTimeout(() => {
        setActiveIndex(null);
      }, 100);
    }
  };

  const handleClick = (index: number) => {
    if (!isDesktop.current) {
      setActiveIndex(activeIndex === index ? null : index);
    }
  };

  return (
    <ParallaxSection imgAlt="Radiology in Cancer Care" imgSpeed={0.2} id="info">
      <div className="flex flex-col min-h-screen">
        <div className="bg-[#401d01]">
          <div className="container mx-auto px-6 text-center py-24">
            <h1 className="text-4xl md:text-6xl font-bold font-braven text-white">
              The Role of Radiology in Cancer Care
            </h1>
            <p className="mt-4 text-lg text-shadow-white max-w-2xl mx-auto font-raleway">
              From early detection to post-treatment follow-up, medical imaging
              is an essential partner in the fight against cancer.
            </p>
          </div>
        </div>

        <div className="relative z-10 w-full flex-grow lg:h-screen overflow-hidden">
          <div
            ref={containerRef}
            className="flex flex-col lg:flex-row w-full h-full"
            onMouseLeave={handleMouseLeave}
          >
            {cardData.map((card, index) => (
              <div
                key={card.title}
                onClick={() => handleClick(index)}
                onMouseEnter={() => handleMouseEnter(index)}
                className={`
                  card group relative flex flex-col text-left bg-[#e0c7ae] p-10 cursor-pointer
                  border-b last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0 border-gray-200
                  transition-[flex] duration-700 ease-in-out overflow-hidden
                  ${activeIndex === index ? "flex-[4_1_0%]" : "flex-[1_1_0%]"}
                  lg:flex-1
                  focus:outline-none focus:ring-0
                `}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="card-image object-cover"
                  style={{
                    willChange: "clip-path",
                    clipPath: "circle(0% at 100% 100%)",
                  }}
                />
                <div className="card-overlay absolute inset-0 bg-black opacity-0 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col h-full">
                  <div>
                    <div className="card-number text-7xl lg:text-9xl font-light text-[#401d01] py-4 font-braven">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <h3 className="card-title mt-4 text-4xl font-bold tracking-tight text-gray-800 py-4 font-braven">
                      {card.title}
                    </h3>
                  </div>

                  <div className="flex-grow flex flex-col justify-end">
                    <p className="card-content text-base lg:text-md text-gray-600 font-raleway opacity-0">
                      {card.content}
                    </p>
                    <div className="absolute bottom-10 right-10 flex items-center justify-center w-14 h-14 rounded-full transition-transform duration-300 group-hover:scale-110">
                      <div className="card-arrow-icon text-gray-800 text-2xl">
                        <FaArrowRight />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ParallaxSection>
  );
};

export default Info;
