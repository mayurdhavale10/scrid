"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";

export default function LottieLoader({ path, className }: { path: string; className?: string }) {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    const loadAnimation = async () => {
      try {
        const response = await fetch(path);
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.error("Error loading animation:", error);
      }
    };

    loadAnimation();
  }, [path]);

  if (!animationData) {
    return <div className={`${className} bg-gray-700 animate-pulse rounded-full`} />;
  }

  return (
    <Lottie
      animationData={animationData}
      loop={true}
      autoplay={true}
      className={className}
      rendererSettings={{
        preserveAspectRatio: 'xMidYMid meet'
      }}
    />
  );
}