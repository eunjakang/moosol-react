export const quizSteps = [
  {
    id: 1,
    type: "single",
    question: { ko: "회사 규모는 어느정도 인가요?", en: "What is the size of your company?", zh: "贵公司的规模大约是多少？" },
    options: [
      { id: "size_10", label: { ko: "10명 이하", en: "10 or fewer", zh: "10人以下" } },
      { id: "size_50", label: { ko: "50명 이하", en: "11–50", zh: "11–50人" } },
      { id: "size_100", label: { ko: "100명 이하", en: "51–100", zh: "51–100人" } },
      { id: "size_100plus", label: { ko: "100명 이상", en: "Over 100", zh: "100人以上" } },
    ],
  },
  {
    id: 2,
    type: "single",
    question: { ko: "사내 서버가 있나요?", en: "Do you have an in-house server?", zh: "公司内部有服务器吗？" },
    options: [
      { id: "yes", label: { ko: "예", en: "Yes", zh: "有" } },
      { id: "no", label: { ko: "아니오", en: "No", zh: "没有" } },
    ],
  },
  {
    id: 5,
    type: "multi",
    question: { ko: "다음 중 고민이 있으신가요?", en: "Which of the following concerns you?", zh: "以下哪些是您担心的问题？" },
    hint: { ko: "(복수선택)", en: "(Multiple selection)", zh: "(可多选)" },
    options: [
      { id: "usb", label: { ko: "USB 반출이 걱정된다", en: "Worried about USB data exfiltration", zh: "担心通过USB带出数据" } },
      { id: "doc_leak", label: { ko: "문서 유출이 걱정된다", en: "Worried about document leaks", zh: "担心文档泄露" } },
      { id: "ransomware", label: { ko: "랜섬웨어가 걱정된다", en: "Worried about ransomware", zh: "担心勒索软件" } },
      { id: "server_access", label: { ko: "서버 접근을 관리하고 싶다", en: "Want to manage server access", zh: "想管理服务器访问" } },
      { id: "db_access", label: { ko: "DB 접근을 통제하고 싶다", en: "Want to control database access", zh: "想管控数据库访问" } },
      { id: "remote_work", label: { ko: "재택근무 보안이 필요하다", en: "Need remote-work security", zh: "需要居家办公安全" } },
      { id: "net_separation", label: { ko: "내부망/외부망 분리가 필요하다", en: "Need internal/external network separation", zh: "需要内外网隔离" } },
    ],
  },
];