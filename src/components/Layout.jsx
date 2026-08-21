import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTopButton from "./ScrollToTopButton";
import ExternalChatWidget from "./ExternalChatWidget";

// 헤더/푸터는 모든 페이지에 공통으로 노출되고,
// 가운데 <Outlet />에 현재 라우트에 맞는 페이지 컴포넌트가 렌더링됩니다.
function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ScrollToTopButton />
      <ExternalChatWidget />
    </>
  );
}

export default Layout;
