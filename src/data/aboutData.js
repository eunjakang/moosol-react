// 회사소개(AboutUs) 페이지에 들어가는 실제 데이터
// 업로드된 회사소개.html 번들에서 추출한 원본 콘텐츠 그대로입니다.

export const companyInfo = [
  { k: "회사명", v: "㈜무솔 (MOOSOL)" },
  { k: "설립 연월", v: "2023년 01월" },
  { k: "대표이사", v: "김무형" },
  { k: "주요 사업", v: "AI, 보안솔루션 개발·서비스, IT 컨설팅, 구축" },
  { k: "보유 솔루션", v: "AI 기반 KMS 검색 엔진 솔루션" },
  { k: "홈페이지", v: "https://www.moosol.co.kr" },
  { k: "본사", v: "충청남도 아산시 탕정면 이순신대로 442, 305" },
  { k: "연구소", v: "안양시 만안구 덕천로152번길 25, B1706" },
];

export const history = [
  {
    year: "2023",
    tag: "설립",
    items: [
      "㈜무솔 설립",
      "한국펀드평가 보안시스템 구축 · ㈜래피젠 정보유출방지·문서중앙화 구축",
    ],
  },
  {
    year: "2024",
    tag: "인증 · 기반 구축",
    items: [
      "창업 인증 기업 · 여성기업 인증 · 기업부설 연구소 설립",
      "KS Q ISO 9001 · 14001 · 45001 인증 획득",
      "충남벤처협회 정회원 및 임원사 · 직무발명보상 우수기업 선정 · 천안시장상 수상",
      "한국펀드평가 보안시스템 구축 · ㈜래피젠 정보유출방지·문서중앙화·EDMS 구축",
      "㈜태진정공 방화벽·서버 시스템 구축 · ㈜유아이헬리콥터 DLP 시스템 구축",
    ],
  },
  {
    year: "2025",
    tag: "파트너십 확대",
    items: [
      "에스원 정보보안 프리미엄 파트너 계약 체결",
      "소프트캠프 'Document Security DRM' 기술 총판 · ㈜클로바인 PLM '클로바인' 총판 계약",
      "파이오링크 'TiFront 보안 Switch' 플래티넘 파트너 · 시큐아이 'NGF' 실버 파트너 계약",
      "지니언스 'Genians' 프리미엄 파트너(PP) 계약 체결",
      "㈜엘엔·㈜큐니온 DRM 시스템 구축 · 나노메드의원 IT 인프라 구축",
      "㈜유아이헬리콥터 물리적 망분리·망연계 구축 · ㈜엠씨넥스 국내-베트남 F/W 이중화·NAC 구축",
    ],
  },
  {
    year: "2026",
    tag: "진행 중",
    items: ["㈜태진정공 IT통합유지보수 계약",
       "㈜유아이헬리콥터 DRM 시스템 구축 · ㈜풍강 DLP 시스템 구축",
       "㈜엠씨넥스 인프라 사업 진행",
       "금강엔지니어링㈜ · 제닉스로보틱스㈜ 문서중앙화 시스템 구축 및 유지보수 계약 체결",
       "충남테크노파크 개발지원 사업 선정(문서중앙화)"
    ],
  },
];

export const certifications = [
  // { t: "ISO 9001:2015", d: "품질경영시스템 인증" },
  // { t: "ISO 14001:2015", d: "환경경영시스템 인증" },
  // { t: "ISO 45001:2018", d: "안전보건경영시스템 인증" },
  { t: "기업부설 연구소", d: "자체 연구개발 조직 보유" },
  { t: "창업·여성기업 인증", d: "창업 인증 기업 · 여성기업 인증" },
  { t: "직무발명보상 우수기업", d: "충남벤처협회 정회원·임원사 · 천안시장상 수상" },
];

export const partners = [
  { name: "에스원", role: "정보보안 솔루션", tier: "프리미엄 파트너", img: "/images/partners/s1.png" },
  { name: "skt", role: "", tier: "프리미엄 파트너", img: "/images/partners/skt.png" },
  { name: "파이오링크", role: "TiFront 보안 스위치", tier: "플래티넘 파트너", img: "/images/partners/pio.png" },
  { name: "시큐아이", role: "NGF 차세대 방화벽", tier: "실버 파트너", img: "/images/partners/secui.png" },
  // { name: "지니언스", role: "Genians NAC", tier: "프리미엄 파트너(PP)", img: "/images/partners/nac.png" },
  { name: "소프트캠프", role: "Document Security DRM", tier: "기술 총판", img: "/images/partners/softcamp.png" },
  { name: "지란지교시큐리티", role: "DocuONE 문서중앙화", tier: "파트너", img: "/images/partners/jiran.png" },
  { name: "웨어밸리", role: "Chakra Max DB 접근제어", tier: "파트너", img: "/images/partners/ware.png" },
  { name: "SQI소프트", role: "망연계 솔루션", tier: "파트너", img: "/images/partners/sqi.png" },
  { name: "사이버다임", role: "문서중앙화", tier: "파트너", img: "/images/partners/s.png" },
  { name: "충남", role: "총판", tier: "파트너", img: "/images/partners/cva.png" },
  { name: "대신", role: "", tier: "파트너", img: "/images/partners/dasin.png" },
  { name: "빔", role: "", tier: "파트너", img: "/images/partners/veeam.png" },
];

export const clients = [
  { name: "㈜래피젠", img: "/images/clients/rapigen.png" },
  // { name: "래피젠 헬스케어", img: "/images/clients/b.png" },
  { name: "㈜태진정공", img: "/images/clients/tajin.png" },
  { name: "㈜유아이헬리콥터", img: "/images/clients/ui.png" },
  { name: "㈜엠씨넥스", img: "/images/clients/mcnex.png" },
  { name: "㈜엘엔", img: "/images/clients/ln.png" },
  { name: "㈜큐니온", img: "/images/clients/qnion.png" },
  { name: "금강엔지니어링", img: "/images/clients/ke.png" },
  { name: "제닉스로보틱스", img: "/images/clients/zenix.png" },
  { name: "반디컨설턴트", img: "/images/clients/bandi.png" },
  { name: "lake", img: "/images/clients/lake.png" },
  { name: "엠엘텍", img: "/images/clients/ml.png" },
  { name: "pre", img: "/images/clients/pre.png" },
  { name: "suhwoo", img: "/images/clients/suhwoo.png" },
];