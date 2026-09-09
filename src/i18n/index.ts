import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { en } from "./locales/en";
import { he } from "./locales/he";
import { ru } from "./locales/ru";

export const SUPPORTED_LANGS = ["en", "he", "ru"] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];

export const RTL_LANGS: Lang[] = ["he"];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      he: { translation: he },
      ru: { translation: ru },
    },
    fallbackLng: "en",
    supportedLngs: SUPPORTED_LANGS,
    // Match "he-IL" -> "he", "ru-RU" -> "ru"
    load: "languageOnly",
    nonExplicitSupportedLngs: true,
    detection: {
      // Query string ?lng=he wins, then saved choice, then browser
      order: ["querystring", "localStorage", "navigator", "htmlTag"],
      lookupQuerystring: "lng",
      lookupLocalStorage: "ela_lang",
      caches: ["localStorage"],
    },
    interpolation: { escapeValue: false },
  });

// Keep <html lang> and dir in sync with the active language.
function applyDir(lng: string) {
  const base = lng.split("-")[0] as Lang;
  const dir = RTL_LANGS.includes(base) ? "rtl" : "ltr";
  document.documentElement.setAttribute("lang", base);
  document.documentElement.setAttribute("dir", dir);
}

applyDir(i18n.language);
i18n.on("languageChanged", applyDir);

export default i18n;
