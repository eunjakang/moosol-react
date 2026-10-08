import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { GUIDE_DATA } from "../data/aiGuide";

// 스티키 영역 각 STEP의 UI 미리보기 (언어별로 다른 JSX를 반환하는 함수)
function uiContentStep1(lang) {
  const isKo = lang === "ko";
  return (
    <div className="ui-card-content">
      <div className="ui-status-badge">DATA PIPELINE CONNECTED</div>
      <ul className="ui-file-list">
        <li>
          📁 {isKo ? "사내_업무매뉴얼_2026.pdf" : "Internal_Manual_2026.pdf"}{" "}
          <span>{isKo ? "연동 완료" : "Connected"}</span>
        </li>
        <li>
          📊 {isKo ? "Q2_매출_데이터베이스.sql" : "Q2_Sales_Database.sql"}{" "}
          <span>{isKo ? "연동 완료" : "Connected"}</span>
        </li>
        <li>
          📝 {isKo ? "표준_계약서_양식.docx" : "Standard_Contract_Template.docx"}{" "}
          <span>{isKo ? "동기화 중..." : "Syncing..."}</span>
        </li>
      </ul>
    </div>
  );
}

function uiContentStep2(lang) {
  const isKo = lang === "ko";
  return (
    <div className="ui-card-content">
      <div className="ui-search-box">
        <span className="query">
          {isKo
            ? '"올해 상반기 취업규칙 개정안 요약해줘"'
            : '"Summarize this year\'s H1 revision to the employment rules"'}
        </span>
      </div>
      <div className="ui-response-box">
        <p>
          <strong>{isKo ? "[AI 답변]" : "[AI Answer]"}</strong>{" "}
          {isKo
            ? "2026년 상반기 개정안 핵심 내용은 다음과 같습니다..."
            : "Here are the key points of the H1 2026 revision..."}
        </p>
        <div className="source-tag">
          📌 {isKo ? "출처: 인사팀_취업규칙_v3.pdf (p.12)" : "Source: HR_Employment_Rules_v3.pdf (p.12)"}
        </div>
      </div>
    </div>
  );
}

function uiContentStep3(lang) {
  const isKo = lang === "ko";
  return (
    <div className="ui-card-content">
      <div className="ui-agent-header">
        <span className="dot red"></span>
        <span className="dot yellow"></span>
        <span className="dot green"></span>
        <span className="agent-title">COWORKER · TASK RUN</span>
      </div>
      <ul className="agent-task-list">
        <li>
          ▶ {isKo ? "문서 분석" : "Document Analysis"}{" "}
          <span className="val">{isKo ? "Q2_매출보고.pdf" : "Q2_Sales_Report.pdf"}</span>
        </li>
        <li>
          ✔ {isKo ? "핵심 지표 추출 완료" : "Key Metrics Extracted"}{" "}
          <span className="val highlight">{isKo ? "12개 KPI" : "12 KPIs"}</span>
        </li>
        <li>
          ✔ {isKo ? "보고서 초안 작성" : "Draft Report Created"}{" "}
          <span className="val highlight">{isKo ? "3페이지" : "3 pages"}</span>
        </li>
        <li>
          ✔ {isKo ? "ERP 자동 입력" : "Automatic ERP Entry"}{" "}
          <span className="val highlight">{isKo ? "SAP 연동" : "SAP Integration"}</span>
        </li>
      </ul>
      <div className="agent-progress">
        <div className="bar"></div>
        <span>Task complete · 4 / 4 steps</span>
      </div>
    </div>
  );
}

function uiContentStep4(lang) {
  const isKo = lang === "ko";
  return (
    <div className="ui-card-content">
      <div className="security-status">
        <div className="shield-icon">🛡️</div>
        <div>
          <h4>Enterprise Security Active</h4>
          <p>On-premise / Encryption Level A+</p>
        </div>
      </div>
      <div className="permission-list">
        <label>
          <input type="checkbox" checked readOnly />{" "}
          {isKo ? "임원진 보안 문서 접근 승인" : "Executive security document access approved"}
        </label>
        <label>
          <input type="checkbox" checked readOnly />{" "}
          {isKo ? "개인정보 마스킹 필터 작동 중" : "Personal data masking filter active"}
        </label>
      </div>
    </div>
  );
}

