// components/Info.jsx

"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image"; // ✅ Using the Next.js Image component
import {
  FaSearchPlus,
  FaNotesMedical,
  FaStethoscope,
  FaHeartbeat,
} from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cardData = [
  {
    title: "Screening & Early Detection",
    content:
      "Utilizing advanced imaging like mammography, low-dose CT, and ultrasound allows us to detect cancers at their earliest, most treatable stages, often before symptoms even develop. This proactive approach is fundamental to improving patient outcomes.",
    icon: FaSearchPlus,
    accentColor: "text-amber-600",
    image: "/3.jpg",
  },
  {
    title: "Diagnosis & Staging",
    content:
      "When a concern arises, precision is key. CT, MRI, and PET-CT scans provide a detailed roadmap, helping us clarify the cancer's type, size, location, and stage, which is absolutely critical for creating an effective, personalized treatment plan.",
    icon: FaNotesMedical,
    accentColor: "text-amber-700",
    image: "/2.jpg",
  },
  {
    title: "Treatment Guidance",
    content:
      "Modern radiology is not just for diagnosis; it's an active part of treatment. We use imaging to guide precise, minimally invasive procedures like targeted biopsies, tumor ablations, and the placement of treatment ports, minimizing impact on the patient.",
    icon: FaStethoscope,
    accentColor: "text-amber-800",
    image: "/4.jpg",
  },
  {
    title: "Monitoring & Follow-Up",
    content:
      "A patient's journey continues after treatment. We use regular follow-up imaging to carefully monitor the response to therapy, ensure the cancer has not returned, and provide peace of mind for both the patient and their care team.",
    icon: FaHeartbeat,
    accentColor: "text-amber-900",
    image: "/3.jpg",
  },
];

const Info = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current;
      const horizontalScroll = gsap.to(cards, {
        xPercent: -100 * (cards.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: "+=3000",
        },
      });

      cards.forEach((card) => {
        if (card) {
          // This animation will not work with the `Image` component.
          // For this effect, you would need to wrap the `Image` component
          // in a standard div and apply the animation to the wrapper.
          // Example: gsap.to(card.querySelector(".image-wrapper"), ...);
          //
          // For now, it will apply to the direct `<img>` tag rendered by Next.js.
          gsap.to(card.querySelector("img"), {
            x: "random(-100, 100)",
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalScroll,
              scrub: true,
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-black">
      {/* This header is now a static element, not pinned by GSAP */}
      <div className="text-center px-6 pt-24 pb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-braven text-white">
          Cancer and Radiology
        </h1>
        <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
          Clear, patient-friendly information on how imaging supports cancer
          prevention, diagnosis, and treatment.
        </p>
      </div>

      <div ref={containerRef} className="w-full h-screen relative">
        <div className="w-[400%] h-full flex flex-row flex-nowrap items-center p-8 gap-12">
          {cardData.map((card, index) => (
            <div
              key={card.title}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="flex-shrink-0 w-[80vw] md:w-[60vw] max-w-2xl h-[80vh] bg-white rounded-3xl shadow-2xl overflow-hidden ring-1 ring-stone-200"
            >
              <div className="relative h-1/2 overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-8 h-1/2 flex flex-col justify-between">
                <div>
                  <h3
                    className={`font-semibold font-braven text-3xl mb-4 ${card.accentColor}`}
                  >
                    {card.title}
                  </h3>
                  <p className="text-stone-600 font-raleway leading-relaxed text-lg">
                    {card.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Info;
