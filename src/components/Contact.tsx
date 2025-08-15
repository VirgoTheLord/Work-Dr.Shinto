"use client";

import React, { useLayoutEffect, useRef, FC } from "react";
import { FiInstagram, FiTwitter, FiLinkedin } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";
import AnimatedContactLink from "./AnimatedContactLink";
import SocialIcon from "./SocialIcon";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Contact: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        const split = SplitText.create(titleRef.current, { type: "chars" });
        gsap.set(titleRef.current, { overflow: "hidden" });
        gsap.from(split.chars, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
          yPercent: -100,
          opacity: 0,
          stagger: 0.05,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      gsap.from(".contact-block", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      });

      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": function () {
          gsap.from(".map-container", {
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
            x: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          });
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      id="contact"
      className="w-full bg-[#F8F5F2] text-[#401d01] flex flex-col lg:h-screen lg:flex-row"
    >
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-8 md:p-12 lg:p-16">
        {/* Top section with title */}
        <div>
          <div className="contact-block">
            <p className="text-sm uppercase tracking-widest text-[#401d01]/60 font-raleway">
              Contact
            </p>
            <h1
              ref={titleRef}
              className="text-6xl md:text-8xl font-black font-braven leading-tight mt-2 whitespace-nowrap"
            >
              Dr. Shinto
            </h1>
          </div>
        </div>

        {/* Main content area now uses a grid for better space management */}
        <div className="contact-block grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
          {/* Location & Hours */}
          <div>
            <h3 className="text-lg font-bold font-raleway tracking-wide mb-4">
              Location & Hours
            </h3>
            <ul className="space-y-4">
              <li>
                <strong className="font-bold font-raleway text-sm text-[#401d01]">
                  Online Booking
                </strong>
                <p className="font-raleway text-sm text-[#401d01]/70 mt-1">
                  Mon - Fri, 9 AM - 5 PM
                  <br />
                  Sun, 9 AM - 8 PM
                </p>
              </li>
              <li>
                <strong className="font-bold font-raleway text-sm text-[#401d01]">
                  Clinic
                </strong>
                <p className="font-raleway text-sm text-[#401d01]/70 mt-1">
                  Near Lisie Hospital, 36/121, Ernakulam North, Kerala, 682018
                </p>
                {/* ✨ 1. Replaced plain text number with AnimatedContactLink */}
                <div className="my-1">
                  <AnimatedContactLink href="tel:+919895136837">
                    +91 9895136837
                  </AnimatedContactLink>
                </div>
                <p className="font-raleway text-sm text-[#401d01]/70">
                  Mon - Fri, 9 AM - 1:30 PM
                </p>
              </li>
              <li>
                <strong className="font-bold font-raleway text-sm text-[#401d01]">
                  Home Visit
                </strong>
                <p className="font-raleway text-sm text-[#401d01]/70 mt-1">
                  Available on request.
                </p>
              </li>
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h3 className="text-lg font-bold font-raleway tracking-wide mb-4">
              Get In Touch
            </h3>
            <div className="flex flex-col items-start">
              <AnimatedContactLink href="mailto:drshintopr@gmail.com">
                drshintopr@gmail.com
              </AnimatedContactLink>
              <AnimatedContactLink href="tel:+919778463227">
                +91 97784 63227
              </AnimatedContactLink>
            </div>
          </div>
        </div>

        {/* Bottom section with social icons */}
        <div className="contact-block flex items-center gap-6">
          <SocialIcon href="#" aria-label="Instagram">
            <FiInstagram className="h-5 w-5" />
          </SocialIcon>
          <SocialIcon href="#" aria-label="Twitter">
            <FiTwitter className="h-5 w-5" />
          </SocialIcon>
          <SocialIcon href="#" aria-label="LinkedIn">
            <FiLinkedin className="h-5 w-5" />
          </SocialIcon>
        </div>
      </div>

      {/* ✨ 2. Reduced map height on mobile */}
      <div className="map-container w-full lg:w-1/2 h-[25vh] lg:h-auto">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125743.59378619374!2d76.2425447721516!3d9.97086842918805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d514abec6bf%3A0xbd582caa5844192!2sKochi%2C%20Kerala!5e0!3m2!1sen!2sin!4v1723748281000!5m2!1sen!2sin"
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
