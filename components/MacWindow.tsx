import React from "react";
import { cn } from "@/lib/utils";

interface MacWindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function MacWindow({ title, children, className }: MacWindowProps) {
  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden border border-white/10 backdrop-blur-md shadow-2xl",
        "bg-[var(--mac-surface)]",
        className
      )}
    >
      {/* Titlebar */}
      <div className="flex items-center px-4 h-10 border-b border-white/5 bg-white/5 relative">
        <div className="flex gap-2 z-10">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[12px] text-[var(--mac-muted)] font-medium tracking-wide">
            {title}
          </span>
        </div>
      </div>
      {/* Content */}
      <div className="p-6 relative z-0 text-[var(--mac-text)]">
        {children}
      </div>
    </div>
  );
}
