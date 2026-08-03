import React, { useState } from "react";
import { Link } from "react-router-dom";
import { nodeDatabase } from "../data/nodeDatabase";

// 데스크톱 트리의 계층 구조를 세로로 펼친 순서
// (network/server는 메인 흐름, 보안 솔루션 5개는 server 하위 그룹으로 묶어서 보여줌)
const mainFlow = ["internet", "firewall", "network", "server"];
const securityGroup = ["nac", "dac", "drm", "dlp", "edr", "ecm"];
const endNode = "client";

function AccordionItem({ nodeKey, openKey, setOpenKey }) {
  const data = nodeDatabase[nodeKey];
  const isOpen = openKey === nodeKey;

  return (
    <div className={`mobile-node-item ${isOpen ? "open" : ""}`}>
      <button
        className="mobile-node-header"
        onClick={() => setOpenKey(isOpen ? null : nodeKey)}
      >
        <span className="mobile-node-icon">
          <i className={`fas ${data.icon}`}></i>
        </span>
        <span className="mobile-node-title">{data.title}</span>
        <i className={`fas fa-chevron-down mobile-node-chevron`}></i>
      </button>

      <div className="mobile-node-body">
        <div className="mobile-node-body-inner">
          <span className="mobile-node-badge">{data.badge}</span>
          <p className="mobile-node-subtitle">{data.subtitle}</p>
          <ul className="mobile-node-features">
            {data.features.map((f, idx) => (
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
  const [openKey, setOpenKey] = useState("firewall");

  return (
    <div className="mobile-node-list">
      {mainFlow.map((key) => (
        <AccordionItem key={key} nodeKey={key} openKey={openKey} setOpenKey={setOpenKey} />
      ))}

      <div className="mobile-node-section-label">
        <i className="fas fa-shield-halved"></i> 보안 솔루션
      </div>
      {securityGroup.map((key) => (
        <AccordionItem key={key} nodeKey={key} openKey={openKey} setOpenKey={setOpenKey} />
      ))}

      <AccordionItem nodeKey={endNode} openKey={openKey} setOpenKey={setOpenKey} />

      <Link to="/contact-section" className="btn-more mobile-node-cta">
        견적 문의하기 <i className="fas fa-arrow-right"></i>
      </Link>
    </div>
  );
}

export default HomeMobileList;