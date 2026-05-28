"use client";
import React, { useEffect } from "react";
import gsap from "gsap";

export function CustomCursor() {
  useEffect(() => {
    const cursor = document.getElementById("custom-cursor");
    if (!cursor) return;

    // Check for mobile/touch
    if (window.matchMedia("(pointer: coarse)").matches) {
      cursor.style.display = "none";
      return;
    }

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3" });

    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleHoverEnter = () => {
      gsap.to(cursor, { width: 40, height: 40, backgroundColor: "rgba(255, 255, 255, 0.1)", border: "1px solid rgba(255, 255, 255, 0.5)", duration: 0.3 });
    };

    const handleHoverLeave = () => {
      gsap.to(cursor, { width: 12, height: 12, backgroundColor: "var(--mac-text)", border: "none", duration: 0.3 });
    };

    window.addEventListener("mousemove", onMouseMove);

    // Expand cursor on links and buttons
    const interactiveElements = document.querySelectorAll("a, button, .mac-card, .dock-icon");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverEnter);
      el.addEventListener("mouseleave", handleHoverLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverEnter);
        el.removeEventListener("mouseleave", handleHoverLeave);
      });
    };
  }, []);

  return (
    <div
      id="custom-cursor"
      className="fixed top-0 left-0 w-3 h-3 rounded-full bg-[var(--mac-text)] pointer-events-none z-[9999] mix-blend-difference hidden md:block"
    />
  );
}
