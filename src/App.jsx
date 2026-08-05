import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home"; // 메인
import AboutUs from "./components/AboutUs"; // 회사소개
import Consulting from "./components/Consulting"; // 컨설팅
import System from "./components/System"; // 시스템구축
// import Server from "./components/Server"; // 서버유통
import Server from "./components/Server_ing"; // 서버유통
import Ai from "./components/Ai"; // AI 비즈니스
import Contact from "./components/Contact"; // 문의하기
import Privacy from "./components/Privacy"; // 개인정보 처리방침
// import MobileBlocker from "./components/MobileBlocker";
import "./App.css"; 

// 페이지(라우트)가 바뀔 때마다 스크롤을 맨 위로 올려줍니다.
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 0);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

    const checkMobile = () => {
      // 모바일 기기이거나 화면 가로 폭이 768px 이하인 경우
      if (mobileRegex.test(userAgent)) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 🚫 모바일이면 차단 화면만 렌더링
  // if (isMobile) {
  //   return <MobileBlocker />;
  // }

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="consulting" element={<Consulting />} />
          <Route path="system" element={<System />} />
          <Route path="server" element={<Server />} />
          <Route path="ai" element={<Ai />} />
          <Route path="contact-section" element={<Contact />} />
          <Route path="privacy" element={<Privacy />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
