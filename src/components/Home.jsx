import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  nodeDatabase,
  defaultActiveNodes,
  defaultActivePaths,
} from "../data/nodeDatabase";
import useIsMobile from "../hooks/useIsMobile";
import HomeMobileList from "./HomeMobileList";
import HomeNoticePopup from "./HomeNoticePopup";

// 트리 노드 좌표(CSS의 #node-xxx 포지셔닝을 컴포넌트 내부 스타일로 이동)
//calc(50% - 36px) : 가운데 노드
const nodePositions = {
  internet: { top: 20, left: "calc(50% - 36px)" },
  firewall: { top: 140, left: "calc(50% - 36px)" },
  ips: { top: 110, left: "16%" },
  vpn: { top: 110, right: "16%" },
  network: { top: 270, left: "calc(50% - 36px)" },
  server: { top: 390, left: "calc(50% - 36px)" },
  nac: { top: 450, left: "10%" },
  edr: { top: 510, left: "20%" },
  dac: { top: 530, left: "33%" },
  drm: { top: 530, right: "33%" },
  dlp: { top: 510, right: "20%" },
  ecm: { top: 450, right: "10%" },
  client: { top: 560, left: "calc(50% - 36px)" },
};

const nodeIcons = {
  internet: "fa-globe",
  firewall: "fa-shield-halved",
  ips: "fa-shield-virus",
  vpn: "fa-key",
  network: "fa-network-wired",
  server: "fa-database",
  nac: "fa-user-shield",
  dac: "fa-table-list",
  drm: "fa-lock",
  dlp: "fa-file-shield",
  edr: "fa-laptop-medical",
  ecm: "fa-sitemap",
  client: "fa-desktop",
};

const nodeLabels = {
  internet: "Internet",
  firewall: "Firewall",
  ips: "IPS",
  vpn: "VPN",
  network: "Network",
  server: "Server",
  nac: "NAC",
  dac: "DAC",
  drm: "DRM",
  dlp: "DLP",
  edr: "EDR",
  ecm: "ECM",
  client: "User PC",
};

// 노드 들끼리 연결되어 있는 선
const allPaths = [
  { id: "path-net-fw", d: "M 500 45 L 500 130" },
  { id: "path-fw-ips", d: "M 500 165 L 160 135" },
  { id: "path-fw-vpn", d: "M 500 165 L 840 135" },
  { id: "path-fw-network", d: "M 500 165 L 500 260" },
  { id: "path-network-server", d: "M 500 295 L 500 380" },
  { id: "path-server-nac", d: "M 500 415 L 110 470" },
  { id: "path-server-edr", d: "M 500 415 L 210 540" },
  { id: "path-server-dac", d: "M 500 415 L 360 545" }, 
  { id: "path-server-drm", d: "M 500 415 L 650 545" }, // dac랑 대칭
  { id: "path-server-dlp", d: "M 500 415 L 790 540" }, // edr이랑 대칭
  { id: "path-server-ecm", d: "M 500 415 L 900 470" }, // nac랑 대칭
  { id: "path-server-client", d: "M 500 415 L 500 600" },
];

// 1. activeNode ID -> 문의 페이지 SOLUTIONS ID 매핑
const NODE_TO_SOLUTION_MAP = {
  firewall: 'FW',
  ips: 'ETC',    
  vpn: 'ETC',      
  network: 'NETWORK',
  server: 'SERVER',
  nac: 'NAC',
  dac: 'DAC',
  drm: 'DRM',
  dlp: 'DLP',
  edr: 'ETC',      
  ecm: 'ECM'
};

function Home() {
  const [activeNode, setActiveNode] = useState(null);
  const isMobile = useIsMobile(700);

  const treeRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 } // 트리가 20% 이상 보일 때 발동
    );

    if (treeRef.current) {
      observer.observe(treeRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const focusNode = (nodeKey) => {
    if (!nodeDatabase[nodeKey]) return;
    setActiveNode(nodeKey);
  };

  const closePanel = () => setActiveNode(null);

  // 활성화될 노드 목록 계산
  const getActiveNodes = () => {
    if (!activeNode) return defaultActiveNodes;
    const set = new Set(["internet", "firewall", activeNode]);
    if (activeNode !== "ips" && activeNode !== "vpn") set.add("network");
    if (["server", "client", "nac", "dac", "drm", "dlp", "edr", "ecm"].includes(activeNode)) {
      set.add("server");
    }
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

  const hideInquiryButton = activeNode === "internet" || activeNode === "client";
  const targetSolutionId = NODE_TO_SOLUTION_MAP[activeNode];

  return (
    <section id="home">
      <HomeNoticePopup />
      <div className="intro-text">
            <h1>
              기업 IT 인프라부터 AI까지
              <br />
              <span>무솔이 설계하고 구축하고 운영합니다.</span>
            </h1>
            <p>
              기업 규모와 환경에 맞는 최적의 인프라와 보안 체계를 설계합니다.<br />
              IT 컨설팅 │ 네트워크 구축 │ 서버 구축 │ 보안 솔루션 │ 통합 유지보수 │ AI
            </p>
            <div className="hero-hint">
              <img src="/images/mascot-face.png" alt="가이드 캐릭터" className="hero-hint-mascot" />
              <span className="hero-hint-bubble">
                <i className="fas fa-computer-mouse"></i> 무솔이 구축·운영하는 기업 IT 인프라를 클릭하여 서비스를 확인해보세요.
              </span>
            </div>
      </div>
      {isMobile ? (
            <HomeMobileList />
          ) : (
      <div className={`hero-container ${activeNode ? "panel-active" : ""}`} id="hero-main">
        <div className="left-panel">
          <div className={`topology-tree ${isVisible ? "in-view" : ""}`} ref={treeRef}>
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
              <i className="fas fa-desktop"></i>
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
              <i className="fas fa-hard-drive"></i>
            </div>
            <div
              id="dlp-barrier"
              className="shield-barrier"
              style={{ display: activeNode === "dlp" ? "block" : "none" }}
            >
            </div>

            <svg
              className="connection-svg"
              viewBox="0 0 1000 650"
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

            {Object.keys(nodePositions).map((key, index) => (
              <div
                key={key}
                className={`node ${activeNodes.includes(key) ? "active" : ""}`}
                id={`node-${key}`}
                style={{
                  ...nodePositions[key],
                  "--node-index": index,
                }}
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
        {!isMobile && (
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
              <ul className="detail-effects">
                {panelData?.effects?.length > 0 && (
                  <p style={{ fontSize: "15px" }}>
                    <b>[도입 효과]</b>
                  </p>
                )}
                {/* <spn>{panelData.effect}</spn> */}
                {panelData.effects.map((effect, idx) => (
                  <li className="effect-item" key={idx}>
                    <i className="fas fa-bolt-lightning"></i> {effect}
                  </li>
                ))}
              </ul>
            </div>
            {!hideInquiryButton && (
              <Link to="/contact-section"
              state={{ initialSolutionId: targetSolutionId }}
              className="btn-more" onClick={closePanel}>
              구축 상담하기 <i className="fas fa-arrow-right"></i>
              </Link>
            )}
          </div>
          </div>
        )}
      </div>
      )}
      
    </section>
  );
}

export default Home;
