"use client";

import React, { useState, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import ParallaxSection from "./ParallaxSection";
import AnimatedArrow from "./AnimatedArrow"; // Import the new component

const cardData = [
  {
    title: "Understanding Clinical Oncology",
    content:
      "Clinical oncology is a medical specialty focused on treating cancer using non-surgical methods, primarily radiotherapy and systemic therapies like chemotherapy. It involves the use of radiation and drugs to target and destroy cancer cells, aiming to halt or eliminate the disease.",
    image: "/1.jpg",
  },
  {
    title: "Screening & Early Detection",
    content:
      "Cancer screening and early detection involve using tests to find cancer in people who don't yet have symptoms, with the goal of increasing chances of successful treatment. Early detection is crucial because treatment is often more effective when cancer is found in its early stages.",
    image: "/2.jpg",
  },
  {
    title: "Diagnosis & Staging",
    content:
      "In oncology, diagnosis and staging are crucial processes that help determine the presence of cancer and its extent, guiding treatment decisions and prognosis. Diagnosis involves identifying cancer cells through various tests, while staging describes the cancer's spread.",
    image: "/3.jpg",
  },
  {
    title: "Treatment",
    content:
      "Clinical oncology focuses on treating cancer with therapies that are not surgical, including chemotherapy, radiation therapy, and newer approaches like immunotherapy and targeted therapy. These treatments are often used in conjunction with surgery or as the primary treatment for certain cancers.",
    image: "/4.jpg",
  },
];

const Info = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timelines = useRef<gsap.core.Timeline[]>([]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const cards = Array.from(containerRef.current.children) as HTMLDivElement[];

    const ctx = gsap.context(() => {
      timelines.current = [];
      cards.forEach((card) => {
        const image = card.querySelector(".card-image");
        const overlay = card.querySelector(".card-overlay");
        const title = card.querySelector(".card-title");
        const number = card.querySelector(".card-number");
        const content = card.querySelector(".card-content");
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
          .to(
            content,
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
            "<"
          );
        timelines.current.push(tl);
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    timelines.current.forEach((tl, index) => {
      if (index === hoveredIndex) {
        tl.play();
      } else {
        tl.reverse();
      }
    });
  }, [hoveredIndex]);

  return (
    <ParallaxSection imgAlt="Oncology in Cancer Care" imgSpeed={0.2} id="info">
      <div className="flex flex-col">
        <div className="bg-[#401d01]">
          <div className="container mx-auto px-6 text-center py-24">
            <h1 className="text-4xl md:text-6xl font-bold font-braven text-white">
              The Role of Oncology in Cancer Care
            </h1>
            <p className="mt-4 text-lg text-shadow-white max-w-2xl mx-auto font-raleway">
              Oncology focuses on the entire spectrum of cancer care, from
              initial diagnosis through treatment, survivorship, and palliative
              care.
            </p>
          </div>
        </div>

        <div className="relative w-full lg:h-screen">
          <div
            ref={containerRef}
            className="flex flex-col lg:flex-row w-full h-full"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {cardData.map((card, index) => (
              <div
                key={card.title}
                onMouseEnter={() => setHoveredIndex(index)}
                className="card relative flex flex-col lg:w-1/4 text-left bg-[#e0c7ae] min-h-[500px] lg:min-h-0 cursor-pointer overflow-hidden border-b lg:border-b-0 lg:border-r last:border-r-0 border-gray-200/50"
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="card-image object-cover"
                  style={{ clipPath: "circle(0% at 100% 100%)" }}
                />
                <div className="card-overlay absolute inset-0 bg-black opacity-0 pointer-events-none"></div>

                <div className="relative z-10 p-8 flex flex-col flex-grow h-full">
                  <div>
                    <div className="card-number text-5xl font-light text-[#401d01] font-braven">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <h3 className="card-title mt-4 text-2xl font-bold tracking-tight text-gray-800 font-braven">
                      {card.title}
                    </h3>
                  </div>
                  <p className="card-content absolute bottom-8 left-8 right-8 text-base text-gray-600 font-raleway opacity-0 transform translate-y-4">
                    {card.content}
                  </p>
                </div>
                {/* Add the animated arrow, visible when the card is not hovered */}
                <AnimatedArrow isVisible={hoveredIndex !== index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ParallaxSection>
  );
};

export default Info;
