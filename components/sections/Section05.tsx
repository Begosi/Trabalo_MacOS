"use client";
import React, { useRef, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MacWindow } from "@/components/MacWindow";
import { MacModal } from "@/components/MacModal";
import { Shield, Lock, FileKey, Fingerprint, Network, ShieldAlert } from "lucide-react";

interface SecurityFeature {
  title: string;
  icon: React.ReactNode;
  desc: string;
  detailedContent: string;
  academicDetails: string;
}

export function Section05() {
  const ref = useRef<HTMLElement>(null);
  const [selectedFeature, setSelectedFeature] = useState<SecurityFeature | null>(null);
  useScrollAnimation(ref, [".security-card"]);

  const features: SecurityFeature[] = [
    { 
      title: "Gatekeeper", 
      icon: <ShieldAlert className="w-6 h-6" />, 
      desc: "Impede a execução de software malicioso, exigindo assinaturas de código da Apple.",
      detailedContent: "O Gatekeeper é o guardião primário contra softwares não confiáveis. Ele força a validação criptográfica de aplicativos baixados da internet antes de permitir sua primeira execução.",
      academicDetails: "O Gatekeeper atua combinando duas defesas fundamentais:\n\n1. Assinatura de Código (Code Signing): O desenvolvedor precisa assinar digitalmente o aplicativo usando uma chave privada fornecida em um certificado oficial da Apple.\n2. Notarização (Notarization): Antes de distribuir o app, o desenvolvedor o envia aos servidores da Apple, onde scanners automatizados de malware analisam o código. Se o app estiver limpo, a Apple emite um 'tíquete de notarização' anexado ao binário.\n\nQuando o usuário executa o aplicativo pela primeira vez, o Gatekeeper verifica a integridade da assinatura digital e confere se a notarização está ativa. Se o app foi modificado ou não possui assinatura, a execução é bloqueada por padrão para proteger o sistema operacional."
    },
    { 
      title: "SIP", 
      icon: <Shield className="w-6 h-6" />, 
      desc: "System Integrity Protection. Protege arquivos do sistema até contra o usuário root.",
      detailedContent: "A Proteção de Integridade do Sistema (SIP) é uma política de segurança a nível de kernel que impede a modificação de partes cruciais do sistema de arquivos.",
      academicDetails: "Introduzido no OS X El Capitan, o SIP redefine o modelo tradicional de segurança UNIX, onde o usuário superusuário ('root' ou 'administrator') tem acesso irrestrito a todos os arquivos.\n\nO kernel do macOS (XNU) impõe restrições rígidas que impedem qualquer processo (mesmo executando com privilégios de root via sudo) de gravar, modificar ou excluir arquivos em diretórios fundamentais, incluindo:\n- `/System`\n- `/usr` (exceto `/usr/local`)\n- `/bin`\n- `/sbin`\n\nIsso evita que códigos maliciosos injetem arquivos invasivos (como rootkits) no núcleo do sistema, além de proteger a integridade do sistema contra exclusões acidentais causadas pelo próprio usuário."
    },
    { 
      title: "FileVault", 
      icon: <Lock className="w-6 h-6" />, 
      desc: "Criptografia de disco completo (XTS-AES-128) transparente para o usuário.",
      detailedContent: "O FileVault protege todos os dados armazenados no disco rígido por meio de criptografia completa de volume, blindando o sistema contra roubo físico.",
      academicDetails: "O FileVault 2 utiliza criptografia simétrica XTS-AES-128 ou XTS-AES-256 de nível militar para encriptar todo o volume de inicialização do macOS.\n\nA criptografia e a descriptografia ocorrem em tempo real de maneira transparente para o usuário, aproveitando o coprocessador criptográfico acelerado por hardware integrado aos chips M-Series da Apple (Apple Silicon).\n\nQuando o Mac é desligado, todos os dados no SSD tornam-se completamente ilegíveis sem as credenciais do usuário. As chaves de criptografia ficam armazenadas em uma região de hardware ultra segura (Secure Enclave), o que impede ataques de força bruta físicos ou a extração do SSD para leitura em outras máquinas."
    },
    { 
      title: "Secure Enclave", 
      icon: <Fingerprint className="w-6 h-6" />, 
      desc: "Coprocessador isolado que gerencia chaves criptográficas e biometria (Touch ID).",
      detailedContent: "O Secure Enclave é um subsistema de hardware seguro e fisicamente isolado dentro do chip Apple Silicon, projetado para proteção de chaves e biometria.",
      academicDetails: "O Secure Enclave é um componente físico de silício (System-on-Chip) que funciona de forma independente da CPU principal e roda um sistema operacional próprio (seguro e microkernelizado).\n\nPrincipais funções acadêmicas:\n1. Isolamento de Biometria: As informações de impressão digital (Touch ID) ou reconhecimento facial (Face ID) são processadas exclusivamente dentro deste chip. A CPU principal e o kernel XNU nunca têm acesso às imagens ou representações matemáticas dos dados biométricos.\n2. Geração e Proteção de Chaves: Ele gera chaves criptográficas protegidas que nunca saem do chip. Qualquer operação de criptografia/descriptografia solicitada pelo sistema é enviada ao Secure Enclave, processada localmente e o resultado é devolvido, protegendo as chaves contra vazamentos mesmo sob comprometimento do kernel principal."
    },
    { 
      title: "Sandboxing", 
      icon: <Network className="w-6 h-6" />, 
      desc: "Isola aplicativos, limitando acesso ao sistema de arquivos e hardware.",
      detailedContent: "O Sandboxing de aplicativos isola os softwares uns dos outros e do sistema operacional, garantindo que um app comprometido não infecte os demais.",
      academicDetails: "O Sandboxing é um mecanismo obrigatório para aplicativos distribuídos na Mac App Store. Ele garante que cada aplicativo seja executado dentro de uma caixa de areia rígida:\n\n1. Direcionamento de Recursos: O aplicativo tem acesso exclusivo apenas aos seus próprios recursos e ao seu diretório privado (Container).\n2. Permissões declaradas: Acesso a periféricos como câmera, microfone, localização e rede deve ser explicitamente declarado no arquivo de configuração do app (Entitlements).\n3. Framework TCC (Transparency, Consent, and Control): O sistema intercepta qualquer tentativa do aplicativo de acessar recursos protegidos e exibe caixas de diálogo solicitando o consentimento explícito do usuário final. Isso impede a espionagem e o roubo de dados em segundo plano por aplicativos maliciosos."
    },
    { 
      title: "XProtect", 
      icon: <FileKey className="w-6 h-6" />, 
      desc: "Antivírus nativo integrado ao sistema com assinaturas atualizadas invisivelmente.",
      detailedContent: "O XProtect é a tecnologia nativa de detecção de malware do macOS que analisa arquivos baixados em segundo plano, sem impactar a CPU.",
      academicDetails: "O XProtect atua de forma discreta e integrada no macOS, funcionando em três pilares silenciosos:\n\n1. Detecção de Assinaturas de Malware: O sistema utiliza regras YARA (uma ferramenta padrão da indústria de segurança para identificação de malwares baseados em padrões) para escanear arquivos no momento do download e na primeira execução.\n2. Atualizações Silenciosas: A Apple atualiza constantemente as assinaturas de malware do XProtect em segundo plano, sem necessidade de atualizar o sistema operacional ou exibir notificações ao usuário.\n3. XProtect Behavioral Service (Remediation): Um componente moderno que monitora ativamente comportamentos suspeitos de processos em execução, sendo capaz de bloquear e remover automaticamente programas nocivos conhecidos que tentem se infiltrar na memória do sistema."
    },
  ];

  return (
    <section id="section-05" ref={ref} className="scroll-mt-20">
      <MacWindow title="Segurança_e_Privacidade.app">
        <div className="py-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Defesa em Profundidade</h2>
            <p className="text-[var(--mac-muted)]">A filosofia de segurança do macOS integra perfeitamente hardware e software. Clique em cada card para explorar.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {features.map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedFeature(item)}
                className="security-card bg-gradient-to-br from-white/5 to-white/0 border border-white/10 p-5 rounded-xl hover:bg-white/10 hover:scale-105 hover:border-[var(--mac-blue)] active:scale-[0.98] transition-all duration-300 flex flex-col items-center text-center group cursor-pointer shadow-md"
              >
                <div className="w-14 h-14 rounded-2xl bg-[var(--mac-surface)] shadow-inner border border-white/5 flex items-center justify-center text-[var(--mac-silver)] group-hover:text-[var(--mac-blue)] transition-colors mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold mb-2 text-white group-hover:text-[var(--mac-blue)] transition-colors">{item.title}</h3>
                <p className="text-xs text-[var(--mac-muted)] leading-relaxed">{item.desc}</p>
                <span className="text-[10px] text-[var(--mac-blue)] uppercase tracking-wider font-bold mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  Inspecionar Recurso &rarr;
                </span>
              </div>
            ))}
          </div>
        </div>
      </MacWindow>

      {/* Security Feature Dialog Modal */}
      <MacModal
        isOpen={selectedFeature !== null}
        onClose={() => setSelectedFeature(null)}
        title={selectedFeature?.title || ""}
        subtitle={selectedFeature?.title}
        icon={selectedFeature?.icon}
        content={selectedFeature?.detailedContent}
        academicDetails={selectedFeature?.academicDetails}
      />
    </section>
  );
}
