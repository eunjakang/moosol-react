import React from "react";

/**
 * 폼 제출/신청 완료 시 공통으로 쓰는 팝업.
 * title, message만 바꿔서 문의하기/컨설팅 상담신청 등 여러 곳에서 재사용합니다.
 */
function SubmitSuccessModal({
  onClose,
  title = "접수가 완료됐어요!",
  message = "소중한 요청이 정상 접수되었습니다. 담당 엔지니어가 신속하게 연락드리겠습니다!",
}) {
  return (
    <div className="consult-modal-backdrop" onClick={onClose}>
      <div className="consult-modal submit-success-modal" onClick={(e) => e.stopPropagation()}>
        <button className="consult-modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        <img
          src="/images/good.png"
          alt="접수 완료"
          className="submit-success-mascot"
        />
        <h3>{title}</h3>
        <p>{message}</p>
        <button className="btn-submit" onClick={onClose}>
          확인
        </button>
      </div>
    </div>
  );
}

export default SubmitSuccessModal;