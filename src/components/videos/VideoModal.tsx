"use client";

import React, { FC, memo, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { IoClose } from "react-icons/io5";
import { Video } from "./data";

interface VideoModalProps {
  video: Video;
  onClose: () => void;
}

const VideoModal: FC<VideoModalProps> = ({ video, onClose }) => {
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

export default memo(VideoModal);
