import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { LangSwitcher } from "@/components/LangSwitcher";

export function Header() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { label: t("nav.story"), href: "#story" },
    { label: t("nav.proof"), href: "#proof" },
    { label: t("nav.approach"), href: "#approach" },
    { label: t("nav.offerings"), href: "#offerings" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(250,248,244,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(130,207,215,0.2)" : "1px solid transparent",
      }}
    >
      <div className="flex items-center justify-between px-8 py-5 max-w-6xl mx-auto">
        <a href="#" className="font-serif text-2xl tracking-wide" style={{ color: "#22505a" }}>
          Ela<span style={{ color: "#c9a35f" }}>Healing</span>
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm tracking-wide transition-colors" style={{ color: "#4a5f66" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a35f")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#4a5f66")}>
              {l.label}
            </a>
          ))}
          <a href="#contact"
            className="text-sm tracking-wide rounded-full transition-all whitespace-nowrap"
            style={{ padding: "10px 26px", background: "linear-gradient(135deg, #22505a, #2e97a5)", color: "#fff", boxShadow: "0 6px 18px rgba(34,80,90,0.2)", display: "inline-flex", alignItems: "center" }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 10px 24px rgba(34,80,90,0.3)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 18px rgba(34,80,90,0.2)"; }}>
            {t("nav.connect")}
          </a>
          <LangSwitcher />
        </nav>

        <div className="md:hidden flex items-center gap-4">
          <LangSwitcher />
          <button onClick={() => setOpen(!open)} className="p-1" aria-label="Menu">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="#22505a" strokeWidth={1.5}>
              {open ? <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden" style={{ background: "rgba(250,248,244,0.98)" }}>
            <div className="flex flex-col gap-5 px-8 py-7">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-base tracking-wide" style={{ color: "#4a5f66" }}>
                  {l.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setOpen(false)} className="text-base tracking-wide" style={{ color: "#c9a35f" }}>{t("nav.connect")}</a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
