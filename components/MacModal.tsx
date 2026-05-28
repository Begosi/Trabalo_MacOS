"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { X } from "lucide-react";

interface MacModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  content: string | React.ReactNode;
  academicDetails?: string;
}

export function MacModal({
  isOpen,
  onClose,
  title,
  subtitle,
  icon,
  content,
  academicDetails
}: MacModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Prevent body scrolling when modal is open
      document.body.style.overflow = "hidden";

      // GSAP Entrance Animation
      gsap.fromTo(overlayRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.25, ease: "power2.out" }
      );
      gsap.fromTo(modalRef.current, 
        { scale: 0.85, opacity: 0, y: 20 }, 
        { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.5)" }
      );
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in"
    });
    gsap.to(modalRef.current, {
      scale: 0.9,
      opacity: 0,
      y: 15,
      duration: 0.2,
      ease: "power2.in",
      onComplete: onClose
    });
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
      onClick={handleClose}
    >
      <div 
        ref={modalRef}
        className="bg-[#2c2c2e]/95 backdrop-blur-2xl border border-white/15 rounded-2xl w-full max-w-lg shadow-[0_0_80px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col transform"
        onClick={(e) => e.stopPropagation()}
      >
        {/* macOS Title Bar */}
        <div className="flex items-center justify-between px-4 h-11 border-b border-white/5 bg-white/5 relative">
          <div className="flex gap-2 z-10">
            <button 
              onClick={handleClose}
              className="w-3.5 h-3.5 rounded-full bg-[#ff5f57] border border-[#e0443e] flex items-center justify-center group cursor-pointer"
              title="Fechar"
            >
              <X className="w-2.5 h-2.5 text-[#4c0002] opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] border border-[#dfa224]" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#28c840] border border-[#1fa030]" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-[12px] text-[var(--mac-silver)] font-semibold tracking-wide">
              {title}
            </span>
          </div>
          <div className="w-14" /> {/* Spacer */}
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[70vh] flex flex-col gap-5">
          {/* Header Area */}
          <div className="flex items-start gap-4">
            {icon && (
              <div className="w-12 h-12 rounded-xl bg-[var(--mac-blue)]/10 text-[var(--mac-blue)] border border-[var(--mac-blue)]/20 flex items-center justify-center shrink-0">
                {icon}
              </div>
            )}
            <div>
              <h3 className="text-xl font-bold text-[var(--mac-text)] leading-tight">{subtitle || title}</h3>
              <p className="text-xs text-[var(--mac-silver)] mt-1 uppercase tracking-wider font-semibold">Tópico de Estudo Acadêmico</p>
            </div>
          </div>

          {/* Core Content */}
          <div className="text-sm text-[var(--mac-text)]/90 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
            {content}
          </div>

          {/* Academic Deep Dive */}
          {academicDetails && (
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--mac-blue)]">Aprofundamento Acadêmico:</span>
              <p className="text-xs text-[var(--mac-muted)] leading-relaxed bg-black/20 p-3 rounded-lg border border-white/5 whitespace-pre-wrap">
                {academicDetails}
              </p>
            </div>
          )}
        </div>

        {/* macOS Bottom Action Bar */}
        <div className="bg-white/5 px-6 py-4 flex justify-end border-t border-white/5">
          <button
            onClick={handleClose}
            className="px-5 py-1.5 bg-[var(--mac-blue)] hover:bg-[var(--mac-blue)]/90 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-[var(--mac-blue)]/20 cursor-pointer active:scale-[0.98]"
          >
            Concluído
          </button>
        </div>
      </div>
    </div>
  );
}
