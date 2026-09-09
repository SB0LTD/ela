import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="px-8 py-16" style={{ background: "#22505a" }}>
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-6">
        <div className="font-serif text-3xl tracking-wide text-white">
          Ela<span style={{ color: "#e8d5a8" }}>Healing</span>
        </div>
        <p className="max-w-md text-sm leading-relaxed" style={{ color: "rgba(215,240,242,0.7)" }}>
          {t("footer.tagline")}
        </p>
        <div className="w-16 h-px" style={{ background: "rgba(232,213,168,0.4)" }} />
        <p className="text-xs tracking-wide" style={{ color: "rgba(215,240,242,0.5)" }}>
          © {new Date().getFullYear()} {t("footer.rights")}{" "}
          <a href="https://sb0.tech" target="_blank" rel="noopener noreferrer" style={{ color: "#e8d5a8" }}>{t("footer.built")}</a>
        </p>
      </div>
    </footer>
  );
}
