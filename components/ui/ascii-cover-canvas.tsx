"use client";

import React, { useEffect, useRef, useState } from "react";

interface AsciiCoverCanvasProps {
  imageSrc: string;
  altText?: string;
  className?: string;
  charSet?: string;
  resolution?: number;
  inverted?: boolean;
}

const DEFAULT_CHARS = " .'`^\",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";

export function AsciiCoverCanvas({
  imageSrc,
  altText = "ASCII Visual Artwork",
  className = "",
  charSet = DEFAULT_CHARS,
  resolution = 120,
  inverted = true,
}: AsciiCoverCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;

    let destroyed = false;

    img.onload = () => {
      if (destroyed) return;
      setIsLoaded(true);

      const cols = resolution;
      const imgAspect = img.width / img.height;
      const charAspect = 0.52;
      const rows = Math.floor(cols / imgAspect * charAspect);

      // Offscreen canvas for sampling
      const sampleCanvas = document.createElement("canvas");
      const sampleCtx = sampleCanvas.getContext("2d", { willReadFrequently: true });
      if (!sampleCtx) return;

      sampleCanvas.width = cols;
      sampleCanvas.height = rows;
      sampleCtx.drawImage(img, 0, 0, cols, rows);

      const imgData = sampleCtx.getImageData(0, 0, cols, rows).data;

      const render = () => {
        if (destroyed || !canvas || !ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) {
          animFrameId.current = requestAnimationFrame(render);
          return;
        }

        if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
          canvas.width = rect.width * dpr;
          canvas.height = rect.height * dpr;
        }

        ctx.save();
        ctx.scale(dpr, dpr);

        ctx.clearRect(0, 0, rect.width, rect.height);

        // Exact object-contain object-bottom matching Next.js Image
        const containerAspect = rect.width / rect.height;
        let dstW: number, dstH: number, dstX: number, dstY: number;

        if (containerAspect > imgAspect) {
          dstH = rect.height;
          dstW = rect.height * imgAspect;
          dstX = (rect.width - dstW) / 2;
          dstY = 0;
        } else {
          dstW = rect.width;
          dstH = rect.width / imgAspect;
          dstX = 0;
          dstY = rect.height - dstH; // docked to bottom
        }

        const cellW = dstW / cols;
        const cellH = dstH / rows;
        const fontSize = Math.max(6, Math.min(cellH * 1.15, 13));

        ctx.font = `900 ${fontSize}px "SF Mono", "Consolas", "Courier New", monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            const idx = (y * cols + x) * 4;
            const r = imgData[idx];
            const g = imgData[idx + 1];
            const b = imgData[idx + 2];
            const a = imgData[idx + 3] / 255;

            // Only on solid silhouette
            if (a < 0.15) continue;

            let lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

            if (!inverted) {
              lum = 1 - lum;
            }

            const charIndex = Math.floor(lum * (charSet.length - 1));
            const char = charSet[Math.max(0, Math.min(charSet.length - 1, charIndex))];

            if (char === " ") continue;

            const alpha = Math.min(1, Math.max(0.3, lum * 1.35));
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;

            const posX = dstX + x * cellW + cellW / 2;
            const posY = dstY + y * cellH + cellH / 2;

            ctx.fillText(char, posX, posY);
          }
        }

        ctx.restore();
      };

      render();
    };

    return () => {
      destroyed = true;
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [imageSrc, charSet, resolution, inverted]);

  return (
    <div
      ref={containerRef}
      className={`relative select-none bg-transparent ${className}`}
      aria-label={altText}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full object-contain object-bottom bg-transparent"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
}
