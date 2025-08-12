import { useEffect, useRef } from "react";
import { CustomButton } from "./CustomButton";
import gsap from "gsap";

interface AnimatedButtonWrapperProps {
  href: string;
  children: React.ReactNode;
  variant: "primary" | "secondary";
}

export const AnimatedButtonWrapper: React.FC<AnimatedButtonWrapperProps> = ({
  href,
  children,
  variant,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const squareVariantClasses = {
    primary: "bg-neutral-800 text-white",
    secondary: "bg-neutral-200 text-black",
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline({ paused: true });

      if (wrapperRef.current) {
        tl.current
          .to(wrapperRef.current.querySelector(".icon-box"), {
            width: "2.75rem",
            ease: "expo.inOut",
            duration: 0.6,
          })
          .to(
            wrapperRef.current.querySelector(".arrow"),
            {
              autoAlpha: 1,
              rotate: 0,
              ease: "expo.inOut",
              duration: 0.6,
            },
            0.1
          )
          .to(
            wrapperRef.current.querySelector(".text-original"),
            {
              yPercent: -100,
              autoAlpha: 0,
              ease: "power3.inOut",
              duration: 0.55,
            },
            0
          )
          .fromTo(
            wrapperRef.current.querySelector(".text-clone"),
            { yPercent: 100, autoAlpha: 0 },
            {
              yPercent: 0,
              autoAlpha: 1,
              ease: "power3.inOut",
              duration: 0.55,
            },
            0.05
          );
      }
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    if (tl.current) tl.current.play();
  };
  const handleMouseLeave = () => {
    if (tl.current) tl.current.reverse();
  };

  return (
    <div
      ref={wrapperRef}
      className="flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`icon-box h-9 w-0 flex items-center justify-center overflow-hidden ${squareVariantClasses[variant]}`}
      >
        <span className="arrow block text-2xl opacity-0 -rotate-45">→</span>
      </div>
      <CustomButton href={href} variant={variant}>
        {children}
      </CustomButton>
    </div>
  );
};
