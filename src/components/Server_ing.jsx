import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { gpuPackages } from "../data/gpuPackages";
import { gpuServer } from "../data/gpuServer";
import { SERVER_PRODUCTS } from "../data/serverProducts";
import { GUIDE_DATA } from "../data/serverGuide"; // 선택 가이드 데이터
import ServerFinder from "./ServerFinder";
import StorageGuide from "./StorageGuide";
import { STORAGE_PRODUCTS } from "../data/storageProducts";
import usePagination from "../hooks/usePagination";
import Pagination from "./Pagination";

// 상단 탭
const TABS = [
  { key: "gpu-ai", label: "GPU/AI" },
  { key: "server", label: "서버" },
  { key: "storage", label: "스토리지" },
  { key: "etc", label: "기타" },
];

// 하단 GPU 필터 탭 (전체 + GPU별)
const GPU_FILTER_TABS = [
  { key: "ALL", label: "전체" },
  { key: "ENTRY", label: "2 GPU" },
  { key: "DEV", label: "4 GPU" },
  { key: "RESEARCH", label: "8 GPU" },
  { key: "ENTERPRISE", label: "10 GPU+" },
];

// 하단 서버 필터 탭
const SERVER_FILTER_TABS = [
  { key: "ALL", label: "전체" },
  // { key: "OS_MGMT", label: "OS/관리형" },
  // { key: "SMALL_SOL", label: "소형 솔루션형" },
  // { key: "LARGE_STOR", label: "대용량 스토리지형" },
  // { key: "MID_LARGE", label: "중대형 서버형" },
];

// 하단 스토리지 필터 탭 
const STORAGE_FILTER_TABS = [
  // { key: "ALL", label: "전체" },
  { key: "SYN", label: "SYNOLOGY" },
  { key: "QNAP", label: "QNAP" },
];

