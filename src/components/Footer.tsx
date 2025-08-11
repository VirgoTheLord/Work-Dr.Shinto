"use client";

import React from "react";
import { FiArrowUp, FiArrowRight } from "react-icons/fi";

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const PillHeading: React.FC<{ title: string }> = ({ title }) => (
    <div className="mb-4">
      <span className="inline-block border-2 border-white/40 rounded-full px-3 py-1 text-xs font-medium text-white/60 hover:text-black hover:bg-white/90 transition-all duration-300 ease-in-out">
        {title}
      </span>
    </div>
  );

  const AnimatedLink: React.FC<{ href: string; children: React.ReactNode }> = ({
    href,
    children,
  }) => (
    <a
      href={href}
      className="group flex items-center relative text-white/60 hover:text-white transition-colors duration-300"
    >
      <span className="absolute left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -rotate-45">
        <FiArrowRight />
      </span>
      <span className="pl-0 group-hover:pl-4 transition-all duration-300">
        {children}
      </span>
    </a>
  );

  return (
    <footer className="bg-neutral-900 text-white font-sans relative pt-16 pb-28 lg:py-8 overflow-x-hidden">
      <div className="max-w-full px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-12">
          <div className="lg:col-start-1 lg:col-span-7">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-medium font-braven leading-none">
              Dr. Shinto.
            </h1>
            <p className="mt-10 text-md text-white/80 max-w-md">
              Agency for purpose-driven design and communication.
            </p>
          </div>

          <div className="lg:col-start-8 lg:col-span-2">
            <PillHeading title="Contact" />
            <address className="not-italic text-white/90 text-md pb-5">
              Dr. Shinto Rajappan
              <br />
              Kerala,
              <br />
              India
            </address>
            <AnimatedLink href="#">7073468097467</AnimatedLink>
            <AnimatedLink href="#">jisdf.shinto.com</AnimatedLink>
          </div>

          <div className="lg:col-start-10 lg:col-span-3">
            <PillHeading title="Links" />
            <ul className="space-y-2 text-sm">
              <li>
                <AnimatedLink href="#">Instagram</AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="#">LinkedIn</AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="#">Twitter</AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="#">GitHub</AnimatedLink>
              </li>
            </ul>
            <ul className="space-y-2 mt-4 text-sm md:mb-10">
              <li>
                <AnimatedLink href="#">Legal</AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="#">Privacy</AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="#">Terms</AnimatedLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="absolute bottom-8 left-0 right-0">
          <div className="max-w-full mx-auto flex justify-end items-center px-6 md:px-10">
            <button
              onClick={scrollToTop}
              className="group h-12 w-12 flex items-center justify-center bg-transparent hover:bg-white border border-gray-700 hover:border-white rounded-full transition-all duration-300 ease-in-out"
              aria-label="Back to top"
            >
              <FiArrowUp className="h-6 w-6 text-gray-400 group-hover:text-black transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
