import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home"; // 메인
import AboutUs from "./components/AboutUs"; // 회사소개
import Consulting from "./components/Consulting"; // 컨설팅
import System from "./components/System"; // 시스템구축
import Server from "./components/Server"; // 서버유통
import Contact from "./components/Contact"; // 문의하기
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
          <Route path="contact-section" element={<Contact />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
