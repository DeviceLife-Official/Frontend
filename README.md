# 📱Device Life - Frontend
> 수많은 디바이스 중 유저에게 최적의 조합을 제공하다
> UMC 9th Project - Client Repository

## 📖 프로젝트 소개 (Project Overview)
이 저장소는 Device Life의 클라이언트 애플리케이션 코드를 관리합니다. 사용자가 직관적으로 기기를 탐색하고, 조합을 생성하며, 실시간으로 시각적인 평가 피드백을 받을 수 있는 UI/UX 구현에 집중합니다.

### ✨ 프론트엔드 핵심 기능 (Key Features)
* 조합 워크스페이스 UI: 기기 추가/삭제 시 부드러운 인터랙션 및 상태 관리 구현
* 실시간 평가 피드백: 생태계, 충전, 컬러 점수 데이터를 시각적 그래프나 수치로 즉시 렌더링
* 기기 탐색 및 필터 UI: 가격대 조절을 위한 Range Slider 컴포넌트 및 카테고리 칩 구현
* 라이프스타일 선택: 이미지 카드 및 브랜드 로고를 활용한 직관적인 사용자 입력 인터페이스
* 인터랙션: 내 조합 라이브러리의 스와이프 삭제 및 모달 애니메이션 처리

---

## 🛠️ 기술 스택 (Tech Stack)

Library / Framework	React, Vite
Language	TypeScript
Styling	Tailwind CSS
Data Fetching	Axios, TanStack Query (React Query)
Formatting	ESLint, Prettier
State Management	Zustand, TanStack Query (Server State)
Package Manager	npm
Version Control	Git, GitHub
Deployment	Vercel

---

## 🌐 Git-flow 전략 (Git-flow Strategy)

* main: 최종적으로 사용자에게 배포되는 가장 안정적인 버전 브랜치
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
