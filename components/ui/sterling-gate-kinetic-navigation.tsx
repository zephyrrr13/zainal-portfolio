"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { Download, ArrowUpRight, MessageCircle, Mail } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
}

export function KineticNavigation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Initial Setup & Hover Shapes
  useEffect(() => {
    if (!containerRef.current) return;

    try {
      if (!gsap.parseEase("main")) {
        CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
        gsap.defaults({ ease: "main", duration: 0.7 });
      }
    } catch {
      gsap.defaults({ ease: "power2.out", duration: 0.7 });
    }

    const ctx = gsap.context(() => {
      const menuItems = containerRef.current!.querySelectorAll(".menu-list-item[data-shape]");
      const shapesContainer = containerRef.current!.querySelector(".ambient-background-shapes");

      menuItems.forEach((item) => {
        const shapeIndex = item.getAttribute("data-shape");
        const shape = shapesContainer ? shapesContainer.querySelector(`.bg-shape-${shapeIndex}`) : null;

        if (!shape) return;
        const shapeEls = shape.querySelectorAll(".shape-element");

        const onEnter = () => {
          if (shapesContainer) {
            shapesContainer.querySelectorAll(".bg-shape").forEach((s) => s.classList.remove("active"));
          }
          shape.classList.add("active");

          gsap.fromTo(
            shapeEls,
            { scale: 0.5, opacity: 0, rotation: -10 },
            {
              scale: 1,
              opacity: 1,
              rotation: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: "back.out(1.7)",
              overwrite: "auto",
            }
          );
        };

        const onLeave = () => {
          gsap.to(shapeEls, {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => shape.classList.remove("active"),
            overwrite: "auto",
          });
        };

        item.addEventListener("mouseenter", onEnter);
        item.addEventListener("mouseleave", onLeave);

        (item as any)._cleanup = () => {
          item.removeEventListener("mouseenter", onEnter);
          item.removeEventListener("mouseleave", onLeave);
        };
      });
    }, containerRef);

    return () => {
      ctx.revert();
      if (containerRef.current) {
        const items = containerRef.current.querySelectorAll(".menu-list-item[data-shape]");
        items.forEach((item: any) => item._cleanup && item._cleanup());
      }
    };
  }, []);

  // Menu Open & Full Choreographed Close Animation Effect
  useEffect(() => {
    if (!containerRef.current) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const ctx = gsap.context(() => {
      const navWrap = containerRef.current!.querySelector(".nav-overlay-wrapper");
      const menu = containerRef.current!.querySelector(".menu-content");
      const overlay = containerRef.current!.querySelector(".overlay");
      const bgPanels = containerRef.current!.querySelectorAll(".backdrop-layer");
      const menuLinks = containerRef.current!.querySelectorAll(".nav-link");
      const fadeTargets = containerRef.current!.querySelectorAll("[data-menu-fade]");

      const menuButton = containerRef.current!.querySelector(".nav-close-btn");
      const menuButtonTexts = menuButton?.querySelectorAll("p");
      const menuButtonIcon = menuButton?.querySelector(".menu-button-icon");

      const tl = gsap.timeline();

      if (isMenuOpen) {
        // === OPEN ANIMATION ===
        if (navWrap) navWrap.setAttribute("data-nav", "open");

        tl.set(navWrap, { display: "block" })
          .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.45 }, 0)
          .fromTo(
            menu,
            { xPercent: 100 },
            { xPercent: 0, duration: 0.6, ease: "power3.out" },
            0
          );

        if (menuButtonTexts && menuButtonTexts.length > 0) {
          tl.fromTo(menuButtonTexts, { yPercent: 0 }, { yPercent: -100, stagger: 0.12, duration: 0.4 }, 0);
        }
        if (menuButtonIcon) {
          tl.fromTo(menuButtonIcon, { rotate: 0 }, { rotate: 315, duration: 0.45, ease: "power2.out" }, 0);
        }

        if (bgPanels && bgPanels.length > 0) {
          tl.fromTo(
            bgPanels,
            { xPercent: 101 },
            { xPercent: 0, stagger: 0.08, duration: 0.55, ease: "power3.out" },
            0.05
          );
        }

        if (menuLinks && menuLinks.length > 0) {
          tl.fromTo(
            menuLinks,
            { yPercent: 140, rotate: 6, opacity: 0 },
            {
              yPercent: 0,
              rotate: 0,
              opacity: 1,
              stagger: 0.05,
              duration: 0.55,
              ease: "power3.out",
            },
            0.2
          );
        }

        if (fadeTargets.length) {
          tl.fromTo(
            fadeTargets,
            { autoAlpha: 0, yPercent: 25 },
            { autoAlpha: 1, yPercent: 0, stagger: 0.04, duration: 0.4, clearProps: "all" },
            0.3
          );
        }
      } else {
        // === SMOOTH REVERSE CLOSE ANIMATION ===
        if (navWrap) navWrap.setAttribute("data-nav", "closed");

        // 1. Menu links slide down and fade out
        if (menuLinks && menuLinks.length > 0) {
          tl.to(
            menuLinks,
            {
              yPercent: 100,
              opacity: 0,
              stagger: 0.025,
              duration: 0.32,
              ease: "power2.in",
            },
            0
          );
        }

        // 2. Footer contacts and info fade out
        if (fadeTargets && fadeTargets.length > 0) {
          tl.to(fadeTargets, { autoAlpha: 0, duration: 0.22, ease: "power2.in" }, 0);
        }

        // 3. Backdrop panels stagger slide out to the right
        if (bgPanels && bgPanels.length > 0) {
          tl.to(
            bgPanels,
            {
              xPercent: 101,
              stagger: 0.05,
              duration: 0.42,
              ease: "power3.in",
            },
            0.06
          );
        }

        // 4. Menu drawer slides out smoothly
        tl.to(
          menu,
          {
            xPercent: 100,
            duration: 0.45,
            ease: "power3.inOut",
          },
          0.06
        );

        // 5. Button text slides back from Close to Menu
        if (menuButtonTexts && menuButtonTexts.length > 0) {
          tl.to(menuButtonTexts, { yPercent: 0, duration: 0.32, ease: "power2.out" }, 0);
        }

        // 6. Cross icon rotates back from 315deg to 0deg
        if (menuButtonIcon) {
          tl.to(menuButtonIcon, { rotate: 0, duration: 0.38, ease: "power2.out" }, 0);
        }

        // 7. Backdrop overlay fades out
        tl.to(overlay, { autoAlpha: 0, duration: 0.38, ease: "power2.in" }, 0.08);

        // 8. Safely hide wrapper after all animations finish
        tl.set(navWrap, { display: "none" });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isMenuOpen]);

  // Keydown Escape handling
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div ref={containerRef} className="relative z-[999]">
      {/* 1. Header Bar - Single Clean Menu Button */}
      <div className="site-header-wrapper">
        <header className="header">
          <div className="container is--full">
            <nav className="nav-row">
              <Link
                href="/"
                aria-label="home"
                className="nav-logo-row group flex items-center gap-3 text-white transition-opacity hover:opacity-80"
                onClick={closeMenu}
                style={{ pointerEvents: "auto" }}
              >
                <span className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-white shadow-[0_0_10px_#FFFFFF]"></span>
                <span className="font-mono text-xs font-bold uppercase tracking-[0.25em]">
                  ZAINAL ABIDIN
                </span>
              </Link>

              <div className="nav-row__right">
                {/* Single Sleek Kinetic Menu Button */}
                <button
                  type="button"
                  className="nav-close-btn"
                  onClick={toggleMenu}
                  style={{ pointerEvents: "auto" }}
                  aria-label="Toggle navigation menu"
                >
                  <div className="menu-button-text">
                    <p className="p-large text-white">Menu</p>
                    <p className="p-large text-white">Close</p>
                  </div>
                  <div className="icon-wrap">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="menu-button-icon text-white"
                    >
                      <path
                        d="M7.33333 16L7.33333 -3.2055e-07L8.66667 -3.78832e-07L8.66667 16L7.33333 16Z"
                        fill="currentColor"
                      />
                      <path
                        d="M16 8.66667L-2.62269e-07 8.66667L-3.78832e-07 7.33333L16 7.33333L16 8.66667Z"
                        fill="currentColor"
                      />
                      <path
                        d="M6 7.33333L7.33333 7.33333L7.33333 6C7.33333 6.73637 6.73638 7.33333 6 7.33333Z"
                        fill="currentColor"
                      />
                      <path
                        d="M10 7.33333L8.66667 7.33333L8.66667 6C8.66667 6.73638 9.26362 7.33333 10 7.33333Z"
                        fill="currentColor"
                      />
                      <path
                        d="M6 8.66667L7.33333 8.66667L7.33333 10C7.33333 9.26362 6.73638 8.66667 6 8.66667Z"
                        fill="currentColor"
                      />
                      <path
                        d="M10 8.66667L8.66667 8.66667L8.66667 10C8.66667 9.26362 9.26362 8.66667 10 8.66667Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </button>
              </div>
            </nav>
          </div>
        </header>
      </div>

      {/* 2. Fullscreen Kinetic Navigation Overlay */}
      <section className="fullscreen-menu-container">
        <div data-nav="closed" className="nav-overlay-wrapper">
          {/* Overlay Backdrop */}
          <div className="overlay" onClick={closeMenu}></div>

          {/* Sliding Menu Drawer */}
          <nav className="menu-content">
            <div className="menu-bg">
              <div className="backdrop-layer first"></div>
              <div className="backdrop-layer second"></div>
              <div className="backdrop-layer"></div>

              {/* Ambient Background Kinetic Shapes (21st.dev Exact Shapes in Monochrome) */}
              <div className="ambient-background-shapes">
                {/* Shape 1: Floating Circles */}
                <svg className="bg-shape bg-shape-1" viewBox="0 0 400 400" fill="none">
                  <circle className="shape-element" cx="80" cy="120" r="40" fill="rgba(255,255,255,0.12)" />
                  <circle className="shape-element" cx="300" cy="80" r="60" fill="rgba(255,255,255,0.1)" />
                  <circle className="shape-element" cx="200" cy="300" r="80" fill="rgba(255,255,255,0.08)" />
                  <circle className="shape-element" cx="350" cy="280" r="30" fill="rgba(255,255,255,0.12)" />
                </svg>

                {/* Shape 2: Wave Pattern */}
                <svg className="bg-shape bg-shape-2" viewBox="0 0 400 400" fill="none">
                  <path
                    className="shape-element"
                    d="M0 200 Q100 100, 200 200 T 400 200"
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth="50"
                    fill="none"
                  />
                  <path
                    className="shape-element"
                    d="M0 280 Q100 180, 200 280 T 400 280"
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth="35"
                    fill="none"
                  />
                </svg>

                {/* Shape 3: Grid Dots */}
                <svg className="bg-shape bg-shape-3" viewBox="0 0 400 400" fill="none">
                  <circle className="shape-element" cx="50" cy="50" r="8" fill="rgba(255,255,255,0.25)" />
                  <circle className="shape-element" cx="150" cy="50" r="8" fill="rgba(255,255,255,0.25)" />
                  <circle className="shape-element" cx="250" cy="50" r="8" fill="rgba(255,255,255,0.25)" />
                  <circle className="shape-element" cx="350" cy="50" r="8" fill="rgba(255,255,255,0.25)" />
                  <circle className="shape-element" cx="100" cy="150" r="12" fill="rgba(255,255,255,0.2)" />
                  <circle className="shape-element" cx="200" cy="150" r="12" fill="rgba(255,255,255,0.2)" />
                  <circle className="shape-element" cx="300" cy="150" r="12" fill="rgba(255,255,255,0.2)" />
                  <circle className="shape-element" cx="50" cy="250" r="10" fill="rgba(255,255,255,0.25)" />
                  <circle className="shape-element" cx="150" cy="250" r="10" fill="rgba(255,255,255,0.25)" />
                  <circle className="shape-element" cx="250" cy="250" r="10" fill="rgba(255,255,255,0.25)" />
                  <circle className="shape-element" cx="350" cy="250" r="10" fill="rgba(255,255,255,0.25)" />
                  <circle className="shape-element" cx="100" cy="350" r="6" fill="rgba(255,255,255,0.25)" />
                  <circle className="shape-element" cx="200" cy="350" r="6" fill="rgba(255,255,255,0.25)" />
                  <circle className="shape-element" cx="300" cy="350" r="6" fill="rgba(255,255,255,0.25)" />
                </svg>

                {/* Shape 4: Organic Blobs */}
                <svg className="bg-shape bg-shape-4" viewBox="0 0 400 400" fill="none">
                  <path
                    className="shape-element"
                    d="M100 100 Q150 50, 200 100 Q250 150, 200 200 Q150 250, 100 200 Q50 150, 100 100"
                    fill="rgba(255,255,255,0.12)"
                  />
                  <path
                    className="shape-element"
                    d="M250 200 Q300 150, 350 200 Q400 250, 350 300 Q400 250, 350 300 Q300 350, 250 300 Q200 250, 250 200"
                    fill="rgba(255,255,255,0.08)"
                  />
                </svg>

                {/* Shape 5: Diagonal Lines */}
                <svg className="bg-shape bg-shape-5" viewBox="0 0 400 400" fill="none">
                  <line className="shape-element" x1="0" y1="100" x2="300" y2="400" stroke="rgba(255,255,255,0.15)" strokeWidth="30" />
                  <line className="shape-element" x1="100" y1="0" x2="400" y2="300" stroke="rgba(255,255,255,0.12)" strokeWidth="25" />
                  <line className="shape-element" x1="200" y1="0" x2="400" y2="200" stroke="rgba(255,255,255,0.1)" strokeWidth="20" />
                </svg>
              </div>
            </div>

            {/* Menu Links Content */}
            <div className="menu-content-wrapper">
              <div className="mb-6 font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-500">
                // DIRECTORY
              </div>

              <ul className="menu-list">
                <li className="menu-list-item" data-shape="1">
                  <Link href="/" className="nav-link" onClick={closeMenu}>
                    <span className="nav-link-sub">01</span>
                    <p className="nav-link-text">Home</p>
                    <div className="nav-link-hover-bg"></div>
                  </Link>
                </li>

                <li className="menu-list-item" data-shape="2">
                  <Link href="/about" className="nav-link" onClick={closeMenu}>
                    <span className="nav-link-sub">02</span>
                    <p className="nav-link-text">About Me</p>
                    <div className="nav-link-hover-bg"></div>
                  </Link>
                </li>

                <li className="menu-list-item" data-shape="3">
                  <Link href="/works" className="nav-link" onClick={closeMenu}>
                    <span className="nav-link-sub">03</span>
                    <p className="nav-link-text">My Works</p>
                    <div className="nav-link-hover-bg"></div>
                  </Link>
                </li>

                <li className="menu-list-item" data-shape="4">
                  <Link href="/gallery" className="nav-link" onClick={closeMenu}>
                    <span className="nav-link-sub">04</span>
                    <p className="nav-link-text">Gallery</p>
                    <div className="nav-link-hover-bg"></div>
                  </Link>
                </li>

                <li className="menu-list-item" data-shape="5">
                  <Link href="/contact" className="nav-link" onClick={closeMenu}>
                    <span className="nav-link-sub">05</span>
                    <p className="nav-link-text" data-menu-fade>Contact</p>
                    <div className="nav-link-hover-bg"></div>
                  </Link>
                </li>
              </ul>

              {/* Action Buttons & CV Download */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-4">
                <a
                  href={PERSONAL_INFO.cvDownloadUrl}
                  download="Resume-ZAINAL-ABIDIN.pdf"
                  className="flex items-center justify-between rounded-xl border border-white/20 bg-white/5 px-5 py-3 font-mono text-xs uppercase tracking-wider text-white transition-all hover:bg-white hover:text-black"
                >
                  <span className="font-bold">DOWNLOAD RESUME CV</span>
                  <Download className="h-4 w-4" />
                </a>

                {/* Menu Footer Contacts */}
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs text-zinc-400 pt-1"
                  data-menu-fade
                >
                  <a
                    href={PERSONAL_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors"
                  >
                    <MessageCircle className="h-3.5 w-3.5 text-zinc-400" />
                    <span>+62 812 9132 9873</span>
                  </a>

                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors"
                  >
                    <Mail className="h-3.5 w-3.5 text-zinc-400" />
                    <span>{PERSONAL_INFO.email}</span>
                  </a>

                  <a
                    href={PERSONAL_INFO.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
                  >
                    <span>INSTAGRAM</span>
                    <ArrowUpRight className="h-3 w-3 text-zinc-400" />
                  </a>

                  <a
                    href={PERSONAL_INFO.behance}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
                  >
                    <span>BEHANCE PORTFOLIO</span>
                    <ArrowUpRight className="h-3 w-3 text-zinc-400" />
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </section>
    </div>
  );
}
