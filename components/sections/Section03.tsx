"use client";
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MacWindow } from "@/components/MacWindow";
import { MacModal } from "@/components/MacModal";
import { Layers } from "lucide-react";

interface ArchLayerItem {
  name: string;
  subtitle: string;
  desc: string;
  colorClass: string;
  detailedContent: string;
  academicDetails: string;
}

export function Section03() {
  const ref = useRef<HTMLElement>(null);
  const [selectedLayer, setSelectedLayer] = useState<ArchLayerItem | null>(null);
  
  useScrollAnimation(ref, [".mac-card"]);

  const layersData: ArchLayerItem[] = [
    {
      name: "Applications (User Experience)",
      subtitle: "Camada de Aplicação do Usuário",
      desc: "Safari, Xcode, Final Cut Pro, Interface Aqua.",
      colorClass: "from-purple-500/20 to-pink-500/20 border-white/20 hover:from-purple-500/30 hover:to-pink-500/30",
      detailedContent: "A camada visível do macOS, composta por aplicativos nativos e de terceiros que interagem diretamente com o usuário através de diretrizes de design altamente refinadas.",
      academicDetails: "No ecossistema moderno do macOS, a camada de aplicação é regida por dois pilares fundamentais:\n\n1. Universal Binaries: Pacotes de distribuição que contêm código compilado tanto para arquitetura Intel (x86_64) quanto para arquitetura Apple Silicon (ARM64), garantindo execução nativa em qualquer processador.\n2. Rosetta 2: Um tradutor binário dinâmico em tempo de execução que traduz instruções x86_64 para ARM64. Isso permite rodar apps antigos com performance surpreendente.\n3. Sandboxing de Aplicativos: Todos os apps distribuídos pela App Store rodam em contêineres restritos que limitam o acesso direto a dados do sistema e hardwares não autorizados, mitigando riscos de segurança."
    },
    {
      name: "Frameworks (Cocoa & Metal)",
      subtitle: "APIs e Bibliotecas de Alto Desempenho",
      desc: "APIs ricas para desenvolvedores de interfaces e gráficos 3D.",
      colorClass: "from-blue-500/20 to-cyan-500/20 border-white/20 hover:from-blue-500/30 hover:to-cyan-500/30",
      detailedContent: "Esta camada expõe os conjuntos de APIs nativas que permitem aos desenvolvedores construir interfaces sofisticadas e explorar o máximo do poder de processamento gráfico.",
      academicDetails: "Os frameworks essenciais do macOS se dividem em duas frentes de grande impacto técnico:\n\n1. Cocoa / AppKit & SwiftUI: O ecossistema clássico de desenvolvimento orientada a objetos (Cocoa, unindo as bibliotecas Foundation e AppKit em Objective-C/Swift) e o moderno ecossistema declarativo (SwiftUI), que ditam o comportamento de janelas, views e o ciclo de vida dos aplicativos.\n2. Metal API: A API gráfica de baixo nível e baixa sobrecarga que substituiu o OpenGL. Projetada especificamente para aproveitar a arquitetura de Memória Unificada das GPUs Apple Silicon. O Metal dá acesso direto à GPU, permitindo renderização 3D de alta performance, computação geral (GPGPU) e processamento rápido de machine learning."
    },
    {
      name: "Core OS & Core Services",
      subtitle: "Serviços e Regras de Segurança Básicas",
      desc: "Gerenciamento de memória, rede, segurança (Gatekeeper).",
      colorClass: "from-green-500/20 to-emerald-500/20 border-white/20 hover:from-green-500/30 hover:to-emerald-500/30",
      detailedContent: "Camada intermediária invisível ao usuário final, mas crucial. Responsável por serviços de rede, segurança básica e estruturas lógicas primárias do sistema.",
      academicDetails: "Os Core Services fornecem as bases de sistema para as camadas superiores. Entre eles estão:\n\n1. Core Foundation: Biblioteca escrita em C que fornece abstrações essenciais para strings, datas, coleções e comunicação básica.\n2. Framework TCC (Transparency, Consent, and Control): O mecanismo de segurança que intercepta qualquer requisição de acesso sensível (como câmera, microfone, arquivos na pasta Downloads) e exibe as caixas de diálogo para consentimento explícito do usuário.\n3. Gatekeeper: Serviço lógico que analisa assinaturas de código criptográficas e atestados de notarização da Apple antes de liberar a execução de qualquer aplicativo."
    },
    {
      name: "Darwin (Base) & XNU",
      subtitle: "O Núcleo UNIX do macOS",
      desc: "Núcleo Mach + BSD. Baixo nível, drivers de hardware, escalonamento.",
      colorClass: "bg-[var(--mac-surface)] border-[var(--mac-blue)]/50 hover:border-[var(--mac-blue)] hover:bg-white/5",
      detailedContent: "O alicerce de baixo nível do macOS. Baseado no Darwin OS, um sistema operacional open-source construído em cima do kernel híbrido XNU.",
      academicDetails: "O XNU ('X is Not Unix') é o coração do macOS. Ele é um kernel híbrido composto por:\n\n1. Microkernel Mach: Gerencia os recursos mais fundamentais do sistema, como threads, escalonamento de tarefas, IPC (Comunicação Interprocesso) de baixo nível e paginação de memória virtual.\n2. FreeBSD (Base UNIX): Provê a camada de compatibilidade POSIX, o modelo de processos tradicional UNIX (PIDs, fork, exec), a pilha de rede TCP/IP robusta, o sistema de arquivos virtual (VFS) e as políticas de segurança clássicas.\n3. I/O Kit: Um framework orientado a objetos baseado em um subconjunto restrito do C++ para desenvolvimento eficiente de drivers de dispositivos, gerenciamento de energia térmica e detecção Plug and Play."
    }
  ];

  useEffect(() => {
    if (!ref.current) return;
    gsap.registerPlugin(ScrollTrigger);
    
    const layers = ref.current.querySelectorAll(".arch-layer");
    
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      
      mm.add("(min-width: 769px)", () => {
        gsap.fromTo(layers, 
          { opacity: 0, y: 50 },
          {
            opacity: 1, 
            y: 0, 
            duration: 0.8,
            stagger: -0.2, // Animate from bottom to top visually
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 70%",
            }
          }
        );
      });

      mm.add("(max-width: 768px)", () => {
        gsap.set(layers, { opacity: 1, y: 0 });
      });

      // Pulse animation for Hybrid Kernel badge
      gsap.to(".kernel-badge", {
        scale: 1.05,
        opacity: 0.8,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section id="section-03" ref={ref} className="scroll-mt-20">
      <MacWindow title="Arquitetura_do_Sistema.pdf">
        <div className="mac-card py-10 flex flex-col items-center gap-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
              <Layers className="text-[var(--mac-blue)] animate-pulse" />
              Arquitetura em Camadas
            </h2>
            <p className="text-[var(--mac-muted)] max-w-lg mx-auto">
              O macOS possui uma arquitetura robusta baseada em UNIX, garantindo estabilidade, segurança e performance extrema. Clique em cada camada para explorar detalhes do núcleo.
            </p>
          </div>

          <div className="w-full max-w-xl flex flex-col gap-3 perspective-1000">
            {layersData.map((layer, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedLayer(layer)}
                className={`arch-layer text-left w-full bg-gradient-to-r ${layer.colorClass} border p-6 rounded-xl backdrop-blur-md shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.99] cursor-pointer relative overflow-hidden group`}
              >
                {/* Special Kernel Badge for Darwin Layer */}
                {layer.name.includes("Darwin") && (
                  <div className="absolute top-0 right-0 p-2">
                    <span className="kernel-badge inline-block bg-[var(--mac-blue)] text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded-full shadow-[0_0_15px_rgba(0,113,227,0.8)]">
                      Kernel Híbrido
                    </span>
                  </div>
                )}
                
                <h3 className="font-bold text-xl mb-1 text-white group-hover:text-[var(--mac-blue)] transition-colors flex items-center gap-2">
                  {layer.name}
                </h3>
                <p className="text-xs text-[var(--mac-silver)] uppercase tracking-wider font-semibold mb-1">{layer.subtitle}</p>
                <p className="text-sm text-[var(--mac-text)]/70 group-hover:text-[var(--mac-text)] transition-colors leading-relaxed">{layer.desc}</p>
                
                <span className="text-[10px] uppercase tracking-widest text-[var(--mac-blue)] font-bold mt-3 block group-hover:translate-x-1 transition-transform">
                  Inspecionar Camada &rarr;
                </span>
              </button>
            ))}
          </div>
        </div>
      </MacWindow>

      {/* Layer Detail Dialog Modal */}
      <MacModal
        isOpen={selectedLayer !== null}
        onClose={() => setSelectedLayer(null)}
        title={selectedLayer?.name || ""}
        subtitle={selectedLayer?.name}
        icon={<Layers className="w-6 h-6" />}
        content={selectedLayer?.detailedContent}
        academicDetails={selectedLayer?.academicDetails}
      />
    </section>
  );
}
