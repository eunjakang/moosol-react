import React, { useState } from 'react';

// 브랜드별 스토리지 데이터
const storageGuideData = {
  synology: [
    {
      id: 1,
      scale: "소규모 / 부서용 (10인 이하)",
      recommended: "DS224+ / DS423+",
      desc: "파일 공유 및 협업 환경 구축에 적합, DSM 기반 중앙 관리 지원",
      serverBadgeColor: "#e6f4ea",
      serverTextColor: "#137333",
    },
    {
      id: 2,
      scale: "중소기업 (10~50인)",
      recommended: "DS923+ / DS1821+",
      desc: "랜섬웨어 대응 환경 구축에 적합, Snapshot 및 Active Backup 지원",
      serverBadgeColor: "#e8f0fe",
      serverTextColor: "#1a73e8",
    },
    {
      id: 3,
      scale: "중견·대기업 (50인 이상)",
      recommended: "SA3610 / HD6500",
      desc: "대용량 데이터 저장 환경에 적합, 고가용성(HA) 및 확장성 제공",
      serverBadgeColor: "#fef7e0",
      serverTextColor: "#b06000",
    },
  ],

  qnap: [
    {
      id: 1,
      scale: "소규모 / 부서용 (10인 이하)",
      recommended: "TS-264 / TS-464",
      desc: "고속 파일 서버 구축에 적합, 2.5GbE 및 NVMe 캐시 지원",
      serverBadgeColor: "#e6f4ea",
      serverTextColor: "#137333",
    },
    {
      id: 2,
      scale: "중소기업 (10~50인)",
      recommended: "TS-873A / TVS-h874",
      desc: "가상화 환경 구축에 적합, QuTS hero(ZFS) 및 ECC 메모리 지원",
      serverBadgeColor: "#e8f0fe",
      serverTextColor: "#1a73e8",
    },
    {
      id: 3,
      scale: "중견·대기업 (50인 이상)",
      recommended: "TDS-h2489FU",
      desc: "엔터프라이즈 스토리지 구축에 적합, All-Flash NVMe 및 고성능 데이터 처리 지원",
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