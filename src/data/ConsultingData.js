export const quizSteps = [
  {
    id: 1,
    type: "single",
    question: { ko: "회사 규모는 어느정도 인가요?", en: "What is the size of your company?" },
    options: [
      { id: "size_10", label: { ko: "10명 이하", en: "10 or fewer" } },
      { id: "size_50", label: { ko: "50명 이하", en: "11–50" } },
      { id: "size_100", label: { ko: "100명 이하", en: "51–100" } },
      { id: "size_100plus", label: { ko: "100명 이상", en: "Over 100" } },
    ],
  },
  {
    id: 2,
    type: "single",
    question: { ko: "사내 서버가 있나요?", en: "Do you have an in-house server?" },
    options: [
      { id: "yes", label: { ko: "예", en: "Yes" } },
      { id: "no", label: { ko: "아니오", en: "No" } },
    ],
  },
  // {
  //   id: 3,
  //   type: "single",
  //   question: { ko: "중요 문서를 보호해야 하나요?", en: "Do you need to protect important documents?" },
  //   options: [
  //     { id: "yes", label: { ko: "예", en: "Yes" } },
  //     { id: "no", label: { ko: "아니오", en: "No" } },
  //   ],
  // },
  // {
  //   id: 4,
  //   type: "single",
  //   question: { ko: "외부 협력사와 파일을 자주 주고받나요?", en: "Do you frequently exchange files with external partners?" },
  //   options: [
  //     { id: "yes", label: { ko: "예", en: "Yes" } },
  //     { id: "no", label: { ko: "아니오", en: "No" } },
  //   ],
  // },
  {
    id: 5,
    type: "multi",
    question: { ko: "다음 중 고민이 있으신가요?", en: "Which of the following concerns you?" },
    hint: { ko: "(복수선택)", en: "(Multiple selection)" },
    options: [
      { id: "usb", label: { ko: "USB 반출이 걱정된다", en: "Worried about USB data exfiltration" } },
      { id: "doc_leak", label: { ko: "문서 유출이 걱정된다", en: "Worried about document leaks" } },
      { id: "ransomware", label: { ko: "랜섬웨어가 걱정된다", en: "Worried about ransomware" } },
      { id: "server_access", label: { ko: "서버 접근을 관리하고 싶다", en: "Want to manage server access" } },
      { id: "db_access", label: { ko: "DB 접근을 통제하고 싶다", en: "Want to control database access" } },
      { id: "remote_work", label: { ko: "재택근무 보안이 필요하다", en: "Need remote-work security" } },
      { id: "net_separation", label: { ko: "내부망/외부망 분리가 필요하다", en: "Need internal/external network separation" } },
    ],
  },
];