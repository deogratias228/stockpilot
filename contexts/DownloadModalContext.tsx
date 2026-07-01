"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import DownloadModal from "@/components/DownloadModal";

interface DownloadModalContextValue {
  openModal: () => void;
}

const DownloadModalContext = createContext<DownloadModalContextValue | null>(null);

export function DownloadModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DownloadModalContext.Provider value={{ openModal: () => setIsOpen(true) }}>
      {children}
      <DownloadModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        downloadUrl="/downloads/StockPilot-Setup.exe"
      />
    </DownloadModalContext.Provider>
  );
}

export function useDownloadModal() {
  const ctx = useContext(DownloadModalContext);
  if (!ctx) {
    throw new Error("useDownloadModal doit être utilisé à l'intérieur de <DownloadModalProvider>");
  }
  return ctx;
}