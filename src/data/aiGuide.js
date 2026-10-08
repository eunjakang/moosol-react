// AI(LLM·RAG) 페이지 선택 가이드 데이터 - { ko, en } 다국어 구조
export const GUIDE_DATA = {
  // 1. 규모/보안 환경별 가이드 데이터
  scale: [
    {
      type: { ko: "스타터/소규모 (비용 효율)", en: "Starter / Small Business (Cost-Efficient)" },
      model: {
        ko: "클라우드 API 기반 RAG (Open AI, Claude 연동)",
        en: "Cloud API-based RAG (OpenAI, Claude integration)",
      },
      desc: {
        ko: [
          "초기 구축비 부담 최소화",
          "사내 보안 문서를 제외한 일반 업무 자동화 및 빠른 검색",
        ],
        en: [
          "Minimizes upfront implementation costs",
          "Automates general tasks and enables fast search, excluding confidential internal documents",
        ],
      },
      modelBadgeColor: "#e6f4ea",
      modelTextColor: "#137333",
    },
    {
      type: { ko: "중소·중견기업 (데이터 보안)", en: "SME / Mid-sized Company (Data Security)" },
      model: {
        ko: "보안 클라우드 / 경량 sLLM(Llama3, DeepSeek)",
        en: "Secure Cloud / Lightweight sLLM (Llama3, DeepSeek)",
      },
      desc: {
        ko: [
          "격리된 전용 클라우드 환경으로 데이터 유출 방지",
          "사내 규정/매뉴얼 검색 및 ERP/CRM 연동 지원",
        ],
        en: [
          "Prevents data leaks with an isolated, dedicated cloud environment",
          "Supports internal policy/manual search and ERP/CRM integration",
        ],
      },
      modelBadgeColor: "#e8f0fe",
      modelTextColor: "#1a73e8",
    },
    {
      type: { ko: "대기업·공공기관 (고성능)", en: "Large Enterprise / Public Sector (High Performance)" },
      model: { ko: "온프레미스 전용 LLM", en: "On-Premise Dedicated LLM" },
      desc: {
        ko: [
          "사내 서버 직접 구축으로 완벽한 보안 유지",
          "복잡한 자율 실행 AI Agent 및 하이엔드 권한 제어",
        ],
        en: [
          "Maintains complete security by building directly on in-house servers",
          "Supports complex autonomous AI agents and high-end permission control",
        ],
      },
      modelBadgeColor: "#fef7e0",
      modelTextColor: "#b06000",
    },
  ],

  // 2. 도입 목적별 가이드 데이터
  usage: [
    {
      type: { ko: "사내 지식/문서 검색", en: "Internal Knowledge & Document Search" },
      model: { ko: "오픈소스 sLLM + RAG", en: "Open-Source sLLM + RAG" },
      desc: {
        ko: "환각 없는 정밀한 사내 정보 탐색 및 출처 제공",
        en: "Hallucination-free, precise internal information search with clear sourcing",
      },
      modelBadgeColor: "#e6f4ea",
      modelTextColor: "#137333",
    },
    {
      type: { ko: "업무 프로세스 자동화", en: "Business Process Automation" },
      model: { ko: "AI Agent + ERP/CRM연동", en: "AI Agent + ERP/CRM Integration" },
      desc: {
        ko: "기존 문서 분석, 보고서 작성, DB 자동 입력 자율 실행",
        en: "Autonomously handles document analysis, report drafting, and automatic DB entry",
      },
      modelBadgeColor: "#e6f4ea",
      modelTextColor: "#137333",
    },
    {
      type: { ko: "고객 대응 / CS 챗봇", en: "Customer Support / CS Chatbot" },
      model: { ko: "보안 클라우드 API 모델", en: "Secure Cloud API Model" },
      desc: {
        ko: "24시간 실시간 맞춤형 상담 및 빠른 응답 속도",
        en: "24/7 real-time personalized support with fast response times",
      },
      modelBadgeColor: "#e6f4ea",
      modelTextColor: "#137333",
    },
  ],
};