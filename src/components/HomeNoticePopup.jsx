import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useLang from "../hooks/useLang";

// DB 없이 클라이언트에서만 관리하는 공지 팝업 설정.
// 공지가 바뀌면 id도 꼭 바꿔주세요. (안 바꾸면 '오늘 하루 보지 않기'가 새 공지에도 적용됩니다)
const NOTICE = {
  id: "2026-office-relocation",
  // 이전 일자가 확정되면 아래처럼 넣으세요. null이면 일자 줄이 표시되지 않습니다.
  // moveDate: { ko: "2026년 11월 2일(월)", en: "Monday, November 2, 2026", zh: "2026年11月2日(周一)" },
  moveDate: null,
};

const STORAGE_KEY = `noticePopupHideUntil:${NOTICE.id}`;

function getTodayEnd() {
  const d = new Date();
  d.setHours(23, 59, 59, 999);
  return d.getTime();
}

function HomeNoticePopup() {
  const { t } = useTranslation();
  const lang = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let hideUntil = 0;
    try {
      hideUntil = Number(localStorage.getItem(STORAGE_KEY) || 0);
    } catch (e) {
      // 저장소를 못 쓰는 환경이면 그냥 보여줌
    }
    if (Date.now() > hideUntil) setVisible(true);
  }, []);

  const close = () => setVisible(false);

  const hideForToday = () => {
    try {
      localStorage.setItem(STORAGE_KEY, String(getTodayEnd()));
    } catch (e) {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="notice-popup-backdrop" onClick={close}>
      <div
        className="notice-popup notice-popup--text"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={t("notice.title")}
      >
        <button className="notice-popup-close" onClick={close} aria-label={t("notice.closeAria")}>
          <i className="fas fa-times"></i>
        </button>

        <div className="notice-text-head">
          <span className="notice-text-badge">NOTICE</span>
          <div className="notice-text-icon">
            <i className="fas fa-building"></i>
          </div>
          <h3 className="notice-text-title">{t("notice.title")}</h3>
        </div>

        <div className="notice-text-body">
          <p className="notice-text-intro">
            {t("notice.intro1")}

          </p>

          <div className="notice-text-box">
            <div className="notice-text-row">
              <span className="notice-text-label">
                <i className="fas fa-location-dot"></i> {t("notice.addressLabel")}
              </span>
              <span className="notice-text-value">{t("notice.address")}</span>
            </div>
            {NOTICE.moveDate && (
              <div className="notice-text-row">
                <span className="notice-text-label">
                  <i className="fas fa-calendar-check"></i> {t("notice.dateLabel")}
                </span>
                <span className="notice-text-value">{NOTICE.moveDate[lang] ?? NOTICE.moveDate.ko}</span>
              </div>
            )}
          </div>

          <p className="notice-text-thanks">{t("notice.thanks")}</p>
        </div>

        <div className="notice-popup-footer">
          <button className="notice-popup-hide-today" onClick={hideForToday}>
            {t("notice.hideToday")}
          </button>
          <button className="notice-popup-close-text" onClick={close}>
            {t("notice.close")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeNoticePopup;