"use client";

import React, { forwardRef } from "react";
import Image from "next/image";

type AboutProps = React.ComponentPropsWithoutRef<"div">;

const About = forwardRef<HTMLDivElement, AboutProps>((props, ref) => {
  return (
    <div
      id="about"
      ref={ref}
      className="min-h-screen w-full flex flex-col justify-center items-center bg-gray-100  text-neutral-800 py-16 sm:py-20 px-6 md:px-10 overflow-hidden"
    >
      <div className="max-w-5xl w-full">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="w-full md:w-2/5 flex-shrink-0">
            <div className="relative">
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-orange-950 rounded-lg transform translate-x-2 translate-y-2"></div>
              <div className="relative aspect-square md:aspect-[4/5] rounded-lg overflow-hidden shadow-lg z-10">
                <Image
                  src="/1.jpg"
                  alt="Dr. Shinto Rajappan"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="relative z-10 w-full md:w-3/5">
            <p className="text-orange-900 text-sm font-semibold mb-2 font-raleway">
              Meet Dr. Shinto Rajappan, MD (Clinical Oncology)
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-braven text-neutral-900 mb-6">
              A Leading Voice in Clinical Oncology
            </h1>
            <p className="text-neutral-600 leading-relaxed mb-6 font-raleway">
              Dr. Shinto Rajappan is a distinguished{" "}
              <strong>clinical oncologist</strong> dedicated to advancing cancer
              care. He completed his MBBS from Government Medical College,
              Kannur, and pursued his MD at Government Medical College,
              Thrissur. Currently, he serves in the{" "}
              <strong>
                Oncology Department at General Hospital, Ernakulam
              </strong>
              .
            </p>
            <p className="text-neutral-600 leading-relaxed font-raleway">
              A respected <strong>Fellow of AROI and IMA</strong>, Dr. Rajappan
              is deeply involved in the academic community. He has{" "}
              <strong>co-published research papers</strong> and is a highly
              regarded orator, frequently invited to give lectures at seminars
              and conferences, sharing his expertise and passion for improving
              patient outcomes.
            </p>
            <div className="w-16 h-1 bg-orange-950 mt-8"></div>
          </div>
        </div>
      </div>
    </div>
  );
});

About.displayName = "About";

export default About;
