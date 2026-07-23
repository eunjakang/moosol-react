// 맞춤 상담 (분기형 질문) 데이터
//
// 각 질문(step)의 구조:
//   id       : 이 질문의 고유 번호
//   question : 질문 제목
//   hint     : (선택) 질문 아래 부연 설명
//   options  : 선택지 배열, 각 선택지는 아래 둘 중 하나를 가짐
//              - next   : 다음으로 이동할 질문의 id
//              - action : "popup" 이면 상담 신청 팝업을 띄움
//

export const quizSteps = [
  {
    id: 1,
    question: "사내 전산 시스템이 있나요?",
    hint: "ex) 전산실, 방화벽, 사내 서버 등",
    options: [
      { label: "예", next: 2 },
      { label: "아니오", action: "popup" },
    ],
  },
  {
    id: 2,
    // TODO: 실제 질문 문구로 교체
    question: "(2번째 질문 - 내용 준비중)",
    hint: "",
    options: [
      // TODO: 실제 선택지 라벨로 교체.
      // next를 다음 id로 걸면 계속 이어지고, action: "popup"이면 바로 상담 신청 팝업이 뜹니다.
      { label: "선택지 A", next: 3 },
      { label: "선택지 B", action: "popup" },
    ],
  },
  {
    id: 3,
    // TODO: 실제 질문 문구로 교체
    question: "(3번째 질문 - 내용 준비중)",
    hint: "",
    options: [
      { label: "선택지 A", action: "popup" },
      { label: "선택지 B", action: "popup" },
    ],
  },
];