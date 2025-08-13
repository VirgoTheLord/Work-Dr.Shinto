// components/Info.jsx

"use client";

import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { FaArrowRight } from "react-icons/fa";
import ParallaxSection from "./ParallaxSection"; // Import the new components

const cardData = [
  {
    title: "Understanding Radiology",
    content:
      "Radiology uses medical imaging technologies like X-rays, CT scans, MRIs, and ultrasound to diagnose and treat diseases. It is a fundamental part of modern medicine, providing detailed views inside the human body.",
  },
  {
    title: "Screening & Early Detection",
    content:
      "Utilizing advanced imaging like mammography, low-dose CT, and ultrasound allows us to detect cancers at their earliest, most treatable stages, often before symptoms even develop. This proactive approach is fundamental to improving patient outcomes.",
  },
  {
    title: "Diagnosis & Staging",
    content:
      "When a concern arises, precision is key. CT, MRI, and PET-CT scans provide a detailed roadmap, helping us clarify the cancer's type, size, location, and stage, which is absolutely critical for creating an effective, personalized treatment plan.",
  },
  {
    title: "Treatment Guidance",
    content:
      "Modern radiology is not just for diagnosis; it's an active part of treatment. We use imaging to guide precise, minimally invasive procedures like targeted biopsies, tumor ablations, and the placement of treatment ports, minimizing impact on the patient.",
  },
];

const Info = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = Array.from(containerRef.current.children) as HTMLDivElement[];

    cards.forEach((card, index) => {
      const title = card.querySelector(".card-title");
      const content = card.querySelector(".card-content");
      const arrow = card.querySelector(".card-arrow");

      gsap.killTweensOf([title, content, arrow]);

      if (activeIndex !== null) {
        if (index === activeIndex) {
          gsap.to(title, { opacity: 1, duration: 0.4, delay: 0.2 });
          gsap.to(content, { opacity: 1, y: 0, duration: 0.4, delay: 0.2 });
          gsap.to(arrow, { autoAlpha: 0, x: 10, duration: 0.3 });
        } else {
          gsap.to(title, { opacity: 0, duration: 0.3 });
          gsap.to(content, { opacity: 0, y: 15, duration: 0.3 });
          gsap.to(arrow, { autoAlpha: 0, x: -20, duration: 0.3 });
        }
      } else {
        gsap.to(title, { opacity: 1, duration: 0.4, delay: 0.1 });
        gsap.to(content, { opacity: 0, y: 15, duration: 0.3 });
        gsap.to(arrow, { autoAlpha: 1, x: 0, duration: 0.4, delay: 0.1 });
      }
    });
  }, [activeIndex]);

  const getCardState = (index: number) => {
    if (activeIndex === null) return "default";
    return activeIndex === index ? "expanded" : "collapsed";
  };

  const handleCardClick = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <ParallaxSection
      imgSrc="/2.jpg"
      imgAlt="Radiology in Cancer Care"
      imgSpeed={0.2}
      id="info-section"
    >
      <div className="bg-gray-100/70 backdrop-blur-md flex flex-col min-h-screen font-sans relative">
        <div className="container mx-auto px-6 text-center pt-24">
          <h1 className="text-4xl md:text-6xl font-bold font-braven text-black">
            The Role of Radiology in Cancer Care
          </h1>
          <p className="mt-4 text-lg text-gray-800 max-w-2xl mx-auto pb-20 font-raleway">
            From early detection to post-treatment follow-up, medical imaging is
            an essential partner in the fight against cancer.
          </p>
        </div>

        {/* This container now has a dynamic height on mobile */}
        <div className="relative z-10 w-full lg:h-screen overflow-hidden">
          <div
            ref={containerRef}
            // Mobile: flex-col, Desktop: flex-row
            className="flex flex-col lg:flex-row w-full h-full"
            // Reset state on a larger screen if the mouse leaves the container
            onMouseLeave={() => setActiveIndex(null)}
          >
            {cardData.map((card, index) => (
              <div
                key={card.title}
                onClick={() => handleCardClick(index)}
                className="card relative flex flex-col text-left bg-white bg-opacity-80 backdrop-blur-sm p-10 cursor-pointer
                           border-b last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0 border-gray-200
                           transition-[flex] duration-700 ease-in-out h-full
                           // Mobile: default flex is 0.25 to make them smaller
                           flex-[0.25_1_0%]
                           // Responsive: On large screens, use the horizontal flex values
                           lg:data-[state=default]:flex-[1_1_0%]
                           lg:data-[state=expanded]:flex-[3.5_1_0%]
                           lg:data-[state=collapsed]:flex-[0.6_1_0%]
                           // Mobile: On click, expand vertically
                           data-[state=expanded]:flex-[2_1_0%]
                           data-[state=collapsed]:flex-[0.25_1_0%]"
                data-state={getCardState(index)}
              >
                <div>
                  <div className="text-7xl lg:text-9xl font-light text-gray-900 font-braven opacity-20 py-4">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="card-title mt-4 text-2xl lg:text-3xl font-bold tracking-tight text-gray-800 font-braven py-4">
                    {card.title}
                  </h3>
                </div>

                <div className="flex-grow flex flex-col justify-end">
                  <p className="card-content text-base lg:text-md text-gray-600 font-raleway">
                    {card.content}
                  </p>
                  <div className="card-arrow absolute bottom-10 right-10 text-gray-400 text-3xl">
                    <FaArrowRight />
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
