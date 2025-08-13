"use client";

import React, { useState, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { FaPlay } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

// Placeholder data for the videos
const videos = [
  {
    id: "dQw4w9WgXcQ", // Example YouTube Video ID
    title: "Understanding MRI: A Patient's Guide",
  },
  {
    id: "3tmd-ClpJxA", // Example YouTube Video ID
    title: "What to Expect During a CT Scan",
  },
  {
    id: "u9Mv93G_gVE", // Example YouTube Video ID
    title: "The Role of PET-CT in Cancer Staging",
  },
];

// VideoCard now uses simple CSS transitions for the hover effect.
type VideoCardProps = {
  video: Video;
  onSelect: (video: Video) => void;
};

const VideoCard: React.FC<VideoCardProps> = ({ video, onSelect }) => {
  const thumbnailUrl = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;

  return (
    <div
      onClick={() => onSelect(video)}
      className="group relative cursor-pointer rounded-lg overflow-hidden border border-white/10 transition-transform duration-300 ease-out hover:scale-105 hover:-translate-y-2"
    >
      <img
        src={thumbnailUrl}
        alt={video.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
          <FaPlay className="text-white text-2xl" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 p-4">
        <h3 className="font-medium text-white/95 text-base">{video.title}</h3>
      </div>
    </div>
  );
};

type Video = {
  id: string;
  title: string;
};

const Videos = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  // Refs for GSAP to target the modal elements
  const modalRef = useRef(null);
  const modalBackdropRef = useRef(null);
  const modalContentRef = useRef(null);

  // This effect handles the "enter" animation when a video is selected.
  useLayoutEffect(() => {
    if (selectedVideo) {
      gsap
        .timeline()
        .to(modalBackdropRef.current, { opacity: 1, duration: 0.3 })
        .to(
          modalContentRef.current,
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "power3.out",
          },
          "-=0.2"
        );
    }
  }, [selectedVideo]);

  // This function handles the "exit" animation.
  // It runs the animation first, then sets the state to null on completion.
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
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-black/95 text-white py-20 px-6 md:px-10 overflow-x-hidden">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-braven">Videos</h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            Short, helpful explanations and patient education.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onSelect={setSelectedVideo}
            />
          ))}
        </div>
      </div>

      {/* Modal for playing the selected video */}
      {selectedVideo && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div
            ref={modalBackdropRef}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            style={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Content */}
          <div
            ref={modalContentRef}
            className="relative w-full max-w-3xl aspect-video rounded-lg overflow-hidden shadow-2xl"
            style={{ opacity: 0 }} // Initial state for GSAP
          >
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
              title={selectedVideo.title}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
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
    </div>
  );
};

export default Videos;
