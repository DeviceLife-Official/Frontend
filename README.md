# 📱Device Life - Frontend
> 최적의 기기조합 웹 서비스
> UMC 9th Project - Client Repository

## 📖 프로젝트 소개 (Project Overview)
이 저장소는 최적의 기기 조합 추천 서비스 'Device Life'의 웹 클라이언트 코드를 관리합니다. 사용자가 수많은 스마트 기기 사이에서 자신에게 맞는 최적의 조합을 찾을 수 있도록, 직관적인 탐색 경험과 로직 기반의 실시간 평가 피드백을 제공하는 완성도 높은 UI/UX 구현에 집중합니다.

### ✨ 프론트엔드 핵심 기능 (Key Features)
- 동적 유저 권한 및 GNB 렌더링: 로그인 유무 및 온보딩 상태에 따라 메뉴 구성과 접근 권한 제어
- 온보딩 플로우: 신규 유저를 위한 스플래시 화면, 라이프스타일 태그 선택, 첫 조합 생성으로 이어지는 단계별 폼 위저드 구현
- 다중 필터 기반 기기 탐색: 카테고리 칩, 단일/다중 체크박스 필터, 4가지 정렬 옵션을 조합한 검색 인터페이스 제공
- 조합 담기 시스템: 현재 선택된 조합 상태를 유지하며 중복 저장
- 라이프스타일 자동 로테이션: 유저 액션에 반응하여 정지/재생되는 시각적 태그 로테이션 및 기기 큐레이션 카드 구현
- 로직 기반 평가 리포트: 기기 간 연동성, 편의성, 라이프스타일 적합도 분석 내용을 마이페이지 내 한 줄 평가 리포트로 렌더링

---

## 🧑🏻‍💻 팀원 (Contributors)

| <img src="https://github.com/waldls.png" width="150" height="150"/> | <img src="https://github.com/Seony777.png" width="150" height="150"/> | <img src="https://github.com/H-un1.png" width="150" height="150"/> |
| :---------------------------------------------------------------: | :-----------------------------------------------------------------: | :---------------------------------------------------------------: |
| 박유민 <br/> [@waldls](https://github.com/waldls) | 이선우 <br/> [@Seony777](https://github.com/Seony777) | 임병훈 <br/> [@H-un1](https://github.com/H-un1) |
| **Frontend Lead** | **Frontend** | **Frontend** |


---

## 🛠️ 기술 스택 (Tech Stack)

| 역할 | 종류 | 선정 근거 |
| :-- | :-- | :-- |
| **Language & Framework** | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) | TypeScript로 타입 안정성을 확보하고, React 기반 컴포넌트 UI를 구성했으며, Vite의 빠른 번들링과 HMR로 개발 생산성을 높였습니다. |
| **Styling** | ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white) | 유틸리티 기반 스타일링으로 빠르고 일관된 UI를 구현했습니다. |
| **State Management** | ![Zustand](https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logoColor=white) ![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white) | Zustand로 클라이언트 상태를 간단히 관리하고, TanStack Query로 서버 상태/캐싱을 선언적으로 관리했습니다. |
| **Data Fetching** | ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white) ![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white) | Axios로 HTTP 요청을 처리하고, TanStack Query로 요청 상태/캐싱/동기화 관리를 수행했습니다. |
| **Tools** | ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black) | ESLint로 코드 규칙을 통일하고, Prettier로 포맷을 자동화해 일관된 코드 스타일을 유지했습니다. |
| **DevOps** | ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white) | Git/GitHub로 버전 관리 및 협업을 진행하고, Vercel로 배포 자동화 및 CI/CD 과정을 간소화했습니다. |
| **Package Manager** | ![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white) | 표준 패키지 매니저(npm)를 사용하여 의존성 설치 및 관리를 수행했습니다. |



---

## 🌐 Git-flow 전략 (Git-flow Strategy)

* develop: 다음 출시 버전을 개발하는 중심 브랜치. 기능 개발 완료 후 feature 브랜치들이 병합
* feature: 기능 개발용 브랜치. develop에서 분기하여 작업

---

## 📌 브랜치 규칙 및 네이밍 (Branch Rules & Naming)

* 모든 기능 개발은 feature 브랜치에서 시작
* 작업 시작 전, 항상 최신 develop 내용 받아오기 (git pull origin develop)
* 작업 완료 후, develop으로 Pull Request(PR) 생성
* PR에 Reviewer(멘션) 지정 이후 머지
* 브랜치 이름 형식: feature/이슈번호-기능명
* 예시: feature/1-login-ui

---

## 🎯 커밋 컨벤션 (Commit Convention)

### 주의 사항
* type은 소문자만 사용 (feat, fix, refactor, docs, style, test, chore)
* subject는 모두 현재형 동사

### 📋 타입 목록

| type | 설명 |
| :--- | :--- |
| start | 새로운 프로젝트를 시작할 때 |
| feat | 새로운 기능을 추가할 때 |
| fix | 버그를 수정할 때 |
| design | CSS 등 사용자 UI 디자인을 변경할 때 |
| refactor | 기능 변경 없이 코드를 리팩토링할 때 |
| settings | 설정 파일을 변경할 때 |
| comment | 필요한 주석을 추가하거나 변경할 때 |
| dependency/Plugin | 의존성/플러그인을 추가할 때 |
| docs | README.md 등 문서를 수정할 때 |
| merge | 브랜치를 병합할 때 |
| deploy | 빌드 및 배포 관련 작업을 할 때 |
| rename | 파일 혹은 폴더명을 수정하거나 옮길 때 |
| remove | 파일을 삭제하는 작업만 수행했을 때 |
| revert | 이전 버전으로 롤백할 때 |

### ✨ 예시
* feat: 컴포넌트 추가
* fix: 가려짐 현상 해결

---

## 🤝 그라운드 룰 (Ground Rules)

- **연락 자주 확인하기**
  - 디스코드/카카오톡 알림을 자주 확인합니다.

- **적극적으로 의견 공유하기**
  - 막히는 부분이나 변경 사항이 생기면 빠르게 공유합니다.

- **PR Merge 규칙**
  - 기본적으로 전원 Approve 후 Merge하며, PR 작성자가 브랜치를 삭제합니다.
  - 단, 여행 등 개인 일정으로 확인이 어려운 경우, 해당 인원을 제외한 팀원의 Approve로 Merge 가능합니다.

- **라이브러리 설치 공유**
  - 작업 중 새로운 라이브러리를 설치한 경우, 디스코드 스레드에 댓글로 공유합니다.

- **Figma 수치 규칙**
  - 디자이너님께서 별도로 안내한 경우를 제외하고, 가장 가까운 4의 배수로 스냅하여 적용합니다.
