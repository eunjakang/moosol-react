import React from "react";
import { useTranslation } from "react-i18next";

const LANGS = [
  { code: "ko", img: "/images/lang/ko.png", label: "한국어" },
  { code: "en", img: "/images/lang/en.png", label: "English" },
];

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith("en") ? "en" : "ko";

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