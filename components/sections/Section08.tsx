"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MacWindow } from "@/components/MacWindow";
import { CheckCircle2, XCircle } from "lucide-react";

export function Section08() {
  const ref = useRef<HTMLElement>(null);
  useScrollAnimation(ref, [".panel-container"]);

  useEffect(() => {
    if (!ref.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const proItems = ref.current.querySelectorAll(".pro-item");
    const conItems = ref.current.querySelectorAll(".con-item");

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        // Alternate left/right entry
        ScrollTrigger.create({
          trigger: ref.current,
          start: "top 70%",
          onEnter: () => {
            gsap.fromTo(proItems, 
              { x: -50, opacity: 0 }, 
              { x: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out" }
            );
            gsap.fromTo(conItems, 
              { x: 50, opacity: 0 }, 
              { x: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out", delay: 0.1 }
            );
          }
        });
      });

      mm.add("(max-width: 768px)", () => {
        // Instant visual presentation on mobile (iPhones)
        gsap.set(proItems, { x: 0, opacity: 1 });
        gsap.set(conItems, { x: 0, opacity: 1 });
      });

    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section id="section-08" ref={ref} className="scroll-mt-20">
      <MacWindow title="Pros_e_Contras.rtf">
        <div className="panel-container flex flex-col md:flex-row gap-6 py-4">
          
          {/* Pros */}
          <div className="flex-1 bg-gradient-to-b from-[var(--mac-green)]/10 to-transparent border border-[var(--mac-green)]/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-6 text-[var(--mac-green)] flex items-center gap-2">
              <CheckCircle2 />
              Vantagens
            </h3>
            <ul className="flex flex-col gap-4">
              <li className="pro-item flex items-start gap-3">
                <div className="mt-1 min-w-[8px] h-2 w-2 rounded-full bg-[var(--mac-green)]" />
                <p className="text-sm"><strong>Ecossistema Integrado:</strong> Continuidade perfeita com iOS e iPadOS.</p>
              </li>
              <li className="pro-item flex items-start gap-3">
                <div className="mt-1 min-w-[8px] h-2 w-2 rounded-full bg-[var(--mac-green)]" />
                <p className="text-sm"><strong>Segurança Nativa:</strong> UNIX + Gatekeeper reduzem drasticamente malwares.</p>
              </li>
              <li className="pro-item flex items-start gap-3">
                <div className="mt-1 min-w-[8px] h-2 w-2 rounded-full bg-[var(--mac-green)]" />
                <p className="text-sm"><strong>Otimização de Hardware:</strong> Desempenho incomparável nos chips Apple Silicon.</p>
              </li>
              <li className="pro-item flex items-start gap-3">
                <div className="mt-1 min-w-[8px] h-2 w-2 rounded-full bg-[var(--mac-green)]" />
                <p className="text-sm"><strong>Ferramentas de Criação:</strong> Essencial para desenvolvimento iOS e design profissional.</p>
              </li>
            </ul>
          </div>

          {/* Cons */}
          <div className="flex-1 bg-gradient-to-b from-red-500/10 to-transparent border border-red-500/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-6 text-red-400 flex items-center gap-2">
              <XCircle />
              Desvantagens
            </h3>
            <ul className="flex flex-col gap-4">
              <li className="con-item flex items-start gap-3">
                <div className="mt-1 min-w-[8px] h-2 w-2 rounded-full bg-red-500" />
                <p className="text-sm"><strong>Hardware Proprietário:</strong> Execução legal permitida apenas em hardware Apple (caro).</p>
              </li>
              <li className="con-item flex items-start gap-3">
                <div className="mt-1 min-w-[8px] h-2 w-2 rounded-full bg-red-500" />
                <p className="text-sm"><strong>Fechamento do Sistema:</strong> Menos personalização visual ou a nível de kernel comparado ao Linux.</p>
              </li>
              <li className="con-item flex items-start gap-3">
                <div className="mt-1 min-w-[8px] h-2 w-2 rounded-full bg-red-500" />
                <p className="text-sm"><strong>Catálogo de Jogos:</strong> Ainda inferior ao Windows para jogos AAA, apesar dos esforços com Metal 3.</p>
              </li>
              <li className="con-item flex items-start gap-3">
                <div className="mt-1 min-w-[8px] h-2 w-2 rounded-full bg-red-500" />
                <p className="text-sm"><strong>Custo de Manutenção:</strong> Upgrades de hardware são impossíveis após a compra (RAM/SSD soldados).</p>
              </li>
            </ul>
          </div>

        </div>
      </MacWindow>
    </section>
  );
}
