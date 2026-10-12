import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import useLang from "../hooks/useLang";

const roadmapSteps = [
  {
    no: "01",
    title: { ko: "컨설팅", en: "Consulting", zh: "咨询" },
    items: {
      ko: ["요구사항 분석", "도입 솔루션 검토"],
      en: ["Requirements Analysis", "Solution Review"],
      zh: ["需求分析", "引入方案评估"],
    },
  },
  {
    no: "02",
    title: { ko: "현장 실사", en: "On-site Assessment", zh: "现场勘查" },
    items: {
      ko: ["네트워크 & 보안 현황 점검", "이슈/개선사항 도출"],
      en: ["Network & Security Status Review", "Identify Issues & Improvements"],
      zh: ["网络与安全现状检查", "梳理问题与改进事项"],
    },
  },
  {
    no: "03",
    title: { ko: "현황 분석 및 설계", en: "Analysis & Design", zh: "现状分析与设计" },
    items: {
      ko: ["목표 아키텍처 상세 설계", "단계별 이행 계획 및 자원 산출"],
      en: ["Detailed Target Architecture Design", "Phased Implementation Plan & Resource Estimation"],
      zh: ["目标架构详细设计", "分阶段实施计划与资源测算"],
    },
  },
  {
    no: "04",
    title: { ko: "시스템 구축", en: "System Build", zh: "系统建设" },
    items: {
      ko: ["통합 테스트 및 안정화 지원"],
      en: ["Integration Testing & Stabilization Support"],
      zh: ["集成测试与稳定化支持"],
    },
  },
];

