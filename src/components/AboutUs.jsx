import React from "react";

function AboutUs() {
  return (
    <section id="about-us">
      <div className="section-title">
        <div className="about-hero-inner">
          <div className="about-eyebrow">Company · 회사 소개</div>
          <h1>기업을 바라보고, 보안을 마주합니다.</h1>
          <p>
            ㈜무솔은 최적의 네트워크 환경과 통합보안솔루션을 제공합니다.<br />
            컨설팅부터 설계·구축·운영까지, 기업 인프라의 전 주기를 책임집니다.
          </p>
        </div>
      </div>
      <div className="about-grid">
        <div className="about-content">
          <h3>인프라 설계부터 보안까지 단 하나의 파트너</h3>
          <p>
            무솔은 다양한 네트워크 물리적 구성요소와 정보보안 솔루션을
            최적화하여 조율하는 통합 네트워크 SI 전문 파트너입니다. 급변하는
            비즈니스 컴플라이언스를 완벽히 준수하며 비즈니스의 영속성을
            확보합니다.
          </p>
          <div className="about-features">
            <div className="about-feature-card">
              <i className="fas fa-user-group"></i>
              <h4>전문 엔지니어 직접 설계</h4>
              <p>컨설팅부터 구축까지 전문 엔지니어가 책임집니다.</p>
            </div>
            <div className="about-feature-card">
              <i className="fas fa-handshake"></i>
              <h4>멀티 벤더 공식 파트너십</h4>
              <p>다양한 최정상 제조사 제품군의 최적 구성을 보장합니다.</p>
            </div>
          </div>
        </div>
        <div className="about-img">
          <i className="fas fa-building-shield"></i>
        </div>
      </div>
      <div id="greeting">
        <h3>인사말</h3>
        <p>여기에 인사말 내용을 채워주세요.</p>
      </div>

      <div id="history">
        <h3>연혁</h3>
        <p>여기에 연혁 내용을 채워주세요.</p>
      </div>

      <div id="location">
        <h3>오시는 길</h3>
        <p>여기에 오시는 길 내용을 채워주세요.</p>
      </div>
    </section>
  );
}

export default AboutUs;
