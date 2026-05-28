"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MacWindow } from "@/components/MacWindow";

export function Section06() {
  const ref = useRef<HTMLElement>(null);
  useScrollAnimation(ref, [".resource-card"]);

  useEffect(() => {
    if (!ref.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const counters = ref.current.querySelectorAll(".counter-value");
    const progressBarsHoriz = ref.current.querySelectorAll(".progress-fill-horizontal");
    const progressBarsVert = ref.current.querySelectorAll(".progress-fill-vertical");

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        // Counter animation
        counters.forEach((counter) => {
          const targetValue = parseInt(counter.getAttribute("data-target") || "0", 10);
          
          ScrollTrigger.create({
            trigger: ref.current,
            start: "top 75%",
            onEnter: () => {
              gsap.fromTo(counter, 
                { innerHTML: 0 }, 
                {
                  innerHTML: targetValue,
                  duration: 2,
                  ease: "power2.out",
                  snap: { innerHTML: 1 },
                  onUpdate: function() {
                    counter.innerHTML = Math.round(this.targets()[0].innerHTML).toString() + (counter.getAttribute("data-suffix") || "");
                  }
                }
              );
            }
          });
        });

        // Progress bars (horizontal width)
        ScrollTrigger.create({
          trigger: ref.current,
          start: "top 75%",
          onEnter: () => {
            gsap.fromTo(progressBarsHoriz,
              { width: "0%" },
              {
                width: (i, target) => target.getAttribute("data-width") || "0%",
                duration: 1.5,
                ease: "power3.out",
                stagger: 0.2
              }
            );
          }
        });

        // Progress bars (vertical height in CPU chart)
        ScrollTrigger.create({
          trigger: ref.current,
          start: "top 75%",
          onEnter: () => {
            gsap.fromTo(progressBarsVert,
              { height: "0%" },
              {
                height: (i, target) => target.getAttribute("data-height") || "0%",
                duration: 1.5,
                ease: "power3.out",
                stagger: 0.2
              }
            );
          }
        });
      });

      mm.add("(max-width: 768px)", () => {
        // Instant visual presentation on mobile (iPhones)
        counters.forEach((counter) => {
          const targetValue = counter.getAttribute("data-target") || "0";
          const suffix = counter.getAttribute("data-suffix") || "";
          counter.innerHTML = targetValue + suffix;
        });

        progressBarsHoriz.forEach((bar) => {
          const targetWidth = bar.getAttribute("data-width") || "0%";
          gsap.set(bar, { width: targetWidth });
        });

        progressBarsVert.forEach((bar) => {
          const targetHeight = bar.getAttribute("data-height") || "0%";
          gsap.set(bar, { height: targetHeight });
        });
      });

    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section id="section-06" ref={ref} className="scroll-mt-20">
      <MacWindow title="Monitor_de_Atividade.app">
        <div className="py-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Gerenciamento de Recursos</h2>
            <p className="text-[var(--mac-muted)]">A eficiência térmica e energética sem precedentes do Apple Silicon.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Memory Pressure */}
            <div className="resource-card bg-black/30 border border-white/5 rounded-xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold mb-4 text-xs uppercase tracking-wider text-[var(--mac-muted)]">Pressão de Memória (Swap Otimizado)</h3>
                <div className="flex items-end justify-between mb-2">
                  <div className="text-4xl font-bold text-[var(--mac-blue)]">
                    <span className="counter-value" data-target="8" data-suffix=" GB">0 GB</span>
                  </div>
                  <div className="text-sm text-[var(--mac-muted)]">Usados de 16 GB</div>
                </div>
                <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                  <div className="progress-fill-horizontal bg-[var(--mac-green)] h-full w-0" data-width="50%" />
                </div>
              </div>
              <p className="text-xs mt-6 text-[var(--mac-muted)] leading-relaxed">A compressão de memória RAM do macOS reduz drasticamente o uso do disco swap (SSD), prolongando sua vida útil e evitando gargalos de performance.</p>
            </div>

            {/* CPU Cores */}
            <div className="resource-card bg-black/30 border border-white/5 rounded-xl p-6">
              <h3 className="font-semibold mb-4 text-xs uppercase tracking-wider text-[var(--mac-muted)]">Eficiência Apple Silicon (M-Series)</h3>
              <div className="flex items-end justify-between mb-4">
                <div className="text-4xl font-bold text-[var(--mac-amber)]">
                  <span className="counter-value" data-target="3" data-suffix="x">0x</span>
                </div>
                <div className="text-sm text-[var(--mac-muted)]">Mais performance por Watt</div>
              </div>
              
              <div className="flex items-end gap-6 h-20 border-b border-white/10 pb-2 px-4 justify-around">
                {/* Simulated bar chart columns */}
                <div className="w-16 flex flex-col justify-end items-center gap-1.5 h-full">
                  <div className="progress-fill-vertical bg-white/20 w-full rounded-t-lg transition-all" data-height="30%" style={{ height: "0%" }}></div>
                  <span className="text-[10px] text-[var(--mac-muted)] font-medium">Intel x86</span>
                </div>
                <div className="w-16 flex flex-col justify-end items-center gap-1.5 h-full">
                  <div className="progress-fill-vertical bg-[var(--mac-blue)] w-full rounded-t-lg transition-all shadow-[0_0_15px_rgba(0,113,227,0.3)]" data-height="90%" style={{ height: "0%" }}></div>
                  <span className="text-[10px] text-[var(--mac-silver)] font-semibold">ARM M-Series</span>
                </div>
              </div>
              <p className="text-xs mt-4 text-[var(--mac-muted)] leading-relaxed">Arquitetura assimétrica combinando núcleos de alta performance (P-cores) e alta eficiência (E-cores), controlados dinamicamente em microsegundos pelo kernel XNU.</p>
            </div>
          </div>
        </div>
      </MacWindow>
    </section>
  );
}
