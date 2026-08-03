import React, { useState } from "react";
import { gpuPackages } from "../data/gpuPackages";
import { Link } from "react-router-dom";

const TABS = [
  { key: "gpu-ai", label: "GPU/AI" },
  { key: "server", label: "서버" },
  { key: "storage", label: "스토리지" },
];

function GpuAiTab() {
  return (
    <div className="gpu-section">
      <div className="gpu-header">
        <span className="gpu-eyebrow">GPU 패키지</span>
        <h2 className="gpu-title">목적에 맞는 GPU 서버 구성</h2>
        <p className="gpu-subtitle">GPU 탑재 수량 및 용도별 최적 패키지를 선택하세요</p>
      </div>

      <div className="gpu-grid">
        {gpuPackages.map((pkg) => (
          <div
            key={pkg.tag}
            className={`gpu-card ${pkg.recommended ? "gpu-card-featured" : ""}`}
          >
            {pkg.recommended && <span className="gpu-card-badge">추천</span>}

            <span className="gpu-card-tag">{pkg.tag}</span>
            <h3 className="gpu-card-title">{pkg.title}</h3>
            <p className="gpu-card-desc">{pkg.desc}</p>

            <div className="gpu-spec">{pkg.spec}</div>

            <ul className="gpu-features">
              {pkg.features.map((f) => (
                <li
                  key={f.text}
                  className={`gpu-feature ${f.included ? "" : "gpu-feature-excluded"}`}
                >
                  <span className="gpu-feature-mark">
                    {f.included ? <i className="fas fa-check"></i> : "―"}
                  </span>
                  {f.text}
                </li>
              ))}
            </ul>

            <button className="gpu-cta-btn">자세히 보기</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// 아직 틀만 잡아둔 탭 (서버 / 스토리지)
function PlaceholderTab({ label }) {
  return (
    <div className="server-tab-placeholder">
      <i className="fas fa-server"></i>
      <p>{label} 탭은 준비중입니다.</p>
    </div>
  );
}

function Server() {
  const [activeTab, setActiveTab] = useState("gpu-ai");

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

      <div className="server-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`server-tab ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "gpu-ai" && <GpuAiTab />}
      {activeTab === "server" && <PlaceholderTab label="서버" />}
      {activeTab === "storage" && <PlaceholderTab label="스토리지" />}
    </section>
  );
}

export default Server;
