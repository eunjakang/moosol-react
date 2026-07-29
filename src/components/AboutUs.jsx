import React from "react";
import {
  companyInfo,
  history,
  certifications,
  partners,
  clients,
} from "../data/aboutData";

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
      <div id="greeting" className="about-section-head">
        <div className="about-eyebrow-green">Company Profile</div>
        <h2>회사 정보</h2>
      </div>
      <div className="about-info-wrap">
        <dl className="about-info-grid">
          {companyInfo.map((row) => (
            <div className="about-info-row" key={row.k}>
              <dt>{row.k}</dt>
              <dd>{row.v}</dd>
            </div>
          ))}
        </dl>
      </div>
      
      <div id="history" className="about-history">
        <div className="about-section-head">
          <div className="about-eyebrow-green">History</div>
          <h2>무솔의 발자취</h2>
          <p>설립 이후 짧은 기간 동안 인증·파트너십·구축 실적을 빠르게 쌓아왔습니다.</p>
        </div>

        <div className="about-history-list">
          {history.map((yr) => (
            <div className="about-history-item" key={yr.year}>
              <div>
                <div className="about-history-year">{yr.year}</div>
                <div className="about-history-tag">{yr.tag}</div>
              </div>
              <div className="about-history-events">
                {yr.items.map((ev, idx) => (
                  <div className="about-history-event" key={idx}>
                    <div className="about-history-dot"></div>
                    <span>{ev}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div> 
      
      <div id="certified">
          <div className="about-section-head">
          <div className="about-eyebrow-green">Certifications</div>
          <h2>인증 &amp; 자격</h2>
          </div>
          <div className="about-certs-grid">
          {certifications.map((c) => (
            <div className="about-cert-card" key={c.t}>
              <div className="cert-title">{c.t}</div>
              <div className="cert-desc">{c.d}</div>
            </div>
          ))}
          </div>
          {/* 인증서 이미지 (*/}
          <div className="about-cert-gallery">
            <div className="about-gallery-card">
              <img src="/images/c1.png" alt="" />
            </div>
            <div className="about-gallery-card">
              <img src="/images/c2.png" alt="" />
            </div>
            <div className="about-gallery-card">
              <img src="/images/c3.png" alt="" />
            </div>
            <div className="about-gallery-card">
              <img src="/images/c4.png" alt="" />
            </div>
          </div>
      </div>
      
      <div id="partners">
        <div className="about-section-head">
        <div className="about-eyebrow-green">Partners</div>
        <h2>파트너사</h2>
      </div>
      <div className="about-partners-grid">
        {partners.map((p) => (
          <div className="about-partner-card" key={p.name}>
            <div className="about-partner-img">
              <img src={p.img} alt={p.name} />
            </div>
            <div className="about-partner-name">{p.name}</div>
            <div className="about-partner-role">{p.role}</div>
            <div className="about-partner-tier">{p.tier}</div>
          </div>
        ))}
        </div>
      </div>
      
      <div id="clients">
        <div className="about-section-head">
        <div className="about-eyebrow-green">Clients</div>
        <h2>주 고객사</h2>
      </div>
      <div className="about-clients-grid">
        {clients.map((c) => (
          <div className="about-client-card" key={c}>
            {c}
          </div>
        ))}
      </div>
      </div>

    </section>
  );
}

export default AboutUs;
