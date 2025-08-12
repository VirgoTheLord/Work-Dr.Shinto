"use client";

import React from "react";
import Link from "next/link";

// Define the types for the component props
type ButtonVariant = "primary" | "secondary";

interface CustomButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  href,
  children,
  variant = "primary",
  className = "",
}) => {
  const variantClasses: Record<ButtonVariant, string> = {
    primary: "bg-white text-black",
    secondary: "bg-neutral-800 text-white",
  };

  return (
    <Link
      href={href}
      className={`button-itself relative inline-flex items-center justify-center h-9 px-6 text-sm font-medium transition-colors duration-300 overflow-hidden ${variantClasses[variant]} ${className}`}
    >
      <span className="relative inline-block h-5 leading-5 overflow-hidden">
        <span className="text-original inline-block">{children}</span>
        <span className="text-clone absolute top-0 left-0">{children}</span>
      </span>
    </Link>
  );
};
