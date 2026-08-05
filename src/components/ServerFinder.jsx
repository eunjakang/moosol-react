import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FINDER_STEPS } from "../data/serverFinder";

const STEP_ICONS = ["fa-microchip", "fa-memory", "fa-database", "fa-compact-disc"];

function formatPrice(n) {
  return `${n.toLocaleString("ko-KR")}원`;
}

function ServerFinder() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { cpu: "8core", memory: "64gb", ... }

  const activeStep = FINDER_STEPS[activeStepIndex];
  const isLastStep = activeStepIndex === FINDER_STEPS.length - 1;
  const isComplete = FINDER_STEPS.every((s) => answers[s.key]);

  const selectOption = (stepKey, optionId) => {
    setAnswers((prev) => ({ ...prev, [stepKey]: optionId }));

    if (!isLastStep) {
      setTimeout(() => setActiveStepIndex((i) => i + 1), 250);
    }
  };

  const getOption = (step) => step.options.find((o) => o.id === answers[step.key]);

  const summaryState = {
    initialMessage: FINDER_STEPS.map(
        (s) => `- ${s.label}: ${getOption(s)?.label || "-"}`
    ).join("\n"),
  };

  return (
    <div className="server-finder">
      <div className="finder-head">
        <h2>내게 맞는 서버 쉽게 찾기</h2>
        <p>원하는 사양을 선택하면 최적의 서버를 찾아드려요.</p>
      </div>

      <div className="finder-body">
        {/* 좌측: 스텝 리스트 */}
        <div className="finder-steps">
          {FINDER_STEPS.map((step, idx) => {
            const done = !!answers[step.key];
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={step.key}
                className={`finder-step ${isActive ? "active" : ""} ${done ? "done" : ""}`}
                onClick={() => setActiveStepIndex(idx)}
              >
                <span className="finder-step-circle">
                  {done && !isActive ? <i className="fas fa-check"></i> : idx + 1}
                </span>
                <span className="finder-step-text">
                  <span className="finder-step-title">{step.title}</span>
                  {isActive && <span className="finder-step-desc">{step.desc}</span>}
                </span>
              </button>
            );
          })}
        </div>

        {/* 가운데: 아이콘 장식 */}
        <div className="finder-icon-stage">
          <div className="finder-icon-dots" aria-hidden="true"></div>
          <div className="finder-icon-badge">
            <i className={`fas ${STEP_ICONS[activeStepIndex]}`}></i>
          </div>
        </div>

        {/* 우측: 옵션 카드 */}
        <div className="finder-options">
          {activeStep.options.map((opt) => {
            const selected = answers[activeStep.key] === opt.id;
            return (
              <button
                key={opt.id}
                className={`finder-option-card ${selected ? "selected" : ""}`}
                onClick={() => selectOption(activeStep.key, opt.id)}
              >
                <div className="finder-option-top">
                  <i className={`fas ${selected ? "fa-circle-check" : "fa-circle"} finder-option-check`}></i>
                  <span className="finder-option-label">{opt.label}</span>
                </div>
                <p className="finder-option-desc">{opt.desc}</p>
                <div className="finder-option-stats">
                  <span>
                    <i className="fas fa-tag"></i> 예상가격 {formatPrice(opt.priceMin)} ~ {formatPrice(opt.priceMax)}
                  </span>
                </div>
              </button>
            );
          })}

          {isComplete && (
            <div className="finder-result">
              <div className="finder-result-title">
                <i className="fas fa-circle-check"></i> 선택하신 사양이에요
              </div>
              <ul className="finder-result-list">
                {FINDER_STEPS.map((s) => (
                  <li key={s.key}>
                    <span>{s.label}</span>
                    <strong>{getOption(s)?.label}</strong>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact-section"
                state={{ initialSolutionId: "SERVER", ...summaryState }}
                className="btn-submit finder-result-cta"
              >
                이 사양으로 견적 문의하기
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* 하단 CTA 바 */}
      <div className="finder-bottom-bar">
        <span>찾으시는 사양이 없으신가요?</span>
        <Link to="/contact-section" state={{ initialSolutionId: "SERVER" }} className="finder-bottom-btn">
          서버 견적 문의
        </Link>
      </div>
    </div>
  );
}

export default ServerFinder;