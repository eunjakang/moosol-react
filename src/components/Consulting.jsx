import React, { useState } from "react";
import emailjs from "@emailjs/browser";
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

// 추천 결과 팝업: 별점 추천 솔루션 + 추가 추천 + 상담 신청 버튼
function RecommendationModal({ recommendation, onClose, onRequestConsult }) {
  const { recommended, extra } = recommendation;

  return (
    <div className="consult-modal-backdrop" onClick={onClose}>
      <div className="consult-modal recommend-modal drop-down-anim" onClick={(e) => e.stopPropagation()}>
        <div className="modal-mascot-header">
          <img src="/images/moosol.png" alt="마스코트" className="mascot-img" />
        </div>

        <button className="consult-modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        <h3>귀사에 필요한 솔루션</h3>
        <p>답변을 바탕으로 추천 솔루션을 정리해드렸어요.</p>

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

        {/* {extra.length > 0 && (
          <div className="recommend-extra">
            <div className="recommend-extra-title">추가로 추천드립니다.</div>
            <ul>
              {extra.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        )} */}

        <button className="btn-submit recommend-cta" onClick={onRequestConsult}>
          상담 신청
        </button>
      </div>
    </div>
  );
}

// 상담 신청 팝업 (이름 / 이메일만 입력받아 메일로 상담 요청)
function ConsultRequestModal({ onClose, recommendation, answers }) {
  const [form, setForm] = useState({ name: "", email: "", notes: "" });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 질문/답변 전체를 사람이 읽기 좋은 텍스트로 변환 (메일 본문용)
  const buildAnswersText = () => {
    if (!answers) return "";
    const lines = ["[설문 답변]"];
    quizSteps.forEach((step) => {
      const answer = answers[step.id];
      if (!answer || (Array.isArray(answer) && answer.length === 0)) return;
      const answerText = Array.isArray(answer) ? answer.join(", ") : answer;
      lines.push(`Q${step.id}. ${step.question} → ${answerText}`);
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
    // if (recommendation.extra.length > 0) {
    //   lines.push("");
    //   lines.push("[추가로 추천]");
    //   lines.push(recommendation.extra.join(", "));
    // }
    return lines.join("\n");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    const templateParams = {
      name: form.name,
      email: form.email,
      notes: form.notes || "",
      title: "[5-Step 보안 진단] - 상담 신청",
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
        // alert("상담 신청이 접수되었습니다. 담당자가 확인 후 신속하게 연락드리겠습니다!");
        // onClose();
        onSuccess();
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
        <h3>상담 신청</h3>
        <p>이름과 이메일을 남겨주시면 담당자가 확인 후 연락드립니다.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>이름</label>
            <input
              type="text"
              name="name"
              placeholder="예: 홍길동"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>이메일</label>
            <input
              type="email"
              name="email"
              placeholder="예: moosol@company.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>비고</label>
            <input
              type="text"
              name="notes"
              placeholder="예: 추가로 문의하고 싶은 내용이 있으시면 여기에 입력해주세요."
              value={form.notes}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn-submit" disabled={sending}>
            {sending ? "전송 중..." : "상담 요청 보내기"}
          </button>
        </form>
      </div>
    </div>
  );
}
function Consulting() {

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
  const recommendation = getRecommendation(answers[lastMultiStep?.id] || []);

  const startQuiz = () => {
    setCurrentIndex(0);
    setAnswers({});
    setMode("quiz");
  };

  // 단일 선택(라디오): 클릭한 값으로 그 질문의 답을 교체
  const selectSingle = (option) => {
    setAnswers((prev) => ({ ...prev, [currentStep.id]: option }));
  };

  // 복수 선택(체크박스): 배열에 있으면 빼고, 없으면 추가
  const toggleMulti = (option) => {
    setAnswers((prev) => {
      const prevList = prev[currentStep.id] || [];
      const nextList = prevList.includes(option)
        ? prevList.filter((v) => v !== option)
        : [...prevList, option];
      return { ...prev, [currentStep.id]: nextList };
    });
  };

  // 다음 질문으로 이동
  const goNext = () => {
    if (isLastStep) {
      setShowRecommend(true);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  // 이전 질문으로 이동
  const goPrev = () => {
    setCurrentIndex((i) => Math.max(0, i - 1));
  };

  const backToLanding = () => setMode("landing");

  return (
    <section id="consulting">
      <div className="section-title">
        <div className="about-hero-inner">
          <div className="about-eyebrow">Consulting · 컨설팅</div>
          <h1>네트워크 분리부터 솔루션 구축까지, <br />무솔이 함께합니다.</h1>
          <p>
            물리적·논리적 네트워크 분리부터 기업 환경에 최적화된 보안 솔루션 설계까지 원스톱으로 제공합니다. <br />
            복잡한 규제 환경과 최신 보안 위협에 완벽히 대응하는 안전한 인프라를 구축합니다.
          </p>
        </div>
      </div>

      {mode === "landing" && (
        <div className="consulting-landing">
          <div className="consulting-panel" onClick={() => setMode("browse")}>
            <div className="consulting-panel-icon">
              <i className="fas fa-compass"></i>
            </div>
            <h3>둘러보기</h3>
            <p>모든 솔루션을 한눈에 살펴보세요</p>
            <span className="consulting-panel-arrow">
              <i className="fas fa-arrow-right"></i>
            </span>
          </div>

          <div className="consulting-panel" onClick={startQuiz}>
            <div className="consulting-panel-icon">
              <i className="fas fa-comments"></i>
            </div>
            <h3>🔒 5-Step 보안 진단</h3>
            <p>
              5개의 간단한 질문으로 <br />
              우리 회사에 필요한 보안 솔루션을 확인해보세요. <br />
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
            <i className="fas fa-arrow-left"></i> 처음으로
          </button>
          <div className="about-section-head">
          <div className="about-eyebrow-green"><h2>솔루션 둘러보기</h2></div> 
          <p>
            무솔이 제공하는 모든 솔루션을 한눈에 확인하세요.
          </p>
        </div>
          <div className="solutions-grid">
          {solutions.map((s) => (
            <div className="photo-card" key={s.title}>
              <div
                className="photo-card-bg"
                style={{ backgroundImage: `url(${s.img})` }}
              ></div>
              <div className="photo-card-overlay"></div>
              <div className="photo-card-content">
                <h4 className="photo-card-title">{s.title}</h4>
                <p className="photo-card-desc">{s.desc}</p>
              </div>
            </div>
          ))}
          </div>
          {/* <div className="solutions-img">
            <img src="/images/solutions.png" alt="솔루션 이미지" /> 
          </div> */}
        </div>
      )}

      {mode === "quiz" && currentStep && (
        <div className="consulting-content quiz-wrap">
          <button className="consulting-back" onClick={backToLanding}>
            <i className="fas fa-arrow-left"></i> 처음으로
          </button>

          <div className="quiz-card">
            <div className="quiz-step-count">
              {currentIndex + 1} / {quizSteps.length}
            </div>
            <h2 className="quiz-question">{currentStep.question}</h2>
            {currentStep.hint && <p className="quiz-hint">{currentStep.hint}</p>}

            {/* 단일 선택: 라디오 스타일 */}
            {currentStep.type === "single" && (
              <div className="quiz-choice-list">
                {currentStep.options.map((opt) => (
                  <label
                    key={opt}
                    className={`quiz-choice ${currentAnswer === opt ? "selected" : ""}`}
                  >
                    <input
                      type="radio"
                      name={`q-${currentStep.id}`}
                      checked={currentAnswer === opt}
                      onChange={() => selectSingle(opt)}
                    />
                    <span className="quiz-choice-mark quiz-choice-radio"></span>
                    {opt}
                  </label>
                ))}
              </div>
            )}

            {/* 복수 선택: 체크박스 스타일 */}
            {currentStep.type === "multi" && (
              <div className="quiz-choice-list">
                {currentStep.options.map((opt) => {
                  const checked = (currentAnswer || []).includes(opt);
                  return (
                    <label
                      key={opt}
                      className={`quiz-choice ${checked ? "selected" : ""}`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleMulti(opt)}
                      />
                      <span className="quiz-choice-mark quiz-choice-checkbox"></span>
                      {opt}
                    </label>
                  );
                })}
              </div>
            )}

            <div className="quiz-nav">
              {currentIndex > 0 && (
                <button className="quiz-prev" onClick={goPrev}>
                  <i className="fas fa-arrow-left"></i> 이전
                </button>
              )}
              <button
                className="quiz-next"
                onClick={goNext}
                disabled={!hasAnswer}
              >
                {isLastStep ? "완료" : "다음"}
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
          title="상담 신청이 접수됐어요!"
          message="입력하신 이메일로 추천 솔루션을 보내드렸어요. 담당 엔지니어가 곧 연락드리겠습니다!"
        />
      )}

    </section>
  );
}

export default Consulting;
