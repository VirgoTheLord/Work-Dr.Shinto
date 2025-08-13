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
  bgColor: string;
}

interface VideoCardProps {
  video: Video;
  onSelect: (video: Video) => void;
}

// --- Data ---
const videos: Video[] = [
  {
    id: "dQw4w9WgXcQ",
    title: "Understanding MRI: A Patient's Guide",
    bgColor: "bg-sky-900",
  },
  {
    id: "3tmd-ClpJxA",
    title: "What to Expect During a CT Scan",
    bgColor: "bg-teal-900",
  },
  {
    id: "u9Mv93G_gVE",
    title: "The Role of PET-CT in Cancer Staging",
    bgColor: "bg-indigo-900",
  },
];

// --- Components ---
const VideoCard: FC<VideoCardProps> = ({ video, onSelect }) => {
  const thumbnailUrl = `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`;
  return (
    <div
      onClick={() => onSelect(video)}
      className={`video-card w-full h-full flex items-center justify-center cursor-pointer ${video.bgColor}`}
    >
      <div className="relative w-10/12 md:w-8/12 lg:w-6/12 aspect-video rounded-2xl overflow-hidden shadow-2xl">
        <img
          src={thumbnailUrl}
          alt={video.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative h-full flex flex-col justify-end p-8 text-white">
          <h3 className="text-2xl md:text-4xl font-bold font-braven">
            {video.title}
          </h3>
        </div>
      </div>
    </div>
  );
};

const Videos: FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const modalBackdropRef = useRef<HTMLDivElement | null>(null);
  const modalContentRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const cursor = cursorRef.current;
    if (!section || !cursor) return;

    const cards = gsap.utils.toArray<HTMLElement>(".video-card");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        end: () => "+=" + section.offsetHeight * (cards.length - 1),
      },
      defaults: { ease: "none", duration: 1 },
    });

    if (cards.length > 1) {
      tl.fromTo(
        cards[1] as HTMLElement,
        { yPercent: 100 },
        { yPercent: 0 }
      ).fromTo(
        cards[0] as HTMLElement,
        { scale: 1 },
        { scale: 0.9, opacity: 0.5 },
        "<"
      );
    }
    if (cards.length > 2) {
      tl.fromTo(
        cards[2] as HTMLElement,
        { yPercent: 100 },
        { yPercent: 0 }
      ).fromTo(
        cards[1] as HTMLElement,
        { scale: 1 },
        { scale: 0.9, opacity: 0.5 },
        "<"
      );
    }

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power3.out",
      });
    };

    const onMouseEnter = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(".video-card")) {
        document.body.style.cursor = "none";
        gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
      }
    };

    const onMouseLeave = () => {
      document.body.style.cursor = "auto";
      gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.3 });
    };

    section.addEventListener("mousemove", moveCursor);
    section.addEventListener("mouseenter", onMouseEnter);
    section.addEventListener("mouseleave", onMouseLeave);

    return () => {
      section.removeEventListener("mousemove", moveCursor);
      section.removeEventListener("mouseenter", onMouseEnter);
      section.removeEventListener("mouseleave", onMouseLeave);
      ScrollTrigger.killAll();
    };
  }, []);

  useLayoutEffect(() => {
    if (selectedVideo) {
      document.body.style.cursor = "auto";
      gsap.set(cursorRef.current, { scale: 0, opacity: 0 });
      gsap
        .timeline()
        .to(modalBackdropRef.current, { opacity: 1, duration: 0.3 })
        .to(
          modalContentRef.current,
          { y: 0, scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" },
          "-=0.2"
        );
    }
  }, [selectedVideo]);

  const handleClose = () => {
    gsap
      .timeline({
        onComplete: () => setSelectedVideo(null),
      })
      .to(modalContentRef.current, {
        y: 50,
        scale: 0.9,
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
      })
      .to(modalBackdropRef.current, { opacity: 0, duration: 0.3 }, "<");
  };

  return (
    <>
      <div
        ref={sectionRef}
        className="relative w-full h-screen overflow-hidden"
      >
        {videos.map((video) => (
          <div key={video.id} className="absolute inset-0 w-full h-full">
            <VideoCard video={video} onSelect={setSelectedVideo} />
          </div>
        ))}
      </div>

      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[100] w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center font-semibold text-white pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{ opacity: 0, scale: 0 }}
      >
        Play
      </div>

      {selectedVideo && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        >
          <div
            ref={modalBackdropRef}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            style={{ opacity: 0 }}
            onClick={handleClose}
          />
          <div
            ref={modalContentRef}
            className="relative w-full max-w-3xl aspect-video rounded-lg overflow-hidden shadow-2xl"
            style={{ opacity: 0, scale: 0.9, transform: "translateY(50px)" }}
          >
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
              title={selectedVideo.title}
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
      )}
    </>
  );
};

export default Videos;
