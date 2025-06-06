# 틱택토 (Tic-Tac-Toe) 웹 게임

바이브 코딩을 학습하기 위한 틱택토 웹 애플리케이션입니다.

## 프로젝트 개요

이 프로젝트는 HTML, CSS, 바닐라 JavaScript를 사용하여 구현된 간단한 틱택토 게임입니다. 사용자는 X와 O를 번갈아가며 3x3 보드에 표시하고, 가로, 세로, 대각선으로 같은 심볼을 연속으로 놓으면 승리합니다. 게임 결과는 로컬 스토리지에 저장되어 브라우저를 닫았다가 다시 열어도 점수가 유지됩니다.

## 주요 기능

- 3x3 게임 보드에서 2인 플레이 가능
- 승리 조건 자동 확인 (가로, 세로, 대각선)
- 무승부 자동 확인
- 게임 재시작 기능
- 점수 자동 저장 및 불러오기 (로컬 스토리지 사용)
- 반응형 디자인 (모바일 및 데스크톱 지원)

## 기술 스택

- HTML5
- CSS3 (Flexbox)
- 바닐라 JavaScript
- localStorage API
- Jasmine (테스트 프레임워크)

## 실행 방법

1. 저장소 클론하기

   ```
   git clone https://github.com/Hands-On-Vibe-Coding/TicTacToe.git
   cd TicTacToe
   ```

2. 웹 서버 실행하기 (옵션)

   ```
   python -m http.server 8000
   ```

3. 브라우저에서 열기
   - 웹 서버를 실행한 경우: `http://localhost:8000` 접속
   - 또는 `index.html` 파일을 브라우저에서 직접 열기

## 프로젝트 구조

```
TicTacToe/
├── css/
│   └── style.css        # 게임 스타일시트
├── js/
│   ├── game.js          # 게임 로직
│   └── storage.js       # 로컬 스토리지 관리
├── tests/
│   ├── game.test.js     # 게임 로직 테스트
│   ├── storage.test.js  # 스토리지 테스트
│   └── index.html       # 테스트 실행 HTML 페이지
├── docs/
│   ├── prd.md           # 제품 요구사항 문서
│   ├── design.md        # 설계 문서
│   ├── tasks.md         # 작업 체크리스트
│   ├── chat.md          # 개발 대화 기록
│   ├── test-plan.md     # 테스트 계획 문서
│   ├── global_rules.md  # 글로벌 규칙 문서(영문)
│   ├── global_rules_ko.md # 글로벌 규칙 문서(한글)
│   └── tutorial.md      # 바이브 코딩 튜토리얼
├── index.html           # 메인 HTML 파일
└── README.md            # 프로젝트 설명
```

## 개발 방법론

이 프로젝트는 TDD(테스트 주도 개발) 방식으로 코어 로직을 구현했습니다. 테스트 파일은 `tests/` 디렉토리에 있으며, Jasmine 프레임워크를 사용하여 작성되었습니다.

## 프로젝트 문서

이 프로젝트에는 다양한 문서가 포함되어 있으며, 모두 `docs/` 디렉토리에 위치해 있습니다:

- [제품 요구사항 문서](docs/prd.md) - 프로젝트의 목표, 사용자 가치, 핵심 기능, 기술 요구사항 등을 정의합니다.
- [설계 문서](docs/design.md) - 시스템 아키텍처, 컴포넌트 설계, 데이터 모델, 기능 설계, UI 디자인 등을 설명합니다.
- [작업 체크리스트](docs/tasks.md) - 프로젝트 구현을 위한 단계별 작업 목록을 제공합니다.
- [테스트 계획 문서](docs/test-plan.md) - 테스트 전략, 테스트 케이스, 테스트 범위 등을 설명합니다.
- [글로벌 규칙 문서](docs/global_rules.md) - 프로젝트 개발에 적용되는 일반적인 규칙과 원칙을 정의합니다. ([한글 버전](docs/global_rules_ko.md))
- [바이브 코딩 튜토리얼](docs/tutorial.md) - 바이브 코딩 방식으로 틱택토 게임을 구현하는 과정을 설명합니다.
- [개발 대화 기록](docs/chat.md) - 프로젝트 개발 과정에서의 대화 내용을 기록합니다.
- [향후 개선점 문서](docs/improvements.md) - 프로젝트의 향후 개선 방향과 아이디어를 정리한 문서입니다.

## 향후 개선 사항

- AI 대전 모드 추가
- 게임 설정 옵션 추가 (보드 크기, 선공 선택 등)
- 온라인 멀티플레이어 지원
- 게임 기록 상세 보기 기능
- 테마 변경 기능

## 라이센스

MIT License
