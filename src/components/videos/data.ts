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
    title: "What is Chemotherapy?",
    description:
      "An overview of chemotherapy, explaining how it works to treat cancer and what patients can typically expect during treatment.",
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
    title: "Understanding Immunotherapy",
    description:
      "Discover how immunotherapy harnesses the body's own immune system to fight cancer, marking a major advancement in treatment.",
    bgColor: "bg-[#e0c7ae]",
    textColor: "text-[#401d01]",
    descriptionColor: "text-stone-600",
  },
  {
    id: "hTcT9nCrRW8",
    title: "Targeted Therapy for Cancer",
    description:
      "An introduction to targeted therapy, which uses drugs to identify and attack specific cancer cells with less harm to normal cells.",
    bgColor: "bg-[#401d01]",
    textColor: "text-white",
    descriptionColor: "text-stone-300",
  },
];
