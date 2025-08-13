import React, { ReactNode } from "react";
import ParallaxImage from "./ParallaxImage";

interface ParallaxSectionProps {
  children: ReactNode;
  imgSrc: string;
  imgAlt: string;
  imgSpeed?: number;
  className?: string;
  id?: string;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  id,
  imgSrc,
  imgAlt,
  imgSpeed,
  className = "",
}) => {
  return (
    <section
      id={id}
      className={`relative w-full min-h-screen overflow-hidden ${className}`}
    >
      <ParallaxImage src={imgSrc} alt={imgAlt} speed={imgSpeed} />
      <div className="relative z-10 w-full h-full">{children}</div>
    </section>
  );
};

export default ParallaxSection;
