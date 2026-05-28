"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface AnimatedTextProps {
  text: string;
  type?: "words" | "lines";
  className?: string;
  delay?: number;
}

export function AnimatedText({ text, type = "words", className, delay = 0 }: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Simple word splitting since SplitText is a premium plugin
    const words = containerRef.current.querySelectorAll(".word");
    
    if (words.length > 0) {
      gsap.fromTo(
        words,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: "power3.out",
          delay: delay,
        }
      );
    }
  }, [delay]);

  const wordsArray = text.split(" ");

  return (
    <div ref={containerRef} className={className}>
      {type === "words" ? (
        wordsArray.map((word, i) => (
          <span key={i} className="word inline-block mr-[0.25em] opacity-0">
            {word}
          </span>
        ))
      ) : (
        <span className="word inline-block opacity-0">{text}</span>
      )}
    </div>
  );
}
