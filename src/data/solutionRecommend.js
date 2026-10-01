// 고민(Q5 복수선택 답변, id 기준) → 추천 솔루션 매핑
// 사용자가 선택한 고민 개수만큼 해당 솔루션의 점수가 올라가고,
// 점수가 높은 순으로 최대 4개까지 별점과 함께 "추천 솔루션"에 노출됩니다.
// 그 외 매칭된 솔루션 + 기본 보충 솔루션(baselineExtras)은 "추가 추천" 목록으로 표시됩니다.

export const solutionCatalog = {
  DRM: {
    name: { ko: "DRM", en: "DRM" },
    desc: { ko: "문서 암호화 및 권한관리", en: "Document encryption and permission management" },
  },
  ECM: {
    name: { ko: "문서중앙화", en: "Document Centralization" },
    desc: { ko: "중요 문서 중앙 저장", en: "Centralized storage of important documents" },
  },
  DLP: {
    name: { ko: "DLP", en: "DLP" },
    desc: { ko: "정보 유출 방지", en: "Prevents information leaks" },
  },
  NETCONN: {
    name: { ko: "망연계", en: "Network Interconnection" },
    desc: { ko: "외부 반출 관리", en: "Manages data transfer to external networks" },
  },
  NETSEP: {
    name: { ko: "망분리", en: "Network Segmentation" },
    desc: { ko: "물리적/논리적 망 분리", en: "Physical/logical network separation" },
  },
  SAC: {
    name: { ko: "SAC", en: "SAC" },
    desc: { ko: "서버 접근 통제", en: "Server access control" },
  },
  DAC: {
    name: { ko: "DAC", en: "DAC" },
    desc: { ko: "DB 접근 통제", en: "Database access control" },
  },
  NAC: {
    name: { ko: "NAC", en: "NAC" },
    desc: { ko: "네트워크 접근 통제", en: "Network access control" },
  },
  EDR: {
    name: { ko: "EDR", en: "EDR" },
    desc: { ko: "엔드포인트 위협 탐지·대응", en: "Endpoint threat detection & response" },
  },
  FW: {
    name: { ko: "방화벽", en: "Firewall" },
    desc: { ko: "네트워크 경계 보안", en: "Network perimeter security" },
  },
  SW: {
    name: { ko: "L2 · L3 스위치", en: "L2 · L3 Switch" },
    desc: { ko: "네트워크 장비 연결", en: "Connects network equipment" },
  },
};

// Q5 옵션의 id(ConsultingData.js)와 정확히 일치해야 매칭됩니다.
export const worryToSolutions = {
  usb: ["DLP", "NAC"],
  doc_leak: ["DRM", "ECM"],
  ransomware: ["EDR"],
  server_access: ["SAC"],
  db_access: ["DAC"],
  remote_work: ["ECM"],
  net_separation: ["NETSEP", "NETCONN"],
};

// 고민을 하나도 안 골랐거나, 매칭 안 된 경우에도 기본으로 함께 추천할 솔루션
export const baselineExtras = ["FW", "SW"];

const STARS_BY_RANK = [5, 5, 4, 3];

/**
 * 선택된 고민 id 목록을 받아 추천 결과를 계산합니다.
 * @param {string[]} selectedWorries - 고민 옵션의 id 배열
 * @param {"ko"|"en"} lang - 결과 텍스트 언어
 * @returns {{ recommended: {code:string,name:string,desc:string,stars:number}[], extra: string[] }}
 */
export function getRecommendation(selectedWorries = [], lang = "ko") {
  const scores = {};

  selectedWorries.forEach((worryId) => {
    (worryToSolutions[worryId] || []).forEach((code) => {
      if (!solutionCatalog[code]) {
        console.warn(`[solutionRecommend] "${code}"는 solutionCatalog에 없는 코드입니다.`);
        return;
      }
      scores[code] = (scores[code] || 0) + 1;
    });
  });

  const sorted = Object.entries(scores)
    .map(([code, score]) => ({ code, score }))
    .sort((a, b) => b.score - a.score);

  const top = sorted.slice(0, 4);
  const rest = sorted.slice(4).map((s) => s.code);

  const recommended = top.map((item, idx) => ({
    code: item.code,
    name: solutionCatalog[item.code].name[lang],
    desc: solutionCatalog[item.code].desc[lang],
    stars: STARS_BY_RANK[idx] || 2,
  }));

  const recommendedCodes = new Set(top.map((t) => t.code));
  const extraCandidates = [...rest, ...baselineExtras].filter((code) => solutionCatalog[code]);
  const extra = Array.from(new Set(extraCandidates)).filter((code) => !recommendedCodes.has(code));

  return {
    recommended,
    extra: extra.map((code) => solutionCatalog[code].name[lang]),
  };
}