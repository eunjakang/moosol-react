# MOOSOL React 프로젝트 (라우팅 적용)

Vite + React + react-router-dom 구조입니다. 헤더/푸터는 모든 페이지에
고정으로 노출되고, 메뉴를 클릭하면 SPA 라우팅으로 페이지가 전환됩니다.

## 폴더 구조

```
moosol-react/
├── index.html                 # Vite 엔트리 (폰트/FontAwesome CDN 포함)
├── package.json
├── vite.config.js
├── public/
│   └── images/
│       └── logo.png           # 여기에 실제 로고 파일을 넣어주세요
└── src/
    ├── main.jsx                # React 진입점 (BrowserRouter 적용)
    ├── App.jsx                 # 라우트 정의 (/,/about-us,/consulting,/maintenance,/contact-section)
    ├── App.css                 # 원본 <style> 전체 이동
    ├── data/
    │   └── nodeDatabase.js     # 토폴로지 노드 상세 데이터 분리
    └── components/
        ├── Layout.jsx           # 공통 레이아웃 (Header + <Outlet/> + Footer)
        ├── Header.jsx           # GNB 헤더 (NavLink로 페이지 이동 + 현재 페이지 active 표시)
        ├── Home.jsx             # "/" 홈: 히어로 + 인터랙티브 토폴로지 트리 + 상세 패널만 표시
        ├── AboutUs.jsx          # "/about-us" 회사 소개 페이지
        ├── Consulting.jsx       # "/consulting" 컨설팅 페이지 (임시 콘텐츠, 아래 참고)
        ├── Maintenance.jsx      # "/maintenance" 통합 유지보수 페이지
        ├── Contact.jsx          # "/contact-section" 문의하기 페이지 (폼 상태 React state로 관리)
        └── Footer.jsx           # 푸터
```

## 동작 방식

- 첫 화면(`/`)에는 인터랙티브 애니메이션(토폴로지 트리)만 보입니다.
- 헤더의 "회사소개" / "컨설팅" / "시스템구축" / "문의하기"를 클릭하면
  스크롤 이동이 아니라 **다른 페이지로 전환**됩니다.
- 헤더와 푸터는 모든 페이지에서 그대로 유지됩니다 (`Layout.jsx`).
- 페이지 전환 시 자동으로 스크롤이 맨 위로 이동합니다 (`ScrollToTop`, App.jsx).

## 실행 방법

```bash
npm install
npm run dev
```

## 참고 / 주의사항

1. **로고 이미지**: `public/images/logo.png` 경로에 실제 로고 파일을 넣어주세요.
2. **컨설팅(`/consulting`) 페이지**: 원본 HTML에는 CSS(`.filter-container`,
   `.solutions-grid`, `.solution-card` 등)만 있고 실제 카드 콘텐츠가 없어서
   지금은 안내 문구만 있는 임시 페이지입니다. 실제 컨설팅 카드 내용을 주시면
   채워 넣어드릴게요.
3. **원본 코드의 중복 메뉴**: 원본 GNB에 "시스템구축" 링크가 두 번 들어있던
   부분은 하나로 정리했습니다.
