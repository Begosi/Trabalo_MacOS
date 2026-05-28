"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { 
  Terminal, Layers, MonitorSmartphone, ShieldCheck, 
  Cpu, AppWindow, ThumbsUp, Scale, Settings
} from "lucide-react";

const dockItems = [
  { id: "section-01", icon: <Settings className="w-6 h-6" />, label: "Conceito" },
  { id: "section-02", icon: <Terminal className="w-6 h-6" />, label: "História" },
  { id: "section-03", icon: <Layers className="w-6 h-6" />, label: "Arquitetura" },
  { id: "section-04", icon: <MonitorSmartphone className="w-6 h-6" />, label: "Interface" },
  { id: "section-05", icon: <ShieldCheck className="w-6 h-6" />, label: "Segurança" },
  { id: "section-06", icon: <Cpu className="w-6 h-6" />, label: "Recursos" },
  { id: "section-07", icon: <AppWindow className="w-6 h-6" />, label: "Aplicações" },
  { id: "section-08", icon: <ThumbsUp className="w-6 h-6" />, label: "Prós/Contras" },
  { id: "section-09", icon: <Scale className="w-6 h-6" />, label: "Licenciamento" },
];

export function Dock() {
  const dockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dockNode = dockRef.current;
    if (!dockNode) return;
    
    const icons = dockNode.querySelectorAll(".dock-icon");
    
    const handleMouseMove = (e: MouseEvent) => {
      icons.forEach((icon) => {
        const rect = icon.getBoundingClientRect();
        const iconCenterX = rect.left + rect.width / 2;
        const distance = Math.abs(e.clientX - iconCenterX);
        
        // Magentic / Magnify effect based on distance
        const maxDist = 150;
        const scale = distance < maxDist ? 1 + (maxDist - distance) / maxDist * 0.4 : 1;
        
        gsap.to(icon, {
          scale: scale,
          duration: 0.1,
          ease: "power2.out",
          transformOrigin: "bottom center"
        });
      });
    };

    const handleMouseLeave = () => {
      icons.forEach((icon) => {
        gsap.to(icon, {
          scale: 1,
          duration: 0.3,
          ease: "elastic.out(1, 0.3)"
        });
      });
    };

    dockNode.addEventListener("mousemove", handleMouseMove);
    dockNode.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      dockNode.removeEventListener("mousemove", handleMouseMove);
      dockNode.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[95vw]">
      <div 
        ref={dockRef}
        className="flex items-end gap-1.5 sm:gap-2 px-2 sm:px-3 pb-1.5 sm:pb-2 pt-2 sm:pt-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-x-auto scrollbar-none flex-nowrap"
      >
        {dockItems.map((item) => (
          <div key={item.id} className="relative group flex flex-col items-center shrink-0">
            {/* Tooltip (Desktop Only) */}
            <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white text-[11px] px-2 py-1 rounded-md pointer-events-none whitespace-nowrap hidden sm:block">
              {item.label}
            </div>
            
            {/* Icon */}
            <button
              onClick={() => scrollToSection(item.id)}
              className="dock-icon w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center bg-gradient-to-b from-white/20 to-white/5 border border-white/20 rounded-lg sm:rounded-xl hover:bg-white/30 transition-colors shadow-lg cursor-pointer"
            >
              <div className="text-[var(--mac-text)] opacity-90 scale-75 sm:scale-100 transition-transform flex items-center justify-center">
                {item.icon}
              </div>
            </button>
            
            {/* Dot indicator (Desktop Only) */}
            <div className="w-1 h-1 bg-white/50 rounded-full mt-1 sm:mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block" />
          </div>
        ))}
      </div>
    </div>
  );
}
