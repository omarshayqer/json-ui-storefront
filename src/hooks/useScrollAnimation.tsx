
import { useState, useEffect } from "react";

type AnimationOptions = {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
};

export function useScrollAnimation(options: AnimationOptions = {}) {
  const { threshold = 0.1, rootMargin = "0px", once = true } = options;
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(ref);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref);
    
    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [ref, threshold, rootMargin, once]);

  return { ref: setRef, isVisible };
}
