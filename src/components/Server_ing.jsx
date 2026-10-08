import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { gpuPackages } from "../data/gpuPackages";
import { gpuServer } from "../data/gpuServer";
import { SERVER_PRODUCTS } from "../data/serverProducts";
import { GUIDE_DATA } from "../data/serverGuide"; // 선택 가이드 데이터
import ServerFinder from "./ServerFinder";
import StorageGuide from "./StorageGuide";
import { STORAGE_PRODUCTS } from "../data/storageProducts";
import { ETC_PRODUCTS } from "../data/etcProducts";
import usePagination from "../hooks/usePagination";
import Pagination from "./Pagination";

// 데이터 필드가 문자열이든 { ko, en } 객체든 상관없이 안전하게 현재 언어 값을 꺼내는 헬퍼
// (배열/원시값은 그대로 반환, { ko, en } 형태의 객체만 lang에 맞게 골라줌)
function pick(field, lang) {
  if (field && typeof field === "object" && !Array.isArray(field)) {
    return field[lang] ?? field.ko;
  }
  return field;
}

// 상단 탭
const TABS_KEYS = [
  { key: "gpu-ai", labelKey: "server.tabs.gpuAi" },
  { key: "server", labelKey: "server.tabs.server" },
  { key: "storage", labelKey: "server.tabs.storage" },
  { key: "etc", labelKey: "server.tabs.etc" },
];

// 하단 GPU 필터 탭 (전체 + GPU별)
const GPU_FILTER_TABS = [
  { key: "ALL", labelKey: "server.gpuFilter.all" },
  { key: "ENTRY", labelKey: "server.gpuFilter.entry2" },
  { key: "DEV", labelKey: "server.gpuFilter.dev4" },
  { key: "RESEARCH", labelKey: "server.gpuFilter.research8" },
  { key: "ENTERPRISE", labelKey: "server.gpuFilter.enterprise10" },
];

// 하단 서버 필터 탭
const SERVER_FILTER_TABS = [{ key: "ALL", labelKey: "server.serverFilter.all" }];

// 하단 스토리지 필터 탭
const STORAGE_FILTER_TABS = [
  { key: "SYN", labelKey: "server.storageFilter.syn" },
  { key: "QNAP", labelKey: "server.storageFilter.qnap" },
  { key: "HPE", labelKey: "server.storageFilter.hpe" },
];

// 하단 기타 필터 탭
const ETC_FILTER_TABS = [
  { key: "RACK", labelKey: "server.etcFilter.rack" },
  { key: "UPS", labelKey: "server.etcFilter.ups" },
];

