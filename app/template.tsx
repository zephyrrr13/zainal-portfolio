"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function Template({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!containerRef.current) return;

    // Smooth Pop-up & Scale-In Entrance Animation on Route Change
    gsap.fromTo(
      containerRef.current,
      {
        opacity: 0,
        scale: 0.97,
        y: 20,
        filter: "blur(4px)",
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.55,
        ease: "power3.out",
        clearProps: "scale,y,filter",
      }
    );

    // Scroll smoothly to top on page transition
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div ref={containerRef} className="w-full will-change-transform">
      {children}
    </div>
  );
}
