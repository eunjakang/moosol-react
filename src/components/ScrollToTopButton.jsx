import React, { useEffect, useState } from "react";

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(30);

  useEffect(() => {
    const handleScroll = () => {
      // 1. 일정 스크롤 이상 내려왔을 때 버튼 표시 여부
      setVisible(window.scrollY > 400);

      // 2. 푸터 감지하여 bottom 위치 계산
      const footer = document.querySelector("footer"); 
      if (footer) {
        const footerTop = footer.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        // 푸터가 화면 안으로 들어왔을 때
        if (footerTop < windowHeight) {
          const overDistance = windowHeight - footerTop;
          // 푸터가 넘어온 높이 + 여유 여백(20px)만큼 위로 올림
          setBottomOffset(overDistance + 20);
        } else {
          // 푸터가 보이지 않을 때 기본 위치 유지
          setBottomOffset(30);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={`scroll-top-btn ${visible ? "visible" : ""}`}
      onClick={scrollToTop}
      aria-label="맨 위로 이동"
      style={{
        bottom: `${bottomOffset}px`, 
        transition: "bottom 0.1s ease-out, opacity 0.3s ease", 
      }}
    >
      <img src="/images/mascot-face.png" alt="맨 위로" className="scroll-top-mascot" />
    <i className="fas fa-arrow-up scroll-top-arrow"></i>
    </button>
  );
}

export default ScrollToTopButton;