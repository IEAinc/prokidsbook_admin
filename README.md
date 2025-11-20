<p align="center">
  <img src="https://github.com/user-attachments/assets/3606bc53-1a46-4179-97fc-9c9dbcaed407" alt="proKids_logo"/>
</p>

<h1 align="center">프로키즈북 관리자 페이지</h1>

프로키즈북 관리자 페이지는 프로키즈북의 통계를 시각화하여 보여주는 웹 애플리케이션입니다.

방문자 수, 다운로드 수, 가입자 현황, 동화 생성 현황, 캐릭터 생성 현황 등을 확인할 수 있습니다.

## 기술 스택

- **프론트엔드 프레임워크**: React + Vite
- **프로그래밍 언어**: TypeScript
- **날짜 처리 라이브러리**: date-fns
- **차트 라이브러리**: chart.js
- **상태 관리 라이브러리**: Zustand
- **아이콘 라이브러리**: react-icons

## 설치 및 실행

아래의 명령어를 통해 프로젝트를 설치하고 실행할 수 있습니다.

```bash
# 프로젝트 클론
git clone https://github.com/your-repo/prokidsbook-admin.git
cd prokidsbook-admin

# 패키지 설치
npm install

# 프로젝트 실행
npm run dev
```

## 프로젝트 구조

```
├── public
├── src
│   ├── assets
│   ├── components
│   ├── pages
│   │   ├── Login.tsx
│   │   ├── Dashboard
│   │       ├── VisitorCount.tsx
│   │       ├── DownloadCount.tsx
│   │       ├── User.tsx
│   │       ├── Story.tsx
│   │       ├── Character.tsx
│   ├── store
│   ├── App.tsx
│   ├── main.tsx
│   ├── ...
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── ...
```

## 경로 안내

- **로그인 페이지**: `/login`
- **대시보드**: `/dashboard`
    - **방문자 수**: `/dashboard/visitor`
    - **다운로드 수**: `/dashboard/download`
    - **가입자 현황**: `/dashboard/user`
    - **동화 생성 현황**: `/dashboard/story`
    - **캐릭터 생성 현황**: `/dashboard/character`

## 주요 기능
### 대시보드
- **방문자 수 통계**: 특정 기간 동안의 방문자 수를 차트로 표시합니다.
- **다운로드 수 통계**: 특정 기간 동안의 다운로드 수를 차트로 표시합니다.
- **가입자 현황**: 전체 가입자 수와 신규 가입자 수를 확인할 수 있습니다.
- **동화 생성 현황**: 사용자가 생성한 동화의 수를 확인할 수 있습니다.
- **캐릭터 생성 현황**: 사용자가 생성한 캐릭터의 수를 확인할 수 있습니다.



