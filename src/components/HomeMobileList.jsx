import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { nodeDatabase } from "../data/nodeDatabase";

// 데스크톱 트리의 계층 구조를 세로로 펼친 순서
// (network/server는 메인 흐름, 보안 솔루션은 server 하위 그룹으로 묶어서 보여줌)
const mainFlow = ["internet", "firewall", "network", "server"];
const securityGroup = ["nac", "dac", "drm", "dlp", "edr", "ecm"];
const endNode = "client";

function AccordionItem({ nodeKey, openKey, setOpenKey }) {
  const { t } = useTranslation();
  // nodeDatabase = 구조(아이콘/배지), t() = 다국어 텍스트
  const data = nodeDatabase[nodeKey];
  if (!data) return null;

  const isOpen = openKey === nodeKey;
  const title = t(`nodeDatabase.${nodeKey}.title`);
  const subtitle = t(`nodeDatabase.${nodeKey}.subtitle`);
  const featuresRaw = t(`nodeDatabase.${nodeKey}.features`, { returnObjects: true });
  const features = Array.isArray(featuresRaw) ? featuresRaw : [];

  return (
    <div className={`mobile-node-item ${isOpen ? "open" : ""}`}>
      <button
        className="mobile-node-header"
        onClick={() => setOpenKey(isOpen ? null : nodeKey)}
      >
        <span className="mobile-node-icon">
          <i className={`fas ${data.icon}`}></i>
        </span>
        <span className="mobile-node-title">{title}</span>
        <i className={`fas fa-chevron-down mobile-node-chevron`}></i>
      </button>

      <div className="mobile-node-body">
        <div className="mobile-node-body-inner">
          <span className="mobile-node-badge">{data.badge}</span>
          <p className="mobile-node-subtitle">{subtitle}</p>
          <ul className="mobile-node-features">
            {features.map((f, idx) => (
              <li key={idx}>
                <i className="fas fa-circle-check"></i> {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function HomeMobileList() {
  const { t } = useTranslation();
  const [openKey, setOpenKey] = useState("firewall");

  return (
    <div className="mobile-node-list">
      {mainFlow.map((key) => (
        <AccordionItem key={key} nodeKey={key} openKey={openKey} setOpenKey={setOpenKey} />
      ))}

      <div className="mobile-node-section-label">
        <i className="fas fa-shield-halved"></i> {t("home.mobileSecurityGroup")}
      </div>
      {securityGroup.map((key) => (
        <AccordionItem key={key} nodeKey={key} openKey={openKey} setOpenKey={setOpenKey} />
      ))}

      <AccordionItem nodeKey={endNode} openKey={openKey} setOpenKey={setOpenKey} />

      <Link to="/contact-section" className="btn-more mobile-node-cta">
        {t("home.mobileQuoteBtn")} <i className="fas fa-arrow-right"></i>
      </Link>
    </div>
  );
}

export default HomeMobileList;