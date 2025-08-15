"use client";

import React, { useState, useRef, useLayoutEffect, FC } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { videos, Video } from "./data";
import VideoCard from "./VideoCard";
import VideoModal from "./VideoModal";
import CustomCursor from "./CustomCursor";

gsap.registerPlugin(ScrollTrigger);

const VideosSection: FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const cursorIconRef = useRef<HTMLDivElement | null>(null);
  const cursorTextRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".video-card");
      gsap.set(cards[0], { yPercent: 30, scale: 0.8, borderRadius: "20vh" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          end: () => "+=" + section.offsetHeight * (cards.length - 1),
        },
        defaults: { ease: "power1.inOut", duration: 1 },
      });

      tl.to(cards[0], {
        yPercent: 0,
        scale: 1,
        borderRadius: "0vh",
        duration: 0.5,
      });

      cards.forEach((card, index) => {
        if (index > 0) {
          tl.fromTo(
            card,
            { yPercent: 100, scale: 0.8, borderRadius: "20vh" },
            { yPercent: 0, scale: 1, borderRadius: "0vh" }
          ).to(cards[index - 1], { scale: 0.95, opacity: 0.6 }, "<");
        }
      });
    }, section);

    const mm = gsap.matchMedia();
    mm.add("(pointer: fine)", () => {
      const moveCursor = (e: MouseEvent) =>
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.5,
          ease: "power3.out",
        });
      const onEnterSection = () =>
        gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.3 });
      const onLeaveSection = () =>
        gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.3 });

      const onHover = (e: MouseEvent) => {
        const isOverVideo = (e.target as HTMLElement).closest(
          ".video-thumbnail-area"
        );
        const isOverCard = (e.target as HTMLElement).closest(".video-card");
        const autoOverwrite = {
          overwrite: "auto" as const,
          duration: 0.3,
          ease: "power2.out",
        };

        if (isOverVideo) {
          gsap.to(cursorRef.current, {
            width: "160px",
            height: "56px",
            borderRadius: "16px",
            ...autoOverwrite,
          });
          gsap.to(cursorIconRef.current, {
            x: -40,
            opacity: 1,
            ...autoOverwrite,
          });
          gsap.to(cursorTextRef.current, {
            x: 25,
            opacity: 1,
            ...autoOverwrite,
          });
        } else if (isOverCard) {
          gsap.to(cursorRef.current, {
            width: "56px",
            height: "56px",
            borderRadius: "999px",
            ...autoOverwrite,
          });
          gsap.to(cursorIconRef.current, {
            x: 0,
            opacity: 1,
            ...autoOverwrite,
          });
          gsap.to(cursorTextRef.current, {
            x: 0,
            opacity: 0,
            ...autoOverwrite,
          });
        } else {
          gsap.to(cursorRef.current, {
            width: "24px",
            height: "24px",
            borderRadius: "999px",
            ...autoOverwrite,
          });
          gsap.to(cursorIconRef.current, {
            x: 0,
            opacity: 0,
            ...autoOverwrite,
          });
          gsap.to(cursorTextRef.current, {
            x: 0,
            opacity: 0,
            ...autoOverwrite,
          });
        }
      };

      gsap.set(cursorRef.current, {
        scale: 0,
        opacity: 0,
        xPercent: -50,
        yPercent: -50,
        width: "24px",
        height: "24px",
        borderRadius: "999px",
      });
      gsap.set(cursorIconRef.current, { x: 0, opacity: 0 });
      gsap.set(cursorTextRef.current, { x: 0, opacity: 0 });

      section.addEventListener("mousemove", moveCursor);
      section.addEventListener("mouseenter", onEnterSection);
      section.addEventListener("mouseleave", onLeaveSection);
      section.addEventListener("mousemove", onHover);

      return () => {
        section.removeEventListener("mousemove", moveCursor);
        section.removeEventListener("mouseenter", onEnterSection);
        section.removeEventListener("mouseleave", onLeaveSection);
        section.removeEventListener("mousemove", onHover);
      };
    });

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  useLayoutEffect(() => {
    if (selectedVideo) {
      gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.3 });
    }
  }, [selectedVideo]);

  return (
    <>
      <div
        ref={sectionRef}
        className="relative w-full h-screen overflow-hidden md:cursor-none"
      >
        {videos.map((video) => (
          <div
            key={video.id}
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            <VideoCard video={video} onSelect={setSelectedVideo} />
          </div>
        ))}
      </div>
      <div className="h-6 bg-[#401d01]" />

      <CustomCursor
        cursorRef={cursorRef}
        iconRef={cursorIconRef}
        textRef={cursorTextRef}
      />

      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </>
  );
};

export default VideosSection;
