"use client";

import React from "react";
import { FiMail, FiPhone } from "react-icons/fi";

const Footer = () => {
  const handleBackToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-[#401d01] text-[#F8F5F2] py-8 px-6 md:px-10 text-center lg:text-left">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
        <p className="font-raleway text-sm opacity-70">
          &copy; {new Date().getFullYear()} Dr. Shinto Rajappan. All rights
          reserved.
        </p>
        <div className="flex items-center space-x-6 font-syne text-sm">
          <a
            href="mailto:hello@drshinto.com"
            className="opacity-70 hover:opacity-100 transition-opacity"
          >
            <FiMail className="inline-block mr-1 align-text-bottom" /> Email
          </a>
          <a
            href="tel:+910000000000"
            className="opacity-70 hover:opacity-100 transition-opacity"
          >
            <FiPhone className="inline-block mr-1 align-text-bottom" /> Call
          </a>
        </div>
        <a
          href="#top"
          onClick={handleBackToTop}
          className="font-raleway text-sm opacity-70 hover:opacity-100 transition-opacity"
        >
          Back to Top
        </a>
      </div>
    </footer>
  );
};

export default Footer;
