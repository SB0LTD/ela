import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGS, type Lang } from "@/i18n";

const LABELS: Record<Lang, string> = {
  en: "EN",
  he: "עב",
  ru: "RU",
};

export function LangSwitcher() {
  const { i18n } = useTranslation();
  const current = (i18n.language.split("-")[0] as Lang) || "en";

  return (
    <div className="flex items-center gap-2 text-xs tracking-wide" aria-label="Language">
      {SUPPORTED_LANGS.map((lng, i) => (
        <span key={lng} className="flex items-center gap-2">
          {i > 0 && <span style={{ color: "rgba(130,159,166,0.4)" }}>·</span>}
          <button
            onClick={() => i18n.changeLanguage(lng)}
            className="transition-opacity"
            style={{
              color: lng === current ? "#2e97a5" : "#8299a0",
              opacity: lng === current ? 1 : 0.6,
              fontWeight: lng === current ? 500 : 400,
              cursor: "pointer",
            }}
            onMouseEnter={(e) => { if (lng !== current) e.currentTarget.style.opacity = "1"; }}
            onMouseLeave={(e) => { if (lng !== current) e.currentTarget.style.opacity = "0.6"; }}
          >
            {LABELS[lng]}
          </button>
        </span>
      ))}
    </div>
  );
}
