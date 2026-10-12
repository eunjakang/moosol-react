import { useTranslation } from "react-i18next";

export default function useLang() {
  const { i18n } = useTranslation();
  const l = (i18n.resolvedLanguage || i18n.language || "ko").toLowerCase();
  if (l.startsWith("zh")) return "zh";
  if (l.startsWith("en")) return "en";
  return "ko";
}

// {ko,en,zh} 객체에서 현재 언어 값을 꺼냄. 없으면 en → ko 순으로 대체
export function pick(field, lang) {
  if (field && typeof field === "object" && !Array.isArray(field)) {
    return field[lang] ?? field.en ?? field.ko;
  }
  return field;
}