import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";
import SubmitSuccessModal from "./SubmitModal";

// 초기값 설정
const initialForm = {
  company: "",
  name: "",
  phone: "",
  message: "",
  email: "",
  service: [],
};

// 관심 영역 옵션 (id는 고정, label만 다국어)
const SOLUTIONS = [
  { id: "FW", label: { ko: "방화벽", en: "Firewall" } },
  { id: "SW", label: { ko: "스위치", en: "Switch" } },
  { id: "NAC", label: { ko: "NAC", en: "NAC" } },
  { id: "DAC", label: { ko: "DAC", en: "DAC" } },
  { id: "DLP", label: { ko: "DLP", en: "DLP" } },
  { id: "DRM", label: { ko: "DRM (문서보안)", en: "DRM (Document Security)" } },
  { id: "ECM", label: { ko: "문서중앙화", en: "Document Centralization" } },
  { id: "NETWORK", label: { ko: "망분리·망연계", en: "Network Segmentation / Interconnection" } },
  { id: "SERVER", label: { ko: "서버견적", en: "Server Quote" } },
  { id: "AI", label: { ko: "AI", en: "AI" } },
  { id: "ETC", label: { ko: "기타", en: "Other" } },
];

function Contact() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith("en") ? "en" : "ko";
  const location = useLocation();

  const initialSolutionId = location.state?.initialSolutionId;
  const initialMessage = location.state?.initialMessage;
  const productName = location.state?.productName;

  const [form, setForm] = useState(initialForm);
  const [showSuccess, setShowSuccess] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (initialSolutionId || initialMessage) {
      setForm((prevForm) => {
        const currentServices = prevForm.service || [];

        const shouldAddService =
          initialSolutionId && !currentServices.includes(initialSolutionId);
        const updatedServices = shouldAddService
          ? [...currentServices, initialSolutionId]
          : currentServices;

        const shouldUpdateMessage =
          initialMessage && !prevForm.message.includes(initialMessage);

        const updatedMessage = shouldUpdateMessage
          ? `[선택한 사양 정보]\n${initialMessage}\n\n[추가 문의 사항]\n${prevForm.message}`
          : prevForm.message;

        return {
          ...prevForm,
          service: updatedServices,
          message: updatedMessage,
        };
      });
    }

    if (productName) {
      const productTag = `[견적 문의 상품] ${productName}`;

      setForm((prevForm) => {
        if (prevForm.message.includes(productTag)) {
          return prevForm;
        }
        return {
          ...prevForm,
          message: `${productTag}\n\n${prevForm.message}`,
        };
      });
    }
  }, [location.state]);

  // 유효성 검사 함수
  const validate = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(form.email)) {
      alert(t("contact.invalidEmail"));
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 다중 선택 처리
  const handleToggleService = (id) => {
    setForm((prev) => {
      const currentServices = Array.isArray(prev.service) ? prev.service : [];
      const updatedServices = currentServices.includes(id)
        ? currentServices.filter((item) => item !== id)
        : [...currentServices, id];
      return { ...prev, service: updatedServices };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    // 관리자가 보는 메일이라 라벨은 항상 한글로 고정
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
        alert(t("contact.sendFail"));
      })
      .finally(() => setSending(false));
  };

  return (
    <section id="contact-section">
      <div className="contact-grid">
        <div className="contact-info">
          <div className="section-title2" style={{ textAlign: "left", marginBottom: "25px" }}>
            <h2>{t("contact.title")}</h2>
            <p>
              {t("contact.desc1")} <br />
              {t("contact.desc2")}
            </p>
          </div>
          <div className="info-item">
            <i className="fas fa-phone"></i>
            <div className="info-details">
              <h4>{t("contact.telLabel")}</h4>
              <p>010-4904-6706 ({t("contact.officeHours")})</p>
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
                  {t("contact.companyLabel")} <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="company"
                  placeholder={t("contact.companyPlaceholder")}
                  value={form.company}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  {t("contact.nameLabel")} <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder={t("contact.namePlaceholder")}
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>
                  {t("contact.emailLabel")} <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder={t("contact.emailPlaceholder")}
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>{t("contact.phoneLabel")}</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder={t("contact.phonePlaceholder")}
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label>
                {t("contact.interestLabel")}{" "}
                <span style={{ opacity: 0.7 }}>{t("contact.interestMulti")}</span>
              </label>
              <div className="solution-tags">
                {SOLUTIONS.map((item) => {
                  const isSelected = form.service?.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`tag-btn ${isSelected ? "active" : ""}`}
                      onClick={() => handleToggleService(item.id)}
                    >
                      {isSelected && (
                        <span
                          style={{ color: "var(--light-green)", fontWeight: "bold" }}
                          className="check-icon"
                        >
                          ✓
                        </span>
                      )}
                      {item.label[lang]}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="form-group">
              <label>{t("contact.messageLabel")}</label>
              <textarea
                rows="6"
                name="message"
                placeholder={t("contact.messagePlaceholder")}
                value={form.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="">
              <input type="checkbox" name="privacy" required />
              <span style={{ marginLeft: "8px", fontSize: "14px" }}>
                {t("contact.privacyAgree")}
              </span>
            </div>
            <button type="submit" className="btn-submit">
              {t("contact.submitBtn")}
            </button>
          </form>
        </div>
      </div>
      {showSuccess && (
        <SubmitSuccessModal
          onClose={() => setShowSuccess(false)}
          title={t("contact.successTitle")}
          message={t("contact.successMsg")}
        />
      )}
    </section>
  );
}

export default Contact;