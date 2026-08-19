import { useEffect } from "react";

/**
 * 외부 챗봇 위젯(Chatbase)의 embed 스크립트를 삽입하는 컴포넌트.
 * chatbotId는 비밀키가 아니라 공개 식별자라 VITE_ 환경변수로 관리해도 안전합니다.
 */
function ExternalChatWidget() {
  useEffect(() => {
    const chatbotId = import.meta.env.VITE_CHATBASE_ID;

    if (!chatbotId) {
      console.warn("VITE_CHATBASE_ID가 설정되지 않아 챗봇 위젯을 불러오지 않았습니다.");
      return;
    }

    window.chatbaseConfig = { chatbotId };

    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; 
}

export default ExternalChatWidget;