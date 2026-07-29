import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import emailjs from "@emailjs/browser";
import SubmitSuccessModal from "./SubmitModal";

// 초기값 설정
const initialForm = {
  company: "",
  name: "",
  phone: "",
  message: "",
  email: '',
  service: [], // 기본으로 '방화벽' 선택 혹은 빈 배열 []
};

// 관심 영역 옵션
const SOLUTIONS = [
  { id: 'FW', label: '방화벽' },
  { id: 'SW', label: '스위치' },
  { id: 'NAC', label: 'NAC' },
  { id: 'DAC', label: 'DAC' },
  { id: 'DLP', label: 'DLP' },
  { id: 'DRM', label: 'DRM (문서보안)' },
  { id: 'ECM', label: '문서중앙화' },
  { id: 'NETWORK', label: '망분리·망연계' },
  { id: 'SERVER', label: '서버견적' },
  { id: 'AI', label: 'AI' },
  { id: 'ETC', label: '기타' },
];

function Contact() {
  const location = useLocation();
  // console.log("현재 location.state:", location.state);
  // 넘겨받은 state가 있는지 확인
  const initialSolutionId = location.state?.initialSolutionId;

  const [form, setForm] = useState(initialForm);
  const [showSuccess, setShowSuccess] = useState(false);
  const [sending, setSending] = useState(false);
  // const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialSolutionId) {
      setForm((prevForm) => {
        const currentServices = prevForm.service || [];
        // 이미 선택된 항목이 아니라면 배열에 추가
        if (!currentServices.includes(initialSolutionId)) {
          return {
            ...prevForm,
            service: [...currentServices, initialSolutionId]
          };
        }
        return prevForm;
      });
    }
  }, [initialSolutionId]);

  // 유효성 검사 함수
  const validate = () => {

    // 이메일 정규식 (abc@domain.com 형식)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(form.email)) {
      alert("유효한 이메일 주소를 입력해주세요.");
      return false;
    }

    // setErrors(newErrors);
    
    // return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // if (errors[name]) {
    //   setErrors((prev) => ({ ...prev, [name]: '' }));
    // }
  };

  // 다중 선택 처리
  const handleToggleService = (id) => {
    setForm((prev) => {
      const currentServices = Array.isArray(prev.service) ? prev.service : [];
      
      const updatedServices = currentServices.includes(id)
        ? currentServices.filter((item) => item !== id) // 이미 있으면 제거
        : [...currentServices, id];                     // 없으면 추가

      return {
        ...prev,
        service: updatedServices,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 유효성 검사
    // if (!validate()) {
    //   return ; 
    // }
    // alert("문의가 정상 접수되었습니다. 담당자가 확인 후 신속하게 연락드리겠습니다!");

    // setForm(initialForm);
    setSending(true);

    const templateParams = {
      name: form.name,                                  
      email: form.email,                                 
      title: form.company,        
      time: new Date().toLocaleString("ko-KR"),            
      message: `회사/기관명: ${form.company}\n연락처: ${form.phone}\n관심 서비스: ${form.service}\n\n${form.message}`, 
    };

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setShowSuccess(true);
        setForm(initialForm);
      })
      .catch((err) => {
        console.error(err);
        alert("전송에 실패했습니다. 잠시 후 다시 시도해주세요.");
      })
      .finally(() => setSending(false));
  };

  return (
    <section id="contact-section">
      <div className="contact-grid">
        <div className="contact-info">
          <div className="section-title2" style={{ textAlign: "left", marginBottom: "25px" }}>
            <h2>
              기술 상담 / 견적 문의 하기
            </h2>
            <p>
              1~2영업일 이내 담당자가 연락드리며, <br />문의 내용에 따라 신속한 기술 상담과 견적 안내가 가능합니다.
            </p>
          </div>
          <div className="info-item">
            <i className="fas fa-phone"></i>
            <div className="info-details">
              <h4>Tel (담당자 : 김지형 팀장)</h4>
              <p>010-4904-6706 (평일 09:00 ~ 18:00)</p>
            </div>
          </div>
          <div className="info-item">
            <i className="fas fa-envelope"></i>
            <div className="info-details">
              <h4>Mail</h4>
              <p>thmvhu@moosol.co.kr</p>
            </div>
          </div>
        </div>

        <div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>
                  회사/기관명 <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="text"
                  name="company"
                  placeholder="예: 무솔"
                  value={form.company}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  담당자 이름 <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="예: 홍길동"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>
                  이메일 <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="예: info@moosol.co.kr"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>연락처</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="예: 010-1234-5678"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
              <div className="form-group">
                <label>
                  관심 영역 <span style={{ opacity: 0.7 }}>(다중선택 가능)</span>
                </label>
                <div className="solution-tags">
                  {SOLUTIONS.map((item) => {
                    const isSelected = form.service?.includes(item.id);

                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={`tag-btn ${isSelected ? 'active' : ''}`}
                        onClick={() => handleToggleService(item.id)}
                      >
                        {isSelected && (
                          <span
                            style={{ color: 'var(--light-green)', fontWeight: 'bold' }}
                            className="check-icon"
                          >
                            ✓
                          </span>
                        )}
                        {item.label}
                      </button>
                    );
                  })}
                
                </div>
              </div>
            <div className="form-group">
              <label>문의 사항</label>
              <textarea
                rows="4"
                name="message"
                placeholder="구축 현황, 요구사항, 문의 내용 등을 상세히 작성해주시면 보다 정확한 상담이 가능합니다."
                value={form.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="">
              <input 
                type="checkbox"
                name="privacy"
                required
              />
              <span style={{ marginLeft: '8px', fontSize: '14px' }}>
                개인정보 수집 및 이용에 동의합니다.
              </span>
            </div>
            <button type="submit" className="btn-submit">
              기술 상담 / 견적 접수하기
            </button>
          </form>
        </div>
      </div>
      {showSuccess && (
        <SubmitSuccessModal
          onClose={() => setShowSuccess(false)}
          title="문의가 접수됐어요!"
          message={
            <>
              소중한 문의가 정상 접수되었습니다.
              <br />
              담당 엔지니어가 신속하게 연락드리겠습니다!
            </>
          }
        />
      )}
    </section>
  );
}

export default Contact;
