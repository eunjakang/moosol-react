import React from "react";

function Privacy() {
  return (
    <section id="privacy">
    <div className="privacy-container">
      <div className="privacy-header">
        <h1>개인정보 처리방침</h1>
        <p>
          (주)무솔은 이용자의 개인정보를 중요시하며,
          개인정보보호법 및 정보통신망 이용촉진 및 정보보호 등에 관한 법률을
          준수하고 있습니다.
        </p>
      </div>

      <div className="privacy-section">
        <h2>제 1 조 (개인정보의 처리 목적)</h2>
        <p>
          회사는 다음의 목적을 위해 최소한의 개인정보를 수집하고 있으며, 목적
          이외의 용도로는 사용되지 않습니다.
        </p>
        <div className="privacy-card">
          <ul>
            <li>
              <strong>보안 진단 및 솔루션 컨설팅 상담 신청 접수</strong>
            </li>
            <li>
              <strong>
                상담 요청에 대한 답변, 담당 엔지니어 확인 및 안내 연락
              </strong>
            </li>
            <li>
              <strong>서비스 문의 처리 및 결과 회신</strong>
            </li>
          </ul>
        </div>
      </div>

      <div className="privacy-section">
        <h2>제 2 조 (처리하는 개인정보 항목)</h2>
        <p>
          회사는 상담 신청 및 서비스 문의를 위해 아래와 같은 개인정보를
          수집하고 있습니다.
        </p>
        <div className="privacy-card">
          <ul>
            <li>
              <strong>수집 항목:</strong> 성명(이름), 이메일 주소, 연락처,
              회사명(회사정보), 비고/문의 내용
            </li>
          </ul>
        </div>
      </div>

      <div className="privacy-section">
        <h2>제 3 조 (개인정보의 처리 및 보유기간)</h2>
        <p>
          회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당
          정보를 지체 없이 파기합니다. 단, 관계법령의 규정에 의하여 보존할
          필요가 있는 경우 일정 기간 동안 보관합니다.
        </p>
        <div className="privacy-card">
          <ul>
            <li>
              <strong>상담 신청 및 문의 내역:</strong> 상담 완료 후 1년간 보관
              (단, 고객의 파기 요청 시 즉시 삭제)
            </li>
            <li>
              <strong>관계 법령에 의한 보존:</strong> 소비자 불만 또는 분쟁처리에
              관한 기록 (3년)
            </li>
          </ul>
        </div>
      </div>

      <div className="privacy-section">
        <h2>제 4 조 (개인정보의 제공 및 위탁)</h2>
        <p>
          회사는 이용자의 동의 없이 개인정보를 외부에 제공하지 않습니다. 단,
          효율적인 상담 및 메일 발송 서비스를 위해 아래와 같이 위탁하고 있습니다.
        </p>
        <table class="privacy-table">
          <thead>
            <tr>
              <th>수탁업체</th>
              <th>위탁업무 내용</th>
              <th>개인정보의 보유 및 이용기간</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>EmailJS</td>
              <td>상담 신청 내용 전달 및 메일 데이터 전송/저장</td>
              <td>위탁 계약 종료 시 또는 파기 요청 시까지</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="privacy-section">
        <h2>제 5 조 (개인정보 파기절차 및 방법)</h2>
        <p>개인정보 처리 목적이 달성된 경우 지체 없이 파기합니다.</p>
        <div className="privacy-card">
          <ul>
            <li>
              <strong>전자적 파일 형태:</strong> 기록을 재생할 수 없는 기술적
              방법을 사용하여 파기
            </li>
            <li>
              <strong>종이 문서:</strong> 분쇄기로 분쇄하거나 소각을 통해 파기
            </li>
          </ul>
        </div>
      </div>

      <div className="privacy-section">
        <h2>제 6 조 (개인정보 관리책임자 및 담당자)</h2>
        <p>
          상담 신청 시 발생할 수 있는 개인정보 관련 문의사항은 아래의
          관리책임자에게 문의해 주시기 바랍니다.
        </p>
        <table class="privacy-table">
          <thead>
            <tr>
              <th>구분</th>
              <th>개인정보 관리책임자</th>
              <th>개인정보 관리담당자</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>성명 / 직위</td>
              <td>김지형 팀장</td>
              <td>정한별 프로</td>
            </tr>
            <tr>
              <td>이메일</td>
              <td>thmvhu@moosol.co.kr</td>
              <td>wjdzmsquf@moosol.co.kr</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="privacy-section">
        <h2>제 7 조 (권익침해 구제방법)</h2>
        <p>
          기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에
          문의하시기 바랍니다.
        </p>
        <ul className="contact-list">
          <li>• 개인정보침해신고센터 (privacy.kisa.or.kr / 국번없이 118)</li>
          <li>• 대검찰청 사이버수사과 (www.spo.go.kr / 국번없이 1301)</li>
          <li>
            • 경찰청 사이버범죄신고시스템 (ecrm.police.go.kr / 국번없이 182)
          </li>
        </ul>
      </div>
    </div>
    </section>
  );
}

export default Privacy;