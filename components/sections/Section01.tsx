"use client";
import React, { useRef, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MacWindow } from "@/components/MacWindow";
import { MacModal } from "@/components/MacModal";
import { Activity, Database, HardDrive, MonitorSmartphone } from "lucide-react";

interface ConceptItem {
  title: string;
  icon: React.ReactNode;
  desc: string;
  detailedContent: string;
  academicDetails: string;
}

export function Section01() {
  const ref = useRef<HTMLElement>(null);
  const [selectedConcept, setSelectedConcept] = useState<ConceptItem | null>(null);
  useScrollAnimation(ref, [".mac-card"]);

  const concepts: ConceptItem[] = [
    { 
      title: "Gerenciamento de Processos", 
      icon: <Activity className="w-6 h-6" />, 
      desc: "Agendador preemptivo Grand Central Dispatch.",
      detailedContent: "O macOS utiliza um modelo de multitarefa preemptiva real gerenciado pelo núcleo XNU. A principal inovação para paralelismo é o Grand Central Dispatch (GCD) junto ao ecossistema de System Threads.",
      academicDetails: "O Grand Central Dispatch (GCD ou libdispatch) é uma tecnologia desenvolvida pela Apple para otimizar o suporte à execução concorrente em processadores multi-core.\n\nEm vez de criar e gerenciar threads manualmente (o que gera alto overhead e risco de race conditions), o desenvolvedor submete blocos de código a filas de execução (Dispatch Queues). O sistema gerencia um pool de threads dinâmico a nível de kernel, alocando tarefas conforme a disponibilidade da CPU.\n\nIsso é integrado diretamente ao agendador preemptivo do kernel Mach, priorizando tarefas de interface (UI) e reduzindo drasticamente o consumo energético em processadores Apple Silicon."
    },
    { 
      title: "Memória", 
      icon: <Database className="w-6 h-6" />, 
      desc: "Memória Unificada em chips Apple Silicon.",
      detailedContent: "A arquitetura de memória do macOS evoluiu drasticamente com a transição para o Apple Silicon, implementando o conceito de UMA (Unified Memory Architecture).",
      academicDetails: "Diferente da arquitetura de computador tradicional, onde a CPU e a GPU possuem pools de memória físicos separados (RAM e VRAM) e se comunicam através de um barramento PCI Express lento, a UMA (Unified Memory Architecture) do Apple Silicon unifica toda a memória em um único encapsulamento próximo ao SoC.\n\nIsso significa que a CPU, a GPU e o Neural Engine compartilham o mesmo pool físico de memória sem a necessidade de copiar dados entre barramentos. Se a GPU precisa renderizar uma textura processada pela CPU, ela acessa o mesmo endereço de memória diretamente, eliminando gargalos de largura de banda e melhorando absurdamente a performance gráfica e a eficiência térmica do sistema."
    },
    { 
      title: "Arquivos", 
      icon: <HardDrive className="w-6 h-6" />, 
      desc: "APFS (Apple File System) focado em SSDs e criptografia.",
      detailedContent: "O APFS é o sistema de arquivos padrão do macOS, substituindo o antigo HFS+. Foi projetado do zero para armazenamento em estado sólido (SSDs).",
      academicDetails: "Lançado no macOS High Sierra (2017), o APFS (Apple File System) é otimizado para memórias flash e SSDs. Seus principais pilares acadêmicos são:\n\n1. Clonagem Instantânea: Permite duplicar arquivos instantaneamente sem consumir armazenamento adicional. Apenas as modificações futuras gravam novos blocos (Copy-on-Write).\n2. Snapshots: Cria capturas de estado do sistema em ponto no tempo de forma ultraveloz para backups rápidos e recuperação estável.\n3. Criptografia Nativa Multi-chave: Oferece segurança a nível de arquivo e metadados com criptografia transparente de hardware integrada.\n4. Space Sharing: Permite que múltiplos volumes compartilhem o mesmo espaço livre físico dinamicamente, sem necessidade de reparticionamento fixo."
    },
    { 
      title: "Dispositivos e GUI", 
      icon: <MonitorSmartphone className="w-6 h-6" />, 
      desc: "Interface Aqua baseada em Quartz Compositor.",
      detailedContent: "A interface de usuário Aqua combina beleza estética com alto desempenho gráfico através do Quartz Compositor e da API Metal.",
      academicDetails: "A experiência visual do macOS é impulsionada pela interface gráfica 'Aqua' e pelo servidor de janelas 'Quartz Compositor'. O Quartz utiliza aceleração gráfica por hardware (GPU) por meio da API de baixo nível Metal para realizar o blending (mistura) de todas as janelas na tela em tempo real.\n\nCada janela no macOS possui seu próprio buffer de pixel em memória (off-screen rendering). O Quartz Compositor pega esses buffers de várias aplicações, aplica efeitos como sombras dinâmicas, translucidez de vidro (glassmorphism) e desfoques de fundo de forma instantânea na GPU e exibe a imagem final na tela. Isso garante que a interface permaneça perfeitamente fluida (60 FPS ou 120 FPS ProMotion) mesmo sob carga pesada."
    },
  ];

  return (
    <section id="section-01" ref={ref} className="scroll-mt-20">
      <MacWindow title="Conceitos Básicos.app">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
          {concepts.map((item, idx) => (
            <div 
              key={idx} 
              onClick={() => setSelectedConcept(item)}
              className="mac-card bg-black/40 border border-white/5 p-6 rounded-2xl hover:bg-black/60 hover:border-[var(--mac-blue)]/40 hover:scale-[1.02] active:scale-[0.99] cursor-pointer transition-all duration-300 flex flex-col gap-4 group"
            >
              <div className="w-12 h-12 rounded-full bg-[var(--mac-blue)]/10 text-[var(--mac-blue)] group-hover:bg-[var(--mac-blue)]/20 group-hover:scale-115 transition-all flex items-center justify-center">
                {item.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-[var(--mac-blue)] transition-colors">{item.title}</h3>
                <p className="text-[var(--mac-muted)] text-sm leading-relaxed">{item.desc}</p>
                <span className="text-[11px] text-[var(--mac-blue)] font-semibold mt-3 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Ver detalhes acadêmicos &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </MacWindow>

      {/* Concept Dialog Modal */}
      <MacModal
        isOpen={selectedConcept !== null}
        onClose={() => setSelectedConcept(null)}
        title={selectedConcept?.title || ""}
        subtitle={selectedConcept?.title}
        icon={selectedConcept?.icon}
        content={selectedConcept?.detailedContent}
        academicDetails={selectedConcept?.academicDetails}
      />
    </section>
  );
}
