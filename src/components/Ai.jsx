import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function Ai() {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', 
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-step'));
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

  // 스티키 영역 데이터 정의
  const stickySteps = [
    {
      stepLabel: 'STEP 01',
      title: 'Data Integration',
      subTitle: '사내 데이터 안전 연동',
      description: '사내에 흩어져 있는 PDF, Excel, ERP, DB 등 다양한 데이터를 실시간으로 안전하게 연결 및 벡터화합니다.',
      badge: 'LAYER 01 · DATA',
      uiContent: (
        <div className="ui-card-content">
          <div className="ui-status-badge">DATA PIPELINE CONNECTED</div>
          <ul className="ui-file-list">
            <li>📁 사내_업무매뉴얼_2026.pdf <span>연동 완료</span></li>
            <li>📊 Q2_매출_데이터베이스.sql <span>연동 완료</span></li>
            <li>📝 표준_계약서_양식.docx <span>동기화 중...</span></li>
          </ul>
        </div>
      ),
    },
    {
      stepLabel: 'STEP 02',
      title: 'Enterprise sLLM & RAG',
      subTitle: '맞춤형 AI & 검색 엔진',
      description: '기업 전용 소형언어모델(sLLM)과 RAG 기술로, 출처가 명확하고 신뢰할 수 있는 사내지식 검색 환경을 제공합니다.',
      badge: 'LAYER 02 · SEARCH',
      uiContent: (
        <div className="ui-card-content">
          <div className="ui-search-box">
            <span className="query">"올해 상반기 취업규칙 개정안 요약해줘"</span>
          </div>
          <div className="ui-response-box">
            <p><strong>[AI 답변]</strong> 2026년 상반기 개정안 핵심 내용은 다음과 같습니다...</p>
            <div className="source-tag">📌 출처: 인사팀_취업규칙_v3.pdf (p.12)</div>
          </div>
        </div>
      ),
    },
    {
      stepLabel: 'STEP 03',
      title: 'AI Agent',
      subTitle: '스스로 판단하고 실행하는 에이전트',
      description: '보고서 작성, 계약서 검토, ERP 입력까지 처음부터 끝까지 자율 실행합니다. 단순 질문을 넘어 실제 업무 프로세스를 자동 처리합니다.',
      badge: 'LAYER 03 · AGENTS',
      uiContent: (
        <div className="ui-card-content">
          <div className="ui-agent-header">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
            <span className="agent-title">COWORKER · TASK RUN</span>
          </div>
          <ul className="agent-task-list">
            <li>▶ 문서 분석 <span className="val">Q2_매출보고.pdf</span></li>
            <li>✔ 핵심 지표 추출 완료 <span className="val highlight">12개 KPI</span></li>
            <li>✔ 보고서 초안 작성 <span className="val highlight">3페이지</span></li>
            <li>✔ ERP 자동 입력 <span className="val highlight">SAP 연동</span></li>
          </ul>
          <div className="agent-progress">
            <div className="bar"></div>
            <span>Task complete · 4 / 4 steps</span>
          </div>
        </div>
      ),
    },
    {
      stepLabel: 'STEP 04',
      title: 'Management & Security',
      subTitle: '완벽한 권한 및 보안 제어',
      description: '직급별 문서 접근 권한 제어와 데이터 사용 현황 모니터링으로 기업 레벨의 하이엔드 보안 모니터링 체계를 제공합니다.',
      badge: 'LAYER 04 · SECURITY',
      uiContent: (
        <div className="ui-card-content">
          <div className="security-status">
            <div className="shield-icon">🛡️</div>
            <div>
              <h4>Enterprise Security Active</h4>
              <p>On-premise / Encryption Level A+</p>
            </div>
          </div>
          <div className="permission-list">
            <label><input type="checkbox" checked readOnly /> 임원진 보안 문서 접근 승인</label>
            <label><input type="checkbox" checked readOnly /> 개인정보 마스킹 필터 작동 중</label>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="server">
      <div className="section-title">
        <div className="about-hero-inner">
          <div className="about-eyebrow">LLM · RAG · AI 솔루션</div>
          <h1>AI로 연결되는 <br /> 비즈니스의 새로운 가능성 </h1>
          <p>
            보안 걱정 없는 전용 LLM 구축과 RAG 기술 기반의 기업 데이터 연동을 지원합니다. <br />
            단순한 기술 도입을 넘어, 업무 생산성을 극대화하고 실질적인 비즈니스 혁신을 완성합니다.
          </p>
        </div>
      </div>

      <div className="core-value-section">
        <div className="section-inner">
          <div className="value-grid">
            <div className="value-card">
              <div className="icon">🔒</div>
              <h3>안전한 보안 체계</h3>
              <p>기업 내부 데이터 유출 걱정 없는 온프레미스 및 보안 클라우드 환경을 지원합니다.</p>
            </div>
            <div className="value-card">
              <div className="icon">🎯</div>
              <h3>정확한 데이터 검색</h3>
              <p>RAG 기술 기반으로 환각 현상을 방지하고 출처가 명확한 답변만 제공합니다.</p>
            </div>
            <div className="value-card">
              <div className="icon">⚡</div>
              <h3>맞춤형 워크플로우</h3>
              <p>기존 ERP/CRM 및 사내 시스템과 완벽히 연동되는 자동화 에이전트를 구축합니다.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky-section">
        <div className="sticky-wrapper">
          {/* 좌측: 고정되는 Sticky 박스 */}
          <div className="sticky-left">
            <div className="sticky-box">
              <div className="badge-pill">
                {stickySteps[activeStep].badge}
              </div>
              <div className="sticky-box-inner">
                {stickySteps[activeStep].uiContent}
              </div>
            </div>
          </div>

          {/* 우측: 스크롤되는 텍스트 영역 */}
          <div className="sticky-right">
            {stickySteps.map((step, idx) => (
              <div
                key={idx}
                className={`scroll-step-item ${activeStep === idx ? 'active' : ''}`}
                data-step={idx}
                ref={(el) => (stepRefs.current[idx] = el)}
              >
                <span className="step-tag">{step.stepLabel}</span>
                <h2 className="step-title">{step.title}</h2>
                <h3 className="step-subtitle">{step.subTitle}</h3>
                <p className="step-desc">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="cta-section">
        <div className="cta-content">
          <h2>우리 기업 환경에 딱 맞는 AI 솔루션이 궁금하신가요?</h2>
          <p>(주)무솔이 최적의 도입 방안과 커스텀 시나리오를 제안해 드립니다.</p>
          <Link to="/contact-section"
          state={{ initialSolutionId: "AI" }}
          className="coming-soon-btn">AI 도입 상담 신청하기
          <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>

    </section>
  );
}

export default Ai;
