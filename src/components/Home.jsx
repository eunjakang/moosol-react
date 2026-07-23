import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  nodeDatabase,
  defaultActiveNodes,
  defaultActivePaths,
} from "../data/nodeDatabase";

// 트리 노드 좌표(CSS의 #node-xxx 포지셔닝을 컴포넌트 내부 스타일로 이동)
const nodePositions = {
  internet: { top: 20, left: "calc(50% - 36px)" },
  firewall: { top: 140, left: "calc(50% - 36px)" },
  ips: { top: 110, left: "16%" },
  vpn: { top: 110, right: "16%" },
  nac: { top: 230, left: "10%" },
  dlp: { top: 230, right: "10%" },
  l3: { top: 270, left: "calc(50% - 36px)" },
  l2: { top: 390, left: "calc(50% - 36px)" },
  edr: { top: 390, left: "18%" },
  drm: { top: 390, right: "18%" },
  server: { top: 450, left: "32%" },
  client: { top: 450, right: "32%" },
};

const nodeIcons = {
  internet: "fa-globe",
  firewall: "fa-shield-halved",
  ips: "fa-shield-virus",
  vpn: "fa-key",
  nac: "fa-user-shield",
  dlp: "fa-file-shield",
  l3: "fa-network-wired",
  edr: "fa-laptop-medical",
  drm: "fa-lock",
  l2: "fa-server",
  server: "fa-database",
  client: "fa-desktop",
};

const nodeLabels = {
  internet: "Internet",
  firewall: "Firewall",
  ips: "IPS",
  vpn: "VPN",
  nac: "NAC",
  dlp: "DLP",
  l3: "L3 Switch",
  edr: "EDR",
  drm: "DRM",
  l2: "L2 Switch",
  server: "Server",
  client: "Client PC",
};

const allPaths = [
  { id: "path-net-fw", d: "M 500 45 L 500 130" },
  { id: "path-fw-ips", d: "M 500 165 L 160 135" },
  { id: "path-fw-vpn", d: "M 500 165 L 840 135" },
  { id: "path-fw-nac", d: "M 500 165 L 100 255" },
  { id: "path-fw-dlp", d: "M 500 165 L 900 255" },
  { id: "path-fw-l3", d: "M 500 165 L 500 260" },
  { id: "path-l3-edr", d: "M 500 295 L 180 415" },
  { id: "path-l3-drm", d: "M 500 295 L 820 415" },
  { id: "path-l3-l2", d: "M 500 295 L 500 380" },
  { id: "path-l2-server", d: "M 500 415 L 320 475" },
  { id: "path-l2-client", d: "M 500 415 L 680 475" },
];

