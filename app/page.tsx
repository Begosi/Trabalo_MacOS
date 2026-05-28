"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MacWindow } from "@/components/MacWindow";
import { Section01 } from "@/components/sections/Section01";
import { Section02 } from "@/components/sections/Section02";
import { Section03 } from "@/components/sections/Section03";
import { Section04 } from "@/components/sections/Section04";
import { Section05 } from "@/components/sections/Section05";
import { Section06 } from "@/components/sections/Section06";
import { Section07 } from "@/components/sections/Section07";
import { Section08 } from "@/components/sections/Section08";
import { Section09 } from "@/components/sections/Section09";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.fromTo(".hero-bg", { opacity: 0 }, { opacity: 1, duration: 0.2 })
        .fromTo(".hero-window", { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" }, "+=0.2")
        .addLabel("titles")
        .fromTo(".hero-title .word", { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.05, duration: 0.4, ease: "power2.out" }, "titles")
        .fromTo(".hero-subtitle", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "titles+=0.4")
        .fromTo(".hero-badges", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.7)" }, "titles+=0.6");
        
      gsap.to(".hero-bg-img", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5
        }
      });
    }, heroRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col gap-32 pb-40 overflow-x-hidden">
      {/* Hero Section */}
      <section id="hero" ref={heroRef} className="relative min-h-[90vh] flex items-center justify-center pt-10">
        <div className="hero-bg absolute inset-0 bg-gradient-to-br from-[var(--mac-bg)] to-black z-0">
          <div className="hero-bg-img absolute inset-0 opacity-45 bg-[url('/macos_wallpaper.png')] bg-cover bg-center" />
        </div>
        
        <div className="z-10 w-full max-w-4xl px-4">
          <MacWindow title="Finder" className="hero-window max-w-3xl mx-auto shadow-[0_0_100px_rgba(0,113,227,0.2)]">
            <div className="flex flex-col items-center text-center py-20 px-8">
              <h1 className="hero-title text-5xl md:text-7xl font-bold tracking-tight mb-6 flex flex-wrap justify-center gap-x-3">
                {"A Experiência macOS".split(" ").map((w,i)=><span key={i} className="word inline-block">{w}</span>)}
              </h1>
              <p className="hero-subtitle text-xl text-[var(--mac-muted)] max-w-xl mx-auto mb-10 leading-relaxed">
                Uma análise acadêmica profunda sobre a arquitetura, interface e evolução do sistema operacional desktop mais avançado da Apple.
              </p>
              <div className="hero-badges flex gap-4">
                <span className="px-4 py-1.5 rounded-full bg-[var(--mac-blue)]/20 text-[var(--mac-blue)] font-medium text-sm border border-[var(--mac-blue)]/30">
                  Darwin Core
                </span>
                <span className="px-4 py-1.5 rounded-full bg-white/10 text-[var(--mac-text)] font-medium text-sm border border-white/10">
                  Aqua GUI
                </span>
              </div>
            </div>
          </MacWindow>
        </div>
      </section>

      <div className="max-w-5xl mx-auto w-full px-4 flex flex-col gap-32 relative z-10">
        <Section01 />
        <Section02 />
        <Section03 />
        <Section04 />
        <Section05 />
        <Section06 />
        <Section07 />
        <Section08 />
        <Section09 />
      </div>
    </div>
  );
}
