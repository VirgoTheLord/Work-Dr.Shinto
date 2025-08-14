"use client";

import React, { FC, RefObject } from "react";
import { FaPlay } from "react-icons/fa";

interface CustomCursorProps {
  cursorRef: RefObject<HTMLDivElement | null>;
  iconRef: RefObject<HTMLDivElement | null>;
  textRef: RefObject<HTMLDivElement | null>;
}

const CustomCursor: FC<CustomCursorProps> = ({
  cursorRef,
  iconRef,
  textRef,
}) => {
  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[100] bg-white backdrop-blur-sm pointer-events-none flex items-center justify-center overflow-hidden"
    >
      <div ref={iconRef} className="absolute">
        <FaPlay className="text-black text-xl" />
      </div>
      <div
        ref={textRef}
        className="absolute text-xl font-bold tracking-widest text-black font-braven"
      >
        PLAY
      </div>
    </div>
  );
};

export default CustomCursor;
