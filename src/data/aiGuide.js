export const GUIDE_DATA = {
  // 1. 규모/환경별 가이드 데이터
  scale: [
    {
      type: "스타터/소규모 (비용 효율)",
      model: "클라우드 API 기반 RAG (Open AI, Claude 연동)",
      desc: [
        "초기 구축비 부담 최소화",
        "사내 보안 문서를 제외한 일반 업무 자동화 및 빠른 검색"
      ],
      modelBadgeColor: "#e6f4ea", // 연초록
      modelTextColor: "#137333",
    },
    {
      type: "중소·중견기업 (데이터 보안)",
      model: "보안 클라우드 / 경량 sLLM(Llama3, DeepSeek)",
      desc: [
        "격리된 전용 클라우드 환경으로 데이터 유출 방지",
        "사내 규정/매뉴얼 검색 및 ERP/CRM 연동 지원"
      ],
      modelBadgeColor: "#e8f0fe", // 연파랑
      modelTextColor: "#1a73e8",
    },
    {
      type: "대기업·공공기관 (고성능)",
      model: "온프레미스 전용 LLM",
      desc: [
        "사내 서버 직접 구축으로 완벽한 보안 유지",
        "복잡한 자율 실행 AI Agent 및 하이엔드 권한 제어"
      ],
      modelBadgeColor: "#fef7e0", // 연노랑
      modelTextColor: "#b06000",
    },
  ],

  // 2. 도입 목적별 가이드 데이터
  usage: [
    {
        type: "사내 지식/문서 검색",
        model: "오픈소스 sLLM + RAG",
        desc: "환각 없는 정밀한 사내 정보 탐색 및 출처 제공",
        modelBadgeColor: "#e6f4ea",
        modelTextColor: "#137333",
    },
    {
        type: "업무 프로세스 자동화",
        model: "AI Agent + ERP/CRM연동",
        desc: "기문서 분석, 보고서 작성, DB 자동 입력 자율 실행",
        modelBadgeColor: "#e6f4ea",
        modelTextColor: "#137333",
    },
    {
        type: "고객 대응 / CS 챗봇",
        model: "보안 클라우드 API 모델",
        desc: "24시간 실시간 맞춤형 상담 및 빠른 응답 속도",
        modelBadgeColor: "#e6f4ea",
        modelTextColor: "#137333",
    },
 ],
};