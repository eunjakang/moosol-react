import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";
import { quizSteps } from "../data/ConsultingData";
import { solutions } from "../data/solutionsData";
import { getRecommendation } from "../data/solutionRecommend";
import SubmitSuccessModal from "./SubmitModal";

// 별점 렌더링 (5개 중 채워진 개수만큼 ★)
function Stars({ count }) {
  return (
    <span className="recommend-stars">
      {"★".repeat(count)}
      <span className="recommend-stars-empty">{"★".repeat(5 - count)}</span>
    </span>
  );
}

// 추천 결과 팝업: 별점 추천 솔루션 + 상담 신청 버튼
function RecommendationModal({ recommendation, onClose, onRequestConsult }) {
  const { t } = useTranslation();
  const { recommended } = recommendation;

  return (
    <div className="consult-modal-backdrop" onClick={onClose}>
      <div className="consult-modal recommend-modal drop-down-anim" onClick={(e) => e.stopPropagation()}>
        <div className="modal-mascot-header">
          <img src="/images/moosol.png" alt="마스코트" className="mascot-img" />
        </div>

        <button className="consult-modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        <h3>{t("consulting.recommendTitle")}</h3>
        <p>{t("consulting.recommendDesc")}</p>

        <div className="recommend-list">
          {recommended.map((item) => (
            <div className="recommend-item" key={item.code}>
              <Stars count={item.stars} />
              <div className="recommend-item-body">
                <div className="recommend-item-name">
                  <i className="fas fa-circle-check"></i> {item.name}
                </div>
                <div className="recommend-item-desc">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <button className="btn-submit recommend-cta" onClick={onRequestConsult}>
          {t("consulting.recommendCta")}
        </button>
      </div>
    </div>
  );
}

// 상담 신청 팝업 (이름 / 이메일만 입력받아 메일로 상담 요청)
function ConsultRequestModal({ onClose, onSuccess, recommendation, answers }) {
  const { t } = useTranslation();
  const initialForm = { name: "", email: "", notes: "" };
  const [form, setForm] = useState(initialForm);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 질문/답변 전체를 사람이 읽기 좋은 텍스트로 변환 (메일 본문용 - 관리자가 보는 메일이라 한글로 고정)
  const buildAnswersText = () => {
    if (!answers) return "";
    const lines = ["[설문 답변]"];
    quizSteps.forEach((step) => {
      const answer = answers[step.id];
      if (!answer || (Array.isArray(answer) && answer.length === 0)) return;

      const getLabelKo = (optionId) => {
        const opt = step.options.find((o) => o.id === optionId);
        return opt ? opt.label.ko : optionId;
      };

      const answerText = Array.isArray(answer)
        ? answer.map(getLabelKo).join(", ")
        : getLabelKo(answer);
      lines.push(`Q${step.id}. ${step.question.ko} → ${answerText}`);
    });
    return lines.join("\n");
  };

  // 추천 결과를 사람이 읽기 좋은 텍스트로 변환 (메일 본문용)
  const buildRecommendationText = () => {
    if (!recommendation) return "";
    const lines = [];
    lines.push("[추천 솔루션]");
    recommendation.recommended.forEach((item) => {
      lines.push(`${"★".repeat(item.stars)}${"☆".repeat(5 - item.stars)} ${item.name} - ${item.desc}`);
    });
    return lines.join("\n");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    const templateParams = {
      name: form.name,
      email: form.email,
      notes: form.notes || "",
      title: "[3-Step 보안 진단] - 상담 신청",
      time: new Date().toLocaleString("ko-KR"),
      message: [buildAnswersText(), buildRecommendationText()].filter(Boolean).join("\n\n"),
    };

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setForm(initialForm);
        if (onSuccess) onSuccess();
      })
      .catch((err) => {
        console.error(err);
        alert("전송에 실패했습니다. 잠시 후 다시 시도해주세요.");
      })
      .finally(() => setSending(false));
  };

  return (
    <div className="consult-modal-backdrop" onClick={onClose}>
      <div className="consult-modal" onClick={(e) => e.stopPropagation()}>
        <button className="consult-modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        <h3>{t("consulting.requestTitle")}</h3>
        <p>{t("consulting.requestDesc")}</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t("consulting.nameLabel")}</label>
            <input
              type="text"
              name="name"
              placeholder={t("consulting.namePlaceholder")}
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>{t("consulting.emailLabel")}</label>
            <input
              type="email"
              name="email"
              placeholder={t("consulting.emailPlaceholder")}
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>{t("consulting.notesLabel")}</label>
            <input
              type="text"
              name="notes"
              placeholder={t("consulting.notesPlaceholder")}
              value={form.notes}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn-submit" disabled={sending}>
            {sending ? t("consulting.sending") : t("consulting.submitBtn")}
          </button>
        </form>
      </div>
    </div>
  );
}

