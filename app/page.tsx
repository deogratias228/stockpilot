"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Package,
  BarChart3,
  ShoppingCart,
  Users,
  Printer,
  TrendingUp,
  Download,
  Check,
  X,
  ChevronRight,
  ChevronDown,
  MessageCircle,
  Phone,
  Mail,
  Wifi,
  Clock,
  Layers,
  Shield,
  Star,
  ArrowRight,
  AlertTriangle,
  Bell,
  ReceiptText,
  CircleDollarSign,
} from "lucide-react";
import { DownloadModalProvider, useDownloadModal } from "@/contexts/DownloadModalContext";


/* ─────────────────────────────────────────────
   HERO SLIDER
───────────────────────────────────────────── */
const heroSlides = [
  {
    headline: "Ne perdez plus d'argent à cause d'un stock mal géré.",
    sub: "StockPilot vous alerte avant les ruptures, suit chaque vente et calcule votre bénéfice en temps réel — sans internet.",
  },
  {
    headline: "Gérez votre boutique sans cahier ni Excel.",
    sub: "Fini les erreurs de calcul et les pages froissées. Tout est enregistré, organisé et consultable en un clic.",
  },
  {
    headline: "Sachez exactement combien vous gagnez, chaque jour.",
    sub: "Votre bénéfice quotidien, vos ventes du mois, vos produits les plus rentables — accessibles en quelques secondes.",
  },
];

