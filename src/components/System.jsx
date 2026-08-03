import React, { useState, useRef } from "react";

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
  {
    label: "스토리지",
    angle: 0,
    desc: "중요한 데이터를 안전하게 저장하고 안정적으로 운영합니다.",
    etc: [
      "용량 관리 및 증설",
      "RAID 상태 점검",
      "스토리지 장애 대응",
      "성능 분석"
    ]
  },
  {
    label: "서버",
    angle: 60,
    desc: "기업의 핵심 서비스를 안정적으로 운영하기 위한 서버 환경을 관리합니다.",
    etc: [
      "Windows / Linux 서버 운영",
      "OS 및 보안 패치 관리",
      "장애 분석 및 복구 지원",
      "성능 튜닝 및 최적화"
    ]
  },
  {
    label: "백업 · 복구",
    angle: 120,
    desc: "장애 발생 시 신속한 복구를 통해 업무 연속성을 확보합니다.",
    etc: [
      "정기 백업 관리",
      "복구 테스트",
      "백업 정책 수립",
      "장애 복구 지원",
      "데이터 무결성 확인"
    ]
  },
  {
    label: "보안솔루션",
    angle: 180,
    desc: "다양한 보안 솔루션을 통합 운영하여 위협에 대응합니다.",
    etc: [
      "방화벽 정책 관리",
      "VPN 운영",
      "NAC 운영",
      "EDR / DRM / DLP 관리",
      "로그 분석 및 보안 점검"
    ]
  },
  {
    label: "DB",
    angle: 240,
    desc: "데이터베이스의 안정성과 성능을 지속적으로 관리합니다.",
    etc: [
      "백업 및 복구 지원",
      "성능 튜닝",
      "장애 분석",
      "운영 정책 관리"
    ]
  },
  {
    label: "네트워크",
    angle: 300,
    desc: "끊임없이 안정적인 네트워크 환경을 유지하고 장애를 최소화 합니다.",
    etc: [
      "L2 / L3 / 백본 운영",
      "라우팅 및 VLAN 관리",
      "네트워크 장애 분석",
      "회선 상태 점검",
      "구성 변경 및 최적화"
    ]
  },
];

const POP_DISTANCE = 14; // 호버/선택 시 조각이 밀려나는 거리

// 구분선(spoke)은 항목 사이 경계선 → 6개, 60도 간격
const spokeAngles = [30, 90, 150, 210, 270, 330];

function System() {
  const [hoveredLabel, setHoveredLabel] = useState(null);
  const [activeLabel, setActiveLabel] = useState(null);

  const [waveLabel, setWaveLabel] = useState(null);
  const waveIntervalRef = useRef(null);

// 2. 더블클릭 시 실행될 파도타기 함수
const triggerWaveAnimation = () => {
  if (waveIntervalRef.current) clearInterval(waveIntervalRef.current);

  setActiveLabel(null);

  let index = 0;
  waveIntervalRef.current = setInterval(() => {
    if (index < wheelItems.length) {
      setWaveLabel(wheelItems[index].label);
      index++;
    } else {
      setWaveLabel(null);
      clearInterval(waveIntervalRef.current);
    }
  }, 250);
};

  const size = 300;      // SVG 캔버스 크기
  const padding = 10;
  const svgSize = size + padding * 2; 
  const cx = size / 2;
  const cy = size / 2;
  const outerR = 140;    // 바깥 원 반지름
  const innerR = 48;
  const labelR = 95;    // 라벨이 배치될 반지름

  // 각도를 라디안으로 변환해 (x, y) 좌표 계산
  const toXY = (angleDeg, r) => {
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy - r * Math.sin(rad), // svg는 y가 아래로 증가하므로 반전
    };
  };

  const wedgePath = (startAngle, endAngle) => {
    const outerStart = toXY(startAngle, outerR);
    const outerEnd = toXY(endAngle, outerR);
    const innerEnd = toXY(endAngle, innerR);
    const innerStart = toXY(startAngle, innerR);
    const largeArc = Math.abs(endAngle - startAngle) > 180 ? 1 : 0;

    return [
      `M ${outerStart.x} ${outerStart.y}`,
      `A ${outerR} ${outerR} 0 ${largeArc} 0 ${outerEnd.x} ${outerEnd.y}`,
      `L ${innerEnd.x} ${innerEnd.y}`,
      `A ${innerR} ${innerR} 0 ${largeArc} 1 ${innerStart.x} ${innerStart.y}`,
      "Z",
    ].join(" ");
  };

  // 조각이 바깥으로 밀려나는 방향(중심 각도) 벡터
  const popOffset = (angleDeg) => {
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: POP_DISTANCE * Math.cos(rad),
      y: -POP_DISTANCE * Math.sin(rad),
    };
  };

  const activeItem = wheelItems.find((item) => item.label === activeLabel);

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
        <div className="wheel-section-container">
          <div className="wheel-wrap">
            <svg className="wheel-svg" viewBox={`0 0 ${svgSize} ${svgSize}`}>
              {/* 조각(도넛 세그먼트) */}
              {wheelItems.map((item) => {
                const startAngle = item.angle - 30;
                const endAngle = item.angle + 30;
                const isPopped = hoveredLabel === item.label || activeLabel === item.label || waveLabel === item.label;
                const offset = isPopped ? popOffset(item.angle) : { x: 0, y: 0 };
                const labelPos = toXY(item.angle, labelR);

                return (
                  <g
                    key={item.label}
                    className={`wheel-segment ${isPopped ? "popped" : ""}`}
                    style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
                    onMouseEnter={() => setHoveredLabel(item.label)}
                    onMouseLeave={() => setHoveredLabel(null)}
                    onClick={() =>
                      setActiveLabel((prev) => (prev === item.label ? null : item.label))
                    }
                  >
                    <path d={wedgePath(startAngle, endAngle)} className="wheel-wedge" />
                    <text
                      x={labelPos.x}
                      y={labelPos.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="wheel-label"
                    >
                      {item.label}
                    </text>
                  </g>
                );
              })}

              {/* 가운데 원 (클릭 시 선택 해제) */}
              <g
                onClick={() => setActiveLabel(null)}
                onDoubleClick={triggerWaveAnimation}
                style={{ cursor: activeLabel ? "pointer" : "default" }}
              >
                <circle cx={cx} cy={cy} r={innerR} className="wheel-center-circle" />
                <text
                  x={cx}
                  y={cy}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="wheel-center-text"
                >
                  통합유지보수
                </text>
              </g>
            </svg>
          </div>
          <div
            className={`wheel-desc-panel ${activeItem ? "visible" : ""} ${
              activeItem
                ? activeItem.angle > 90 && activeItem.angle < 270
                  ? "pos-left"
                  : "pos-right"
                : ""
            }`}
          >
            {activeItem && (
              <>
                <div className="wheel-desc-title">
                  <i className="fas fa-circle-check"></i> {activeItem.label}
                </div>
                <p className="wheel-desc-text">{activeItem.desc}</p>
                <div className="wheel-desc-list">
                  {activeItem.etc.map((e) => (
                    <div key={e}>
                      <i className="fas fa-circle"></i> {e}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div> 
    </section>
  );
}

export default System;
