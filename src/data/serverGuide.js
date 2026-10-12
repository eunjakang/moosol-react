export const GUIDE_DATA = {
  // 1. 규모별 가이드 데이터
  scale: [
    {
      type: { ko: "소규모 사무실 (10인 이하)", en: "Small Office (10 or fewer)", zh: "小型办公室 (10人以下)" },
      server: "Supermicro SYS-510P / HPE ProLiant MicroServer Gen10 Plus",
      storage: "NAS (2-Bay)",
      desc: {
        ko: "비용 효율적, 저소음, 파일 공유 및 기초 인프라용",
        en: "Cost-effective and quiet, for file sharing and basic infrastructure",
        zh: "成本高效、低噪音，用于文件共享及基础设施",
      },
      serverBadgeColor: "#e6f4ea",
      serverTextColor: "#137333",
      storageBadgeColor: "#f1f3f4",
      storageTextColor: "#3c4043",
    },
    {
      type: { ko: "중소기업 (10~50인)", en: "Small-Medium Business (10–50)", zh: "中小企业 (10~50人)" },
      server: "HPE ProLiant DL360 Gen10",
      storage: "NAS / DAS",
      desc: {
        ko: "안정적인 업무 시스템, 그룹웨어 및 DB 운용",
        en: "Stable business systems, groupware, and database operation",
        zh: "稳定的业务系统、协同办公及数据库运营",
      },
      serverBadgeColor: "#e8f0fe",
      serverTextColor: "#1a73e8",
      storageBadgeColor: "#e6f4ea",
      storageTextColor: "#137333",
    },
    {
      type: { ko: "중견·대기업 (50인 이상)", en: "Mid-to-Large Enterprise (50+)", zh: "中大型企业 (50人以上)" },
      server: "HPE ProLiant DL380 Gen10 / Supermicro SYS-1029U",
      storage: "SAN / High-End NAS",
      desc: {
        ko: "고성능 이중화, 대규모 가상화 및 통합 DB 구축",
        en: "High-performance redundancy, large-scale virtualization, and integrated database deployment",
        zh: "高性能冗余、大规模虚拟化及整合数据库建设",
      },
      serverBadgeColor: "#fef7e0",
      serverTextColor: "#b06000",
      storageBadgeColor: "#e8f0fe",
      storageTextColor: "#1a73e8",
    },
  ],

  // 2. 솔루션별 가이드 데이터
  usage: [
    {
      type: { ko: "Ti Controller", en: "Ti Controller", zh: "Ti Controller" },
      server: "HPE DL320 Gen11",
      desc: {
        ko: "중소규모 보안 스위치 통합 관리 및 비용 효율적 운용",
        en: "Integrated management of small-to-medium security switches with cost-efficient operation",
        zh: "统一管理中小规模安全交换机，成本高效运营",
      },
      storage: "SAN / High-End NAS",
      serverBadgeColor: "#e6f4ea",
      serverTextColor: "#137333",
    },
    {
      type: { ko: "문서중앙화", en: "Document Centralization", zh: "文档集中化" },
      server: "HPE DL320 Gen11",
      desc: {
        ko: "기업 지식 자산의 중앙 집중화 및 데이터 입출력 최적화",
        en: "Centralizes enterprise knowledge assets and optimizes data I/O",
        zh: "集中管理企业知识资产，优化数据读写",
      },
      serverBadgeColor: "#e6f4ea",
      serverTextColor: "#137333",
    },
    {
      type: { ko: "DRM(문서보안)", en: "DRM (Document Security)", zh: "DRM(文档安全)" },
      server: "HPE DL360 Gen11",
      desc: {
        ko: "고성능 연산 기반 암복호화 처리 및 안정적 이중화 환경",
        en: "High-performance encryption/decryption processing with a stable redundant environment",
        zh: "基于高性能运算的加解密处理及稳定的冗余环境",
      },
      serverBadgeColor: "#e6f4ea",
      serverTextColor: "#137333",
    },
    {
      type: { ko: "DAC", en: "DAC", zh: "DAC" },
      server: "HPE DL320 Gen11",
      desc: {
        ko: "DB 접근제어 및 로그 수집을 위한 저전력 전용 어플라이언스",
        en: "A low-power dedicated appliance for database access control and log collection",
        zh: "用于数据库访问控制及日志收集的低功耗专用设备",
      },
      serverBadgeColor: "#e6f4ea",
      serverTextColor: "#137333",
    },
    {
      type: { ko: "SAC", en: "SAC", zh: "SAC" },
      server: { ko: "추후 반영", en: "Coming soon", zh: "后续补充" },
      desc: {
        ko: "시스템 접근제어 및 통합 계정 관리 전용 인프라 구성 예정",
        en: "Dedicated infrastructure for system access control and integrated account management, coming soon",
        zh: "计划构建系统访问控制及统一账号管理专用基础设施",
      },
      serverBadgeColor: "#fef7e0",
      serverTextColor: "#b06000",
    },
  ],
};