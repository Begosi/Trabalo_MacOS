"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MacWindow } from "@/components/MacWindow";

export function Section09() {
  const ref = useRef<HTMLElement>(null);
  useScrollAnimation(ref, [".licensing-card"]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (ref.current) {
      // Circular SVG fill animation
      const circles = ref.current.querySelectorAll(".circle-fill");
      
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 75%",
        onEnter: () => {
          gsap.fromTo(circles,
            { strokeDashoffset: 283 }, // 2 * PI * r (r=45) = 282.7
            {
              strokeDashoffset: (i, target) => {
                const percent = parseInt(target.getAttribute("data-percent") || "0");
                return 283 - (283 * percent) / 100;
              },
              duration: 2,
              ease: "power3.out",
              stagger: 0.3
            }
          );
        }
      });
    }
  }, []);

  return (
    <section id="section-09" ref={ref} className="scroll-mt-20 mb-20">
      <MacWindow title="Licenciamento.info">
        <div className="py-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Modelo Híbrido de Licenciamento</h2>
            <p className="text-[var(--mac-muted)]">O balanço entre código aberto e ecossistema proprietário.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* macOS */}
            <div className="licensing-card bg-black/40 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center">
              <div className="relative w-32 h-32 mb-6">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="var(--mac-surface)" strokeWidth="8" />
                  <circle 
                    className="circle-fill" 
                    cx="50" cy="50" r="45" fill="none" 
                    stroke="var(--mac-blue)" strokeWidth="8" 
                    strokeDasharray="283" strokeDashoffset="283" 
                    data-percent="50" 
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="font-bold text-xl">Híbrido</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">macOS</h3>
              <p className="text-sm text-[var(--mac-muted)]">Core aberto (Darwin/APSL), mas GUI (Aqua) e frameworks de alto nível são totalmente fechados e proprietários.</p>
            </div>

            {/* Linux */}
            <div className="licensing-card bg-black/40 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center opacity-80">
              <div className="relative w-32 h-32 mb-6">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="var(--mac-surface)" strokeWidth="8" />
                  <circle 
                    className="circle-fill" 
                    cx="50" cy="50" r="45" fill="none" 
                    stroke="var(--mac-green)" strokeWidth="8" 
                    strokeDasharray="283" strokeDashoffset="283" 
                    data-percent="100" 
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="font-bold text-xl">100%</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Linux</h3>
              <p className="text-sm text-[var(--mac-muted)]">Totalmente open-source (GPL). Permite modificação profunda do kernel à interface gráfica.</p>
            </div>

            {/* Windows */}
            <div className="licensing-card bg-black/40 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center opacity-80">
              <div className="relative w-32 h-32 mb-6">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="var(--mac-surface)" strokeWidth="8" />
                  <circle 
                    className="circle-fill" 
                    cx="50" cy="50" r="45" fill="none" 
                    stroke="var(--mac-amber)" strokeWidth="8" 
                    strokeDasharray="283" strokeDashoffset="283" 
                    data-percent="5" 
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="font-bold text-xl">Fechado</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Windows</h3>
              <p className="text-sm text-[var(--mac-muted)]">Software comercial proprietário (EULA restrita). Componentes isolados abertos recentemente, mas núcleo é fechado.</p>
            </div>

          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-4">
            <span className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-white/5 border border-white/10 text-[11px] sm:text-xs font-medium text-center">Darwin Open Source</span>
            <span className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-white/5 border border-white/10 text-[11px] sm:text-xs font-medium text-center">GUI Proprietária</span>
          </div>
        </div>
      </MacWindow>
    </section>
  );
}
