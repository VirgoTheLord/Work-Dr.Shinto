import React from "react";

const About = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-black/95 text-white py-20 px-6 md:px-10 overflow-x-hidden">
      <div className="max-w-4xl w-full">
        {/* Main Section Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-braven">
            About Dr. Shinto Rajappan
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            Brief background and clinical interests.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid gap-12 md:grid-cols-5">
          {/* Left Column: Main Text */}
          <div className="md:col-span-3">
            <p className="text-white/70 leading-relaxed">
              Dr. Shinto Rajappan is a board-certified Radiologist practicing at
              Ernakulam Medical Center, with interests in oncologic imaging, CT,
              MRI, and image-guided procedures. He focuses on clear
              communication and evidence-based care.
            </p>
            <ul className="list-disc ml-5 mt-6 space-y-2 text-white/70">
              <li>Oncologic imaging and staging</li>
              <li>Breast, abdominal, and thoracic imaging</li>
              <li>Ultrasound and CT-guided interventions</li>
            </ul>
          </div>

          {/* Right Column: Credentials Card */}
          <div className="md:col-span-2 bg-neutral-900/80 p-6 rounded-lg border border-white/10">
            <h4 className="font-semibold text-lg text-white/90 mb-4">
              Credentials
            </h4>
            <ul className="list-disc ml-5 space-y-2 text-white/60">
              <li>MBBS, MD (Radiodiagnosis)</li>
              <li>Fellowship in Oncologic Imaging</li>
              <li>Member, IRIA</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
