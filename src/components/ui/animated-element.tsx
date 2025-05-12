
import React, { CSSProperties } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

type AnimationType = 
  | "fade-up" 
  | "fade-down" 
  | "fade-left" 
  | "fade-right" 
  | "zoom-in" 
  | "zoom-out"
  | "flip";

interface AnimatedElementProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
  style?: CSSProperties;
}

export function AnimatedElement({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 600,
  className,
  threshold = 0.1,
  once = true,
  style = {},
}: AnimatedElementProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold, once });

  const animations = {
    "fade-up": "translate-y-10 opacity-0",
    "fade-down": "-translate-y-10 opacity-0",
    "fade-left": "translate-x-10 opacity-0",
    "fade-right": "-translate-x-10 opacity-0",
    "zoom-in": "scale-75 opacity-0",
    "zoom-out": "scale-110 opacity-0",
    "flip": "rotateX-90 opacity-0",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all",
        !isVisible ? animations[animation] : "",
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        ...style
      }}
    >
      {children}
    </div>
  );
}
