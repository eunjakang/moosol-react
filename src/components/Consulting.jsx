import React, { useState } from "react";
import { quizSteps } from "../data/ConsultingData";
import { solutions } from "../data/solutionsData";

// 상담 신청 팝업 (이름 / 이메일만 입력받아 메일로 상담 요청)
function ConsultRequestModal({ onClose }) {
  const [form, setForm] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent("무솔 맞춤 상담 신청");
    const body = encodeURIComponent(
      `이름: ${form.name}\n이메일: ${form.email}\n\n무솔 홈페이지 맞춤 상담을 통해 신청되었습니다.`
    );
    window.location.href = `mailto:support@moosolnet.co.kr?subject=${subject}&body=${body}`;
    onClose();
  };

  return (
    <div className="consult-modal-backdrop" onClick={onClose}>
      <div className="consult-modal" onClick={(e) => e.stopPropagation()}>
        <button className="consult-modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        <h3>상담 신청</h3>
        <p>이름과 이메일만 남겨주시면 담당 엔지니어가 연락드립니다.</p>
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
              placeholder="예: name@company.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn-submit">
            상담 요청 보내기
          </button>
        </form>
      </div>
    </div>
  );
}

function Consulting() {

const [mode, setMode] = useState("landing");
  const [stepId, setStepId] = useState(quizSteps[0]?.id);
  const [showModal, setShowModal] = useState(false);

  const currentStep = quizSteps.find((s) => s.id === stepId);

  const startQuiz = () => {
    setStepId(quizSteps[0].id);
    setMode("quiz");
  };

  const handleAnswer = (option) => {
    if (option.action === "popup") {
      setShowModal(true);
    } else if (option.next) {
      setStepId(option.next);
    }
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
            <h3>맞춤 상담</h3>
            <p>간단한 질문에 답하고 딱 맞는 솔루션을 안내받으세요</p>
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
            무솔이 제공하는 모든 솔루션을 한눈에 확인하세요. <br />
          </p>
        </div>
          <div className="solutions-grid">
            {solutions.map((s) => (
              <div className="solution-card" key={s.title}>
                <div className="sol-header">
                  <i className={`fas ${s.img}`}></i>
                  <h4>{s.title}</h4>
                </div>
                <div className="sol-body">
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {mode === "quiz" && currentStep && (
        <div className="consulting-content quiz-wrap">
          <button className="consulting-back" onClick={backToLanding}>
            <i className="fas fa-arrow-left"></i> 처음으로
          </button>

          <div className="quiz-card">
            <h2 className="quiz-question">{currentStep.question}</h2>
            {currentStep.hint && <p className="quiz-hint">{currentStep.hint}</p>}

            <div className="quiz-options">
              {currentStep.options.map((opt) => (
                <button
                  key={opt.label}
                  className="quiz-option"
                  onClick={() => handleAnswer(opt)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {showModal && <ConsultRequestModal onClose={() => setShowModal(false)} />}

    </section>
  );
}

export default Consulting;
