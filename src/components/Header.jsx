import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

function Header() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
    setExpandedMenu(null);
  }, [location.pathname]);

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
      label: t("header.nav.about"),
      children: [
        { to: "/about-us#greeting", label: t("header.nav.aboutInfo") },
        { to: "/about-us#history", label: t("header.nav.aboutHistory") },
        { to: "/about-us#certified", label: t("header.nav.certified") },
        { to: "/about-us#partners", label: t("header.nav.partners") },
      ],
    },
    {
      label: t("header.clovine"),
      href: "https://clovine.com/kr",
      external: true,
    },
    { to: "/consulting", label: t("header.nav.consulting") },
    { to: "/system", label: t("header.nav.system") },
    {
      to: "/server",
      label: t("header.nav.server"),
    },
    { to: "/ai", label: t("header.nav.ai") },
  ];

  return (
    <header>
      <div className="header-container">
        {/* 로고 영역 */}
        <div className="header-left">
          <Link to="/" className="logo">
            <img src="/images/logo.png" alt="MOOSOL" />
            <img
              src="/images/face2.png"
              alt=""
              className="logo-mascot"
              aria-hidden="true"
            />
          </Link>
          <LanguageSwitcher />
        </div>

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
            {t("header.contact")}
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