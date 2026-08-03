// 토폴로지 트리 각 노드(장비)의 상세 정보 데이터
// Home 컴포넌트에서 노드를 클릭했을 때 우측 상세 패널에 표시되는 내용입니다.
export const nodeDatabase = {
  internet: {
    title: "Internet",
    subtitle: "세계로 뻗어가는 관문이자 보안의 출발점",
    badge: "GLOBAL NETWORK",
    icon: "fa-globe",
    features: [
      "외부 퍼블릭 클라우드 인프라 안정적 통합",
      "대역폭 확보 및 패킷 라우팅 최적성 유지",
      "글로벌 인터넷 백본망 연결 및 트래픽 연동"
    ],
    effects: [
      
    ],
    paths: ["path-net-fw"],
    graphicLeftIcon: "fa-cloud",
    graphicLeftText: "퍼블릭 망",
    graphicRightIcon: "fa-shield-halved",
    graphicRightText: "보안 게이트웨이",
  },
  firewall: {
    title: "Firewall (방화벽)",
    subtitle: "진화하는 사이버 위협에 대응하는 차세대 방화벽",
    badge: "MOOSOL SERVICE",
    icon: "fa-shield-halved",
    features: [
      "외부 위협 및 비정상 트래픽 실시간 차단",
      "IPS 엔진 기반 정교한 침입 탐지",
      "L4-L7 세션 상태 기반 정밀 패킷 필터링"
    ],
    effects: [
      "애플리케이션/사용자 단위 정책 제어",
      "최신 사이버 공격 및 미인가 트래픽 선제 대응",
      "경계 보안 관제 일원화 및 운영 효율성 극대화"
    ],
    paths: ["path-net-fw"],
    graphicLeftIcon: "fa-skull-crossbones",
    graphicLeftText: "악성 공격",
    graphicRightIcon: "fa-circle-check",
    graphicRightText: "안전한 내부망",
  },
  ips: {
    title: "IPS (침입 방지 시스템)",
    subtitle: "네트워크 심층 패킷 정밀 분석 및 방어",
    badge: "MOOSOL SERVICE",
    icon: "fa-shield-virus",
    features: [
      "제로데이 공격 및 타깃형 Exploit 실시간 차단",
      "최신 글로벌 위협 위크 패턴 실시간 업데이트",
      "인라인(In-line) 배치 기반 심층 패킷 검사(DPI)"
    ],
    effects: [
      
    ],
    paths: ["path-net-fw", "path-fw-ips"],
    graphicLeftIcon: "fa-bug-slash",
    graphicLeftText: "취약점 위협",
    graphicRightIcon: "fa-shield-heart",
    graphicRightText: "안전 구역",
  },
  vpn: {
    title: "VPN (가상 사설망)",
    subtitle: "터널링 기술 기반의 초안전 원격 패킷 전송망",
    badge: "MOOSOL SERVICE",
    icon: "fa-key",
    features: [
      "AES-256 비트 강력한 데이터 암호화 설계",
      "다중 인증 요소(MFA)를 적용한 기기/사용자 검증",
      "Split Tunneling을 통한 효율적 데이터 전송"
    ],
    effects: [
      "원격/재택 근무 환경에서의 안전한 내부망 접속",
      "사용자별 접근 권한에 기반한 세분화된 세션 통제"
    ],
    paths: ["path-net-fw", "path-fw-vpn"],
    graphicLeftIcon: "fa-house-laptop",
    graphicLeftText: "원격 업무단",
    graphicRightIcon: "fa-shield",
    graphicRightText: "암호화 가교",
  },
  network: {
    title: "Network (스위치 · 망분리)",
    subtitle: "고속 스위칭과 물리적 망분리로 안전하게 재구성된 내부망",
    badge: "MOOSOL SERVICE",
    icon: "fa-network-wired",
    features: [
      "L2/L3 스위칭을 통한 지연 없는 초고속 내부 통신",
      "VLAN 및 물리적 망분리로 업무망/보안망 완전 분리",
      "분리된 망 간 통신은 통제된 경로로만 허용",
    ],
    effects: [
      "업무망과 보안망 간 악성코드 전파 위험 원천 차단",
      "망분리 법적/제도적 컴플라이언스 기준 완벽 준수"
    ],
    paths: ["path-net-fw", "path-fw-network"],
    graphicLeftIcon: "fa-arrows-split-up-and-left",
    graphicLeftText: "유입 트래픽",
    graphicRightIcon: "fa-diagram-project",
    graphicRightText: "분리된 내부망",
  },
  server: {
    title: "Secure Server Zone",
    subtitle: "데이터 자산 및 업무 애플리케이션 보안 보관소",
    badge: "MOOSOL SERVICE",
    icon: "fa-database",
    features: [
      "주요 데이터베이스 암호화 및 완전 격리 가동",
      "망분리 세그먼트에 근거한 비인가 통신 엄격 제어",
      "NAC·DAC·DRM·DLP·EDR 보안 솔루션의 통합 허브",
    ],
    effects: [
      
    ],
    paths: ["path-net-fw", "path-fw-network", "path-network-server"],
    graphicLeftIcon: "fa-server",
    graphicLeftText: "메인 인프라",
    graphicRightIcon: "fa-vault",
    graphicRightText: "보안 아카이브",
  },
  nac: {
    title: "NAC (네트워크 접근제어)",
    subtitle: "인가된 사용자와 단말만 연결",
    badge: "MOOSOL SERVICE",
    icon: "fa-user-shield",
    features: [
      "사용자/단말 기반 네트워크 접근 제어",
      "접속 전후 보안 상태(백신·패치 등) 실시간 점검",
      "IP/MAC 기반 비인가 단말 접속 자동 격리 및 탐지"
    ],
    effects: [
      "비인가 단말 접속 원천 차단",
      "내부 보안 정책 준수 및 관리 자동화",
      "네트워크 내 접속 기기 현황에 대한 100% 가시성 확보"
    ],
    paths: ["path-net-fw", "path-fw-network", "path-network-server", "path-server-nac"],
    graphicLeftIcon: "fa-laptop-code",
    graphicLeftText: "비인가 단말기",
    graphicRightIcon: "fa-user-lock",
    graphicRightText: "안전 격리통제",
  },
  dac: {
    title: "DAC (데이터베이스 접근 통제)",
    subtitle: "중요 데이터 접근을 통제하고 안전하게 보호하는 DB보안",
    badge: "MOOSOL SERVICE",
    icon: "fa-table-list",
    features: [
      "DB 접근 권한 및 SQL 실행 통제",
      "민감 데이터 마스킹 처리 및 실시간 통제/경고",
      "접속 계정 및 조회쿼리 이력의 100% 로깅/감사"
    ],
    effects: [
      "핵심 DB에 대한 비인가 접근 및 무단 수정 사전 차단",
      "SQL 감사 이력 확보를 통한 금융/공공 컴플라이언스 완벽 대응",
      "개인정보 유출 방지 및 내부자에 의한 남용 예방"
    ],
    paths: ["path-net-fw", "path-fw-network", "path-network-server", "path-server-dac"],
    graphicLeftIcon: "fa-user-secret",
    graphicLeftText: "비인가 접근 시도",
    graphicRightIcon: "fa-database",
    graphicRightText: "통제된 DB",
  },
  drm: {
    title: "DRM (문서 암호화)",
    subtitle: "문서 생성부터 폐기까지 보호하는 문서보안",
    badge: "MOOSOL SERVICE",
    icon: "fa-lock",
    features: [
      "중요 문서 자동 암호화 및 권한 기반 접근 제어",
      "문서 사용 이력(열람·편집·인쇄) 실시간 추적 관리",
      "외부 반출 시 별도 승인 절차 및 만료일 설정 기능"
      ,
    ],
    effects: [
      "문서 외부 유출 시에도 열람 불가능",
      "캡처·출력·복사 방지(DLP 연동)를 통한 내부자 유출 최소화",
      "문서 단위 보안 권한 적용으로 협업 환경 보안 유지"
    ],
    paths: ["path-net-fw", "path-fw-network", "path-network-server", "path-server-drm"],
    graphicLeftIcon: "fa-file-shield",
    graphicLeftText: "암호화 처리",
    graphicRightIcon: "fa-file-circle-check",
    graphicRightText: "권한 획득 단말",
  },
  dlp: {
    title: "DLP (데이터 유출 방지)",
    subtitle: "중요 정보의 유출을 사전에 차단",
    badge: "MOOSOL SERVICE",
    icon: "fa-file-shield",
    features: [
      "중요 데이터 유출 경로 실시간 통제",
      "USB·외장하드·메일·메신저 등 매체별 정책 적용",
      "개인정보 및 기밀 키워드 자동 탐지 및 차단"
    ],
    effects: [
      "기업 기밀 정보 및 개인정보의 불법 유출 사전 예방",
      "인가되지 않은 외부 저장 매체 사용의 원천 통제",
      "유출 시도 행위 추적을 통한 사후 감사 및 정황 증거 확보"
    ],
    paths: ["path-net-fw", "path-fw-network", "path-network-server", "path-server-dlp"],
    graphicLeftIcon: "fa-usb",
    graphicLeftText: "유출 시도",
    graphicRightIcon: "fa-shield-halved",
    graphicRightText: "기밀 안전구역",
  },
  edr: {
    title: "EDR (엔드포인트 실시간 탐지)",
    subtitle: "엔드포인트 위협을 실시간 탐지하고 신속하게 대응",
    badge: "MOOSOL SERVICE",
    icon: "fa-laptop-medical",
    features: [
      "엔드포인트 위협 실시간 탐지 및 대응",
      "랜섬웨어·악성코드 행위 기반 분석",
      "단말 타임라인 분석을 통한 공격 유입 경로 추적"
    ],
    effects: [
      "미지 변종 랜섬웨어 및 신종 위협 조기 발견 및 차단",
      "보안 사고 발생 시 해당 단말의 즉각적인 격리 조치",
      "침해 사고 원인 분석 및 대응 시간(MTTR) 단축"
    ],
    paths: ["path-net-fw", "path-fw-network", "path-network-server", "path-server-edr"],
    graphicLeftIcon: "fa-file-medical",
    graphicLeftText: "미지 변종 위협",
    graphicRightIcon: "fa-laptop-shield",
    graphicRightText: "엔드포인트 보호",
  },
  ecm: {
    title: "ECM (문서중앙화)",
    subtitle: "기업 문서를 중앙에서 안전하고 효율적으로 관리",
    badge: "MOOSOL SERVICE",
    icon: "fa-sitemap",
    features: [
      "기업 문서 중앙 저장 및 통합 관리",
      "로컬 저장 차단으로 문서 자산 보호",
      "문서 버전 관리 및 이전 상태 복구 지원"
    ],
    effects: [
      "랜섬웨어 및 데이터 손실 예방",
      "부서 및 프로젝트 간 효율적인 문서 공유 및 협업 생산성 증대",
      "기업 내 모든 지적 자산의 체계적 보존 및 중앙 통합 보안 적용"
    ],
    paths: ["path-net-fw", "path-fw-network", "path-network-server", "path-server-ecm"],
    graphicLeftIcon: "fa-file-medical",
    graphicLeftText: "미지 변종 위협",
    graphicRightIcon: "fa-laptop-shield",
    graphicRightText: "엔드포인트 보호",
  },
  client: {
    title: "Secure User PC",
    subtitle: "업무 인력이 상주하는 최종 실사용 업무 단말",
    badge: "USER SYSTEM",
    icon: "fa-desktop",
    features: [
      "가상 웹 격리 기법을 이용한 악성 유포지 차단",
      "NAC, DLP, DRM, EDR 에이전트 강제 동기화 적용",
      "취약점 패치 및 OS 보안 설정 자동화 관리"
    ],
    effects: [
      
    ],
    paths: ["path-net-fw", "path-fw-network", "path-network-server", "path-server-client"],
    graphicLeftIcon: "fa-shield-halved",
    graphicLeftText: "로컬 에이전트",
    graphicRightIcon: "fa-circle-user",
    graphicRightText: "보안 적합 장비",
  },
};

// 노드 미선택 시(초기 상태) 기본으로 활성화되는 노드/경로
export const defaultActiveNodes = ["internet", "firewall", "network", "server"];
export const defaultActivePaths = ["path-net-fw", "path-fw-network", "path-network-server"];