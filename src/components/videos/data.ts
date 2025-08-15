export interface Video {
  id: string;
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
  descriptionColor: string;
}

export const videos: Video[] = [
  {
    id: "zOmxcdGupqA",
    title: "Understanding MRI: A Patient's Guide",
    description:
      "A comprehensive look into the MRI procedure, helping you prepare for your scan with confidence.",
    bgColor: "bg-[#e0c7ae]",
    textColor: "text-[#401d01]",
    descriptionColor: "text-stone-600",
  },
  {
    id: "XW9nTVvzkvA",
    title: "What to Expect During a CT Scan",
    description:
      "This guide demystifies the CT scan process, from arrival to completion, ensuring you know what to expect.",
    bgColor: "bg-[#401d01]",
    textColor: "text-white",
    descriptionColor: "text-stone-300",
  },
  {
    id: "4BMkuiqjhy0",
    title: "The Role of PET-CT in Cancer Staging",
    description:
      "Explore how advanced PET-CT imaging plays a crucial role in accurately staging and managing cancer.",
    bgColor: "bg-[#e0c7ae]",
    textColor: "text-[#401d01]",
    descriptionColor: "text-stone-600",
  },
  {
    id: "hTcT9nCrRW8",
    title: "Introduction to Ultrasound Imaging",
    description:
      "Learn the basics of ultrasound technology and its safe, non-invasive applications in medical diagnostics.",
    bgColor: "bg-[#401d01]",
    textColor: "text-white",
    descriptionColor: "text-stone-300",
  },
];
