"use client";

import * as React from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "none";
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: RevealProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Jika elemen sudah berada di layar saat halaman dimuat (seperti Hero section), langsung trigger animasi
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const raf = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0,
        rootMargin: "0px 0px 40px 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  const getTransformStyle = () => {
    if (isVisible) return "opacity-100 transform-none";
    if (direction === "up") return "opacity-0 translate-y-8 will-change-[opacity,transform]";
    if (direction === "down") return "opacity-0 -translate-y-8 will-change-[opacity,transform]";
    return "opacity-0";
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: "700ms",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all ${getTransformStyle()} ${className}`}
    >
      {children}
    </div>
  );
}
