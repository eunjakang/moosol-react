// 맞춤 서버 찾기 - 스텝별 선택지 데이터

export const FINDER_STEPS = [
  {
    key: "cpu",
    label: "CPU 코어 수",
    title: "CPU 코어 수를 선택해 주세요.",
    desc: "코어 수가 많을수록 여러 작업을 빠르게 처리할 수 있어요.",
    options: [
      {
        id: "8core",
        label: "8코어",
        desc: "엔트리급 사양으로 테스트용이나 가벼운 웹 서비스 운영에 적합해요",
        priceMin: 2700000,
        priceMax: 16400000,
      },
      {
        id: "12core",
        label: "12코어",
        desc: "메인스트림급 성능으로 일반적인 서버 운영 환경에 적합해요",
        priceMin: 3700000,
        priceMax: 28200000,
      },
      {
        id: "16core",
        label: "16코어 이상",
        desc: "하이엔드급 구성으로 고성능이 요구되는 다중 서비스 운영 환경에 적합해요",
        priceMin: 5000000,
        priceMax: 21800000,
      },
    ],
  },
  {
    key: "memory",
    label: "메모리 용량",
    title: "메모리 용량을 선택해 주세요.",
    desc: "동시에 처리할 작업이 많다면 넉넉한 메모리를 추천해요.",
    options: [
      {
        id: "32gb",
        label: "32GB",
        desc: "소규모 웹서비스, 개발·테스트 환경에 적합해요",
        priceMin: 2700000,
        priceMax: 15000000,
      },
      {
        id: "64gb",
        label: "64GB",
        desc: "일반적인 업무용 서버, 중소 규모 DB 운영에 적합해요",
        priceMin: 3200000,
        priceMax: 20000000,
      },
      {
        id: "128gb",
        label: "128GB 이상",
        desc: "대용량 DB, 가상화, 다중 서비스 운영에 적합해요",
        priceMin: 5500000,
        priceMax: 30000000,
      },
    ],
  },
  {
    key: "disk",
    label: "디스크 용량",
    title: "추가 디스크(SSD/HDD) 용량을 선택해 주세요.",
    desc: "저장할 데이터 양에 맞춰 디스크 용량을 정해보세요.",
    options: [
      {
        id: "1tb",
        label: "500GB ~ 1TB",
        desc: "일반적인 웹서비스, OS·애플리케이션 운영에 적합해요",
        priceMin: 2700000,
        priceMax: 15000000,
      },
      {
        id: "4tb",
        label: "2TB ~ 4TB",
        desc: "미디어, 로그, 중간 규모 데이터 저장에 적합해요",
        priceMin: 3500000,
        priceMax: 22000000,
      },
      {
        id: "8tb",
        label: "8TB 이상",
        desc: "대용량 백업, 아카이빙, 빅데이터 운영에 적합해요",
        priceMin: 6000000,
        priceMax: 32000000,
      },
    ],
  },
  {
    key: "os",
    label: "운영체제(OS)",
    title: "운영체제(OS)를 선택해 주세요.",
    desc: "운영 환경에 맞는 OS를 선택해 주세요.",
    options: [
      {
        id: "ubuntu",
        label: "Ubuntu Server",
        desc: "무료 오픈소스 OS, 클라우드·컨테이너 환경에 널리 사용돼요",
        priceMin: 2700000,
        priceMax: 28200000,
      },
      {
        id: "rocky",
        label: "Rocky Linux / CentOS",
        desc: "안정적인 엔터프라이즈 리눅스 배포판이에요",
        priceMin: 2700000,
        priceMax: 28200000,
      },
      {
        id: "windows",
        label: "Windows Server",
        desc: "윈도우 기반 애플리케이션, AD 환경에 적합해요",
        priceMin: 3500000,
        priceMax: 30000000,
      },
    ],
  },
];