"use client";

import React, { useState, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { FaArrowRight } from "react-icons/fa";
import ParallaxSection from "./ParallaxSection";

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
      "Clinical oncology focuses on treating cancer with therapies that are not surgical, including chemotherapy, radiation therapy, and newer approaches like immunotherapy and targeted therapy. These treatments are often used in conjunction with surgery or as the primary treatment for certain cancers. Clinical oncologists work with other specialists to develop and implement comprehensive cancer treatment plans.",
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
    <ParallaxSection imgAlt="Oncology in Cancer Care" imgSpeed={0.2} id="info">
      <div className="flex flex-col min-h-screen">
        <div className="bg-[#401d01]">
          <div className="container mx-auto px-6 text-center py-24">
            <h1 className="text-4xl md:text-6xl font-bold font-braven text-white">
              The Role of Oncology in Cancer Care
            </h1>
            <p className="mt-4 text-lg text-shadow-white max-w-2xl mx-auto font-raleway">
              Oncology focuses on the entire spectrum of cancer care, from initial diagnosis through treatment, survivorship, and palliative care.
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
