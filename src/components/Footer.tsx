"use client";

import React from "react";
import { FiMail, FiPhone, FiArrowUp } from "react-icons/fi";

const Footer = () => {
  const handleBackToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="h-full w-full bg-[#401d01] text-[#F8F5F2] flex items-center justify-center p-8">
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <h2 className="font-braven text-5xl md:text-6xl">Dr. Shinto</h2>
          <p className="font-raleway text-md opacity-70 mt-2">
            Committed to providing expert radiological insights.
          </p>
        </div>

        <div className="flex items-center justify-center gap-6 font-syne text-md">
          <a
            href="mailto:hello@drshinto.com"
            className="opacity-80 hover:opacity-100 transition-opacity"
          >
            <FiMail className="inline-block mr-2 align-text-bottom" />
            Email
          </a>
          <a
            href="tel:+910000000000"
            className="opacity-80 hover:opacity-100 transition-opacity"
          >
            <FiPhone className="inline-block mr-2 align-text-bottom" />
            Call
          </a>
        </div>

        <a
          href="#top"
          onClick={handleBackToTop}
          className="group h-14 w-14 flex-shrink-0 flex items-center justify-center rounded-full border-2 border-[#F8F5F2]/30 text-[#F8F5F2]/70 transition-all duration-300 hover:border-[#F8F5F2] hover:text-[#F8F5F2]"
          aria-label="Back to Top"
        >
          <FiArrowUp className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-1" />
        </a>
      </div>
      <p className="absolute bottom-4 left-0 right-0 text-center font-raleway text-xs opacity-50">
        &copy; {new Date().getFullYear()} Dr. Shinto Rajappan. All rights
        reserved.
      </p>
    </footer>
  );
};

export default Footer;