function Home() {
  const [activeNode, setActiveNode] = useState(null);

  const focusNode = (nodeKey) => {
    if (!nodeDatabase[nodeKey]) return;
    setActiveNode(nodeKey);
  };

  const closePanel = () => setActiveNode(null);

  // 활성화될 노드 목록 계산 (원본 focusNode() 로직 그대로 이식)
  const getActiveNodes = () => {
    if (!activeNode) return defaultActiveNodes;
    const set = new Set(["internet", "firewall", activeNode]);
    if (activeNode !== "ips" && activeNode !== "vpn") set.add("l3");
    if (["server", "client", "l2"].includes(activeNode)) set.add("l2");
    return [...set];
  };

  const getActivePaths = () => {
    if (!activeNode) return defaultActivePaths;
    return nodeDatabase[activeNode].paths;
  };

  const activeNodes = getActiveNodes();
  const activePaths = getActivePaths();

  // 패널에 표시할 데이터 (기본값은 원본 HTML 초기 마크업과 동일하게 Firewall)
  const panelData = nodeDatabase[activeNode || "firewall"];

  return (
    <section id="home">
      <div className={`hero-container ${activeNode ? "panel-active" : ""}`} id="hero-main">
        <div className="left-panel">
          <div className="intro-text">
            <h1>
              기술로 연결하고
              <br />
              <span>안전으로 지키는 미래</span>
            </h1>
            <p>
              네트워크 · 보안 · 인프라를 하나로 연결하여 더 안전하고 스마트한
              디지털 환경을 완성도 높은 트리 아키텍처로 구현합니다.
            </p>
          </div>

          <div className="topology-tree">
            <span
              style={{
                position: "absolute",
                top: "15px",
                fontSize: "12px",
                color: "var(--text-muted)",
                zIndex: 100,
              }}
            >
              <i className="fas fa-computer-mouse"></i> 노드를 클릭하여 경로
              연결 및 인터랙티브 방어 애니메이션을 경험하세요.
            </span>

            <div
              id="effect-fw"
              className={`effect-element ${activeNode === "firewall" ? "active-firewall-effect" : ""}`}
            >
              <i className="fas fa-skull"></i>
            </div>
            <div
              id="firewall-barrier"
              className="shield-barrier"
              style={{ display: activeNode === "firewall" ? "block" : "none" }}
            ></div>

            <div
              id="effect-nac"
              className={`effect-element ${activeNode === "nac" ? "active-nac-effect" : ""}`}
            >
              <i className="fas fa-laptop-code"></i>
            </div>
            <div
              id="nac-barrier"
              className="shield-barrier"
              style={{ display: activeNode === "nac" ? "block" : "none" }}
            ></div>

            <div
              id="effect-dlp"
              className={`effect-element ${activeNode === "dlp" ? "active-dlp-effect" : ""}`}
            >
              <i className="fas fa-usb"></i>
            </div>
            <div
              id="dlp-barrier"
              className="shield-barrier"
              style={{ display: activeNode === "dlp" ? "block" : "none" }}
            ></div>

            <svg
              className="connection-svg"
              viewBox="0 0 1000 520"
              preserveAspectRatio="none"
            >
              {allPaths.map((path) => (
                <path
                  key={path.id}
                  id={path.id}
                  className={`network-path ${activePaths.includes(path.id) ? "active" : ""}`}
                  d={path.d}
                />
              ))}
            </svg>

            {Object.keys(nodePositions).map((key) => (
              <div
                key={key}
                className={`node ${activeNodes.includes(key) ? "active" : ""}`}
                id={`node-${key}`}
                style={nodePositions[key]}
                onClick={() => focusNode(key)}
              >
                <div className="node-platform">
                  <i className={`fas ${nodeIcons[key]}`}></i>
                </div>
                <span>{nodeLabels[key]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 우측 상세 정보 패널 */}
        <div className="right-panel-wrapper" id="detail-panel-wrapper">
          <div className="right-panel">
            <button className="btn-close-panel" onClick={closePanel}>
              <i className="fas fa-times"></i>
            </button>
            <div className="detail-card">
              <div className="detail-badge">{panelData.badge}</div>
              <h2 className="detail-title">{panelData.title}</h2>
              <p className="detail-subtitle">{panelData.subtitle}</p>
              <div className="detail-graphic">
                <div className="graphic-side">
                  <i
                    className={`fas ${panelData.graphicLeftIcon}`}
                    style={{ color: "#ff9100" }}
                  ></i>
                  <span>{panelData.graphicLeftText}</span>
                </div>
                <div className="graphic-center">
                  <i className="fas fa-angles-right arrow-flow"></i>
                  <i className={`fas ${panelData.icon}`}></i>
                  <i className="fas fa-angles-right arrow-flow"></i>
                </div>
                <div className="graphic-side">
                  <i
                    className={`fas ${panelData.graphicRightIcon}`}
                    style={{ color: "var(--primary-green)" }}
                  ></i>
                  <span>{panelData.graphicRightText}</span>
                </div>
              </div>
              <ul className="detail-features">
                {panelData.features.map((feature, idx) => (
                  <li className="feature-item" key={idx}>
                    <i className="fas fa-circle-check"></i> {feature}
                  </li>
                ))}
              </ul>
            </div>
            <Link to="/consulting" className="btn-more" onClick={closePanel}>
              자세히 알아보기 <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
