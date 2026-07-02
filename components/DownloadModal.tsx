"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Loader2, CheckCircle2, User, Phone } from "lucide-react";

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  downloadUrl: string;
}

export default function DownloadModal({ isOpen, onClose, downloadUrl }: DownloadModalProps) {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const reset = () => {
    setName("");
    setWhatsapp("");
    setStatus("idle");
    setError("");
  };

  const handleClose = () => {
    onClose();
    // petite latence pour ne pas voir le formulaire se vider pendant l'animation de sortie
    setTimeout(reset, 300);
  };

  const triggerFileDownload = () => {
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "StockPilot-Setup.exe";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setStatus("loading");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, whatsapp }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Une erreur est survenue.");
        setStatus("error");
        return;
      }

      setStatus("success");
      @ts-ignore
      fbq("track", "Lead", { name, whatsapp }); // <-- important
      triggerFileDownload();
    } catch {
      setError("Connexion impossible. Vérifiez votre internet et réessayez.");
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.25)] p-8"
          >
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors border-none cursor-pointer"
              aria-label="Fermer"
            >
              <X size={18} />   
            </button>

            {status === "success" ? (
              <div className="text-center py-4">
                <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 size={28} className="text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Téléchargement lancé !</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-6">
                  Si rien ne se passe, cliquez sur le bouton ci-dessous pour relancer le téléchargement.
                </p>
                <button
                  onClick={triggerFileDownload}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-3 rounded-lg border-none cursor-pointer transition-colors"
                >
                  <Download size={16} />
                  Relancer le téléchargement
                </button>
              </div>
            ) : (
              <>
                <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center mb-5">
                  <Download size={20} className="text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Une dernière étape avant le téléchargement
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-6">
                  Laissez-nous vos coordonnées pour recevoir votre clé d&apos;essai gratuite de 21 jours et de l&apos;aide à l&apos;installation sur WhatsApp.
                </p>

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input
                      type="text"
                      required
                      minLength={2}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Votre nom complet"
                      className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:bg-white transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input
                      type="tel"
                      required
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="Numéro WhatsApp (ex: +228 90 00 00 00)"
                      className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:bg-white transition-colors"
                    />
                  </div>

                  {error && (
                    <p className="text-xs font-medium text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2.5">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm py-3.5 rounded-lg border-none cursor-pointer transition-colors shadow-[0_4px_14px_rgba(37,99,235,0.3)]"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Préparation...
                      </>
                    ) : (
                      <>
                        <Download size={16} />
                        Télécharger StockPilot
                      </>
                    )}
                  </button>
                </form>

                <p className="text-[11px] text-slate-400 text-center mt-4 leading-relaxed">
                  Vos informations servent uniquement à vous accompagner dans l&apos;activation. Aucun spam.
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}