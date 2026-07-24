import React from "react";

const roadmapSteps = [
  {
    no: "01",
    title: "컨설팅",
    items: ["요구사항 분석", "도입 솔루션 검토"],
  },
  {
    no: "02",
    title: "현장 실사",
    items: ["네트워크 & 보안 현황 점검", "이슈/개선사항 도출"],
  },
  {
    no: "03",
    title: "현황 분석 및 설계",
    items: ["목표 아키텍처 상세 설계", "단계별 이행 계획 및 자원 산출"],
  },
  {
    no: "04",
    title: "시스템 구축",
    items: ["통합 테스트 및 안정화 지원"],
  },
];

const wheelItems = [
  { label: "스토리지", angle: 0 },
  { label: "서버", angle: 60 },
  { label: "백업 · 복구", angle: 120 },
  { label: "보안솔루션", angle: 180 },
  { label: "DB", angle: 240 },
  { label: "네트워크", angle: 300 },
];

// 구분선(spoke)은 항목 사이 경계선 → 6개, 60도 간격
const spokeAngles = [30, 90, 150, 210, 270, 330];

function System() {

  const size = 300;      // SVG 캔버스 크기
  const cx = size / 2;
  const cy = size / 2;
  const outerR = 140;    // 바깥 원 반지름
  const labelR = 95;    // 라벨이 배치될 반지름

  // 각도를 라디안으로 변환해 (x, y) 좌표 계산
  const toXY = (angleDeg, r) => {
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy - r * Math.sin(rad), // svg는 y가 아래로 증가하므로 반전
    };
  };

  return (
    <section id="system">
      <div className="section-title">
        <div className="about-hero-inner">
          <div className="about-eyebrow">System · 시스템 구축</div>
          <h1>비즈니스의 뼈대를 세우고, <br />미래의 확장을 설계합니다.</h1>
          <p>
            단순히 프로그램을 설치하는 것을 넘어 기업의 성장과 안정성을 위한 기반을 마련합니다. <br />
            안정적인 인프라 설계부터 맞춤형 솔루션 통합까지, 최적의 환경을 구현합니다.
          </p>
        </div>
      </div>
      <div id="system-info">
        <div className="about-section-head">
          <div className="about-eyebrow-green">SI System</div>
          <h2>SI 시스템 구축</h2>
          <p>
            고객 IT 인프라에 대한 종합적인 구축과 체계적인 통합운영 서비스를 제공합니다. <br />
            <span style={{ color: "#29a640", fontWeight: "bold" }}>세부 구축 방식 및 아키텍처는 사업장별 환경과 요구사항에 따라 상이하며,<br />
            사전 컨설팅 및 별도 협의를 통해 맞춤형으로 진행됩니다.</span>
          </p>
        </div>
        <div className="roadmap">
          <div className="roadmap-track">
            <span className="roadmap-line"></span>
            {roadmapSteps.map((step) => (
              <div className="roadmap-circle" key={step.no}>
                {step.no}
              </div>
            ))}
          </div>
          <div className="roadmap-columns">
            {roadmapSteps.map((step) => (
              <div className="roadmap-col" key={step.no}>
                <h4>{step.title}</h4>
                <ul>
                  {step.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div> 
      <div id="maintenance">
        <div className="about-section-head">
          <div className="about-eyebrow-green">Maintenance</div>
          <h2>통합 유지보수</h2>
          <p>
            하드웨어와 소프트웨어를 개별적으로 관리하지 않고,  <br />
            (주)무솔을 통해 체계적으로 통합 관리 · 운영합니다.
          </p>
        </div>
        <div className="wheel-wrap">
          <svg
            className="wheel-svg"
            viewBox={`0 0 ${size} ${size}`}
          >
            {/* 바깥 배경 원 */}
            <circle cx={cx} cy={cy} r={outerR} className="wheel-outer-circle" />

            {/* 구분선(스포크) */}
            {spokeAngles.map((angle) => {
              const outer = toXY(angle, outerR);
              const inner = toXY(angle, 48); 
              return (
                <line
                  key={angle}
                  x1={inner.x}
                  y1={inner.y}
                  x2={outer.x}
                  y2={outer.y}
                  className="wheel-spoke"
                />
              );
            })}

            {/* 라벨 */}
            {wheelItems.map((item) => {
              const pos = toXY(item.angle, labelR);
              return (
                <text
                  key={item.label}
                  x={pos.x}
                  y={pos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="wheel-label"
                >
                  {item.label}
                </text>
              );
            })}

            {/* 가운데 원 */}
            <circle cx={cx} cy={cy} r="48" className="wheel-center-circle" />
            <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" className="wheel-center-text">
              통합유지보수
            </text>
          </svg>
        </div>
      </div> 
    </section>
  );
}

export default System;
