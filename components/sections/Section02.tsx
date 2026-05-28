"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MacWindow } from "@/components/MacWindow";

export function Section02() {
  const ref = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useScrollAnimation(ref, [".milestone-card"]);

  const milestones = [
    { year: "1984", title: "Mac OS (Classic)", desc: "Apresentado com o primeiro Macintosh, revolucionando as GUIs com menus suspensos, lixeira e pastas de arquivos." },
    { year: "2001", title: "Mac OS X Cheetah", desc: "Reescrito do zero. Baseado no NeXTSTEP e núcleo Unix (Darwin), introduzindo a moderna interface Aqua e super estabilidade." },
    { year: "2013", title: "OS X Mavericks", desc: "Fim da nomenclatura baseada em felinos e início das regiões icônicas da Califórnia. Otimizações de consumo e RAM comprimida." },
    { year: "2020", title: "macOS Big Sur", desc: "Transição histórica para chips de fabricação própria (Apple Silicon) e redesenho profundo da interface inspirado no iOS." },
    { year: "2024", title: "macOS Sequoia", desc: "Integração profunda com a inteligência artificial generativa nativa (Apple Intelligence) e espelhamento de iPhone." },
  ];

  useEffect(() => {
    if (!containerRef.current || !ref.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const scrollContainer = containerRef.current;
    const section = ref.current;
    
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop layout: Horizontal Pinning Scroll with dynamic calculations and end buffer pause
      mm.add("(min-width: 769px)", () => {
        const getScrollAmount = () => {
          const parentWidth = scrollContainer.parentElement?.clientWidth || 0;
          return Math.max(0, scrollContainer.scrollWidth - parentWidth);
        };
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 0.8,
            start: "center center",
            end: () => `+=${getScrollAmount() + 600}`, // Add 600px of scroll distance for the pause
            invalidateOnRefresh: true,
            anticipatePin: 1,
          }
        });

        // 1. Move the carousel horizontally (duration 1.0)
        tl.to(scrollContainer, {
          x: () => -getScrollAmount(),
          ease: "none",
          duration: 1.0,
        });

        // 2. Add a pause buffer at the end so it stays pinned (duration 0.4)
        tl.to({}, { duration: 0.4 });

        // 3. Connect progress of the horizontal bar to the scroll scrub (ends at same time as translation)
        tl.fromTo(".timeline-progress-bar", 
          { width: "0%" },
          { 
            width: "100%", 
            ease: "none",
            duration: 1.0,
          },
          0 // Start at 0 (parallel with horizontal translation)
        );
      });

      // Mobile layout: Instant display to guarantee text and cards are visible on iPhones
      mm.add("(max-width: 768px)", () => {
        const items = scrollContainer.querySelectorAll(".timeline-item");
        gsap.set(items, { opacity: 1, y: 0 });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full relative">
      <section id="section-02" ref={ref} className="scroll-mt-20">
        <MacWindow title="História_e_Evolução.app">
          <div className="py-6 overflow-hidden w-full relative min-h-[380px]">
            
            {/* Timeline Wrapper (Desktop / Horizontal Mask) */}
            <div className="hidden md:block relative w-full overflow-hidden">
              {/* Horizontal Container */}
              <div 
                ref={containerRef} 
                className="timeline-scroll-container flex flex-nowrap gap-12 px-10 relative z-10 py-6"
                style={{ width: "fit-content" }}
              >
                {/* Sliding Connecting Line (Placed inside to slide with elements) */}
                <div className="absolute top-[24px] left-[50px] right-[50px] h-[3px] bg-white/10 z-0">
                  <div className="timeline-progress-bar h-full bg-[var(--mac-blue)] w-0 rounded-full shadow-[0_0_12px_rgba(0,113,227,0.8)]" />
                </div>

                {milestones.map((item, idx) => (
                  <div key={idx} className="timeline-item w-[300px] shrink-0 flex flex-col items-start group relative">
                    {/* Glowing Node */}
                    <div className="w-5 h-5 rounded-full bg-[var(--mac-surface)] border-4 border-[var(--mac-blue)] shadow-[0_0_10px_rgba(0,113,227,0.5)] z-10 mb-6 group-hover:scale-130 group-hover:bg-[var(--mac-blue)] transition-all cursor-default" />
                    
                    {/* Card Content */}
                    <div className="milestone-card bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 w-full shadow-md">
                      <span className="text-[var(--mac-blue)] font-extrabold text-2xl tracking-tight block mb-2">{item.year}</span>
                      <h3 className="text-md font-bold mb-2 text-white">{item.title}</h3>
                      <p className="text-[var(--mac-muted)] text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Layout (Vertical Timeline) */}
            <div className="md:hidden relative px-4 py-2 flex flex-col gap-8">
              {/* Vertical Line on Left */}
              <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[var(--mac-blue)] to-[var(--mac-muted)] opacity-30 z-0" />
              
              {milestones.map((item, idx) => (
                <div key={idx} className="timeline-item flex items-start gap-4 relative z-10">
                  {/* Node */}
                  <div className="w-4 h-4 rounded-full bg-[var(--mac-surface)] border-4 border-[var(--mac-blue)] shrink-0 mt-2 z-10" />
                  
                  {/* Card */}
                  <div className="milestone-card flex-1 bg-white/5 border border-white/10 p-5 rounded-2xl">
                    <span className="text-[var(--mac-blue)] font-bold text-lg block mb-1">{item.year}</span>
                    <h3 className="text-sm font-bold mb-1 text-white">{item.title}</h3>
                    <p className="text-[var(--mac-muted)] text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </MacWindow>
      </section>
    </div>
  );
}
