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
    title: "Storage",
    icon: "fas fa-database",
    angle: 0,
    desc: "중요한 데이터를 안전하게 저장하고 안정적으로 운영합니다.",
    etc: [
      "스토리지 운영 및 관리",
      "실시간 용량 모니터링",
      "RAID 구성 및 성능 최적화",
      "스토리지 장애 대응",
      "I/O 병목 구간 및 성능 분석/최적화"
    ]
  },
  {
    label: "서버",
    title: "Server",
    icon: "fas fa-server",
    angle: 60,
    desc: "기업의 핵심 서비스를 안정적으로 운영하기 위한 서버 환경을 관리합니다.",
    etc: [
      "Windows / Linux 서버 전반 운영 관리",
      "OS 최신 패치, 보안 업데이트",
      "HW/SW 장애 원인 분석 및 신속 복구 지원",
      "CPU, RAM, DISK 릴소스 성능 튜닝 및 최적화",
      "서버 가상화 및 클라우드 환경 관리"
    ]
  },
  {
    label: "백업 · 복구",
    title: "Backup & Recovery",
    icon: "fas fa-shield-virus",
    angle: 120,
    desc: "장애 발생 시 신속한 복구를 통해 업무 연속성을 확보합니다.",
    etc: [
      "일일/주간/월간 정기 데이터 백업 스케줄 관리",
      "백업 무결성 검증 및 복구 테스트 수행",
      "기업 맞춤형 백업 정책 수립",
      "데이터 즉시 복구 지원",
      "랜섬웨어 전용 백업 솔루션 운영"
    ]
  },
  {
    label: "보안솔루션",
    title: "Security",
    icon: "fas fa-user-shield",
    angle: 180,
    desc: "다양한 보안 솔루션을 통합 운영하여 위협에 대응합니다.",
    etc: [
      "방화벽 정책 관리",
      "안전한 원격 접속을 위한 SSL-VPN 운영",
      "NAC 정책 모니터링",
      "엔드포인트 보안(EDR / DRM / DLP) 관리",
      "로그 실시간 분석 및 정기 점검 리포트"
    ]
  },
  {
    label: "DB",
    title: "Database",
    icon: "fas fa-coins",
    angle: 240,
    desc: "데이터베이스의 안정성과 성능을 지속적으로 관리합니다.",
    etc: [
      "Oracle / MS-SQL / MySQL 운영 지원",
      "트랜잭션 백업 및 장애 복구",
      "슬로우 쿼리 및 락 성능 튜닝",
      "데이터 무결성 점검",
      "접근 제어 및 암호화 등 보안 정책 운영"
    ]
  },
  {
    label: "네트워크",
    title: "Network",
    icon: "fas fa-network-wired",
    angle: 300,
    desc: "끊임없이 안정적인 네트워크 환경을 유지하고 장애를 최소화 합니다.",
    etc: [
      "L2 / L3 스위치, 백본 운영",
      "VLAN 설정 및 효율적인 라우팅 정책 관리",
      "네트워크 병목 및 장애 트래픽 정밀 분석",
      "전용 회선 상태 및 대역폭 실시간 점검",
      "장비 구성 변경 및 토폴로지 최적화"
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
            서버, 스토리지부터 백업, 보안 솔루션까지-  <br />
            다양한 IT자산을 단일 창구로 일괄 관리하여 운영 효율을 높이고 장애 위험을 최소화합니다.
          </p>
        </div>
        <div className="section-inner2">
          <div className="value-grid">
            <div className="value-card">
              <div className="icon"><i className="fas fa-headset"></i></div>
              <h3>단일 창구 통합 관리</h3>
              <p>제조사마다 제각각인 문의 창구를 하나로 통합하여 장애 발생 시 빠른 원인 파악 및 원스톱 처리</p>
            </div>
            <div className="value-card">
              <div className="icon"><i className="fas fa-bolt"></i></div>
              <h3>24/7 지원 & 긴급 장애 대응</h3>
              <p>전문 기술 엔지니어의 실시간 모니터링, 원격 지원 및 필요시 신속한 현장방문 지원</p>
            </div>
            <div className="value-card">
              <div className="icon"><i className="fas fa-wrench"></i></div>
              <h3>정기 점검 & 예방 정비</h3>
              <p>주기적인 시스템 점검, OS/부품 패치 관리, 기술 리포트 발행으로 장애 사전 예방</p>
            </div>
          </div>
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
                  <i className={`${activeItem.icon}`}></i> {activeItem.label} ({activeItem.title})
                </div>
                {/* <p className="wheel-desc-text">{activeItem.desc}</p> */}
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
