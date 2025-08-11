import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-start px-6 md:px-10 pt-20 pb-32 sm:py-20 overflow-x-hidden">
      <div>
        <p className="text-xs sm:text-sm uppercase tracking-widest text-white/60">
          Creative Developer & Designer
        </p>
        <h1 className="font-braven text-6xl sm:text-7xl md:text-8xl lg:text-[9vw] leading-tight mt-2">
          Dr. Shinto Rajappan.
        </h1>
        <p className="mt-4 text-base md:text-lg text-white/80">
          Freelance • Kerala, India
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="#contact"
            className="inline-flex items-center rounded-full bg-white text-black px-5 py-2 text-xs sm:text-sm font-medium transition hover:opacity-90"
          >
            Book a Consult
          </Link>
          <Link
            href="#videos"
            className="inline-flex items-center rounded-full border border-white/30 text-white px-5 py-2 text-xs sm:text-sm font-medium hover:bg-white/10"
          >
            Watch Videos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
