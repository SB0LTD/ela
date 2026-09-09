import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGS, type Lang } from "@/i18n";

const LABELS: Record<Lang, string> = {
  en: "EN",
  he: "עב",
  ru: "RU",
};

const NAMES: Record<Lang, string> = {
  en: "English",
  he: "עברית",
  ru: "Русский",
};

export function LangSwitcher({ dark = false }: { dark?: boolean }) {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = (i18n.language.split("-")[0] as Lang) || "en";

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const color = dark ? "#e8d5a8" : "#22505a";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-sm tracking-wide transition-opacity"
        style={{ color }}
        aria-label="Language"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9s1-6.5 3.5-9z" />
        </svg>
        {LABELS[current]}
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 overflow-hidden z-50"
            style={{
              [document.documentElement.dir === "rtl" ? "left" : "right"]: 0,
              background: "#fff",
              borderRadius: "12px",
              border: "1px solid rgba(130,207,215,0.4)",
              boxShadow: "0 12px 30px rgba(34,80,90,0.15)",
              minWidth: 130,
            }}
          >
            {SUPPORTED_LANGS.map((lng) => (
              <li key={lng}>
                <button
                  onClick={() => { i18n.changeLanguage(lng); setOpen(false); }}
                  className="w-full text-start px-4 py-2.5 text-sm transition-colors"
                  style={{
                    color: lng === current ? "#2e97a5" : "#4a5f66",
                    fontWeight: lng === current ? 500 : 400,
                    background: lng === current ? "rgba(46,151,165,0.06)" : "transparent",
                  }}
                  onMouseEnter={(e) => { if (lng !== current) e.currentTarget.style.background = "#f4efe6"; }}
                  onMouseLeave={(e) => { if (lng !== current) e.currentTarget.style.background = "transparent"; }}
                >
                  {NAMES[lng]}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
