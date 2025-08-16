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
    title: "Cancer? What now?",
    description:
      "An overview of what must a patient understand and keep in mind.",
    bgColor: "bg-[#e0c7ae]",
    textColor: "text-[#401d01]",
    descriptionColor: "text-stone-600",
  },
  {
    id: "XW9nTVvzkvA",
    title: "Radiation Therapy Explained",
    description:
      "Learn about radiation therapy, a common cancer treatment that uses high-energy rays to target and destroy cancer cells.",
    bgColor: "bg-[#401d01]",
    textColor: "text-white",
    descriptionColor: "text-stone-300",
  },
  {
    id: "4BMkuiqjhy0",
    title: "Chemotherapy Myths and Facts",
    description:
      "Discover the facts and myths about chemotherapy.",
    bgColor: "bg-[#e0c7ae]",
    textColor: "text-[#401d01]",
    descriptionColor: "text-stone-600",
  },
  {
    id: "hTcT9nCrRW8",
    title: "Symptoms Of Blood Cancer",
    description:
      "What are the signs and symptoms of blood cancer, how does it affect children.",
    bgColor: "bg-[#401d01]",
    textColor: "text-white",
    descriptionColor: "text-stone-300",
  },
];
