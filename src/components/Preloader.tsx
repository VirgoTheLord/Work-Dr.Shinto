// components/Preloader.tsx
import React from "react";

const Preloader: React.FC = () => {
  return (
    <div
      id="preloader"
      className="fixed inset-0 z-[100] flex items-start justify-start bg-[#F5EFE6] text-6xl md:text-8xl lg:text-9xl font-bold uppercase"
    >
      <div className="relative m-4 md:m-8 overflow-hidden">
        {/* The light brown "base" text */}
        <p id="preloader-text-base" className="font-braven text-[#D7C8B6]">
          Loading...
        </p>
        {/* The dark brown "fill" text, which will be revealed */}
        <p
          id="preloader-text-fill"
          className="absolute top-0 left-0 text-[#4A403A] font-braven"
          aria-hidden="true"
        >
          Loading...
        </p>
      </div>

      {/* UPDATED: Larger percentage counter */}
      <div
        id="preloader-percent"
        className="absolute bottom-0 right-0 m-4 md:m-8 text-5xl md:text-8xl text-[#4A403A] font-braven"
      >
        0%
      </div>
    </div>
  );
};

export default Preloader;
