import React from "react";
import { Link } from "react-router-dom";

function Server() {
  return (
    <section id="server">
      <div className="section-title">
        <div className="about-hero-inner">
          <div className="about-eyebrow">GPU & Memory & Server · 유통</div>
          <h1>AI와 IT인프라의 핵심, <br />무솔이 가장 확실하게 공급합니다.</h1>
          <p>
            급변하는 IT·AI 수요에 맞춰 최신 GPU, 메모리, 정품 서버를 신속하게 공급합니다. <br />
            고객사 환경에 최적화된 부품 조합과 합리적인 견적으로 성공적인 구축을 지원합니다.
          </p>
        </div>
      </div>
      <div className="coming-soon">
        <div className="coming-soon-icon">
          <i className="fas fa-server"></i>
        </div>
        <div className="coming-soon-badge">Coming Soon</div>
        <p>
          현재 이 페이지는 준비중입니다.
          <br />
          서버 견적이 필요하신 경우 아래 문의하기를 통해 연락 주십시오.
        </p>
        <Link to="/contact-section" className="coming-soon-btn">
          문의하기 <i className="fas fa-arrow-right"></i>
        </Link>
      </div>
    </section>
  );
}

export default Server;