function Ai() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith("en") ? "en" : "ko";

  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef([]);
  const [guideTab, setGuideTab] = useState("scale");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute("data-step"));
          if (!isNaN(index)) {
            setActiveStep(index);
          }
        }
      });
    }, observerOptions);

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      stepRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // 스티키 영역 데이터 정의 (title/badge는 의도적으로 영문 고정, subTitle/description만 다국어)
  const stickySteps = [
    {
      stepLabel: "STEP 01",
      title: "Data Integration",
      subTitle: { ko: "사내 데이터 안전 연동", en: "Secure Internal Data Integration" },
      description: {
        ko: "사내에 흩어져 있는 PDF, Excel, ERP, DB 등 다양한 데이터를 실시간으로 안전하게 연결 및 벡터화합니다.",
        en: "Securely connects and vectorizes scattered internal data — PDFs, Excel files, ERP, databases, and more — in real time.",
      },
      badge: "LAYER 01 · DATA",
      uiContent: uiContentStep1,
    },
    {
      stepLabel: "STEP 02",
      title: "Enterprise sLLM & RAG",
      subTitle: { ko: "맞춤형 AI & 검색 엔진", en: "Custom AI & Search Engine" },
      description: {
        ko: "기업 전용 소형언어모델(sLLM)과 RAG 기술로, 출처가 명확하고 신뢰할 수 있는 사내지식 검색 환경을 제공합니다.",
        en: "A dedicated enterprise small language model (sLLM) combined with RAG technology delivers reliable internal knowledge search with clear sourcing.",
      },
      badge: "LAYER 02 · SEARCH",
      uiContent: uiContentStep2,
    },
    {
      stepLabel: "STEP 03",
      title: "AI Agent",
      subTitle: { ko: "스스로 판단하고 실행하는 에이전트", en: "An Agent That Thinks and Acts on Its Own" },
      description: {
        ko: "보고서 작성, 계약서 검토, ERP 입력까지 처음부터 끝까지 자율 실행합니다. 단순 질문을 넘어 실제 업무 프로세스를 자동 처리합니다.",
        en: "Autonomously handles everything from report writing and contract review to ERP entry, start to finish — automating real business processes, not just answering questions.",
      },
      badge: "LAYER 03 · AGENTS",
      uiContent: uiContentStep3,
    },
    {
      stepLabel: "STEP 04",
      title: "Management & Security",
      subTitle: { ko: "완벽한 권한 및 보안 제어", en: "Complete Access & Security Control" },
      description: {
        ko: "직급별 문서 접근 권한 제어와 데이터 사용 현황 모니터링으로 기업 레벨의 하이엔드 보안 모니터링 체계를 제공합니다.",
        en: "Provides enterprise-grade, high-end security monitoring through role-based document access control and usage tracking.",
      },
      badge: "LAYER 04 · SECURITY",
      uiContent: uiContentStep4,
    },
  ];

  return (
    <section id="server">
      <div className="section-title">
        <div className="about-hero-inner">
          <div className="about-eyebrow">{t("ai.eyebrow")}</div>
          <h1>
            {t("ai.heroTitle1")} <br /> {t("ai.heroTitle2")}
          </h1>
          <p>
            {t("ai.heroDesc1")} <br />
            {t("ai.heroDesc2")}
          </p>
        </div>
      </div>

      <div className="core-value-section">
        <div className="section-inner">
          <div className="value-grid">
            <div className="value-card">
              <div className="icon">🔒</div>
              <h3>{t("ai.value1Title")}</h3>
              <p>{t("ai.value1Desc")}</p>
            </div>
            <div className="value-card">
              <div className="icon">🎯</div>
              <h3>{t("ai.value2Title")}</h3>
              <p>{t("ai.value2Desc")}</p>
            </div>
            <div className="value-card">
              <div className="icon">⚡</div>
              <h3>{t("ai.value3Title")}</h3>
              <p>{t("ai.value3Desc")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="ai-guide">
        <div className="selection-guide-section">
          <div className="gpu-header">
            <span className="gpu-eyebrow">SELECTION GUIDE</span>
            <h2 className="gpu-title">
              {t("ai.guideTitle1")} <span className="highlight">{t("ai.guideTitle2")}</span>
            </h2>
            <p className="gpu-subtitle">{t("ai.guideSubtitle")}</p>
          </div>

          {/* 규모별 / 솔루션별 탭 스위치 */}
          <div className="guide-tab-toggle">
            <button
              className={`guide-toggle-btn ${guideTab === "scale" ? "active" : ""}`}
              onClick={() => setGuideTab("scale")}
            >
              {t("ai.tabScale")}
            </button>
            <button
              className={`guide-toggle-btn ${guideTab === "usage" ? "active" : ""}`}
              onClick={() => setGuideTab("usage")}
            >
              {t("ai.tabUsage")}
            </button>
          </div>

          {/* 가이드 테이블 */}
          <div className="guide-table-wrapper">
            <table className="guide-table">
              <thead>
                <tr>
                  <th>{guideTab === "scale" ? t("ai.colCategory") : t("ai.colPurpose")}</th>
                  <th>{t("ai.colModel")}</th>
                  <th>{t("ai.colDesc")}</th>
                </tr>
              </thead>
              <tbody>
                {GUIDE_DATA[guideTab].map((item, index) => (
                  <tr key={index}>
                    <td className="guide-type-cell">{item.type[lang]}</td>
                    <td>
                      <span
                        className="guide-pill-badge"
                        style={{
                          backgroundColor: item.modelBadgeColor,
                          color: item.modelTextColor,
                        }}
                      >
                        {item.model[lang]}
                      </span>
                    </td>
                    <td className="guide-desc-cell">
                      {Array.isArray(item.desc[lang])
                        ? item.desc[lang].map((line, idx) => <div key={idx}>{line}</div>)
                        : item.desc[lang]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="sticky-section">
        <div className="sticky-wrapper">
          {/* 좌측: 고정되는 Sticky 박스 */}
          <div className="sticky-left">
            <div className="sticky-box">
              <div className="badge-pill">{stickySteps[activeStep].badge}</div>
              <div className="sticky-box-inner">{stickySteps[activeStep].uiContent(lang)}</div>
            </div>
          </div>

          {/* 우측: 스크롤되는 텍스트 영역 */}
          <div className="sticky-right">
            {stickySteps.map((step, idx) => (
              <div
                key={idx}
                className={`scroll-step-item ${activeStep === idx ? "active" : ""}`}
                data-step={idx}
                ref={(el) => (stepRefs.current[idx] = el)}
              >
                <span className="step-tag">{step.stepLabel}</span>
                <h2 className="step-title">{step.title}</h2>
                <h3 className="step-subtitle">{step.subTitle[lang]}</h3>
                <p className="step-desc">{step.description[lang]}</p>
                <div className="mobile-ui-preview">{step.uiContent(lang)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="cta-section">
        <div className="cta-content">
          <h2>{t("ai.ctaTitle")}</h2>
          <p>{t("ai.ctaDesc")}</p>
          <Link to="/contact-section" state={{ initialSolutionId: "AI" }} className="coming-soon-btn">
            {t("ai.ctaBtn")}
            <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Ai;