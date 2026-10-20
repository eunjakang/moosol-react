import React, { useEffect, useState } from "react";

// DB 없이 클라이언트에서만 관리하는 공지 팝업 설정.
// 이미지나 링크가 바뀌면 이 부분만 수정하면 됩니다.
const NOTICE = {
  id: "2026-jeonbuk-bm", // 공지가 바뀌면 이 id도 바꿔주세요 (안 바꾸면 '오늘 하루 보지 않기' 설정이 새 공지에도 적용됨)
  image: "/images/notices/popup.png",
  alt: "충남 정보보호 신규 비즈니스 모델 발굴 지원사업 안내",
  link: null, // 이미지를 클릭했을 때 이동할 페이지 (없으면 null)
  size: { width: 500, height: 600 }, // 팝업 이미지 크기 (px)
};

const STORAGE_KEY = `noticePopupHideUntil:${NOTICE.id}`;

function getTodayEnd() {
  const d = new Date();
  d.setHours(23, 59, 59, 999);
  return d.getTime();
}

function HomeNoticePopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hideUntil = Number(localStorage.getItem(STORAGE_KEY) || 0);
    if (Date.now() > hideUntil) {
      setVisible(true);
    }
  }, []);

  const close = () => setVisible(false);

  const hideForToday = () => {
    localStorage.setItem(STORAGE_KEY, String(getTodayEnd()));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="notice-popup-backdrop" onClick={close}>
      <div className="notice-popup" onClick={(e) => e.stopPropagation()}>
        <button className="notice-popup-close" onClick={close} aria-label="팝업 닫기">
          <i className="fas fa-times"></i>
        </button>

        {NOTICE.link ? (
          <a href={NOTICE.link} className="notice-popup-image-link">
            <img src={NOTICE.image} alt={NOTICE.alt} className="notice-popup-image" />
          </a>
        ) : (
          <img src={NOTICE.image} alt={NOTICE.alt} className="notice-popup-image" />
        )}

        <div className="notice-popup-footer">
          <button className="notice-popup-hide-today" onClick={hideForToday}>
            오늘 하루 보지 않기
          </button>
          <button className="notice-popup-close-text" onClick={close}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeNoticePopup;