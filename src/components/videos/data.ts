// --- Type Definition ---
export interface Video {
  id: string;
  title: string;
  description: string;
  bgColor: string;
}

// --- Data (New White & Light Brown Palette) ---
export const videos: Video[] = [
  {
    id: "Jk7wD_gb_Xg",
    title: "Understanding MRI: A Patient's Guide",
    description:
      "A comprehensive look into the MRI procedure, helping you prepare for your scan with confidence.",
    bgColor: "bg-[#e0c7ae]",
  },
  {
    id: "eFjJ39a4n4Q",
    title: "What to Expect During a CT Scan",
    description:
      "This guide demystifies the CT scan process, from arrival to completion, ensuring you know what to expect.",
    bgColor: "bg-[#401d01]",
  },
  {
    id: "pGncmT3P0uI",
    title: "The Role of PET-CT in Cancer Staging",
    description:
      "Explore how advanced PET-CT imaging plays a crucial role in accurately staging and managing cancer.",
    bgColor: "bg-[#e0c7ae]",
  },
  {
    id: "BeygJK_92Ak",
    title: "Introduction to Ultrasound Imaging",
    description:
      "Learn the basics of ultrasound technology and its safe, non-invasive applications in medical diagnostics.",
    bgColor: "bg-[#401d01]",
  },
];
