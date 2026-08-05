import React from "react";

/**
 * usePagination 훅과 짝을 이루는 공용 페이지네이션 UI.
 * totalPages가 1 이하면 아무것도 렌더링하지 않아요 (기존 동작 그대로).
 */
function Pagination({ currentPage, totalPages, onPrev, onNext, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button className="page-btn" onClick={onPrev} disabled={currentPage === 1}>
        &lt;
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
        <button
          key={pageNum}
          className={`page-btn ${currentPage === pageNum ? "active" : ""}`}
          onClick={() => onPageChange(pageNum)}
        >
          {pageNum}
        </button>
      ))}
      <button className="page-btn" onClick={onNext} disabled={currentPage === totalPages}>
        &gt;
      </button>
    </div>
  );
}

export default Pagination;