export const STORAGE_PRODUCTS = [
  // Synology (name/specs는 모델명·규격이라 번역 없이 공통, price만 다국어)
  {
    id: "syn-ds224plus",
    tag: "SYN",
    name: "Synology DS224+",
    specs: "Intel Celeron J4125 · 2Bay · 2GB DDR4",
    price: { ko: "590,000원~", en: "From ₩590,000" },
    image: "/images/server/syn-1.png",
  },
  {
    id: "syn-ds923plus",
    tag: "SYN",
    name: "Synology DS923+",
    specs: "AMD Ryzen R1600 · 4Bay · 4GB ECC",
    price: { ko: "1,190,000원~", en: "From ₩1,190,000" },
    image: "/images/server/syn-2.png",
  },
  {
    id: "syn-ds1821plus",
    tag: "SYN",
    name: "Synology DS1821+",
    specs: "AMD Ryzen V1500B · 8Bay · 4GB ECC",
    price: { ko: "1,650,000원~", en: "From ₩1,650,000" },
    image: "/images/server/syn-3.png",
  },
  {
    id: "syn-sa3610",
    tag: "SYN",
    name: "Synology SA3610",
    specs: "Intel Xeon D · 12Bay Enterprise NAS",
    price: { ko: "5,900,000원~", en: "From ₩5,900,000" },
    image: "/images/server/syn-4.png",
  },

  // QNAP
  {
    id: "qnap-ts264",
    tag: "QNAP",
    name: "QNAP TS-264",
    specs: "Intel Celeron N5095 · 2Bay · 4GB DDR4",
    price: { ko: "690,000원~", en: "From ₩690,000" },
    image: "/images/server/q-1.png",
  },
  {
    id: "qnap-ts464",
    tag: "QNAP",
    name: "QNAP TS-464",
    specs: "Intel Celeron N5095 · 4Bay · 4GB DDR4",
    price: { ko: "1,100,000원~", en: "From ₩1,100,000" },
    image: "/images/server/q-2.png",
  },
  {
    id: "qnap-ts873a",
    tag: "QNAP",
    name: "QNAP TS-873A",
    specs: "AMD Ryzen V1500B · 8Bay · ECC Memory",
    price: { ko: "1,950,000원~", en: "From ₩1,950,000" },
    image: "/images/server/q-3.png",
  },
  {
    id: "qnap-tvs h874",
    tag: "QNAP",
    name: "QNAP TVS-h874",
    specs: "Intel Core i5 · 8Bay · QuTS hero(ZFS)",
    price: { ko: "3,600,000원~", en: "From ₩3,600,000" },
    image: "/images/server/q-4.png",
  },

  // HPE (specs에 한글 설명이 섞여있어서 다국어 처리)
  {
    id: "msa 1060/2060",
    tag: "HPE",
    name: "MSA 1060/2060",
    specs: {
      ko: "2U Base (12 Bay LFF / 24 Bay SFF) | 최대 9개 확장 셸프 지원",
      en: "2U Base (12 Bay LFF / 24 Bay SFF) | Supports up to 9 expansion shelves",
    },
    price: { ko: "견적 문의", en: "Contact for Quote" },
    image: "/images/server/h1.png",
  },
  {
    id: "alletra mp",
    tag: "HPE",
    name: "Alletra MP",
    specs: {
      ko: "2U Base (24 Bay NVMe SFF) | 차세대 모듈형 Block/File",
      en: "2U Base (24 Bay NVMe SFF) | Next-gen modular Block/File storage",
    },
    price: { ko: "견적 문의", en: "Contact for Quote" },
    image: "/images/server/h2.png",
  },
  {
    id: "alletra 9000",
    tag: "HPE",
    name: "Alletra 9000",
    specs: "4U Base Chassis (48 Bay NVMe SFF) | High-End Mission Critical",
    price: { ko: "견적 문의", en: "Contact for Quote" },
    image: "/images/server/h3.png",
  },
  {
    id: "storeonce",
    tag: "HPE",
    name: "StoreOnce",
    specs: {
      ko: "2U Base (12 Bay LFF) | 대용량 백업 & 중복제거 전용 스토리지",
      en: "2U Base (12 Bay LFF) | Dedicated large-capacity backup & deduplication storage",
    },
    price: { ko: "견적 문의", en: "Contact for Quote" },
    image: "/images/server/h4.png",
  },
];