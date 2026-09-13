import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGS, type Lang } from "@/i18n";

const LANGS: Record<Lang, { native: string; short: string }> = {
  en: { native: "English", short: "EN" },
  he: { native: "עברית", short: "עב" },
  ru: { native: "Русский", short: "RU" },
};

export function LangSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = (i18n.language.split("-")[0] as Lang) || "en";
  const isRtl = current === "he";

  // Close on outside click + Escape
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const select = (lng: Lang) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
        className="flex items-center gap-2 rounded-full transition-colors"
        style={{
          padding: "7px 14px",
          border: "1px solid rgba(130,207,215,0.5)",
          color: "#22505a",
          fontSize: "13px",
          letterSpacing: "0.04em",
          background: open ? "rgba(215,240,242,0.5)" : "transparent",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(215,240,242,0.5)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = open ? "rgba(215,240,242,0.5)" : "transparent")}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4} aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3c2.4 2.6 3.6 6 3.6 9s-1.2 6.4-3.6 9c-2.4-2.6-3.6-6-3.6-9s1.2-6.4 3.6-9z" />
        </svg>
        <span style={{ fontWeight: 500 }}>{LANGS[current].short}</span>
        <motion.svg animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}
          className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full mt-2 overflow-hidden z-50"
            style={{
              [isRtl ? "left" : "right"]: 0,
              minWidth: 168,
              background: "#fff",
              borderRadius: "16px",
              border: "1px solid rgba(130,207,215,0.35)",
              boxShadow: "0 16px 40px rgba(34,80,90,0.16)",
              padding: "6px",
            }}
          >
            {SUPPORTED_LANGS.map((lng) => {
              const active = lng === current;
              return (
                <li key={lng} role="option" aria-selected={active}>
                  <button
                    onClick={() => select(lng)}
                    className="w-full flex items-center justify-between rounded-xl transition-colors"
                    style={{
                      padding: "11px 14px",
                      color: active ? "#2e97a5" : "#4a5f66",
                      fontWeight: active ? 600 : 400,
                      background: active ? "rgba(46,151,165,0.08)" : "transparent",
                      fontSize: "14px",
                    }}
                    onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "#f4efe6"; }}
                    onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
                  >
                    <span className={isRtl ? "" : ""} style={{ fontFamily: lng === "he" ? "var(--font-sans-he)" : "var(--font-sans)" }}>
                      {LANGS[lng].native}
                    </span>
                    {active && (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="#2e97a5" strokeWidth={2.5} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
