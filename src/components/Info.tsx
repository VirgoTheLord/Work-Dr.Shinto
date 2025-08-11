import React from "react";
// Replaced lucide-react with react-icons
import { FaSearchPlus, FaNotesMedical } from "react-icons/fa";

const Info = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-black/95 text-white py-20 px-6 md:px-10 overflow-x-hidden">
      <div className="max-w-4xl w-full">
        {/* Main Section Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-braven">
            Cancer and Radiology
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            Clear, patient-friendly information on how imaging supports cancer
            prevention, diagnosis, and treatment.
          </p>
        </div>

        {/* Content Cards */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Card 1: Screening */}
          <div className="group bg-neutral-900/80 p-8 rounded-xl border border-white/10 space-y-4 transition-all duration-300 hover:border-sky-500/50 hover:-translate-y-2">
            <div className="mb-4 w-12 h-12 rounded-full bg-sky-500/10 flex items-center justify-center">
              <FaSearchPlus className="h-6 w-6 text-sky-400" />
            </div>
            <h3 className="font-semibold text-xl text-white/90">
              Screening & Early Detection
            </h3>
            <p className="text-white/60 leading-relaxed">
              Imaging helps detect cancers at earlier, more treatable stages.
              Common screening studies include mammography, low-dose CT for lung
              cancer, and ultrasound-guided evaluations.
            </p>
            <ul className="list-disc ml-5 space-y-1 text-white/60">
              <li>Mammography for breast cancer screening</li>
              <li>Low-dose CT for lung cancer screening</li>
              <li>Ultrasound for thyroid, liver, and abdominal assessment</li>
            </ul>
          </div>

          {/* Card 2: Diagnosis */}
          <div className="group bg-neutral-900/80 p-8 rounded-xl border border-white/10 space-y-4 transition-all duration-300 hover:border-fuchsia-500/50 hover:-translate-y-2">
            <div className="mb-4 w-12 h-12 rounded-full bg-fuchsia-500/10 flex items-center justify-center">
              <FaNotesMedical className="h-6 w-6 text-fuchsia-400" />
            </div>
            <h3 className="font-semibold text-xl text-white/90">
              Diagnosis, Staging & Follow-up
            </h3>
            <p className="text-white/60 leading-relaxed">
              CT, MRI, PET-CT, and image-guided biopsies clarify the type of
              cancer, stage of disease, and response to therapy. Radiology
              guides precise, minimally invasive procedures.
            </p>
            <ul className="list-disc ml-5 space-y-1 text-white/60">
              <li>CT and MRI for detailed anatomy and staging</li>
              <li>PET-CT for metabolic activity and treatment response</li>
              <li>Image-guided biopsies and drainages</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
