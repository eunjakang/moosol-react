import React from "react";

function System() {
  return (
    <section id="system">
      <div className="section-title">
        <h4>시스템 구축</h4>
        <h2>비즈니스의 뼈대를 세우고, <br />미래의 확장을 설계합니다.</h2>
        <p>단순히 프로그램을 설치하는 것을 넘어 기업의 성장과 안정성을 위한 기반을 마련합니다. <br />
          안정적인 인프라 설계부터 맞춤형 솔루션 통합까지, 최적의 환경을 구현합니다.
        </p>
      </div>
      <div className="maint-grid">
        <div className="maint-left">
          <h3>
            SI 구축
          </h3>
          <p>
            고객 IT 인프라에 대한 종합적인 구축과 체계적인 통합운영 서비스를 제공합니다. <br />
            <span style={{ color: "#29A640", fontWeight: "bold" }}>세부 구축 방식 및 아키텍처는 사업장별 환경과 요구사항에 따라 상이하며,<br />
            사전 컨설팅 및 별도 협의를 통해 맞춤형으로 진행됩니다.
            </span>
          </p>
        </div>

        <div className="maint-sla">
          <h4>무솔 핵심 유지보수 가치</h4>
          <div className="sla-item">
            <div className="sla-icon">01</div>
            <div className="sla-content">
              <h5>단일 기술 창구 가동</h5>
              <p>다양한 멀티 벤더 장비 전체를 무솔 기술 지원 센터에서 원스톱 가동</p>
            </div>
          </div>
          <div className="sla-item">
            <div className="sla-icon">02</div>
            <div className="sla-content">
              <h5>보안 정책 튜닝 지원</h5>
              <p>정기적인 방화벽 정책 재조율 및 정부 규정 체크 대행</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default System;
