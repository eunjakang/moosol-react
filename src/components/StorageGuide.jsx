import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// 브랜드별 스토리지 데이터 (다국어)
const storageGuideData = {
  synology: [
    {
      id: 1,
      scale: { ko: "소규모 / 부서용 (10인 이하)", en: "Small / Departmental (10 or fewer)" },
      recommended: "DS224+ / DS423+",
      desc: {
        ko: "파일 공유 및 협업 환경 구축에 적합, DSM 기반 중앙 관리 지원",
        en: "Suited for file sharing and collaboration, with DSM-based centralized management",
      },
      serverBadgeColor: "#e6f4ea",
      serverTextColor: "#137333",
    },
    {
      id: 2,
      scale: { ko: "중소기업 (10~50인)", en: "Small-Medium Business (10–50)" },
      recommended: "DS923+ / DS1821+",
      desc: {
        ko: "랜섬웨어 대응 환경 구축에 적합, Snapshot 및 Active Backup 지원",
        en: "Suited for ransomware-resilient environments, with Snapshot and Active Backup support",
      },
      serverBadgeColor: "#e8f0fe",
      serverTextColor: "#1a73e8",
    },
    {
      id: 3,
      scale: { ko: "중견·대기업 (50인 이상)", en: "Mid-to-Large Enterprise (50+)" },
      recommended: "SA3610 / HD6500",
      desc: {
        ko: "대용량 데이터 저장 환경에 적합, 고가용성(HA) 및 확장성 제공",
        en: "Suited for large-scale data storage, offering high availability (HA) and scalability",
      },
      serverBadgeColor: "#fef7e0",
      serverTextColor: "#b06000",
    },
  ],

  qnap: [
    {
      id: 1,
      scale: { ko: "소규모 / 부서용 (10인 이하)", en: "Small / Departmental (10 or fewer)" },
      recommended: "TS-264 / TS-464",
      desc: {
        ko: "고속 파일 서버 구축에 적합, 2.5GbE 및 NVMe 캐시 지원",
        en: "Suited for high-speed file servers, with 2.5GbE and NVMe cache support",
      },
      serverBadgeColor: "#e6f4ea",
      serverTextColor: "#137333",
    },
    {
      id: 2,
      scale: { ko: "중소기업 (10~50인)", en: "Small-Medium Business (10–50)" },
      recommended: "TS-873A / TVS-h874",
      desc: {
        ko: "가상화 환경 구축에 적합, QuTS hero(ZFS) 및 ECC 메모리 지원",
        en: "Suited for virtualization environments, with QuTS hero (ZFS) and ECC memory support",
      },
      serverBadgeColor: "#e8f0fe",
      serverTextColor: "#1a73e8",
    },
    {
      id: 3,
      scale: { ko: "중견·대기업 (50인 이상)", en: "Mid-to-Large Enterprise (50+)" },
      recommended: "TDS-h2489FU",
      desc: {
        ko: "엔터프라이즈 스토리지 구축에 적합, All-Flash NVMe 및 고성능 데이터 처리 지원",
        en: "Suited for enterprise storage, with All-Flash NVMe and high-performance data processing",
      },
      serverBadgeColor: "#fef7e0",
      serverTextColor: "#b06000",
    },
  ],
};

const StorageGuide = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith("en") ? "en" : "ko";

  const [activeBrand, setActiveBrand] = useState("synology");

  return (
    <div className="selection-guide-section">
      <div className="gpu-header">
        <span className="gpu-eyebrow">SELECTION GUIDE</span>
        <h2 className="gpu-title">
          {t("storageGuide.title1")} <span className="highlight">{t("storageGuide.title2")}</span>
        </h2>
        <p className="gpu-subtitle">{t("storageGuide.subtitle")}</p>
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
              <th>{t("storageGuide.colScale")}</th>
              <th>{t("storageGuide.colRecommended")}</th>
              <th>{t("storageGuide.colDesc")}</th>
            </tr>
          </thead>
          <tbody>
            {storageGuideData[activeBrand].map((item, index) => (
              <tr key={index}>
                <td className="guide-type-cell">{item.scale[lang]}</td>
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
                <td className="guide-desc-cell">{item.desc[lang]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StorageGuide;