import React from "react";

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div>
          <p>
            <strong>(주)무솔</strong>
          </p>
          <p style={{ marginTop: "5px", opacity: 0.9}}>
            본사 : 충청남도 아산시 탕정면 이순신대로 442, 305호 <br />
            연구소 : 경기도 안양시 만안구 덕천로 152번길 25 B1706
          </p>
        </div>
        <div
          className="footer-links-center"
          style={{ display: "flex", gap: "30px" }}
        >
          <a href="/privacy" style={{ color: "#728c77", textDecoration: "none" }}>
            개인정보 처리방침
          </a>
          {/* <a href="#" style={{ color: "#728c77", textDecoration: "none" }}>
            이용약관
          </a> */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
