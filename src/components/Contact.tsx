import React from "react";
import { FiMail, FiPhone } from "react-icons/fi";

const Contact = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-black/95 text-white py-20 px-6 md:px-10 overflow-x-hidden">
      <div className="max-w-4xl w-full">
        {/* Main Section Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-braven">
            Contact
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            For appointments and clinical queries.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid gap-12 md:grid-cols-2">
          {/* Left Column: Contact Info */}
          <div className="flex flex-col gap-4">
            <a
              href="mailto:hello@drshinto.com"
              className="group flex-1 flex items-center justify-center gap-3 rounded-lg border border-white/20 bg-neutral-900/80 p-4 text-lg text-white/80 transition-colors hover:border-white/40 hover:text-white"
            >
              <FiMail className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
              Email
            </a>
            <a
              href="tel:+910000000000"
              className="group flex-1 flex items-center justify-center gap-3 rounded-lg border border-white/20 bg-neutral-900/80 p-4 text-lg text-white/80 transition-colors hover:border-white/40 hover:text-white"
            >
              <FiPhone className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
              Call
            </a>
            <address className="not-italic text-white/70 text-center mt-8">
              Ernakulam Medical Center
              <br />
              Kochi, Kerala
              <br />
              India
            </address>
          </div>

          {/* Right Column: Placeholder for Map */}
          <div className="w-full min-h-[300px] md:min-h-full flex items-center justify-center rounded-lg bg-neutral-900/80 border border-dashed border-white/20">
            <p className="text-white/40">Map will be integrated here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
