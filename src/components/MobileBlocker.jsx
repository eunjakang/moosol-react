import React from "react";

function MobileBlocker() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      padding: "20px",
      textAlign: "center",
      backgroundColor: "#f8faf9",
      color: "#121e14"
    }}>
      <div style={{ fontSize: "48px", color: "#29a640", marginBottom: "20px" }}>💻</div>
      <h2 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "12px" }}>
        PC 환경에서 접속해 주세요
      </h2>
      <p style={{ fontSize: "14px", color: "#666", lineHeight: "1.6", maxWidth: "320px" }}>
        현재 무솔(MOOSOL) 웹사이트는 <b>PC 화면에 최적화</b>되어 있습니다.<br />
        더 나은 서비스 제공을 위해 모바일 버전은 준비 중이오니, PC로 방문해 주시기 바랍니다.
      </p>
    </div>
  );
}

export default MobileBlocker;