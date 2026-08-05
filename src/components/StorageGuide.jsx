import React, { useState } from 'react';

// 브랜드별 스토리지 데이터
const storageGuideData = {
  synology: [
    {
      id: 1,
      scale: "소호 / 부서용 (10인 이하)",
      recommended: "DS224+ / DS423+",
      desc: "직관적인 DSM OS 기반으로 부서 단위 문서 자동 백업 및 보안 공유에 최적화",
      serverBadgeColor: "#e6f4ea",
      serverTextColor: "#137333",
    },
    {
      id: 2,
      scale: "중소기업 (10~50인)",
      recommended: "DS923+ / DS1821+",
      desc: "랜섬웨어 예방 Snapshot 및 Active Backup을 통한 PC·서버 통합 백업 제공",
      serverBadgeColor: "#e8f0fe", // 연파랑
      serverTextColor: "#1a73e8",
    },
    {
      id: 3,
      scale: "중견·대기업 (50인 이상)",
      recommended: "SA3610 / HD6500",
      desc: "초고용량 데이터 센터용 인프라, 페타바이트(PB)급 확장성 및 무중단 이중화 구축",
      serverBadgeColor: "#fef7e0", // 연노랑
      serverTextColor: "#b06000",
    },
  ],
  qnap: [
    {
      id: 1,
      scale: "소호 / 부서용 (10인 이하)",
      recommended: "TS-264 / TS-464",
      desc: "고성능 쿼드코어 CPU와 M.2 NVMe 캐싱 지원으로 빠른 파일 응답속도 제공",
      serverBadgeColor: "#e6f4ea",
      serverTextColor: "#137333",
    },
    {
      id: 2,
      scale: "중소기업 (10~50인)",
      recommended: "TVS-h874 / TS-873A",
      desc: "기본 2.5GbE/10GbE 포트 지원 및 ZFS 파일 시스템으로 데이터 오류 자동 복구",
      serverBadgeColor: "#e8f0fe",
      serverTextColor: "#1a73e8",
    },
    {
      id: 3,
      scale: "중견·대기업 (50인 이상)",
      recommended: "TDS-h2489FU / QuTS hero",
      desc: "올플래시(All-Flash) NVMe 전용 구성으로 고성능 가상화 및 초고속 데이터베이스 지원",
      serverBadgeColor: "#fef7e0",
      serverTextColor: "#b06000",
    },
  ],
};

const StorageGuide = () => {
  // 현재 선택된 브랜드 탭 상태 ('synology' | 'qnap')
  const [activeBrand, setActiveBrand] = useState('synology');

  return (
      <div className="selection-guide-section">
        <div className="gpu-header">
            <span className="gpu-eyebrow">SELECTION GUIDE</span>
            <h2 className="gpu-title">
            스토리지 <span className="highlight">선택 가이드</span>
            </h2>
            <p className="gpu-subtitle">
            브랜드와 규모에 따라 최적의 NAS 스토리지 구성을 안내해 드립니다.
            </p>
        </div>

      {/* 브랜드별 탭 스위치 (Synology / QNAP) */}
        <div className="guide-tab-toggle">
            <button
            className={`guide-toggle-btn ${activeBrand === "synology" ? "active" : ""}`}
            onClick={() => setActiveBrand("synology")}
            >
            Synology
            </button>
            <button
            className={`guide-toggle-btn ${activeBrand === "qnap" ? "active" : ""}`}
            onClick={() => setActiveBrand("qnap")}
            >
            QNAP
            </button>
        </div>

      {/* 가이드 테이블 */}
        <div className="guide-table-wrapper">
            <table className="guide-table">
            <thead>
                <tr>
                <th>규모</th>
                <th>추천 스토리지</th>
                <th>설명</th>
                </tr>
            </thead>
            <tbody>
                {storageGuideData[activeBrand].map((item, index) => (
                <tr key={index}>
                    <td className="guide-type-cell">{item.scale}</td>
                    <td>
                    <span
                      className="guide-pill-badge"
                      style={{
                        backgroundColor: item.serverBadgeColor,
                        color: item.serverTextColor,
                      }}
                    >
                        {item.recommended}
                    </span>
                    </td>
                    <td className="guide-desc-cell">{item.desc}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      </div>
  );
};

export default StorageGuide;