"use client";
import React, { useState, useEffect } from "react";
import { Wifi, Battery, Search } from "lucide-react";

export function MenuBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
          weekday: "short",
          day: "numeric",
          month: "short"
        }).replace(",", "")
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-7 bg-[var(--mac-bg)]/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 z-50 text-[13px] font-medium text-[var(--mac-text)]">
      <div className="flex items-center gap-4">
        {/* Apple Logo (SVG) */}
        <div className="cursor-pointer hover:opacity-80 transition-opacity">
          <svg viewBox="0 0 384 512" width="14" height="14" fill="currentColor">
            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 24 184.5 15.6 235.9c-8.1 48.8-1.5 106.1 14.5 152 14.4 41.5 35.1 82.3 71.9 82.3 35.1 0 45-21 86.8-21 41.8 0 50.4 21 88.5 21 39.8 0 57.5-35.1 71.9-74.8 28.5-74.9 31.5-103.5 30.5-126.7zm-147-152.2c19.3-24.9 34.6-58.4 31.1-91.5-25.2 1.4-58.1 16.5-78.5 41.4-18.1 21.6-35.2 56.4-31.1 88.7 28.5 2.5 59.2-13.7 78.5-38.6z" />
          </svg>
        </div>
        <span className="font-bold cursor-default">macOS</span>
        <span className="hidden sm:inline-block cursor-default hover:bg-white/10 px-2 rounded">Arquivo</span>
        <span className="hidden sm:inline-block cursor-default hover:bg-white/10 px-2 rounded">Editar</span>
        <span className="hidden sm:inline-block cursor-default hover:bg-white/10 px-2 rounded">Visualizar</span>
      </div>

      <div className="flex items-center gap-4">
        <Search className="w-4 h-4 cursor-pointer hover:opacity-80" />
        <Wifi className="w-4 h-4 cursor-default" />
        <Battery className="w-4 h-4 cursor-default" />
        <span className="cursor-default">{time}</span>
      </div>
    </div>
  );
}
