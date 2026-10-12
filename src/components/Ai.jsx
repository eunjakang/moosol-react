import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useLang from "../hooks/useLang";
import { GUIDE_DATA } from "../data/aiGuide";

// 언어별 문자열 선택 (없으면 en → ko 순)
const L = (lang, o) => o[lang] ?? o.en ?? o.ko;

// 스티키 영역 각 STEP의 UI 미리보기 (언어별로 다른 JSX를 반환하는 함수)
function uiContentStep1(lang) {
  return (
    <div className="ui-card-content">
      <div className="ui-status-badge">DATA PIPELINE CONNECTED</div>
      <ul className="ui-file-list">
        <li>
          📁 {L(lang, { ko: "사내_업무매뉴얼_2026.pdf", en: "Internal_Manual_2026.pdf", zh: "公司业务手册_2026.pdf" })}{" "}
          <span>{L(lang, { ko: "연동 완료", en: "Connected", zh: "已连接" })}</span>
        </li>
        <li>
          📊 {L(lang, { ko: "Q2_매출_데이터베이스.sql", en: "Q2_Sales_Database.sql", zh: "Q2_销售数据库.sql" })}{" "}
          <span>{L(lang, { ko: "연동 완료", en: "Connected", zh: "已连接" })}</span>
        </li>
        <li>
          📝 {L(lang, { ko: "표준_계약서_양식.docx", en: "Standard_Contract_Template.docx", zh: "标准合同模板.docx" })}{" "}
          <span>{L(lang, { ko: "동기화 중...", en: "Syncing...", zh: "同步中..." })}</span>
        </li>
      </ul>
    </div>
  );
}

function uiContentStep2(lang) {
  return (
    <div className="ui-card-content">
      <div className="ui-search-box">
        <span className="query">
          {L(lang, {
            ko: '"올해 상반기 취업규칙 개정안 요약해줘"',
            en: '"Summarize this year\'s H1 revision to the employment rules"',
            zh: '"请总结今年上半年就业规则修订案"',
          })}
        </span>
      </div>
      <div className="ui-response-box">
        <p>
          <strong>{L(lang, { ko: "[AI 답변]", en: "[AI Answer]", zh: "[AI 回答]" })}</strong>{" "}
          {L(lang, {
            ko: "2026년 상반기 개정안 핵심 내용은 다음과 같습니다...",
            en: "Here are the key points of the H1 2026 revision...",
            zh: "2026年上半年修订案的核心内容如下……",
          })}
        </p>
        <div className="source-tag">
          📌{" "}
          {L(lang, {
            ko: "출처: 인사팀_취업규칙_v3.pdf (p.12)",
            en: "Source: HR_Employment_Rules_v3.pdf (p.12)",
            zh: "出处：人事部_就业规则_v3.pdf (p.12)",
          })}
        </div>
      </div>
    </div>
  );
}

function uiContentStep3(lang) {
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
          ▶ {L(lang, { ko: "문서 분석", en: "Document Analysis", zh: "文档分析" })}{" "}
          <span className="val">{L(lang, { ko: "Q2_매출보고.pdf", en: "Q2_Sales_Report.pdf", zh: "Q2_销售报告.pdf" })}</span>
        </li>
        <li>
          ✔ {L(lang, { ko: "핵심 지표 추출 완료", en: "Key Metrics Extracted", zh: "核心指标提取完成" })}{" "}
          <span className="val highlight">{L(lang, { ko: "12개 KPI", en: "12 KPIs", zh: "12项KPI" })}</span>
        </li>
        <li>
          ✔ {L(lang, { ko: "보고서 초안 작성", en: "Draft Report Created", zh: "报告初稿撰写" })}{" "}
          <span className="val highlight">{L(lang, { ko: "3페이지", en: "3 pages", zh: "3页" })}</span>
        </li>
        <li>
          ✔ {L(lang, { ko: "ERP 자동 입력", en: "Automatic ERP Entry", zh: "ERP自动录入" })}{" "}
          <span className="val highlight">{L(lang, { ko: "SAP 연동", en: "SAP Integration", zh: "SAP对接" })}</span>
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
          {L(lang, {
            ko: "임원진 보안 문서 접근 승인",
            en: "Executive security document access approved",
            zh: "已批准管理层访问保密文档",
          })}
        </label>
        <label>
          <input type="checkbox" checked readOnly />{" "}
          {L(lang, {
            ko: "개인정보 마스킹 필터 작동 중",
            en: "Personal data masking filter active",
            zh: "个人信息脱敏过滤器运行中",
          })}
        </label>
      </div>
    </div>
  );
}

function Ai() {
  const { t } = useTranslation();
  const lang = useLang(); // "ko" | "en" | "zh"

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
      subTitle: { ko: "사내 데이터 안전 연동", en: "Secure Internal Data Integration", zh: "企业内部数据安全对接" },
      description: {
        ko: "사내에 흩어져 있는 PDF, Excel, ERP, DB 등 다양한 데이터를 실시간으로 안전하게 연결 및 벡터화합니다.",
        en: "Securely connects and vectorizes scattered internal data — PDFs, Excel files, ERP, databases, and more — in real time.",
        zh: "实时、安全地连接并向量化分散在企业内部的PDF、Excel、ERP、数据库等各类数据。",
      },
      badge: "LAYER 01 · DATA",
      uiContent: uiContentStep1,
    },
    {
      stepLabel: "STEP 02",
      title: "Enterprise sLLM & RAG",
      subTitle: { ko: "맞춤형 AI & 검색 엔진", en: "Custom AI & Search Engine", zh: "定制化AI与搜索引擎" },
      description: {
        ko: "기업 전용 소형언어모델(sLLM)과 RAG 기술로, 출처가 명확하고 신뢰할 수 있는 사내지식 검색 환경을 제공합니다.",
        en: "A dedicated enterprise small language model (sLLM) combined with RAG technology delivers reliable internal knowledge search with clear sourcing.",
        zh: "通过企业专属小型语言模型(sLLM)与RAG技术，提供出处明确、值得信赖的企业内部知识检索环境。",
      },
      badge: "LAYER 02 · SEARCH",
      uiContent: uiContentStep2,
    },
    {
      stepLabel: "STEP 03",
      title: "AI Agent",
      subTitle: { ko: "스스로 판단하고 실행하는 에이전트", en: "An Agent That Thinks and Acts on Its Own", zh: "自主判断并执行的智能体" },
      description: {
        ko: "보고서 작성, 계약서 검토, ERP 입력까지 처음부터 끝까지 자율 실행합니다. 단순 질문을 넘어 실제 업무 프로세스를 자동 처리합니다.",
        en: "Autonomously handles everything from report writing and contract review to ERP entry, start to finish — automating real business processes, not just answering questions.",
        zh: "从撰写报告、审核合同到ERP录入，全程自主执行。不止于简单问答，更能自动处理真实的业务流程。",
      },
      badge: "LAYER 03 · AGENTS",
      uiContent: uiContentStep3,
    },
    {
      stepLabel: "STEP 04",
      title: "Management & Security",
      subTitle: { ko: "완벽한 권한 및 보안 제어", en: "Complete Access & Security Control", zh: "完善的权限与安全管控" },
      description: {
        ko: "직급별 문서 접근 권한 제어와 데이터 사용 현황 모니터링으로 기업 레벨의 하이엔드 보안 모니터링 체계를 제공합니다.",
        en: "Provides enterprise-grade, high-end security monitoring through role-based document access control and usage tracking.",
        zh: "通过按职级的文档访问权限控制与数据使用情况监控，提供企业级高端安全监控体系。",
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