"use client";

import React from "react";
import { FiArrowUp } from "react-icons/fi";

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const PillHeading: React.FC<{ title: string }> = ({ title }) => (
    <div className="mb-4">
      <span className="inline-block border border-white/40 rounded-full px-3 py-1 text-xs font-medium text-white/60">
        {title}
      </span>
    </div>
  );

  return (
    <footer className="bg-neutral-900 text-white font-sans relative py-8">
      <div className="max-w-full pl-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-30 gap-y-12">
          <div className="lg:col-start-1 lg:col-span-7">
            <h1 className="text-[8rem] md:text-[10rem] lg:text-[10rem] font-braven font-bold leading-none">
              Dr. Shinto
            </h1>
            <p className="mt-20 text-lg text-white max-w-md">
              Agentur für sinnbasierte Grafik und Kommunikation
            </p>
          </div>

          <div className="lg:col-start-8 lg:col-span-2">
            <PillHeading title="Kontakt" />
            <address className="not-italic text-white leading-relaxed">
              Clou Werbeagentur
              <br />
              Mythenstrasse 7
              <br />
              CH-6003 Luzern
            </address>
            <a
              href="tel:+41412405662"
              className="block mt-4 hover:text-gray-300 transition-colors"
            >
              +41 41 240 56 62
            </a>
            <a
              href="mailto:hallo@clou.ch"
              className="block hover:text-gray-300 transition-colors"
            >
              hallo@clou.ch
            </a>
          </div>

          <div className="lg:col-start-10 lg:col-span-3">
            <PillHeading title="Links" />
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-300 transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300 transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300 transition-colors">
                  Newsletter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300 transition-colors">
                  Webflow
                </a>
              </li>
            </ul>
            <ul className="space-y-2 mt-4 text-white/50">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Impressum
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Datenschutz
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  AGBs
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 pb-5">
          <div className="mx-auto flex justify-between items-center pr-4">
            <div></div>

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