function HeroSlider() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    const t = setInterval(() => {
      setDir(1);
      setIdx((i) => (i + 1) % heroSlides.length);
    }, 4800);
    return () => clearInterval(t);
  }, []);

  const variants = {
    enter: (d: number) => ({ opacity: 0, y: d > 0 ? 28 : -28 }),
    center: { opacity: 1, y: 0 },
    exit: (d: number) => ({ opacity: 0, y: d > 0 ? -28 : 28 }),
  };

  return (
    <div className="relative min-h-40 flex flex-col items-center overflow-hidden">
      <AnimatePresence custom={dir} mode="wait">
        <motion.div
          key={idx}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.55, ease: [0.32, 0, 0.16, 1] }}
          className="text-center"
        >
          <h1 className="text-[clamp(36px,6vw,72px)] font-black leading-[1.05] tracking-[-2.5px] text-slate-900 max-w-3xl mx-auto mb-6">
            {heroSlides[idx].headline.split("sans").map((part, i, arr) =>
              i < arr.length - 1 ? (
                <span key={i}>
                  {part}
                  <span className="text-blue-600">sans</span>
                </span>
              ) : (
                part
              )
            )}
          </h1>
          <p className="text-[clamp(16px,2.2vw,19px)] text-slate-500 max-w-xl mx-auto leading-[1.75]">
            {heroSlides[idx].sub}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="flex gap-2 mt-8">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); }}
            className={`transition-all duration-300 rounded-full ${i === idx ? "w-6 h-2 bg-blue-600" : "w-2 h-2 bg-slate-300"
              }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FADE-IN WRAPPER
───────────────────────────────────────────── */
function FadeIn({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const from =
    direction === "up"
      ? { opacity: 0, y: 36 }
      : direction === "left"
        ? { opacity: 0, x: -36 }
        : direction === "right"
          ? { opacity: 0, x: 36 }
          : { opacity: 0 };

  return (
    <motion.div
      ref={ref}
      initial={from}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : from}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   COUNTER ANIMATION
───────────────────────────────────────────── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const dur = 1400;
    const step = 16;
    const inc = to / (dur / step);
    const t = setInterval(() => {
      start += inc;
      if (start >= to) { setVal(to); clearInterval(t); }
      else setVal(Math.floor(start));
    }, step);
    return () => clearInterval(t);
  }, [inView, to]);

  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─────────────────────────────────────────────
   NAV
───────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 lg:px-16 h-16 transition-all duration-300 ${scrolled
        ? "bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm"
        : "bg-transparent"
        }`}
    >
      <a href="#" className="flex items-center gap-2.5 font-black text-lg tracking-tight text-slate-900 no-underline">
        {/* <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Package size={16} className="text-white" />
        </div> */}
        <img src="android-chrome-512x512.png" className="w-8 h-8"/>
        StockPilot 
      </a>

      <ul className="hidden md:flex items-center gap-8 list-none">
        {[
          ["Pourquoi", "#why"],
          ["Fonctionnalités", "#features"],
          ["Tarifs", "#pricing"],
          ["FAQ", "#faq"],
        ].map(([label, href]) => (
          <li key={href}>
            <a
              href={href}
              className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors no-underline"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      <a
        href="#download"
        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg no-underline transition-all shadow-[0_2px_8px_rgba(37,99,235,0.3)] hover:shadow-[0_4px_16px_rgba(37,99,235,0.4)]"
      >
        Télécharger
      </a>
    </nav>
  );
}

/* ─────────────────────────────────────────────
   MOCKUP (capture section)
───────────────────────────────────────────── */
function AppMockup() {
  return (
    <div className="w-full max-w-5xl mx-auto rounded-2xl border border-slate-200 overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.12)]">
      <img src="/images/dashboard-stockpilot.png" className="w-full" />
      {/* <div className="bg-slate-100 border-b border-slate-200 px-5 py-3 flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-red-400" />
        <span className="w-3 h-3 rounded-full bg-yellow-400" />
        <span className="w-3 h-3 rounded-full bg-green-400" />
        <span className="ml-4 text-xs text-slate-400 font-medium">StockPilot — Tableau de bord</span>
      </div> */}
      {/* <div className="flex h-105">
        <aside className="w-52 bg-slate-900 border-r border-white/5 p-3 flex flex-col gap-0.5 shrink-0">
          <div className="px-2.5 py-3 border-b border-white/10 mb-2 flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
              <Package size={12} className="text-white" />
            </div>
            <span className="text-xs font-black text-white">StockPilot</span>
          </div>
          {[
            { icon: BarChart3, label: "Tableau de bord", active: true },
            { icon: ShoppingCart, label: "Caisse", active: false },
            { icon: Package, label: "Stock", active: false },
            { icon: TrendingUp, label: "Rapports", active: false },
            { icon: Users, label: "Clients", active: false },
          ].map(({ icon: Icon, label, active }) => (
            <div
              key={label}
              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium cursor-default ${active ? "bg-blue-600/25 text-blue-300" : "text-white/40"
                }`}
            >
              <Icon size={13} />
              {label}
            </div>
          ))}
        </aside>


        <div className="flex-1 bg-slate-50 p-6 overflow-hidden">
          <div className="flex justify-between items-start mb-5">
            <div>
              <div className="text-sm font-bold text-slate-800">Tableau de bord</div>
              <div className="text-xs text-slate-400 mt-0.5">Vendredi 27 juin 2026</div>
            </div>
            <div className="bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-md">
              + Nouvelle vente
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2.5 mb-4">
            {[
              { label: "Ventes du jour", value: "18", color: "text-blue-600" },
              { label: "Revenu du jour", value: "142 500", color: "text-emerald-600" },
              { label: "Bénéfice brut", value: "58 200", color: "text-slate-800" },
              { label: "Stock bas", value: "3", color: "text-amber-500" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                <div className="text-[10px] text-slate-400 font-medium mb-1">{label}</div>
                <div className={`text-lg font-black ${color}`}>{value}</div>
              </div>
            ))}
          </div>

          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <div className="grid grid-cols-4 bg-slate-100 border-b border-slate-200 px-4 py-2 gap-2">
              {["Produit", "Stock", "Prix", "Statut"].map((h) => (
                <div key={h} className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">{h}</div>
              ))}
            </div>
            {[
              { name: "Huile de palme 1L", stock: "48 unités", price: "850 FCFA", status: "OK", cls: "bg-emerald-50 text-emerald-700" },
              { name: "Savon Palmolive x12", stock: "4 cartons", price: "6 200 FCFA", status: "Bas", cls: "bg-amber-50 text-amber-700" },
              { name: "Sucre 1kg", stock: "0 sac", price: "1 100 FCFA", status: "Rupture", cls: "bg-red-50 text-red-600" },
              { name: "Lait concentré 400g", stock: "24 boîtes", price: "750 FCFA", status: "OK", cls: "bg-emerald-50 text-emerald-700" },
            ].map((row, i) => (
              <div key={i} className={`grid grid-cols-4 px-4 py-2 gap-2 items-center border-b border-slate-100 last:border-none ${i % 2 === 1 ? "bg-slate-50" : ""}`}>
                <div className="text-xs font-semibold text-slate-800">{row.name}</div>
                <div className="text-xs text-slate-500">{row.stock}</div>
                <div className="text-xs text-slate-500">{row.price}</div>
                <div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${row.cls}`}>{row.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
}

/* ─────────────────────────────────────────────
   BEFORE / AFTER
───────────────────────────────────────────── */
function BeforeAfter() {
  const beforeItems = [
    "Cahier et stylo pour les ventes",
    "Calculatrice pour les bénéfices",
    "Ruptures de stock imprévues",
    "Erreurs de caisse quotidiennes",
    "Impossible de connaître le bénéfice",
  ];
  const afterItems = [
    "Stock en temps réel sur votre PC",
    "Rapports de bénéfice automatiques",
    "Historique complet des ventes",
    "Bénéfice quotidien calculé",
    "Alertes de rupture avant qu'il soit trop tard",
  ];

  return (
    <section className="py-24 bg-slate-50 border-y border-slate-200">
      <div className="max-w-5xl mx-auto px-6">
        <FadeIn className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-[3px] text-blue-600 mb-3">La transformation</p>
          <h2 className="text-[clamp(28px,4.5vw,46px)] font-black tracking-[-1.2px] text-slate-900 leading-tight">
            Avant et après StockPilot
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Before */}
          <FadeIn delay={0.1} direction="left">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                  <AlertTriangle size={20} className="text-red-500" />
                </div>
                <span className="font-bold text-slate-800 text-lg">Avant StockPilot</span>
              </div>
              <ul className="space-y-3">
                {beforeItems.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 + 0.2 }}
                    className="flex items-start gap-3 text-sm text-slate-600"
                  >
                    <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                      <X size={11} className="text-red-500" strokeWidth={3} />
                    </div>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* After */}
          <FadeIn delay={0.2} direction="right">
            <div className="bg-white rounded-2xl border border-blue-200 p-8 shadow-[0_4px_24px_rgba(37,99,235,0.1)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <TrendingUp size={20} className="text-blue-600" />
                </div>
                <span className="font-bold text-slate-800 text-lg">Après StockPilot</span>
              </div>
              <ul className="space-y-3">
                {afterItems.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 + 0.3 }}
                    className="flex items-start gap-3 text-sm text-slate-700 font-medium"
                  >
                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={11} className="text-emerald-600" strokeWidth={3} />
                    </div>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   WHY SECTION
───────────────────────────────────────────── */
function WhySection() {
  const reasons = [
    {
      icon: Wifi,
      title: "100% hors ligne",
      desc: "Aucune connexion internet requise après installation. Votre boutique tourne même en coupure réseau.",
    },
    {
      icon: Shield,
      title: "Vos données restent chez vous",
      desc: "Rien n'est envoyé vers un serveur. Tout est stocké localement sur votre PC, sous votre contrôle.",
    },
    {
      icon: CircleDollarSign,
      title: "Bénéfice calculé automatiquement",
      desc: "Entrez vos prix d'achat une fois. StockPilot calcule votre marge sur chaque vente, en temps réel.",
    },
    {
      icon: Bell,
      title: "Alertes avant les ruptures",
      desc: "Définissez un seuil minimum par produit. Vous recevez une alerte avant d'être à court de stock.",
    },
    {
      icon: ReceiptText,
      title: "Reçus et factures en un clic",
      desc: "Impression thermique 58mm ou 80mm, ou génération PDF instantanée pour chaque transaction.",
    },
    {
      icon: Layers,
      title: "9 modules dans une seule app",
      desc: "Caisse, stock, clients, fournisseurs, rapports, dépenses, impression — tout est intégré.",
    },
  ];

  return (
    <section id="why" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn className="mb-14">
          <p className="text-xs font-bold uppercase tracking-[3px] text-blue-600 mb-3">Pourquoi choisir StockPilot</p>
          <h2 className="text-[clamp(28px,4.5vw,46px)] font-black tracking-[-1.2px] text-slate-900 leading-tight max-w-xl mb-4">
            Conçu pour les commerçants africains
          </h2>
          <p className="text-lg text-slate-500 max-w-lg leading-[1.75]">
            Pas de cloud, pas d'abonnement compliqué, pas d'internet obligatoire. Un outil qui s'adapte à votre réalité.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-5">
          {reasons.map((r, i) => (
            <FadeIn key={r.title} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(37,99,235,0.12)" }}
                transition={{ duration: 0.2 }}
                className="bg-white border border-slate-200 rounded-2xl p-7 cursor-default"
              >
                <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center mb-5">
                  <r.icon size={20} className="text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-900 text-[15px] mb-2">{r.title}</h3>
                <p className="text-sm text-slate-500 leading-[1.7]">{r.desc}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FEATURES
───────────────────────────────────────────── */
function FeaturesSection() {
  const features = [
    {
      icon: ShoppingCart,
      title: "Encaissez en 3 secondes, sans erreur de calcul.",
      desc: "Interface caisse rapide. Recherchez, ajoutez au panier, encaissez. Espèces, Wave, Orange Money, Moov, crédit — tout est géré.",
    },
    {
      icon: Package,
      title: "Évitez les ruptures grâce aux alertes automatiques.",
      desc: "Alertes stock bas configurables, historique de chaque mouvement, valeur totale du stock en temps réel.",
    },
    {
      icon: BarChart3,
      title: "Pilotez votre boutique depuis un seul écran.",
      desc: "KPIs du jour, graphique des ventes de la semaine, top produits, alertes stock bas — une vue complète dès l'ouverture.",
    },
    {
      icon: TrendingUp,
      title: "Découvrez enfin votre vrai bénéfice chaque soir.",
      desc: "Chiffre d'affaires, bénéfice brut, top produits. Export Excel et PDF pour vos archives et votre comptable.",
    },
    {
      icon: Users,
      title: "Gardez vos clients fidèles, suivez vos fournisseurs.",
      desc: "Fiches clients avec historique d'achats, gestion du crédit client, suivi des achats et dettes fournisseurs.",
    },
    {
      icon: Printer,
      title: "Imprimez un reçu propre pour chaque client.",
      desc: "Compatible imprimante thermique 58mm et 80mm. PDF des factures et rapports. Format configurable.",
    },
  ];

  return (
    <section id="features" className="py-24 bg-slate-50 border-y border-slate-200">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn className="mb-14">
          <p className="text-xs font-bold uppercase tracking-[3px] text-blue-600 mb-3">Fonctionnalités</p>
          <h2 className="text-[clamp(28px,4.5vw,46px)] font-black tracking-[-1.2px] text-slate-900 leading-tight max-w-xl mb-4">
            Tout ce dont votre commerce a besoin
          </h2>
          <p className="text-lg text-slate-500 max-w-lg leading-[1.75]">
            De la gestion du stock à l'impression des reçus. Tout est là, dans une seule application.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -4, borderColor: "rgba(37,99,235,0.4)", boxShadow: "0 8px 32px rgba(37,99,235,0.1)" }}
                transition={{ duration: 0.2 }}
                className="bg-white border border-slate-200 rounded-2xl p-7 cursor-default"
              >
                <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center mb-5">
                  <f.icon size={20} className="text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-900 text-[15px] mb-2 leading-snug">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-[1.7]">{f.desc}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   REVIEWS
───────────────────────────────────────────── */
function ReviewsSection() {
  const reviews = [
    {
      name: "Kofi A.",
      role: "Boutique textile, Kara",
      text: "Les alertes de rupture m'ont sauvé plusieurs fois. Je recommande à tout commerçant qui veut sérieusement gérer son stock.",
      rating: 5,
    },
    {
      name: "Mariam D.",
      role: "Pharmacie, Sokodé",
      text: "L'installation a pris 3 minutes. Le support est très réactif sur WhatsApp. Je n'ai plus peur des pannes internet.",
      rating: 5,
    },
    {
      name: "Awa S.",
      role: "Boutique de tissus à Lomé",
      text: "Avant j’utilisais un cahier, maintenant je gagne du temps et je ne perds plus mes données.",
      rating: 5,
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <FadeIn className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-[3px] text-blue-600 mb-3">Avis clients</p>
          <h2 className="text-[clamp(28px,4.5vw,46px)] font-black tracking-[-1.2px] text-slate-900 leading-tight">
            Ils ont fait le pas
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <FadeIn key={r.name} delay={i * 0.1}>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-7">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 leading-[1.75] mb-6 italic">"{r.text}"</p>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{r.name}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{r.role}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PRICING
───────────────────────────────────────────── */
function PricingSection() {
  const plans = [
    {
      name: "Mensuel",
      price: "2 000",
      period: "par mois",
      save: null,
      features: ["Toutes les fonctionnalités", "Accès illimité", "Mises à jour incluses"],
      featured: false,
      cta: "Choisir",
    },
    // {
    //   name: "Trimestriel",
    //   price: "5 500",
    //   period: "pour 3 mois",
    //   save: "Économisez 500 FCFA",
    //   features: ["Toutes les fonctionnalités", "Accès illimité", "Mises à jour incluses"],
    //   featured: false,
    //   cta: "Choisir",
    // },
    {
      name: "Annuel",
      price: "18 000",
      period: "pour 12 mois",
      save: "Économisez 6 000 FCFA",
      features: ["Toutes les fonctionnalités", "Accès illimité", "Mises à jour incluses", "Support prioritaire"],
      featured: false,
      cta: "Choisir l'annuel",
    },
    // {
    //   name: "Semestriel",
    //   price: "10 000",
    //   period: "pour 6 mois",
    //   save: "Économisez 2 000 FCFA",
    //   features: ["Toutes les fonctionnalités", "Accès illimité", "Mises à jour incluses"],
    //   featured: false,
    //   cta: "Choisir",
    // },
    {
      name: "À vie",
      price: "50 000",
      period: "paiement unique",
      save: "Plus jamais de renouvellement",
      features: ["Toutes les fonctionnalités", "Accès à vie", "Toutes les mises à jour futures", "Support prioritaire"],
      featured: true,
      cta: "Choisir",
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn className="mb-14">
          <p className="text-xs font-bold uppercase tracking-[3px] text-blue-600 mb-3">Tarifs</p>
          <h2 className="text-[clamp(28px,4.5vw,46px)] font-black tracking-[-1.2px] text-slate-900 leading-tight max-w-xl mb-4">
            Simple et transparent
          </h2>
          <p className="text-lg text-slate-500 max-w-lg leading-[1.75]">
            Commencez gratuitement pendant 21 jours. Choisissez ensuite le plan qui convient à votre activité.
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 items-start">
          {plans.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 0.07}>
              <div
                className={`relative bg-white rounded-2xl border p-3 flex flex-col transition-all ${plan.featured
                  ? "border-blue-500 shadow-[0_8px_40px_rgba(37,99,235,0.18)] scale-[1.03]"
                  : "border-slate-200 shadow-sm"
                  }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wide whitespace-nowrap">
                    Recommandé
                  </span>
                )}
                <div className={`text-[10px] font-bold uppercase tracking-[1.5px] mb-3 ${plan.featured ? "text-blue-600" : "text-slate-400"}`}>
                  {plan.name}
                </div>
                <div className="text-2xl font-black text-slate-900 leading-none mb-1">
                  {plan.price} <span className="text-sm font-medium text-slate-400">FCFA</span>
                </div>
                <div className="text-xs text-slate-400 mb-3">{plan.period}</div>
                {plan.save && (
                  <span className="inline-block text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full mb-4 self-start">
                    {plan.save}
                  </span>
                )}
                <div className="border-t border-slate-100 my-4" />
                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-slate-600">
                      <Check size={13} className="text-emerald-500 shrink-0 mt-0.5" strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`block w-full text-center py-2.5 rounded-lg text-sm font-bold no-underline transition-all ${plan.featured
                    ? "bg-blue-600 text-white hover:bg-blue-700 shadow-[0_4px_14px_rgba(37,99,235,0.3)]"
                    : "border border-slate-300 text-slate-600 hover:border-blue-500 hover:text-blue-600"
                    }`}
                >
                  {plan.cta}
                </a>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div className="mt-10 bg-emerald-50 border border-emerald-200/60 rounded-xl p-6 text-center">
            <p className="text-sm text-slate-700">
              Tous les plans commencent par un{" "}
              <strong className="text-emerald-700">essai gratuit de 21 jours, toutes fonctionnalités incluses.</strong>{" "}
              Aucune carte bancaire. Aucun engagement. Vos données restent sur votre PC.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FAQ
───────────────────────────────────────────── */
const faqs = [
  {
    q: "Est-ce que StockPilot fonctionne sans internet ?",
    a: "Oui, totalement. Après l'installation, aucune connexion n'est nécessaire. Vos données sont stockées localement sur votre PC Windows.",
  },
  {
    q: "Comment obtenir ma licence après l'essai ?",
    a: "Contactez-nous sur WhatsApp avec votre Device ID (disponible dans Paramètres > Licence). Effectuez le paiement par Wave, Orange Money ou Moov Money. Vous recevez votre clé d'activation immédiatement.",
  },
  {
    q: "Est-ce que mes données sont en sécurité ?",
    a: "Absolument. Rien n'est envoyé sur internet. Tout reste sur votre disque dur. Vous restez propriétaire de vos données.",
  },
  {
    q: "Quels types de paiements peut-on encaisser ?",
    a: "Espèces, Wave, Orange Money, Moov Money, Mix by Yas, et crédit client. Tout est configurable selon votre boutique.",
  },
  {
    q: "Puis-je utiliser StockPilot sur plusieurs PC ?",
    a: "La licence est liée à un PC (via Device ID). Si vous avez besoin de plusieurs postes, contactez-nous pour un tarif multi-poste.",
  },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <FadeIn className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-[3px] text-blue-600 mb-3">FAQ</p>
          <h2 className="text-[clamp(28px,4.5vw,46px)] font-black tracking-[-1.2px] text-slate-900 leading-tight">
            Questions fréquentes
          </h2>
        </FadeIn>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left bg-white hover:bg-slate-50 transition-colors cursor-pointer border-none"
                >
                  <span className="font-semibold text-slate-900 text-sm pr-4">{faq.q}</span>
                  <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.25 }}>
                    <ChevronDown size={18} className="text-slate-400 shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-6 pb-5 text-sm text-slate-500 leading-[1.75] border-t border-slate-100 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   DOWNLOAD
───────────────────────────────────────────── */
function DownloadSection() {
  const { openModal } = useDownloadModal();
  return (
    <section id="download" className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <FadeIn>
          <p className="text-xs font-bold uppercase tracking-[3px] text-blue-600 mb-3">Téléchargement</p>
          <h2 className="text-[clamp(28px,4.5vw,46px)] font-black tracking-[-1.2px] text-slate-900 leading-tight mb-4">
            Téléchargez StockPilot
          </h2>
          <p className="text-lg text-slate-500 mb-10 max-w-md mx-auto leading-[1.75]">
            Compatible Windows 10 et 11. Installation en 2 minutes. Aucun internet requis après installation.
          </p>

          <motion.button
            onClick={openModal}
            whileHover={{ y: -2, boxShadow: "0 10px 30px rgba(37,99,235,0.4)" }}
            className="inline-flex items-center gap-3 bg-blue-600 text-white font-bold text-base px-8 py-4 rounded-xl border-none cursor-pointer shadow-[0_4px_20px_rgba(37,99,235,0.35)] transition-colors hover:bg-blue-700"
          >
            <Download size={20} />
            StockPilot-Setup.exe — Windows
          </motion.button>

          <div className="flex flex-wrap justify-center gap-8 mt-8">
            {["Windows 10 / 11 (64-bit)", "Version 1.0.0", "Mise à jour juin 2026"].map((item) => (
              <span key={item} className="flex items-center gap-2 text-sm text-slate-400">
                <Check size={14} className="text-emerald-500" strokeWidth={2.5} />
                {item}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CONTACT
───────────────────────────────────────────── */
function ContactSection() {
  const steps = [
    "Téléchargez et installez StockPilot. Lancez l'application.",
    "Allez dans Paramètres > Licence. Copiez votre Device ID unique.",
    "Contactez-nous via WhatsApp avec votre Device ID et le plan choisi.",
    "Effectuez le paiement par Wave, Orange Money ou Moov Money.",
    "Recevez votre clé d'activation et entrez-la dans l'app. Accès immédiat.",
  ];

  return (
    <section id="contact" className="py-24 bg-white border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-start">
        <FadeIn direction="left">
          <p className="text-xs font-bold uppercase tracking-[3px] text-blue-600 mb-3">Contact & Assistance</p>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 leading-tight mb-4">
            Vous avez une question ou vous voulez une licence ?
          </h2>
          <p className="text-slate-500 leading-[1.75] mb-8">
            Contactez-nous directement. Nous répondons rapidement et vous envoyons votre clé de licence dès réception du paiement.
          </p>

          <div className="flex flex-col gap-3">
            {[
              { Icon: MessageCircle, label: "WhatsApp", value: "+228 91 90 28 24", href: "https://wa.me/22891902824", bg: "bg-green-50", color: "text-green-600" },
              { Icon: Phone, label: "Téléphone", value: "+228 91 90 28 24", href: "tel:+22891902824", bg: "bg-blue-50", color: "text-blue-600" },
              { Icon: Mail, label: "Email", value: "gwoblesse@gmail.com", href: "mailto:gwoblesse@gmail.com", bg: "bg-amber-50", color: "text-amber-600" },
            ].map(({ Icon, label, value, href, bg, color }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 p-5 bg-white border border-slate-200 rounded-xl no-underline shadow-sm hover:border-blue-300 hover:shadow-[0_4px_20px_rgba(37,99,235,0.1)] transition-all"
              >
                <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center shrink-0`}>
                  <Icon size={20} className={color} />
                </div>
                <div className="flex-1">
                  <div className="text-[10px] font-bold uppercase tracking-wide text-slate-400 mb-0.5">{label}</div>
                  <div className="font-semibold text-slate-800 text-sm">{value}</div>
                </div>
                <ChevronRight size={16} className="text-slate-300" />
              </motion.a>
            ))}
          </div>
        </FadeIn>

        <FadeIn direction="right">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
            <h3 className="font-bold text-slate-900 text-base mb-2">Comment obtenir votre licence ?</h3>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Le processus est simple et rapide. Votre clé de licence vous est transmise dès réception du paiement.
            </p>
            <ol className="space-y-0">
              {steps.map((step, i) => (
                <li key={i} className="flex items-start gap-4 py-4 border-b border-slate-200 last:border-none">
                  <div className="w-7 h-7 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 text-xs font-black text-blue-600">
                    {i + 1}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed pt-0.5">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-white/10 py-8 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-5">
        <div className="flex items-center gap-2.5 font-black text-base text-white">
          {/* <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
            <Package size={13} className="text-white" />
          </div> */}
          <img src="android-chrome-512x512.png" className="w-8 h-8"/>
          StockPilot
        </div>
        <p className="text-xs text-white/30">© 2026 StockPilot. Conçu pour les commerçants africains.</p>
        <ul className="flex gap-6 list-none">
          {[["Fonctionnalités", "#features"], ["Tarifs", "#pricing"], ["Contact", "#contact"]].map(([label, href]) => (
            <li key={href}>
              <a href={href} className="text-xs text-white/40 hover:text-white/80 transition-colors no-underline">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   STATS BAND
───────────────────────────────────────────── */
function StatsBand() {
  const stats = [
    { value: 100, suffix: "%", label: "Hors ligne\nAucun internet requis" },
    { value: 21, suffix: "j", label: "D'essai gratuit\nSans restriction" },
    { value: 9, suffix: "", label: "Modules intégrés\nDans une seule app" },
    { value: 0, suffix: "", label: "Donnée envoyée\nSur internet" },
  ];

  return (
    <div className="bg-blue-600 py-14 px-6">
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-0">
        {stats.map((s, i) => (
          <div
            key={i}
            className="text-center px-6 border-r border-white/20 last:border-none"
          >
            <div className="text-[44px] font-black text-white leading-none tracking-tight mb-2">
              <Counter to={s.value} suffix={s.suffix} />
            </div>
            <div className="text-sm text-white/75 leading-snug whitespace-pre-line">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HomeContent() {
  const { openModal } = useDownloadModal();

  return (
    <>
      <Nav />

      {/* HERO */}
      <section className="relative pt-36 pb-20 px-6 text-center overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-130 bg-linear-to-b from-blue-50 to-transparent" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-1.5 text-xs font-semibold text-blue-700 mb-10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Logiciel de caisse 100% hors ligne — Windows
          </motion.div>

          <HeroSlider />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 justify-center mt-10"
          >
            <a
              href="#download"
              className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-base px-7 py-4 rounded-xl no-underline transition-all shadow-[0_4px_20px_rgba(37,99,235,0.35)] hover:shadow-[0_8px_28px_rgba(37,99,235,0.4)] hover:-translate-y-0.5"
            >
              <Download size={18} />
              Télécharger gratuitement
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium text-sm border border-slate-300 hover:border-slate-400 bg-white px-5 py-4 rounded-xl no-underline transition-all shadow-sm"
            >
              Voir les fonctionnalités
              <ArrowRight size={15} />
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xs text-slate-400 mt-4 flex items-center justify-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
            Essai gratuit 21 jours — Sans carte bancaire
          </motion.p>
        </div>
      </section>

      {/* CAPTURE (mockup) */}
      <section className="pb-20 px-6">
        <FadeIn>
          <AppMockup />
        </FadeIn>
      </section>

      {/* STATS */}
      <StatsBand />

      {/* WHY */}
      <WhySection />

      {/* BEFORE / AFTER */}
      <BeforeAfter />

      {/* FEATURES */}
      <FeaturesSection />

      {/* REVIEWS */}
      <ReviewsSection />

      {/* PRICING */}
      <PricingSection />

      {/* FAQ */}
      <FAQSection />

      {/* DOWNLOAD */}
      <DownloadSection />

      {/* CTA FINAL */}
      <section className="relative py-28 px-6 text-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-100 bg-blue-600/20 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-2xl mx-auto">
          <FadeIn>
            <h2 className="text-[clamp(32px,5vw,54px)] font-black tracking-tight text-white leading-tight mb-5">
              Arrêtez de gérer au feeling.
              <br />
              Commencez maintenant.
            </h2>
            <p className="text-lg text-white/60 mb-10 max-w-sm mx-auto leading-relaxed">
              21 jours gratuits, sans carte bancaire. Votre stock sous contrôle dès aujourd'hui.
            </p>
            <motion.button
              onClick={openModal}
              whileHover={{ y: -2 }}
              className="inline-flex items-center gap-3 bg-white text-slate-900 font-bold text-base px-8 py-4 rounded-xl border-none cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all"
            >
              <Download size={20} className="text-blue-600" />
              Télécharger StockPilot — Gratuit
            </motion.button>
          </FadeIn>
        </div>
      </section>

      {/* CONTACT */}
      <ContactSection />

      <Footer />
    </>
  );
}


/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function Home() {
  return (
    <DownloadModalProvider>
      <HomeContent />
    </DownloadModalProvider>
  );
}