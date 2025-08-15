"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import MobileNav from "./MobileNav";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isHoveringRef = useRef(false);
  const [activeSection, setActiveSection] = useState<string>("#home");

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#info", label: "Info" },
    { href: "#videos", label: "Videos" },
    { href: "#contact", label: "Contact" },
  ];

  const hideNavbar = () => {
    hideTimeoutRef.current = setTimeout(() => {
      if (!isHoveringRef.current) {
        setIsVisible(false);
      }
    }, 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      if (window.scrollY > 50) {
        setIsVisible(true);
        hideNavbar();
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const sections = navLinks.map((link) => document.querySelector(link.href));

    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sections.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  const handleMouseEnter = () => {
    isHoveringRef.current = true;
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
  };

  const handleMouseLeave = () => {
    isHoveringRef.current = false;
    hideNavbar();
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href === "#home") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (isOpen) setIsOpen(false);
  };

  return (
    <>
      <header
        className={`hidden md:block fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full"
        }`}
      >
        <nav
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="w-full bg-black/10 backdrop-blur-lg rounded-full shadow-lg px-4 py-2 flex justify-center items-center transition-all duration-300 ease-in-out"
        >
          <div
            className="flex items-center space-x-2"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="relative text-sm transition-colors duration-300 font-raleway px-4 py-2"
                onMouseEnter={() => setHoveredIndex(index)}
              >
                <span
                  className={`absolute inset-0 bg-white rounded-full transition-transform duration-300 ease-in-out ${
                    hoveredIndex === index ? "scale-100" : "scale-0"
                  }`}
                  style={{ transformOrigin: "center" }}
                ></span>
                <div className="relative flex items-center">
                  <span
                    className={`transition-all duration-300 ease-in-out mr-2 ${
                      hoveredIndex === index
                        ? "opacity-100 w-4 animate-spin"
                        : "opacity-0 w-0 pointer-events-none"
                    }`}
                    style={{ animationDuration: "3s" }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
                        className={
                          hoveredIndex === index
                            ? "fill-amber-800"
                            : "fill-white"
                        }
                      />
                    </svg>
                  </span>
                  <span
                    className={`inline-block transition-colors duration-300 ease-in-out ${
                      hoveredIndex === index ? "text-amber-800" : "text-white"
                    }`}
                  >
                    {link.label}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <div className="md:hidden fixed top-4 right-4 z-50 bg-black/10 backdrop-blur-sm flex items-center rounded-full p-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <MobileNav
        isOpen={isOpen}
        navLinks={navLinks}
        handleLinkClick={handleLinkClick}
        activeSection={activeSection}
      />
    </>
  );
};

export default Navbar;