// GPU/AI 탭 컴포넌트
function GpuAiTab() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith("en") ? "en" : "ko";

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
        <span className="gpu-eyebrow">{t("server.gpuEyebrow")}</span>
        <h2 className="gpu-title">{t("server.gpuTitle")}</h2>
        <p className="gpu-subtitle">{t("server.gpuSubtitle")}</p>
      </div>

      <div className="gpu-grid">
        {gpuPackages.map((pkg) => (
          <div
            key={pkg.tag}
            className={`gpu-card ${pkg.recommended ? "gpu-card-featured" : ""}`}
          >
            {pkg.recommended && <span className="gpu-card-badge">{t("server.recommended")}</span>}

            <span className="gpu-card-tag">{pkg.tag}</span>
            <h3 className="gpu-card-title">{pkg.title}</h3>
            <p className="gpu-card-desc">{pick(pkg.desc, lang)}</p>

            <div className="gpu-spec">{pick(pkg.spec, lang)}</div>

            <ul className="gpu-features">
              {pkg.features.map((f, idx) => (
                <li
                  key={idx}
                  className={`gpu-feature ${f.included ? "" : "gpu-feature-excluded"}`}
                >
                  <span className="gpu-feature-mark">
                    {f.included ? <i className="fas fa-check"></i> : "―"}
                  </span>
                  {pick(f.text, lang)}
                </li>
              ))}
            </ul>

            <button className="gpu-cta-btn" onClick={() => handleDetailClick(pkg.tag)}>
              {t("server.gpuViewBtn")}
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
                {t(tab.labelKey)}
              </button>
            ))}
          </div>

          <div style={{ fontSize: "12px", fontWeight: "bold" }}>
            <p>
              {t("server.gpuRentNote")} <br />
            </p>
          </div>

          <div className="product-count" style={{ fontSize: "14px", color: "#666" }}>
            {t("server.totalProducts", { count: filteredProducts.length })}
          </div>
        </div>

        {/* 제품 리스트 */}
        <div className="product-list">
          {currentItems.length > 0 ? (
            currentItems.map((prod) => {
              const specs = pick(prod.specs, lang);
              return (
                <div key={prod.id} className="product-card">
                  <div className="product-info-group">
                    <img src={prod.image} alt={prod.name} className="product-img" />
                    <div className="product-details">
                      <h4 className="product-name">{prod.name}</h4>
                      <p className="product-specs">
                        {Array.isArray(specs)
                          ? specs.map((line, idx) => (
                              <span className="product-spec-line" key={idx}>
                                {line}
                              </span>
                            ))
                          : specs}
                      </p>
                    </div>
                  </div>
                  <div className="product-action-group">
                    <div className="product-price">{pick(prod.price, lang)}</div>
                    <Link
                      to="/contact-section"
                      state={{ initialSolutionId: "SERVER", productName: prod.name }}
                      className="quote-btn finder-result-cta"
                    >
                      {t("server.quoteBtn")}
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-product">{t("server.noServerProduct")}</div>
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
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith("en") ? "en" : "ko";

  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [guideTab, setGuideTab] = useState("scale");

  const listRef = useRef(null);

  const filteredProducts =
    selectedFilter === "ALL"
      ? SERVER_PRODUCTS
      : SERVER_PRODUCTS.filter((item) => item.tag === selectedFilter);

  const { currentPage, totalPages, currentItems, goToPage, goPrev, goNext, resetPage } =
    usePagination(filteredProducts, 4);

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
          <h2 className="gpu-title">
            {t("server.guideTitle1")} <span className="highlight">{t("server.guideTitle2")}</span>
          </h2>
          <p className="gpu-subtitle">{t("server.guideSubtitle")}</p>
        </div>

        {/* 규모별 / 솔루션별 탭 스위치 */}
        <div className="guide-tab-toggle">
          <button
            className={`guide-toggle-btn ${guideTab === "scale" ? "active" : ""}`}
            onClick={() => setGuideTab("scale")}
          >
            {t("server.tabScale")}
          </button>
          <button
            className={`guide-toggle-btn ${guideTab === "usage" ? "active" : ""}`}
            onClick={() => setGuideTab("usage")}
          >
            {t("server.tabUsage")}
          </button>
        </div>

        {/* 가이드 테이블 */}
        <div className="guide-table-wrapper">
          <table className="guide-table">
            <thead>
              <tr>
                <th>{guideTab === "scale" ? t("server.colScale") : t("server.colSolution")}</th>
                <th>{t("server.colServer")}</th>
                <th>{t("server.colDesc")}</th>
              </tr>
            </thead>
            <tbody>
              {GUIDE_DATA[guideTab].map((item, index) => (
                <tr key={index}>
                  <td className="guide-type-cell">{pick(item.type, lang)}</td>
                  <td>
                    <span
                      className="guide-pill-badge"
                      style={{
                        backgroundColor: item.serverBadgeColor,
                        color: item.serverTextColor,
                      }}
                    >
                      {pick(item.server, lang)}
                    </span>
                  </td>
                  <td className="guide-desc-cell">{pick(item.desc, lang)}</td>
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
                {t(tab.labelKey)}
              </button>
            ))}
          </div>

          <div className="product-count">
            {t("server.totalProducts", { count: filteredProducts.length })}
          </div>
        </div>

        {/* 제품 리스트 */}
        <div className="product-list">
          {currentItems.length > 0 ? (
            currentItems.map((prod) => {
              const specs = pick(prod.specs, lang);
              return (
                <div key={prod.id} className="product-card">
                  <div className="product-info-group">
                    <img src={prod.image} alt={prod.name} className="product-img" />
                    <div className="product-details">
                      <h4 className="product-name">{prod.name}</h4>
                      <p className="product-specs">
                        {Array.isArray(specs)
                          ? specs.map((line, idx) => (
                              <span className="product-spec-line" key={idx}>
                                {line}
                              </span>
                            ))
                          : specs}
                      </p>
                    </div>
                  </div>
                  <div className="product-action-group">
                    <div className="product-price">
                      {pick(prod.price, lang)}{" "}
                      <span style={{ fontSize: "12px", color: "#888", fontWeight: "normal" }}>
                        {t("server.vatNote")}
                      </span>
                    </div>
                    <Link
                      to="/contact-section"
                      state={{ initialSolutionId: "SERVER", productName: prod.name }}
                      className="quote-btn finder-result-cta"
                    >
                      {t("server.quoteBtn")}
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-product">{t("server.noServerProduct")}</div>
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
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith("en") ? "en" : "ko";

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
                {t(tab.labelKey)}
              </button>
            ))}
          </div>
          <div style={{ fontSize: "12px", fontWeight: "bold" }}>
            <p>
              {t("server.storageNote1")} <br />
              {t("server.storageNote2")} <br />
              {t("server.storageNote3")}
            </p>
          </div>
          <div className="product-count" style={{ fontSize: "14px", color: "#666" }}>
            {t("server.totalProducts", { count: filteredProducts.length })}
          </div>
        </div>

        {/* 제품 리스트 */}
        <div className="product-list">
          {currentItems.length > 0 ? (
            currentItems.map((prod) => {
              const specs = pick(prod.specs, lang);
              return (
                <div key={prod.id} className="product-card">
                  <div className="product-info-group">
                    <img src={prod.image} alt={prod.name} className="product-img" />
                    <div className="product-details">
                      <h4 className="product-name">{pick(prod.name, lang)}</h4>
                      <p className="product-specs">
                        {Array.isArray(specs)
                          ? specs.map((line, idx) => (
                              <span className="product-spec-line" key={idx}>
                                {line}
                              </span>
                            ))
                          : specs}
                      </p>
                    </div>
                  </div>
                  <div className="product-action-group">
                    <div className="product-price">{pick(prod.price, lang)}</div>
                    <Link
                      to="/contact-section"
                      state={{ initialSolutionId: "SERVER", productName: pick(prod.name, lang) }}
                      className="quote-btn finder-result-cta"
                    >
                      {t("server.quoteBtn")}
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-product">{t("server.noStorageProduct")}</div>
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

// 기타 탭 컴포넌트
export function EtcTab() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith("en") ? "en" : "ko";

  const [selectedFilter, setSelectedFilter] = useState("RACK");
  const listRef = useRef(null);

  const filteredProducts = ETC_PRODUCTS.filter((item) => item.tag === selectedFilter);

  const { currentPage, totalPages, currentItems, goToPage, goPrev, goNext, resetPage } =
    usePagination(filteredProducts, 4);

  const handleFilterChange = (key) => {
    setSelectedFilter(key);
    resetPage();
  };

  return (
    <div className="gpu-section">
      {/* 하단 기타 상품 목록 영역 */}
      <div className="gpu-product-section" ref={listRef}>
        <div className="filter-header" style={{ marginBottom: "20px" }}>
          <div className="gpu-filter-tabs" style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            {ETC_FILTER_TABS.map((tab) => (
              <button
                key={tab.key}
                className={`gpu-filter-tab ${selectedFilter === tab.key ? "active" : ""}`}
                onClick={() => handleFilterChange(tab.key)}
              >
                {t(tab.labelKey)}
              </button>
            ))}
          </div>
          <div className="product-count" style={{ fontSize: "14px", color: "#666" }}>
            {t("server.totalProducts", { count: filteredProducts.length })}
          </div>
        </div>

        {/* 제품 리스트 */}
        <div className="product-list">
          {currentItems.length > 0 ? (
            currentItems.map((prod) => {
              const specs = pick(prod.specs, lang);
              const name = pick(prod.name, lang);
              return (
                <div key={prod.id} className="product-card">
                  <div className="product-info-group">
                    <img src={prod.image} alt={name} className="product-img" />
                    <div className="product-details">
                      {/* <span className="guide-pill-badge" style={{ width: "90px", backgroundColor: "#29A640", color: "#f7faf8", fontSize: "12px", padding: "2px 6px", borderRadius: "4px" }}>
                        {pick(prod.unitBadge, lang)}
                      </span> */}
                      <h4 className="product-name">{name}</h4>
                      <p className="product-specs">
                        {Array.isArray(specs)
                          ? specs.map((line, idx) => (
                              <span className="product-spec-line" key={idx}>
                                {line}
                              </span>
                            ))
                          : specs}
                      </p>
                    </div>
                  </div>
                  <div className="product-action-group">
                    <div className="product-price">{pick(prod.price, lang)}</div>
                    <Link
                      to="/contact-section"
                      state={{ initialSolutionId: "SERVER", productName: name }}
                      className="quote-btn finder-result-cta"
                    >
                      {t("server.quoteBtn")}
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-product">{t("server.noProduct")}</div>
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
  const { t } = useTranslation();
  return (
    <div className="server-tab-placeholder">
      <i className="fas fa-server"></i>
      <p>{t("server.placeholderNotice", { label })}</p>
    </div>
  );
}

function Server() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("gpu-ai");

  return (
    <section id="server">
      <div className="section-title">
        <div className="about-hero-inner">
          <div className="about-eyebrow">{t("server.heroEyebrow")}</div>
          <h1>
            {t("server.heroTitle1")} <br />
            {t("server.heroTitle2")}
          </h1>
          <p>
            {t("server.heroDesc1")} <br />
            {t("server.heroDesc2")}
          </p>
        </div>
      </div>

      <div className="server-tabs">
        {TABS_KEYS.map((tab) => (
          <button
            key={tab.key}
            className={`server-tab ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {t(tab.labelKey)}
          </button>
        ))}
      </div>

      {activeTab === "gpu-ai" && <GpuAiTab />}
      {activeTab === "server" && <ServerTab />}
      {activeTab === "storage" && <StorageTab />}
      {activeTab === "etc" && <EtcTab />}
    </section>
  );
}

export default Server;