export const GUIDE_DATA = {
  // 1. 규모별 가이드 데이터
  scale: [
    {
      type: "소호 / 소규모 사무실 (10인 이하)",
      server: "Dell PowerEdge T150 / R250",
      storage: "NAS (2-Bay)",
      desc: "비용 효율적, 저소음, 파일 공유 및 기초 인프라용",
      serverBadgeColor: "#e6f4ea", // 연초록
      serverTextColor: "#137333",
      storageBadgeColor: "#f1f3f4",
      storageTextColor: "#3c4043",
    },
    {
      type: "중소기업 (10~50인)",
      server: "HPE ProLiant DL360 Gen10",
      storage: "NAS / DAS",
      desc: "안정적인 업무 시스템, 그룹웨어 및 DB 운용",
      serverBadgeColor: "#e8f0fe", // 연파랑
      serverTextColor: "#1a73e8",
      storageBadgeColor: "#e6f4ea",
      storageTextColor: "#137333",
    },
    {
      type: "중견·대기업 (50인 이상)",
      server: "Dell R640 / HPE DL380 Gen10",
      storage: "SAN / High-End NAS",
      desc: "고성능 이중화, 대규모 가상화 및 통합 DB 구축",
      serverBadgeColor: "#fef7e0", // 연노랑
      serverTextColor: "#b06000",
      storageBadgeColor: "#e8f0fe",
      storageTextColor: "#1a73e8",
    },
  ],

  // 2. 솔루션별 가이드 데이터
  usage: [
    {
        type: "Ti Controller",
        server: "HPE DL320 Gen11",
        desc: "중소규모 보안 스위치 통합 관리 및 비용 효율적 운용",
        storage: "SAN / High-End NAS",
        serverBadgeColor: "#e6f4ea",
        serverTextColor: "#137333",
    },
    {
        type: "문서중앙화",
        server: "HPE DL320 Gen11",
        desc: "기업 지식 자산의 중앙 집중화 및 데이터 입출력 최적화",
        serverBadgeColor: "#e6f4ea",
        serverTextColor: "#137333",
    },
    {
        type: "DRM(문서보안)",
        server: "HPE DL360 Gen11",
        desc: "고성능 연산 기반 암복호화 처리 및 안정적 이중화 환경",
        serverBadgeColor: "#e6f4ea",
        serverTextColor: "#137333",
    },
    {
        type: "DAC",
        server: "W-L4/W-L8",
        desc: "DB 접근제어 및 로그 수집을 위한 저전력 전용 어플라이언스",
        serverBadgeColor: "#e8f0fe",
        serverTextColor: "#1a73e8",
    },
    {
        type: "SAC",
        server: "추후 반영",
        desc: "시스템 접근제어 및 통합 계정 관리 전용 인프라 구성 예정",
        serverBadgeColor: "#fef7e0",
        serverTextColor: "#b06000",
    },
 ],
};