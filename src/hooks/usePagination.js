import { useState } from "react";

/**
 * 목록 페이지네이션 상태와 계산을 한 곳에서 관리하는 훅.
 * items는 매 렌더마다 새 배열(필터링 결과)이어도 상관없어요 —
 * 페이지 초기화는 자동이 아니라 resetPage()를 직접 호출하는 방식이라
 * (필터 바꿀 때만 리셋) 원래 코드의 동작 그대로예요.
 */
function usePagination(items, itemsPerPage = 4) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const goToPage = (page) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

  const goPrev = () => goToPage(currentPage - 1);
  const goNext = () => goToPage(currentPage + 1);
  const resetPage = () => setCurrentPage(1);

  return {
    currentPage,
    totalPages,
    currentItems,
    goToPage,
    goPrev,
    goNext,
    resetPage,
  };
}

export default usePagination;