// GPU/AI 탭 컴포넌트
function GpuAiTab() {
  const [selectedGpuFilter, setSelectedGpuFilter] = useState("ALL");
  const listRef = useRef(null);

  const filteredProducts =
    selectedGpuFilter === "ALL"
      ? gpuServer
      : gpuServer.filter((item) => item.tag === selectedGpuFilter);

  const { currentPage, totalPages, currentItems, goToPage, goPrev, goNext, resetPage } =
    usePagination(filteredProducts, 4);

  const handleDetailClick = (tag) => {
    setSelectedGpuFilter(tag);
    resetPage();

    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFilterTabChange = (key) => {
    setSelectedGpuFilter(key);
    resetPage();
  };

  return (
    <div className="gpu-section">
      <div className="gpu-header">
        <span className="gpu-eyebrow">GPU 패키지</span>
        <h2 className="gpu-title">목적에 맞는 GPU 서버 구성</h2>
        <p className="gpu-subtitle">GPU 탑재 수량 및 용도별 최적 패키지를 선택하세요</p>
      </div>

      <div className="gpu-grid">
        {gpuPackages.map((pkg) => (
          <div
            key={pkg.tag}
            className={`gpu-card ${pkg.recommended ? "gpu-card-featured" : ""}`}
          >
            {pkg.recommended && <span className="gpu-card-badge">추천</span>}

            <span className="gpu-card-tag">{pkg.tag}</span>
            <h3 className="gpu-card-title">{pkg.title}</h3>
            <p className="gpu-card-desc">{pkg.desc}</p>

            <div className="gpu-spec">{pkg.spec}</div>

            <ul className="gpu-features">
              {pkg.features.map((f) => (
                <li
                  key={f.text}
                  className={`gpu-feature ${f.included ? "" : "gpu-feature-excluded"}`}
                >
                  <span className="gpu-feature-mark">
                    {f.included ? <i className="fas fa-check"></i> : "―"}
                  </span>
                  {f.text}
                </li>
              ))}
            </ul>

            <button
              className="gpu-cta-btn"
              onClick={() => handleDetailClick(pkg.tag)}
            >
              자세히 보기
            </button>
          </div>
        ))}
      </div>
      <hr className="gpu-divider" style={{ margin: "60px 0 40px", border: "0", borderTop: "1px solid #eee" }} />
      {/* 2. 하단 서버 상품 목록 영역 */}
      <div className="gpu-product-section" ref={listRef}>
        <div className="filter-header" style={{ marginBottom: "20px" }}>
          <div className="gpu-filter-tabs" style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            {GPU_FILTER_TABS.map((tab) => (
              <button
                key={tab.key}
                className={`gpu-filter-tab ${selectedGpuFilter === tab.key ? "active" : ""}`}
                onClick={() => handleFilterTabChange(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="product-count" style={{ fontSize: "14px", color: "#666" }}>
            전체상품 <strong>{filteredProducts.length}</strong>개
          </div>
        </div>

        {/* 제품 리스트 */}
        <div className="product-list">
          {currentItems.length > 0 ? (
            currentItems.map((prod) => (
              <div key={prod.id} className="product-card">
                <div className="product-info-group">
                  <img src={prod.image} alt={prod.name} className="product-img" />
                  <div className="product-details">
                    <h4 className="product-name">{prod.name}</h4>
                    <p className="product-specs">{prod.specs}</p>
                  </div>
                </div>
                <div className="product-action-group">
                  <div className="product-price">{prod.price}</div>
                  <button className="quote-btn">견적요청</button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-product">해당하는 서버 상품이 없습니다.</div>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={goPrev}
          onNext={goNext}
          onPageChange={goToPage}
        />
      </div>
    </div>
  );
}

// 서버 탭 컴포넌트
export function ServerTab() {
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [guideTab, setGuideTab] = useState("scale");

  const listRef = useRef(null);

  // 필터링 목록
  const filteredProducts =
    selectedFilter === "ALL"
      ? SERVER_PRODUCTS
      : SERVER_PRODUCTS.filter((item) => item.tag === selectedFilter);

  const { currentPage, totalPages, currentItems, goToPage, goPrev, goNext, resetPage } =
    usePagination(filteredProducts, 4);

  // 상단 카드 [자세히 보기] 클릭 핸들러
  const handleDetailClick = (tag) => {
    setSelectedFilter(tag);
    resetPage();

    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 필터 탭 클릭 핸들러
  const handleFilterChange = (key) => {
    setSelectedFilter(key);
    resetPage();
  };

  return (
    <div className="gpu-section">
      {/* 서버 선택 가이드 섹션 */}
      <div className="selection-guide-section">
        <div className="gpu-header">
          <span className="gpu-eyebrow">SELECTION GUIDE</span>
          <h2 className="gpu-title">서버 <span className="highlight">선택 가이드</span></h2>
          <p className="gpu-subtitle">규모와 용도에 따라 최적의 서버 구성을 안내해 드립니다.</p>
        </div>

        {/* 규모별 / 솔루션별 탭 스위치 */}
        <div className="guide-tab-toggle">
          <button
            className={`guide-toggle-btn ${guideTab === "scale" ? "active" : ""}`}
            onClick={() => setGuideTab("scale")}
          >
            규모별
          </button>
          <button
            className={`guide-toggle-btn ${guideTab === "usage" ? "active" : ""}`}
            onClick={() => setGuideTab("usage")}
          >
            솔루션별
          </button>
        </div>

        {/* 가이드 테이블 */}
        <div className="guide-table-wrapper">
          <table className="guide-table">
            <thead>
              <tr>
                <th>{guideTab === "scale" ? "규모" : "솔루션"}</th>
                <th>추천 서버</th>
                {/* <th>추천 스토리지</th> */}
                <th>설명</th>
              </tr>
            </thead>
            <tbody>
              {GUIDE_DATA[guideTab].map((item, index) => (
                <tr key={index}>
                  <td className="guide-type-cell">{item.type}</td>
                  <td>
                    <span
                      className="guide-pill-badge"
                      style={{
                        backgroundColor: item.serverBadgeColor,
                        color: item.serverTextColor,
                      }}
                    >
                      {item.server}
                    </span>
                  </td>
                  {/* <td>
                    <span
                      className="guide-pill-badge"
                      style={{
                        backgroundColor: item.storageBadgeColor,
                        color: item.storageTextColor,
                      }}
                    >
                      {item.storage}
                    </span>
                  </td> */}
                  <td className="guide-desc-cell">{item.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ServerFinder />

      <hr className="gpu-divider" style={{ margin: "60px 0 40px", border: "0", borderTop: "1px solid #eee" }} />

      {/* 하단 서버 상품 견적 목록 영역 */}
      <div className="gpu-product-section" ref={listRef}>
        <div className="filter-header">
          <div className="gpu-filter-tabs">
            {SERVER_FILTER_TABS.map((tab) => (
              <button
                key={tab.key}
                className={`gpu-filter-tab ${selectedFilter === tab.key ? "active" : ""}`}
                onClick={() => handleFilterChange(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="product-count">
            전체상품 <strong>{filteredProducts.length}</strong>개
          </div>
        </div>

        {/* 제품 리스트 */}
        <div className="product-list">
          {currentItems.length > 0 ? (
            currentItems.map((prod) => (
              <div key={prod.id} className="product-card">
                <div className="product-info-group">
                  <img src={prod.image} alt={prod.name} className="product-img" />
                  <div className="product-details">
                    <h4 className="product-name">{prod.name}</h4>
                    <p className="product-specs">{prod.specs}</p>
                  </div>
                </div>
                <div className="product-action-group">
                  <div className="product-price">{prod.price} <span style={{ fontSize: "12px", color: "#888", fontWeight: "normal" }}>(VAT별도)</span></div>
                  <button className="quote-btn">견적요청</button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-product">해당하는 서버 상품이 없습니다.</div>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={goPrev}
          onNext={goNext}
          onPageChange={goToPage}
        />
      </div>
    </div>
  );
}


// 스토리지 탭 컴포넌트
export function StorageTab() {
  const [selectedFilter, setSelectedFilter] = useState("SYN");
  const listRef = useRef(null);

  const filteredProducts = STORAGE_PRODUCTS.filter((item) => item.tag === selectedFilter);

  const { currentPage, totalPages, currentItems, goToPage, goPrev, goNext, resetPage } =
    usePagination(filteredProducts, 4);

  const handleFilterChange = (key) => {
    setSelectedFilter(key);
    resetPage();
  };

  return (
    <div className="gpu-section">
      <StorageGuide />

      <hr className="gpu-divider" style={{ margin: "60px 0 40px", border: "0", borderTop: "1px solid #eee" }} />

      {/* 하단 스토리지 상품 목록 영역 */}
      <div className="gpu-product-section" ref={listRef}>
        <div className="filter-header" style={{ marginBottom: "20px" }}>
          <div className="gpu-filter-tabs" style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            {STORAGE_FILTER_TABS.map((tab) => (
              <button
                key={tab.key}
                className={`gpu-filter-tab ${selectedFilter === tab.key ? "active" : ""}`}
                onClick={() => handleFilterChange(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div style={{ fontSize: "12px", fontWeight: "bold" }}> 
            <p>※ 표시된 가격은 NAS 본체 기준 시작가입니다. <br />
              HDD 용량, RAID 구성 및 설치 환경에 따라 가격이 달라질 수 있으며, 고객 환경에 맞는 최적의 구성으로 견적을 제공합니다.
            </p>
          </div>
          <div className="product-count" style={{ fontSize: "14px", color: "#666" }}>
            전체상품 <strong>{filteredProducts.length}</strong>개
          </div>
          
        </div>

        {/* 제품 리스트 */}
        <div className="product-list">
          {currentItems.length > 0 ? (
            currentItems.map((prod) => (
              <div key={prod.id} className="product-card">
                <div className="product-info-group">
                  <img src={prod.image} alt={prod.name} className="product-img" />
                  <div className="product-details">
                    <h4 className="product-name">{prod.name}</h4>
                    <p className="product-specs">{prod.specs}</p>
                  </div>
                </div>
                <div className="product-action-group">
                  <div className="product-price">{prod.price}</div>
                  <button className="quote-btn">견적요청</button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-product">해당하는 스토리지 상품이 없습니다.</div>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={goPrev}
          onNext={goNext}
          onPageChange={goToPage}
        />
      </div>
    </div>
  );
}

// 아직 틀만 잡아둔 탭
function PlaceholderTab({ label }) {
  return (
    <div className="server-tab-placeholder">
      <i className="fas fa-server"></i>
      <p>{label} 탭은 준비중입니다.</p>
    </div>
  );
}

function Server() {
  const [activeTab, setActiveTab] = useState("gpu-ai");

  return (
    <section id="server">
      <div className="section-title">
        <div className="about-hero-inner">
          <div className="about-eyebrow">GPU & Memory & Server · 유통</div>
          <h1>AI와 IT인프라의 핵심, <br />무솔이 가장 확실하게 공급합니다.</h1>
          <p>
            급변하는 IT·AI 수요에 맞춰 최신 GPU, 메모리, 정품 서버를 신속하게 공급합니다. <br />
            고객사 환경에 최적화된 부품 조합과 합리적인 견적으로 성공적인 구축을 지원합니다.
          </p>
        </div>
      </div>

      <div className="server-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`server-tab ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "gpu-ai" && <GpuAiTab />}
      {activeTab === "server" && <ServerTab />}
      {activeTab === "storage" && <StorageTab />}
      {activeTab === "etc" && < PlaceholderTab label="기타" />}
    </section>
  );
}

export default Server;