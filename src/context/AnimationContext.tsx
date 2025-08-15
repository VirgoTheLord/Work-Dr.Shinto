"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface AnimationContextProps {
  isAnimationReady: boolean;
  setAnimationReady: () => void;
}

const AnimationContext = createContext<AnimationContextProps | undefined>(
  undefined
);

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  const [isAnimationReady, setIsAnimationReady] = useState(false);

  const setAnimationReady = () => {
    setIsAnimationReady(true);
  };

  return (
    <AnimationContext.Provider value={{ isAnimationReady, setAnimationReady }}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimationContext = () => {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error(
      "useAnimationContext must be used within an AnimationProvider"
    );
  }
  return context;
};