function Consulting() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith("en") ? "en" : "ko";

  const [mode, setMode] = useState("landing");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showRecommend, setShowRecommend] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const currentStep = quizSteps[currentIndex];
  const isLastStep = currentIndex === quizSteps.length - 1;
  const currentAnswer = answers[currentStep?.id];
  const hasAnswer =
    currentStep?.type === "multi"
      ? Array.isArray(currentAnswer) && currentAnswer.length > 0
      : !!currentAnswer;

  const lastMultiStep = quizSteps.find((s) => s.type === "multi");
  const recommendation = getRecommendation(answers[lastMultiStep?.id] || [], lang);

  const startQuiz = () => {
    setCurrentIndex(0);
    setAnswers({});
    setMode("quiz");
  };

  // 단일 선택(라디오): 클릭한 옵션 id로 그 질문의 답을 교체
  const selectSingle = (optionId) => {
    setAnswers((prev) => ({ ...prev, [currentStep.id]: optionId }));
  };

  // 복수 선택(체크박스): 배열에 있으면 빼고, 없으면 추가
  const toggleMulti = (optionId) => {
    setAnswers((prev) => {
      const prevList = prev[currentStep.id] || [];
      const nextList = prevList.includes(optionId)
        ? prevList.filter((v) => v !== optionId)
        : [...prevList, optionId];
      return { ...prev, [currentStep.id]: nextList };
    });
  };

  const goNext = () => {
    if (isLastStep) {
      setShowRecommend(true);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  const goPrev = () => {
    setCurrentIndex((i) => Math.max(0, i - 1));
  };

  const backToLanding = () => setMode("landing");

  return (
    <section id="consulting">
      <div className="section-title">
        <div className="about-hero-inner">
          <div className="about-eyebrow">{t("consulting.eyebrow")}</div>
          <h1>
            {t("consulting.heroTitle1")} <br />
            {t("consulting.heroTitle2")}
          </h1>
          <p>
            {t("consulting.heroDesc1")} <br />
            {t("consulting.heroDesc2")}
          </p>
        </div>
      </div>

      {mode === "landing" && (
        <div className="consulting-landing">
          <div className="consulting-panel" onClick={() => setMode("browse")}>
            <div className="consulting-panel-icon">
              <i className="fas fa-compass"></i>
            </div>
            <h3>{t("consulting.landingBrowseTitle")}</h3>
            <p>{t("consulting.landingBrowseDesc")}</p>
            <span className="consulting-panel-arrow">
              <i className="fas fa-arrow-right"></i>
            </span>
          </div>

          <div className="consulting-panel" onClick={startQuiz}>
            <div className="consulting-panel-icon">
              <i className="fas fa-comments"></i>
            </div>
            <h3>{t("consulting.landingQuizTitle")}</h3>
            <p>
              {t("consulting.landingQuizDesc1")} <br />
              {t("consulting.landingQuizDesc2")} <br />
            </p>
            <span className="consulting-panel-arrow">
              <i className="fas fa-arrow-right"></i>
            </span>
          </div>
        </div>
      )}

      {mode === "browse" && (
        <div className="consulting-content">
          <button className="consulting-back" onClick={backToLanding}>
            <i className="fas fa-arrow-left"></i> {t("consulting.back")}
          </button>
          <div className="about-section-head">
            <div className="about-eyebrow-green">
              <h2>{t("consulting.browseTitle")}</h2>
            </div>
            <p>{t("consulting.browseDesc")}</p>
          </div>
          <div className="solutions-grid">
            {solutions.map((s) => (
              <div className="photo-card" key={s.title.ko}>
                <div className="photo-card-bg" style={{ backgroundImage: `url(${s.img})` }}></div>
                <div className="photo-card-overlay"></div>
                <div className="photo-card-content">
                  <h4 className="photo-card-title">{s.title[lang]}</h4>
                  <p className="photo-card-desc">{s.desc[lang]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {mode === "quiz" && currentStep && (
        <div className="consulting-content quiz-wrap">
          <button className="consulting-back" onClick={backToLanding}>
            <i className="fas fa-arrow-left"></i> {t("consulting.back")}
          </button>

          <div className="quiz-card">
            <div className="quiz-step-count">
              {currentIndex + 1} / {quizSteps.length}
            </div>
            <h2 className="quiz-question">{currentStep.question[lang]}</h2>
            {currentStep.hint && <p className="quiz-hint">{currentStep.hint[lang]}</p>}

            {/* 단일 선택: 라디오 스타일 */}
            {currentStep.type === "single" && (
              <div className="quiz-choice-list">
                {currentStep.options.map((opt) => (
                  <label
                    key={opt.id}
                    className={`quiz-choice ${currentAnswer === opt.id ? "selected" : ""}`}
                  >
                    <input
                      type="radio"
                      name={`q-${currentStep.id}`}
                      checked={currentAnswer === opt.id}
                      onChange={() => selectSingle(opt.id)}
                    />
                    <span className="quiz-choice-mark quiz-choice-radio"></span>
                    {opt.label[lang]}
                  </label>
                ))}
              </div>
            )}

            {/* 복수 선택: 체크박스 스타일 */}
            {currentStep.type === "multi" && (
              <div className="quiz-choice-list">
                {currentStep.options.map((opt) => {
                  const checked = (currentAnswer || []).includes(opt.id);
                  return (
                    <label key={opt.id} className={`quiz-choice ${checked ? "selected" : ""}`}>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleMulti(opt.id)}
                      />
                      <span className="quiz-choice-mark quiz-choice-checkbox"></span>
                      {opt.label[lang]}
                    </label>
                  );
                })}
              </div>
            )}

            <div className="quiz-nav">
              {currentIndex > 0 && (
                <button className="quiz-prev" onClick={goPrev}>
                  <i className="fas fa-arrow-left"></i> {t("consulting.prev")}
                </button>
              )}
              <button className="quiz-next" onClick={goNext} disabled={!hasAnswer}>
                {isLastStep ? t("consulting.done") : t("consulting.next")}
              </button>
            </div>
          </div>
        </div>
      )}

      {showRecommend && (
        <RecommendationModal
          recommendation={recommendation}
          onClose={() => setShowRecommend(false)}
          onRequestConsult={() => {
            setShowRecommend(false);
            setShowModal(true);
          }}
        />
      )}

      {showModal && (
        <ConsultRequestModal
          recommendation={recommendation}
          answers={answers}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            setShowSuccess(true);
          }}
        />
      )}

      {showSuccess && (
        <SubmitSuccessModal
          onClose={() => setShowSuccess(false)}
          title={t("consulting.successTitle")}
          message={t("consulting.successMsg")}
        />
      )}
    </section>
  );
}

export default Consulting;