// id: 조각 선택 상태(hover/active/wave) 추적용 고정 식별자 (언어 전환해도 안 바뀜)
// nameKo/nameEn: 조각/패널에 보여줄 이름, desc/etc: 다국어 설명
const wheelItems = [
  {
    id: "storage",
    nameKo: "스토리지",
    nameEn: "Storage",
    nameZh: "存储",
    icon: "fas fa-database",
    angle: 0,
    desc: {
      ko: "중요한 데이터를 안전하게 저장하고 안정적으로 운영합니다.",
      en: "Safely stores important data and operates it reliably.",
      zh: "安全存储重要数据并稳定运营。",
    },
    etc: {
      ko: [
        "스토리지 운영 및 관리",
        "실시간 용량 모니터링",
        "RAID 구성 및 성능 최적화",
        "스토리지 장애 대응",
        "I/O 병목 구간 및 성능 분석/최적화",
      ],
      en: [
        "Storage operation and management",
        "Real-time capacity monitoring",
        "RAID configuration and performance optimization",
        "Storage incident response",
        "I/O bottleneck analysis and performance optimization",
      ],
      zh: [
        "存储运营与管理",
        "实时容量监控",
        "RAID配置与性能优化",
        "存储故障应对",
        "I/O瓶颈及性能分析/优化",
      ],
    },
  },
  {
    id: "server",
    nameKo: "서버",
    nameEn: "Server",
    nameZh: "服务器",
    icon: "fas fa-server",
    angle: 60,
    desc: {
      ko: "기업의 핵심 서비스를 안정적으로 운영하기 위한 서버 환경을 관리합니다.",
      en: "Manages the server environment to reliably run your core business services.",
      zh: "管理服务器环境，保障企业核心业务稳定运行。",
    },
    etc: {
      ko: [
        "Windows / Linux 서버 전반 운영 관리",
        "OS 최신 패치, 보안 업데이트",
        "HW/SW 장애 원인 분석 및 신속 복구 지원",
        "CPU, RAM, DISK 릴소스 성능 튜닝 및 최적화",
        "서버 가상화 및 클라우드 환경 관리",
      ],
      en: [
        "Overall operation management of Windows / Linux servers",
        "Latest OS patches and security updates",
        "Root-cause analysis and rapid recovery for HW/SW failures",
        "CPU, RAM, and disk resource performance tuning and optimization",
        "Server virtualization and cloud environment management",
      ],
      zh: [
        "Windows / Linux 服务器全面运维管理",
        "操作系统最新补丁与安全更新",
        "软硬件故障原因分析与快速恢复支持",
        "CPU、内存、磁盘资源性能调优与优化",
        "服务器虚拟化与云环境管理",
      ],
    },
  },
  {
    id: "backup",
    nameKo: "백업 · 복구",
    nameEn: "Backup & Recovery",
    nameZh: "备份·恢复",
    icon: "fas fa-shield-virus",
    angle: 120,
    desc: {
      ko: "장애 발생 시 신속한 복구를 통해 업무 연속성을 확보합니다.",
      en: "Ensures business continuity through rapid recovery in the event of a failure.",
      zh: "故障发生时快速恢复，保障业务连续性。",
    },
    etc: {
      ko: [
        "일일/주간/월간 정기 데이터 백업 스케줄 관리",
        "백업 무결성 검증 및 복구 테스트 수행",
        "기업 맞춤형 백업 정책 수립",
        "데이터 즉시 복구 지원",
        "랜섬웨어 전용 백업 솔루션 운영",
      ],
      en: [
        "Daily / weekly / monthly scheduled backup management",
        "Backup integrity verification and recovery testing",
        "Custom backup policy design for each business",
        "Immediate data recovery support",
        "Dedicated ransomware backup solution operation",
      ],
      zh: [
        "每日/每周/每月定期数据备份计划管理",
        "备份完整性验证与恢复测试",
        "制定企业定制化备份策略",
        "数据即时恢复支持",
        "运营勒索软件专用备份方案",
      ],
    },
  },
  {
    id: "security",
    nameKo: "보안솔루션",
    nameEn: "Security",
    nameZh: "安全方案",
    icon: "fas fa-user-shield",
    angle: 180,
    desc: {
      ko: "다양한 보안 솔루션을 통합 운영하여 위협에 대응합니다.",
      en: "Operates multiple security solutions in an integrated way to respond to threats.",
      zh: "整合运营多种安全解决方案，应对各类威胁。",
    },
    etc: {
      ko: [
        "방화벽 정책 관리",
        "안전한 원격 접속을 위한 SSL-VPN 운영",
        "NAC 정책 모니터링",
        "엔드포인트 보안(EDR / DRM / DLP) 관리",
        "로그 실시간 분석 및 정기 점검 리포트",
      ],
      en: [
        "Firewall policy management",
        "SSL-VPN operation for secure remote access",
        "NAC policy monitoring",
        "Endpoint security (EDR / DRM / DLP) management",
        "Real-time log analysis and periodic inspection reports",
      ],
      zh: [
        "防火墙策略管理",
        "运营SSL-VPN，保障安全远程接入",
        "NAC策略监控",
        "终端安全(EDR / DRM / DLP)管理",
        "日志实时分析与定期检查报告",
      ],
    },
  },
  {
    id: "database",
    nameKo: "DB",
    nameEn: "Database",
    nameZh: "数据库",
    icon: "fas fa-coins",
    angle: 240,
    desc: {
      ko: "데이터베이스의 안정성과 성능을 지속적으로 관리합니다.",
      en: "Continuously manages database stability and performance.",
      zh: "持续管理数据库的稳定性与性能。",
    },
    etc: {
      ko: [
        "Oracle / MS-SQL / MySQL 운영 지원",
        "트랜잭션 백업 및 장애 복구",
        "슬로우 쿼리 및 락 성능 튜닝",
        "데이터 무결성 점검",
        "접근 제어 및 암호화 등 보안 정책 운영",
      ],
      en: [
        "Operational support for Oracle / MS-SQL / MySQL",
        "Transaction backup and disaster recovery",
        "Slow query and lock performance tuning",
        "Data integrity checks",
        "Security policy operations including access control and encryption",
      ],
      zh: [
        "Oracle / MS-SQL / MySQL 运维支持",
        "事务备份与故障恢复",
        "慢查询与锁性能调优",
        "数据完整性检查",
        "运营访问控制、加密等安全策略",
      ],
    },
  },
  {
    id: "network",
    nameKo: "네트워크",
    nameEn: "Network",
    nameZh: "网络",
    icon: "fas fa-network-wired",
    angle: 300,
    desc: {
      ko: "끊임없이 안정적인 네트워크 환경을 유지하고 장애를 최소화 합니다.",
      en: "Maintains a consistently stable network environment and minimizes downtime.",
      zh: "持续保持稳定的网络环境，将故障降至最低。",
    },
    etc: {
      ko: [
        "L2 / L3 스위치, 백본 운영",
        "VLAN 설정 및 효율적인 라우팅 정책 관리",
        "네트워크 병목 및 장애 트래픽 정밀 분석",
        "전용 회선 상태 및 대역폭 실시간 점검",
        "장비 구성 변경 및 토폴로지 최적화",
      ],
      en: [
        "L2 / L3 switch and backbone operation",
        "VLAN configuration and efficient routing policy management",
        "In-depth analysis of network bottlenecks and failure traffic",
        "Real-time monitoring of leased line status and bandwidth",
        "Equipment configuration changes and topology optimization",
      ],
      zh: [
        "L2 / L3 交换机及骨干网运维",
        "VLAN配置与高效路由策略管理",
        "网络瓶颈及故障流量精准分析",
        "专线状态与带宽实时检查",
        "设备配置变更与拓扑优化",
      ],
    },
  },
];

const POP_DISTANCE = 14; // 호버/선택 시 조각이 밀려나는 거리

