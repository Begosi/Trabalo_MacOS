import type { Metadata } from "next";
import "./globals.css";
import { MenuBar } from "@/components/MenuBar";
import { Dock } from "@/components/Dock";
import { CustomCursor } from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "Trabalho Acadêmico - macOS",
  description: "Trabalho acadêmico sobre o sistema operacional macOS da Apple.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col relative selection:bg-[var(--mac-blue)] selection:text-white">
        <CustomCursor />
        <MenuBar />
        
        {/* Main Content Area */}
        <main className="flex-1 mt-7 relative">
          {children}
        </main>
        
        <Dock />
      </body>
    </html>
  );
}
