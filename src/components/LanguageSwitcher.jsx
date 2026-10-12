import React from "react";
import { useTranslation } from "react-i18next";
import useLang from "../hooks/useLang";

const LANGS = [
  { code: "ko", img: "/images/lang/ko.png", label: "한국어" },
  { code: "en", img: "/images/lang/en.png", label: "English" },
  { code: "zh", img: "/images/lang/zh.png", label: "中文" },
];

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = useLang(); // "ko" | "en" | "zh"

  return (
    <div className="lang-switcher">
      {LANGS.map((lang) => (
        <button
          key={lang.code}
          className={`lang-btn ${currentLang === lang.code ? "active" : ""}`}
          onClick={() => i18n.changeLanguage(lang.code)}
          aria-label={lang.label}
          type="button"
        >
          <img src={lang.img} alt={lang.label} />
        </button>
      ))}
    </div>
  );
}

export default LanguageSwitcher;