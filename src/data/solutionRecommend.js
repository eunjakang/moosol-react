// 고민(Q5 복수선택 답변) → 추천 솔루션 매핑
// 사용자가 선택한 고민 개수만큼 해당 솔루션의 점수가 올라가고,
// 점수가 높은 순으로 최대 4개까지 별점과 함께 "추천 솔루션"에 노출됩니다.
// 그 외 매칭된 솔루션 + 기본 보충 솔루션(baselineExtras)은
// "추가로 추천드립니다" 목록으로 표시됩니다.

export const solutionCatalog = {
  DRM: { name: "DRM", desc: "문서 암호화 및 권한관리" },
  "문서중앙화": { name: "문서중앙화", desc: "중요 문서 중앙 저장" },
  DLP: { name: "DLP", desc: "정보 유출 방지" },
  "망연계": { name: "망연계", desc: "외부 반출 관리" },
  "망분리": { name: "망분리", desc: "물리적/논리적 망 분리" },
  SAC: { name: "SAC", desc: "서버 접근 통제" },
  DAC: { name: "DAC", desc: "DB 접근 통제" },
  NAC: { name: "NAC", desc: "네트워크 접근 통제" },
  EDR: { name: "EDR", desc: "엔드포인트 위협 탐지·대응" },
  "방화벽": { name: "방화벽", desc: "네트워크 경계 보안" },
};

// Q5 옵션 문구(quizData.js)와 정확히 일치해야 매칭됩니다.
export const worryToSolutions = {
  "USB 반출이 걱정된다": ["DLP", "NAC"],
  "문서 유출이 걱정된다": ["DRM", "문서중앙화"],
  "랜섬웨어가 걱정된다": ["EDR"],
  "서버 접근을 관리하고 싶다": ["SAC"],
  "DB 접근을 통제하고 싶다": ["DAC"],
  "재택근무 보안이 필요하다": ["문서중앙화"],
  "내부망/외부망 분리가 필요하다": ["망분리", "망연계"],
};

// 고민을 하나도 안 골랐거나, 매칭 안 된 경우에도 기본으로 함께 추천할 솔루션
export const baselineExtras = ["방화벽", "L2 · L3 스위치"];

const STARS_BY_RANK = [5, 5, 4, 3];

/**
 * 선택된 고민 목록(문자열 배열)을 받아 추천 결과를 계산합니다.
 * @param {string[]} selectedWorries
 * @returns {{ recommended: {code:string,name:string,desc:string,stars:number}[], extra: string[] }}
 */
export function getRecommendation(selectedWorries = []) {
  const scores = {};

  selectedWorries.forEach((worry) => {
    (worryToSolutions[worry] || []).forEach((code) => {
      // solutionCatalog에 정의되지 않은 code는 무시 (오타/누락 방지)
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
    name: solutionCatalog[item.code].name,
    desc: solutionCatalog[item.code].desc,
    stars: STARS_BY_RANK[idx] || 2,
  }));

  const recommendedCodes = new Set(top.map((t) => t.code));
  const extraCandidates = [...rest, ...baselineExtras].filter(
    (code) => solutionCatalog[code] // solutionCatalog에 있는 code만 통과
  );
  const extra = Array.from(new Set(extraCandidates)).filter(
    (code) => !recommendedCodes.has(code)
  );

  return {
    recommended,
    extra: extra.map((code) => solutionCatalog[code].name),
  };
}