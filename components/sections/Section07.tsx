"use client";
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MacWindow } from "@/components/MacWindow";

const appsData = [
  { name: "Xcode", category: "Dev", color: "bg-blue-500" },
  { name: "VS Code", category: "Dev", color: "bg-blue-600" },
  { name: "Terminal", category: "Dev", color: "bg-gray-800" },
  { name: "Final Cut Pro", category: "Criação", color: "bg-purple-500" },
  { name: "Logic Pro", category: "Criação", color: "bg-gray-700" },
  { name: "Figma", category: "Criação", color: "bg-pink-500" },
  { name: "Resident Evil 4", category: "Jogos", color: "bg-red-900" },
  { name: "Death Stranding", category: "Jogos", color: "bg-amber-700" },
  { name: "Microsoft Office", category: "Corporativo", color: "bg-orange-600" },
  { name: "Slack", category: "Corporativo", color: "bg-indigo-600" },
];

const categories = ["Todos", "Dev", "Criação", "Jogos", "Corporativo"];

export function Section07() {
  const ref = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState("Todos");
  const containerRef = useRef<HTMLDivElement>(null);

  useScrollAnimation(ref, [".app-grid-container"]);

  useEffect(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll(".app-item");
    
    // Simple filter animation
    gsap.to(items, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      stagger: 0.02,
      onComplete: () => {
        items.forEach((itemNode) => {
          const item = itemNode as HTMLElement;
          const category = item.getAttribute("data-category");
          if (activeTab === "Todos" || category === activeTab) {
            item.style.display = "flex";
            gsap.to(item, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.5)", stagger: 0.05 });
          } else {
            item.style.display = "none";
          }
        });
      }
    });
  }, [activeTab]);

  return (
    <section id="section-07" ref={ref} className="scroll-mt-20">
      <MacWindow title="Launchpad.app">
        <div className="py-4 app-grid-container">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Ecossistema de Aplicações</h2>
            <p className="text-[var(--mac-muted)]">Rosetta 2 e Universal Binaries garantem compatibilidade total.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                  activeTab === cat 
                    ? "bg-[var(--mac-blue)] text-white border-[var(--mac-blue)]" 
                    : "bg-white/5 border-white/10 text-[var(--mac-muted)] hover:text-white hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div ref={containerRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 min-h-[250px]">
            {appsData.map((app, idx) => (
              <div 
                key={idx} 
                data-category={app.category}
                className="app-item flex flex-col items-center gap-3 cursor-pointer group"
              >
                <div className={`w-16 h-16 rounded-2xl ${app.color} shadow-lg border border-white/20 flex items-center justify-center text-xl font-bold text-white group-hover:scale-110 transition-transform`}>
                  {app.name.charAt(0)}
                </div>
                <span className="text-xs text-center text-[var(--mac-text)] font-medium group-hover:text-white">{app.name}</span>
              </div>
            ))}
          </div>
        </div>
      </MacWindow>
    </section>
  );
}
