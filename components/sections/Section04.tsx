"use client";
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MacWindow } from "@/components/MacWindow";
import { MacModal } from "@/components/MacModal";
import { Folder, HardDrive, Image as ImageIcon, Music, Terminal as TerminalIcon } from "lucide-react";

interface InterfaceTopic {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  desc: string;
  detailedContent: string;
  academicDetails: string;
}

export function Section04() {
  const ref = useRef<HTMLElement>(null);
  const [selectedTopic, setSelectedTopic] = useState<InterfaceTopic | null>(null);
  
  useScrollAnimation(ref, [".mac-card"]);

  const topics: Record<string, InterfaceTopic> = {
    aqua: {
      title: "Finder & Interface Aqua",
      subtitle: "A Interface Gráfica de Usuário (GUI)",
      icon: <Folder className="text-blue-400 w-6 h-6" />,
      desc: "Elegância visual, consistência de layout e facilidade de interação centrada no usuário.",
      detailedContent: "A interface Aqua, introduzida em 2000, revolucionou o mercado com seu design baseado em água, transparências de vidro, sombras suaves e fluidez visual.",
      academicDetails: "A interface Aqua é o resultado das diretrizes de design mais rigorosas da indústria, as Human Interface Guidelines (HIG) da Apple. Seus fundamentos técnicos e históricos incluem:\n\n1. Evolução Estética: Começou altamente skeuomórfica (simulando materiais reais como metal escovado, gel líquido e vidro espesso) para ensinar usuários a interagir com elementos lógicos. Ao longo dos anos, evoluiu para uma estética minimalista, semi-translúcida (glassmorphism).\n2. Quartz Compositor: O servidor gráfico responsável por renderizar cada janela de forma independente em buffers separados da GPU, gerando sombras suaves em tempo real e transições fluidas.\n3. Consistência e Ergonomia: A barra de menus unificada no topo da tela, os atalhos globais consistentes, a lixeira contextual e o Dock dinâmico reduzem a carga cognitiva do usuário."
    },
    terminal: {
      title: "Terminal & Shell UNIX",
      subtitle: "A Interface de Linha de Comando (CLI)",
      icon: <TerminalIcon className="text-green-400 w-6 h-6" />,
      desc: "O poder bruto do padrão POSIX UNIX sob o capô da interface gráfica.",
      detailedContent: "Sob a belíssima interface gráfica Aqua repousa um sistema operacional UNIX completo, com certificação oficial POSIX e terminal de linha de comando robusto.",
      academicDetails: "O Terminal do macOS oferece aos desenvolvedores, administradores de sistemas e cientistas de dados o poder de um ecossistema UNIX puro:\n\n1. Certificação UNIX: O macOS é formalmente certificado pela The Open Group como um sistema operacional UNIX nativo. Isso garante compatibilidade total com scripts, servidores e utilitários clássicos de ambientes acadêmicos.\n2. Transição de Bash para Zsh: A partir do macOS Catalina (2019), a Apple substituiu o shell padrão Bash pelo Zsh (Z Shell). Essa mudança foi motivada por licenciamento (GPLv3 do Bash vs Licença MIT-like do Zsh) e para oferecer recursos modernos de autocompletar, correção ortográfica de diretórios e alta customização nativamente.\n3. Gerenciamento e Ferramentas: Suporte a compiladores nativos LLVM/Clang, controle de processos de baixo nível (launchctl), ferramentas avançadas de rede (networksetup) e fácil integração de gerenciadores de pacotes populares como o Homebrew."
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (ref.current) {
      // 3D Flip effect on scroll
      gsap.fromTo(".split-screen-container",
        { rotationY: -15, scale: 0.9, opacity: 0 },
        {
          rotationY: 0,
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
          }
        }
      );

      // Typewriter effect for terminal
      const text = "uname -a\nDarwin MacBook-Pro.local 23.0.0 Darwin Kernel Version 23.0.0: root:xnu-10002.1.13~1/RELEASE_ARM64_T8103 arm64\n$ sw_vers\nProductName: macOS\nProductVersion: 14.0\nBuildVersion: 23A344\n$ _";
      const terminalText = ref.current.querySelector(".terminal-text");
      
      if (terminalText) {
        terminalText.textContent = "";
        const charArray = text.split("");
        let currentText = "";
        
        ScrollTrigger.create({
          trigger: ref.current,
          start: "top 60%",
          onEnter: () => {
            if (terminalText.textContent === "") {
              charArray.forEach((char, index) => {
                setTimeout(() => {
                  currentText += char;
                  terminalText.textContent = currentText;
                }, index * 20); // 20ms per character
              });
            }
          }
        });
      }
    }
  }, []);

  return (
    <section id="section-04" ref={ref} className="scroll-mt-20 perspective-1000">
      <MacWindow title="Interface_do_Usuario.app">
        <div className="mac-card flex flex-col gap-6 py-4">
          <div className="text-center mb-4">
            <h2 className="text-3xl font-bold">Dualidade do macOS</h2>
            <p className="text-[var(--mac-muted)]">O poder do UNIX com a elegância da Aqua GUI. Clique em cada tela para explorar os detalhes acadêmicos.</p>
          </div>
          
          <div className="split-screen-container flex flex-col md:flex-row gap-6 preserve-3d">
            {/* Left: GUI Mock */}
            <div 
              onClick={() => setSelectedTopic(topics.aqua)}
              className="flex-1 bg-white/5 border border-white/10 hover:border-[var(--mac-blue)]/50 hover:bg-white/10 hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 rounded-xl overflow-hidden flex flex-col cursor-pointer group shadow-lg"
            >
              <div className="bg-white/10 p-2 text-center text-[10px] text-[var(--mac-muted)] font-bold uppercase tracking-widest border-b border-white/5 group-hover:bg-white/20 transition-colors">
                Finder (Aqua GUI) &bull; Clique para inspecionar
              </div>
              <div className="p-6 flex-1 grid grid-cols-3 gap-4 place-items-start">
                <div className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors w-full">
                  <Folder className="text-blue-400 w-10 h-10" fill="currentColor" fillOpacity={0.2} />
                  <span className="text-xs text-[var(--mac-text)]">Documentos</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors w-full">
                  <HardDrive className="text-slate-300 w-10 h-10" />
                  <span className="text-xs text-[var(--mac-text)]">Macintosh HD</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors w-full">
                  <ImageIcon className="text-purple-400 w-10 h-10" />
                  <span className="text-xs text-[var(--mac-text)]">Imagens</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors w-full">
                  <Music className="text-pink-400 w-10 h-10" />
                  <span className="text-xs text-[var(--mac-text)]">Músicas</span>
                </div>
              </div>
            </div>

            {/* Right: Terminal Mock */}
            <div 
              onClick={() => setSelectedTopic(topics.terminal)}
              className="flex-1 bg-black border border-white/10 hover:border-green-500/40 hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 rounded-xl overflow-hidden flex flex-col font-mono shadow-[0_0_30px_rgba(0,0,0,0.5)] cursor-pointer group"
            >
              <div className="bg-white/10 p-2 text-center text-[10px] text-[var(--mac-muted)] font-bold border-b border-white/5 group-hover:bg-white/20 transition-colors">
                Terminal — zsh &bull; Clique para inspecionar
              </div>
              <div className="p-4 flex-1 text-green-400 text-sm whitespace-pre-wrap relative min-h-[140px]">
                <span className="terminal-text"></span>
                <span className="animate-pulse">█</span>
              </div>
            </div>
          </div>
        </div>
      </MacWindow>

      {/* Interface Topic Detail Modal */}
      <MacModal
        isOpen={selectedTopic !== null}
        onClose={() => setSelectedTopic(null)}
        title={selectedTopic?.title || ""}
        subtitle={selectedTopic?.title}
        icon={selectedTopic?.icon}
        content={selectedTopic?.detailedContent}
        academicDetails={selectedTopic?.academicDetails}
      />
    </section>
  );
}
