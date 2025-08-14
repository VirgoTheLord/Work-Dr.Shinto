"use client";

import React, { FC, memo } from "react";
import { Video } from "./data";

interface VideoCardProps {
  video: Video;
  onSelect: (video: Video) => void;
}

const VideoCard: FC<VideoCardProps> = ({ video, onSelect }) => {
  const thumbnailUrl = `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`;

  return (
    <div
      onClick={() => onSelect(video)}
      role="button"
      tabIndex={0}
      aria-label={`Select video: ${video.title}`}
      className="video-card pointer-events-auto w-full h-full flex items-center justify-center md:cursor-none overflow-hidden"
    >
      {/* Background Layer */}
      <div className={`w-full h-full absolute inset-0 ${video.bgColor}`} />

      {/* Content Layer (with z-index fix) */}
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full max-w-6xl px-8">
        <div className="w-full md:w-5/12 text-center md:text-left">
          <h3
            className={`text-3xl lg:text-5xl font-bold font-braven ${video.textColor}`}
          >
            {video.title}
          </h3>
          <p
            className={`mt-4 text-base lg:text-md max-w-md mx-auto md:mx-0 font-raleway ${video.descriptionColor}`}
          >
            {video.description}
          </p>
        </div>

        <div className="w-full md:w-7/12">
          <div className="video-thumbnail-area relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl group">
            <img
              src={thumbnailUrl}
              alt={video.title}
              onError={(e) => {
                e.currentTarget.src = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
              }}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(VideoCard);
