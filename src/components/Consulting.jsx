import React from "react";

// 원본 HTML에는 #consulting에 대한 CSS(.filter-container, .solutions-grid 등)만
// 있고 실제 카드 콘텐츠는 포함되어 있지 않았습니다. 실제 컨설팅 카드 내용을
// 주시면 이 페이지에 filter-container / solutions-grid 마크업으로 채워 넣을게요.
function Consulting() {
  return (
    <section id="consulting">
      <div className="section-title">
        <h2>컨설팅</h2>
        <p>망분리, 통합보안, 인프라 구축 컨설팅 콘텐츠가 이 페이지에 들어갈 예정입니다.</p>
      </div>
    </section>
  );
}

export default Consulting;
