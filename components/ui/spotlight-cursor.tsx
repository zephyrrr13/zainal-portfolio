"use client";

import React, { useEffect, useState } from "react";

export function SpotlightCursor() {
  const [position, setPosition] = useState({ x: -200, y: -200 });
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setOpacity(1);
    };

    const handleMouseLeave = () => {
      setOpacity(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-40 transition-opacity duration-300 hidden md:block"
      style={{ opacity }}
    >
      <div
        className="absolute h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 35%, transparent 70%)",
        }}
      />
    </div>
  );
}
