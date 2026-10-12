import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import ko from "./locales/ko/translation.json";
import en from "./locales/en/translation.json";
import zh from "./locales/zh/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ko: { translation: ko },
      en: { translation: en },
      zh: { translation: zh },
    },
    fallbackLng: "ko",
    supportedLngs: ["ko", "en", "zh"],
    nonExplicitSupportedLngs: true, // zh-CN, zh-TW 등도 zh로 인식
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "moosolLang",
    },
  });

// <html lang="..."> 동기화 (접근성/검색엔진용)
const syncHtmlLang = (lng) => {
  document.documentElement.lang = (lng || "ko").split("-")[0];
};
syncHtmlLang(i18n.language);
i18n.on("languageChanged", syncHtmlLang);

export default i18n;