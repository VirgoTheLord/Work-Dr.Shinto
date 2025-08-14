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
      className="video-card pointer-events-auto w-full h-full flex items-center justify-center md:cursor-none overflow-hidden"
    >
      <div className={`w-full h-full absolute inset-0 ${video.bgColor}`} />
      {/* Add the new 'video-thumbnail-area' class here */}
      <div className="video-thumbnail-area relative w-11/12 md:w-9/12 lg:w-7/12 aspect-video rounded-2xl overflow-hidden shadow-xl group">
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

export default memo(VideoCard);
