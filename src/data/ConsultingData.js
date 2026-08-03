export const quizSteps = [
  {
    id: 1,
    type: "single",
    question: "회사 규모는 어느정도 인가요?",
    options: ["10명 이하", "50명 이하", "100명 이하", "100명 이상"],
  },
  {
    id: 2,
    type: "single",
    question: "사내 서버가 있나요?",
    options: ["예", "아니오"],
  },
  // {
  //   id: 3,
  //   type: "single",
  //   question: "중요 문서를 보호해야 하나요?",
  //   options: ["예", "아니오"],
  // },
  // {
  //   id: 4,
  //   type: "single",
  //   question: "외부 협력사와 파일을 자주 주고받나요?",
  //   options: ["예", "아니오"],
  // },
  {
    id: 5,
    type: "multi",
    question: "다음 중 고민이 있으신가요?",
    hint: "(복수선택)",
    options: [
      "USB 반출이 걱정된다",
      "문서 유출이 걱정된다",
      "랜섬웨어가 걱정된다",
      "서버 접근을 관리하고 싶다",
      "DB 접근을 통제하고 싶다",
      "재택근무 보안이 필요하다",
      "내부망/외부망 분리가 필요하다",
    ],
  },
];