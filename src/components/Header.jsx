import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const location = useLocation();

  // 페이지 이동 시 모바일 메뉴 자동 닫기
  useEffect(() => {
    setIsMenuOpen(false);
    setExpandedMenu(null);
  }, [location.pathname]);

  // 모바일 메뉴 열렸을 때 화면 스크롤 방지
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleSubmenu = (label) => {
    setExpandedMenu((prev) => (prev === label ? null : label));
  };

  const navItems = [
    {
      to: "/about-us",
      label: "회사소개",
      children: [
        { to: "/about-us#greeting", label: "회사 정보" },
        { to: "/about-us#history", label: "회사 연혁" },
        { to: "/about-us#certified", label: "인증/자격" },
        { to: "/about-us#partners", label: "파트너사" },
      ],
    },
    {
      label: "클로바인",
      href: "https://clovine.com/kr",
      external: true,
    },
    { to: "/consulting", label: "IT컨설팅" },
    { to: "/system", label: "시스템구축" },
    {
      to: "/server",
      label: "서버공급",
    },
    { to: "/ai", label: "LLM · RAG 솔루션" },
  ];

  return (
    <header>
      <div className="header-container">
        {/* 로고 영역 */}
        <Link to="/" className="logo">
          <img src="/images/logo.png" alt="MOOSOL" />
          <img
            src="/images/face2.png"
            alt=""
            className="logo-mascot"
            aria-hidden="true"
          />
        </Link>

        {/* 모바일 햄버거 버튼 */}
        <button
          className={`hamburger-btn ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="메뉴 열기/닫기"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* 내비게이션 (모바일 열림 상태: active) */}
        <nav className={isMenuOpen ? "active" : ""}>
          {navItems.map((item) => (
            <div
              className={`nav-item ${
                item.children && expandedMenu === item.label ? "open" : ""
              }`}
              key={item.label}
            >
              <div className="nav-link-group">
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-external-link"
                  >
                    {item.label}
                    <i className="fas fa-arrow-up-right-from-square"></i>
                  </a>
                ) : (
                  <NavLink
                    to={item.to}
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    {item.label}
                  </NavLink>
                )}

                {/* 모바일에서 서브메뉴가 있는 항목 펼침/접기 버튼 */}
                {item.children && (
                  <button
                    className="mobile-submenu-toggle"
                    onClick={() => toggleSubmenu(item.label)}
                    aria-label={`${item.label} 하위 메뉴 보기`}
                  >
                    <i className="fas fa-chevron-down"></i>
                  </button>
                )}
              </div>

              {/* 드롭다운 메뉴 */}
              {item.children && (
                <div className="dropdown-menu">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      to={child.to}
                      className="dropdown-link"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* 문의하기 버튼 */}
          <Link to="/contact-section" className="btn-contact">
            문의하기
          </Link>
        </nav>

        {/* 모바일 메뉴 열림 시 어두운 배경 */}
        {isMenuOpen && (
          <div className="nav-overlay" onClick={() => setIsMenuOpen(false)} />
        )}
      </div>
    </header>
  );
}

export default Header;