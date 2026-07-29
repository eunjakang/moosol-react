import React, { useEffect, useState } from "react";

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
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
    >
      <img src="/images/mascot-face.png" alt="맨 위로" className="scroll-top-mascot" />
    <i className="fas fa-arrow-up scroll-top-arrow"></i>
    </button>
  );
}

export default ScrollToTopButton;