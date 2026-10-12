// 맞춤 서버 찾기 - 스텝별 선택지 데이터 (ko / en / zh)

export const FINDER_STEPS = [
  {
    key: "cpu",
    label: { ko: "CPU 코어 수", en: "CPU Core Count", zh: "CPU核心数" },
    title: { ko: "CPU 코어 수를 선택해 주세요.", en: "Please select the number of CPU cores.", zh: "请选择CPU核心数。" },
    desc: {
      ko: "코어 수가 많을수록 여러 작업을 빠르게 처리할 수 있어요.",
      en: "More cores let you handle multiple tasks faster.",
      zh: "核心数越多，越能快速处理多项任务。",
    },
    options: [
      {
        id: "8core",
        label: { ko: "8코어", en: "8 Cores", zh: "8核" },
        desc: {
          ko: "엔트리급 사양으로 테스트용이나 가벼운 웹 서비스 운영에 적합해요",
          en: "Entry-level spec, ideal for testing or lightweight web services",
          zh: "入门级配置，适合测试或轻量级网站服务运营",
        },
        priceMin: 2700000,
        priceMax: 16400000,
      },
      {
        id: "12core",
        label: { ko: "12코어", en: "12 Cores", zh: "12核" },
        desc: {
          ko: "메인스트림급 성능으로 일반적인 서버 운영 환경에 적합해요",
          en: "Mainstream performance, suited for general server operations",
          zh: "主流级性能，适合一般服务器运营环境",
        },
        priceMin: 3700000,
        priceMax: 28200000,
      },
      {
        id: "16core",
        label: { ko: "16코어 이상", en: "16+ Cores", zh: "16核以上" },
        desc: {
          ko: "하이엔드급 구성으로 고성능이 요구되는 다중 서비스 운영 환경에 적합해요",
          en: "High-end configuration for multi-service environments requiring high performance",
          zh: "高端配置，适合需要高性能的多服务运营环境",
        },
        priceMin: 5000000,
        priceMax: 21800000,
      },
    ],
  },
  {
    key: "memory",
    label: { ko: "메모리 용량", en: "Memory Capacity", zh: "内存容量" },
    title: { ko: "메모리 용량을 선택해 주세요.", en: "Please select the memory capacity.", zh: "请选择内存容量。" },
    desc: {
      ko: "동시에 처리할 작업이 많다면 넉넉한 메모리를 추천해요.",
      en: "If you handle many concurrent tasks, we recommend ample memory.",
      zh: "如果需要同时处理的任务较多，建议配置充足的内存。",
    },
    options: [
      {
        id: "32gb",
        label: { ko: "32GB", en: "32GB", zh: "32GB" },
        desc: {
          ko: "소규모 웹서비스, 개발·테스트 환경에 적합해요",
          en: "Suited for small web services and dev/test environments",
          zh: "适合小型网站服务及开发·测试环境",
        },
        priceMin: 2700000,
        priceMax: 15000000,
      },
      {
        id: "64gb",
        label: { ko: "64GB", en: "64GB", zh: "64GB" },
        desc: {
          ko: "일반적인 업무용 서버, 중소 규모 DB 운영에 적합해요",
          en: "Suited for general business servers and small-to-mid DB operations",
          zh: "适合一般业务服务器及中小规模数据库运营",
        },
        priceMin: 3200000,
        priceMax: 20000000,
      },
      {
        id: "128gb",
        label: { ko: "128GB 이상", en: "128GB+", zh: "128GB以上" },
        desc: {
          ko: "대용량 DB, 가상화, 다중 서비스 운영에 적합해요",
          en: "Suited for large databases, virtualization, and multi-service operations",
          zh: "适合大容量数据库、虚拟化及多服务运营",
        },
        priceMin: 5500000,
        priceMax: 30000000,
      },
    ],
  },
  {
    key: "disk",
    label: { ko: "디스크 용량", en: "Disk Capacity", zh: "磁盘容量" },
    title: {
      ko: "추가 디스크(SSD/HDD) 용량을 선택해 주세요.",
      en: "Please select additional disk (SSD/HDD) capacity.",
      zh: "请选择额外磁盘(SSD/HDD)容量。",
    },
    desc: {
      ko: "저장할 데이터 양에 맞춰 디스크 용량을 정해보세요.",
      en: "Choose disk capacity based on how much data you need to store.",
      zh: "请根据需要存储的数据量选择磁盘容量。",
    },
    options: [
      {
        id: "1tb",
        label: { ko: "500GB ~ 1TB", en: "500GB – 1TB", zh: "500GB ~ 1TB" },
        desc: {
          ko: "일반적인 웹서비스, OS·애플리케이션 운영에 적합해요",
          en: "Suited for general web services and OS/application operation",
          zh: "适合一般网站服务及操作系统·应用程序运行",
        },
        priceMin: 2700000,
        priceMax: 15000000,
      },
      {
        id: "4tb",
        label: { ko: "2TB ~ 4TB", en: "2TB – 4TB", zh: "2TB ~ 4TB" },
        desc: {
          ko: "미디어, 로그, 중간 규모 데이터 저장에 적합해요",
          en: "Suited for media, logs, and medium-scale data storage",
          zh: "适合媒体、日志及中等规模数据存储",
        },
        priceMin: 3500000,
        priceMax: 22000000,
      },
      {
        id: "8tb",
        label: { ko: "8TB 이상", en: "8TB+", zh: "8TB以上" },
        desc: {
          ko: "대용량 백업, 아카이빙, 빅데이터 운영에 적합해요",
          en: "Suited for large-scale backup, archiving, and big data operations",
          zh: "适合大容量备份、归档及大数据运营",
        },
        priceMin: 6000000,
        priceMax: 32000000,
      },
    ],
  },
  {
    key: "os",
    label: { ko: "운영체제(OS)", en: "Operating System (OS)", zh: "操作系统(OS)" },
    title: { ko: "운영체제(OS)를 선택해 주세요.", en: "Please select an operating system.", zh: "请选择操作系统(OS)。" },
    desc: {
      ko: "운영 환경에 맞는 OS를 선택해 주세요.",
      en: "Choose the OS that fits your operating environment.",
      zh: "请选择适合运营环境的操作系统。",
    },
    options: [
      {
        id: "ubuntu",
        label: { ko: "Ubuntu Server", en: "Ubuntu Server", zh: "Ubuntu Server" },
        desc: {
          ko: "무료 오픈소스 OS, 클라우드·컨테이너 환경에 널리 사용돼요",
          en: "Free open-source OS, widely used in cloud and container environments",
          zh: "免费开源操作系统，广泛用于云及容器环境",
        },
        priceMin: 2700000,
        priceMax: 28200000,
      },
      {
        id: "rocky",
        label: { ko: "Rocky Linux / CentOS", en: "Rocky Linux / CentOS", zh: "Rocky Linux / CentOS" },
        desc: {
          ko: "안정적인 엔터프라이즈 리눅스 배포판이에요",
          en: "A stable enterprise Linux distribution",
          zh: "稳定的企业级Linux发行版",
        },
        priceMin: 2700000,
        priceMax: 28200000,
      },
      {
        id: "windows",
        label: { ko: "Windows Server", en: "Windows Server", zh: "Windows Server" },
        desc: {
          ko: "윈도우 기반 애플리케이션, AD 환경에 적합해요",
          en: "Suited for Windows-based applications and AD environments",
          zh: "适合基于Windows的应用程序及AD环境",
        },
        priceMin: 3500000,
        priceMax: 30000000,
      },
    ],
  },
];