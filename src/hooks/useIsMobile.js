import { useEffect, useState } from "react";

/**
 * 지정한 breakpoint(px) 이하이면 true를 반환합니다.
 * 리사이즈에 반응하도록 matchMedia를 구독합니다.
 */
function useIsMobile(breakpoint = 700) {
  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia(`(max-width: ${breakpoint}px)`).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handleChange = (e) => setIsMobile(e.matches);

    handleChange(mql); // 초기값 동기화
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, [breakpoint]);

  return isMobile;
}

export default useIsMobile;