import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FINDER_STEPS } from "../data/serverFinder";

const STEP_ICONS = ["fa-microchip", "fa-memory", "fa-database", "fa-compact-disc"];

function ServerFinder() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith("en") ? "en" : "ko";

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

  // 이메일/관리자용 요약은 항상 한글로 고정
  const summaryState = {
    initialMessage: FINDER_STEPS.map(
      (s) => `- ${s.label.ko}: ${getOption(s)?.label.ko || "-"}`
    ).join("\n"),
  };

  return (
    <div className="server-finder">
      <div className="finder-head">
        <h2>{t("finder.title")}</h2>
        <p>{t("finder.subtitle")}</p>
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
                  <span className="finder-step-title">{step.title[lang]}</span>
                  {isActive && <span className="finder-step-desc">{step.desc[lang]}</span>}
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
                  <span className="finder-option-label">{opt.label[lang]}</span>
                </div>
                <p className="finder-option-desc">{opt.desc[lang]}</p>
              </button>
            );
          })}

          {isComplete && (
            <div className="finder-result">
              <div className="finder-result-title">
                <i className="fas fa-circle-check"></i> {t("finder.resultTitle")}
              </div>
              <ul className="finder-result-list">
                {FINDER_STEPS.map((s) => (
                  <li key={s.key}>
                    <span>{s.label[lang]}</span>
                    <strong>{getOption(s)?.label[lang]}</strong>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact-section"
                state={{ initialSolutionId: "SERVER", ...summaryState }}
                className="btn-submit finder-result-cta"
              >
                {t("finder.resultCta")}
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* 하단 CTA 바 */}
      <div className="finder-bottom-bar">
        <span>{t("finder.noMatch")}</span>
        <Link to="/contact-section" state={{ initialSolutionId: "SERVER" }} className="finder-bottom-btn">
          {t("finder.bottomBtn")}
        </Link>
      </div>
    </div>
  );
}

export default ServerFinder;