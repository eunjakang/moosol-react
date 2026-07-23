import React from "react";
import { Link, NavLink } from "react-router-dom";

/**
 * 상단 헤더 (모든 페이지 공통)
 * 각 메뉴는 별도 페이지로 이동하며, 현재 페이지에 해당하는 링크는
 * NavLink가 자동으로 active 클래스를 붙여줍니다.
 */
function Header() {
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
  { to: "/consulting", label: "컨설팅" },
  { to: "/system", label: "시스템구축" },
  {
    to: "/server",
    label: "서버유통",
    // children: [
    //   { to: "/server", label: "AI GPU" },
    //   { to: "/server", label: "서버 메모리" },
    //   { to: "/server", label: "서버 스토리지" },
    // ],
  },
];

return (
  <header>
    <div className="header-container">
      <Link to="/" className="logo">
        <img src="/images/logo.png" alt="MOOSOL" />
      </Link>
      <nav>
        {navItems.map((item) => (
          <div className="nav-item" key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {item.label}
            </NavLink>

            {item.children && (
              <div className="dropdown-menu">
                {item.children.map((child) => (
                  <Link key={child.label} to={child.to} className="dropdown-link">
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
        <Link to="/contact-section" className="btn-contact">
          문의하기
        </Link>
      </nav>
    </div>
  </header>
);
}

export default Header;
