// AI(LLM·RAG) 페이지 선택 가이드 데이터 - { ko, en, zh }
export const GUIDE_DATA = {
  scale: [
    {
      type: {
        ko: "스타터/소규모 (비용 효율)",
        en: "Starter / Small Business (Cost-Efficient)",
        zh: "入门/小型企业 (成本高效)",
      },
      model: {
        ko: "클라우드 API 기반 RAG (Open AI, Claude 연동)",
        en: "Cloud API-based RAG (OpenAI, Claude integration)",
        zh: "基于云API的RAG (对接 OpenAI、Claude)",
      },
      desc: {
        ko: ["초기 구축비 부담 최소화", "사내 보안 문서를 제외한 일반 업무 자동화 및 빠른 검색"],
        en: [
          "Minimizes upfront implementation costs",
          "Automates general tasks and enables fast search, excluding confidential internal documents",
        ],
        zh: ["将初期建设成本压到最低", "自动化除内部机密文档外的一般业务，并支持快速检索"],
      },
      modelBadgeColor: "#e6f4ea",
      modelTextColor: "#137333",
    },
    {
      type: {
        ko: "중소·중견기업 (데이터 보안)",
        en: "SME / Mid-sized Company (Data Security)",
        zh: "中小·中型企业 (数据安全)",
      },
      model: {
        ko: "보안 클라우드 / 경량 sLLM(Llama3, DeepSeek)",
        en: "Secure Cloud / Lightweight sLLM (Llama3, DeepSeek)",
        zh: "安全云 / 轻量sLLM (Llama3、DeepSeek)",
      },
      desc: {
        ko: ["격리된 전용 클라우드 환경으로 데이터 유출 방지", "사내 규정/매뉴얼 검색 및 ERP/CRM 연동 지원"],
        en: [
          "Prevents data leaks with an isolated, dedicated cloud environment",
          "Supports internal policy/manual search and ERP/CRM integration",
        ],
        zh: ["通过隔离的专属云环境防止数据泄露", "支持内部制度/手册检索及ERP/CRM对接"],
      },
      modelBadgeColor: "#e8f0fe",
      modelTextColor: "#1a73e8",
    },
    {
      type: {
        ko: "대기업·공공기관 (고성능)",
        en: "Large Enterprise / Public Sector (High Performance)",
        zh: "大型企业·公共机构 (高性能)",
      },
      model: { ko: "온프레미스 전용 LLM", en: "On-Premise Dedicated LLM", zh: "本地部署(On-Premise)专属LLM" },
      desc: {
        ko: ["사내 서버 직접 구축으로 완벽한 보안 유지", "복잡한 자율 실행 AI Agent 및 하이엔드 권한 제어"],
        en: [
          "Maintains complete security by building directly on in-house servers",
          "Supports complex autonomous AI agents and high-end permission control",
        ],
        zh: ["直接部署在企业自有服务器，保持完整安全性", "支持复杂的自主执行AI Agent及高端权限控制"],
      },
      modelBadgeColor: "#fef7e0",
      modelTextColor: "#b06000",
    },
  ],

  usage: [
    {
      type: { ko: "사내 지식/문서 검색", en: "Internal Knowledge & Document Search", zh: "企业内部知识/文档检索" },
      model: { ko: "오픈소스 sLLM + RAG", en: "Open-Source sLLM + RAG", zh: "开源sLLM + RAG" },
      desc: {
        ko: "환각 없는 정밀한 사내 정보 탐색 및 출처 제공",
        en: "Hallucination-free, precise internal information search with clear sourcing",
        zh: "无幻觉的精准内部信息检索，并提供出处",
      },
      modelBadgeColor: "#e6f4ea",
      modelTextColor: "#137333",
    },
    {
      type: { ko: "업무 프로세스 자동화", en: "Business Process Automation", zh: "业务流程自动化" },
      model: { ko: "AI Agent + ERP/CRM연동", en: "AI Agent + ERP/CRM Integration", zh: "AI Agent + ERP/CRM对接" },
      desc: {
        ko: "기존 문서 분석, 보고서 작성, DB 자동 입력 자율 실행",
        en: "Autonomously handles document analysis, report drafting, and automatic DB entry",
        zh: "自主执行现有文档分析、报告撰写、数据库自动录入",
      },
      modelBadgeColor: "#e6f4ea",
      modelTextColor: "#137333",
    },
    {
      type: { ko: "고객 대응 / CS 챗봇", en: "Customer Support / CS Chatbot", zh: "客户应对 / 客服聊天机器人" },
      model: { ko: "보안 클라우드 API 모델", en: "Secure Cloud API Model", zh: "安全云API模型" },
      desc: {
        ko: "24시간 실시간 맞춤형 상담 및 빠른 응답 속도",
        en: "24/7 real-time personalized support with fast response times",
        zh: "24小时实时定制化咨询，响应迅速",
      },
      modelBadgeColor: "#e6f4ea",
      modelTextColor: "#137333",
    },
  ],
};