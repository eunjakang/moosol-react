import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import ko from "./locales/ko/translation.json";
import en from "./locales/en/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ko: { translation: ko },
      en: { translation: en },
    },
    fallbackLng: "ko",
    supportedLngs: ["ko", "en"],
    interpolation: {
      escapeValue: false, // React가 이미 XSS를 방지해줌
    },
    detection: {
      // localStorage에 저장된 값 -> 브라우저 언어 순으로 감지
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "moosolLang",
    },
  });

export default i18n;