function System() {
  const { t } = useTranslation();
  const lang = useLang();

  const [hoveredId, setHoveredId] = useState(null);
  const [activeId, setActiveId] = useState(null);

  const [waveId, setWaveId] = useState(null);
  const waveIntervalRef = useRef(null);

  // 더블클릭 시 실행될 파도타기 함수
  const triggerWaveAnimation = () => {
    if (waveIntervalRef.current) clearInterval(waveIntervalRef.current);

    setActiveId(null);

    let index = 0;
    waveIntervalRef.current = setInterval(() => {
      if (index < wheelItems.length) {
        setWaveId(wheelItems[index].id);
        index++;
      } else {
        setWaveId(null);
        clearInterval(waveIntervalRef.current);
      }
    }, 250);
  };

  const size = 300; // SVG 캔버스 크기
  const padding = 10;
  const svgSize = size + padding * 2;
  const cx = size / 2;
  const cy = size / 2;
  const outerR = 140; // 바깥 원 반지름
  const innerR = 48;
  const labelR = 95; // 라벨이 배치될 반지름

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

  const activeItem = wheelItems.find((item) => item.id === activeId);

  const getNames = (item) => {
  if (lang === "zh") return { primary: item.nameZh, secondary: item.nameEn };
  if (lang === "en") return { primary: item.nameEn, secondary: item.nameKo };
  return { primary: item.nameKo, secondary: item.nameEn };
};

  return (
    <section id="system">
      <div className="section-title">
        <div className="about-hero-inner">
          <div className="about-eyebrow">{t("system.eyebrowMain")}</div>
          <h1>
            {t("system.heroTitle1")} <br />
            {t("system.heroTitle2")}
          </h1>
          <p>
            {t("system.heroDesc1")} <br />
            {t("system.heroDesc2")}
          </p>
        </div>
      </div>
      <div id="system-info">
        <div className="about-section-head">
          <div className="about-eyebrow-green">SI System</div>
          <h2>{t("system.siTitle")}</h2>
          <p>
            {t("system.siDesc1")} <br />
            <span style={{ color: "#29a640", fontWeight: "bold" }}>
              {t("system.siDesc2Line1")}
              <br />
              {t("system.siDesc2Line2")}
            </span>
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
                <h4>{step.title[lang]}</h4>
                <ul>
                  {step.items[lang].map((item, idx) => (
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
          <h2>{t("system.maintenanceTitle")}</h2>
          <p>
            {t("system.maintenanceDesc1")} <br />
            {t("system.maintenanceDesc2")}
          </p>
        </div>
        <div className="section-inner2">
          <div className="value-grid">
            <div className="value-card">
              <div className="icon">
                <i className="fas fa-headset"></i>
              </div>
              <h3>{t("system.value1Title")}</h3>
              <p>{t("system.value1Desc")}</p>
            </div>
            <div className="value-card">
              <div className="icon">
                <i className="fas fa-bolt"></i>
              </div>
              <h3>{t("system.value2Title")}</h3>
              <p>{t("system.value2Desc")}</p>
            </div>
            <div className="value-card">
              <div className="icon">
                <i className="fas fa-wrench"></i>
              </div>
              <h3>{t("system.value3Title")}</h3>
              <p>{t("system.value3Desc")}</p>
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
                const isPopped = hoveredId === item.id || activeId === item.id || waveId === item.id;
                const offset = isPopped ? popOffset(item.angle) : { x: 0, y: 0 };
                const labelPos = toXY(item.angle, labelR);
                const { primary } = getNames(item);

                return (
                  <g
                    key={item.id}
                    className={`wheel-segment ${isPopped ? "popped" : ""}`}
                    style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => setActiveId((prev) => (prev === item.id ? null : item.id))}
                  >
                    <path d={wedgePath(startAngle, endAngle)} className="wheel-wedge" />
                    <text
                      x={labelPos.x}
                      y={labelPos.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="wheel-label"
                    >
                      {primary}
                    </text>
                  </g>
                );
              })}

              {/* 가운데 원 (클릭 시 선택 해제) */}
              <g
                onClick={() => setActiveId(null)}
                onDoubleClick={triggerWaveAnimation}
                style={{ cursor: activeId ? "pointer" : "default" }}
              >
                <circle cx={cx} cy={cy} r={innerR} className="wheel-center-circle" />
                <text
                  x={cx}
                  y={cy}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="wheel-center-text"
                >
                  {t("system.wheelCenter")}
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
                  <i className={`${activeItem.icon}`}></i>{" "}
                  {getNames(activeItem).primary} ({getNames(activeItem).secondary})
                </div>
                <div className="wheel-desc-list">
                  {activeItem.etc[lang].map((e) => (
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