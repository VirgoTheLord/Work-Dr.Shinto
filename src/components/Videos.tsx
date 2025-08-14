"use client";

import React, { useState, useRef, useLayoutEffect, FC } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IoClose } from "react-icons/io5";

gsap.registerPlugin(ScrollTrigger);

// --- Type Definitions ---
interface Video {
  id: string;
  title: string;
  description: string;
  bgColor: string;
}

// --- Data (New White & Light Brown Palette) ---
const videos: Video[] = [
  {
    id: "Jk7wD_gb_Xg",
    title: "Understanding MRI: A Patient's Guide",
    description:
      "A comprehensive look into the MRI procedure, helping you prepare for your scan with confidence.",
    bgColor: "bg-white",
  },
  {
    id: "eFjJ39a4n4Q",
    title: "What to Expect During a CT Scan",
    description:
      "This guide demystifies the CT scan process, from arrival to completion, ensuring you know what to expect.",
    bgColor: "bg-stone-100",
  },
  {
    id: "pGncmT3P0uI",
    title: "The Role of PET-CT in Cancer Staging",
    description:
      "Explore how advanced PET-CT imaging plays a crucial role in accurately staging and managing cancer.",
    bgColor: "bg-orange-100",
  },
  {
    id: "BeygJK_92Ak",
    title: "Introduction to Ultrasound Imaging",
    description:
      "Learn the basics of ultrasound technology and its safe, non-invasive applications in medical diagnostics.",
    bgColor: "bg-amber-100",
  },
];

// --- Sub-Components ---
const VideoCard: FC<{ video: Video; onSelect: (video: Video) => void }> = ({
  video,
  onSelect,
}) => {
  const thumbnailUrl = `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`;
  return (
    // The cursor is now only hidden on medium screens and up
    <div
      onClick={() => onSelect(video)}
      className={`video-card pointer-events-auto w-full h-full flex items-center justify-center md:cursor-none overflow-hidden`}
    >
      <div className={`w-full h-full absolute inset-0 ${video.bgColor}`} />
      <div className="relative w-11/12 md:w-9/12 lg:w-7/12 aspect-video rounded-2xl overflow-hidden shadow-xl group">
        <img
          src={thumbnailUrl}
          alt={video.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
        <div className="relative h-full flex flex-col justify-end p-6 md:p-10 text-white">
          <h3 className="text-xl md:text-3xl font-bold text-shadow-md">
            {video.title}
          </h3>
          <p className="mt-2 text-sm md:text-base text-white/90 max-w-2xl text-shadow">
            {video.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const VideoModal: FC<{ video: Video; onClose: () => void }> = ({
  video,
  onClose,
}) => {
  const modalBackdropRef = useRef<HTMLDivElement | null>(null);
  const modalContentRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    gsap
      .timeline()
      .to(modalBackdropRef.current, { opacity: 1, duration: 0.3 })
      .to(
        modalContentRef.current,
        { y: 0, scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" },
        "-=0.2"
      );
  }, []);

  const handleClose = () => {
    gsap
      .timeline({ onComplete: onClose })
      .to(modalContentRef.current, {
        y: 50,
        scale: 0.95,
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
      })
      .to(modalBackdropRef.current, { opacity: 0, duration: 0.3 }, "<");
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div
        ref={modalBackdropRef}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        style={{ opacity: 0 }}
        onClick={handleClose}
      />
      <div
        ref={modalContentRef}
        className="relative w-full max-w-4xl aspect-video rounded-lg overflow-hidden shadow-2xl"
        style={{ opacity: 0, scale: 0.95, transform: "translateY(50px)" }}
      >
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
        <button
          onClick={handleClose}
          className="absolute top-[-40px] right-0 text-white/70 hover:text-white transition-colors"
          aria-label="Close video"
        >
          <IoClose size={32} />
        </button>
      </div>
    </div>
  );
};

// --- Main Component ---
const VideosSection: FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const cursorIconRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const cursor = cursorRef.current;
    if (!section || !cursor) return;

    // Only run cursor logic on non-touch devices
    const mm = gsap.matchMedia();
    mm.add("(pointer: fine)", () => {
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

      const moveCursor = (e: MouseEvent) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.5,
          ease: "power3.out",
        });
      };
      const onEnterSection = () => {
        gsap.to(cursor, { scale: 0.2, opacity: 1, duration: 0.3 });
      };
      const onLeaveSection = () => {
        gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.3 });
      };
      const onHoverCard = (e: MouseEvent) => {
        if ((e.target as HTMLElement).closest(".video-card")) {
          gsap.to(cursor, { scale: 1, duration: 0.3 });
          gsap.to(cursorIconRef.current, {
            scale: 1,
            opacity: 1,
            duration: 0.3,
          });
        } else {
          gsap.to(cursor, { scale: 0.2, duration: 0.3 });
          gsap.to(cursorIconRef.current, {
            scale: 0,
            opacity: 0,
            duration: 0.3,
          });
        }
      };

      gsap.set(cursor, { scale: 0, opacity: 0, xPercent: -50, yPercent: -50 });
      gsap.set(cursorIconRef.current, { scale: 0, opacity: 0 });

      section.addEventListener("mousemove", moveCursor);
      section.addEventListener("mouseenter", onEnterSection);
      section.addEventListener("mouseleave", onLeaveSection);
      section.addEventListener("mouseover", onHoverCard);

      return () => {
        ctx.revert();
        section.removeEventListener("mousemove", moveCursor);
        section.removeEventListener("mouseenter", onEnterSection);
        section.removeEventListener("mouseleave", onLeaveSection);
        section.removeEventListener("mouseover", onHoverCard);
      };
    });

    return () => mm.revert();
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

      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[100] w-20 h-20 rounded-full bg-white pointer-events-none mix-blend-difference flex items-center justify-center"
      >
        <div ref={cursorIconRef}>
          <svg
            className="w-6 h-6 text-black"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
        </div>
      </div>

      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </>
  );
};

// --- App Entry Point ---
const App = () => {
  return (
    <main className="bg-gray-50 text-stone-800">
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl md:text-7xl font-bold mb-4 font-braven">
          Our Video Guides
        </h2>
        <p className="text-lg md:text-lg text-stone-700 max-w-3xl mx-auto font-raleway">
          We've prepared these short guides to help you understand our imaging
          procedures better.
        </p>
      </div>
      <VideosSection />
    </main>
  );
};

export default App;
