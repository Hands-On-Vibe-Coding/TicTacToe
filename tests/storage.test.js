// storage.js의 함수와 변수를 테스트 환경에 추가

// 로컬 스토리지 키
const STORAGE_KEY = 'tictactoe_scores';

// 점수 불러오기 함수
function loadScores() {
  // 로컬 스토리지에서 점수 데이터 불러오기
  const scoresJson = localStorage.getItem(STORAGE_KEY);

  // 데이터가 없으면 기본값 반환
  if (!scoresJson) {
    return {
      X: 0,
      O: 0,
      draw: 0,
    };
  }

  // JSON 파싱하여 반환
  try {
    const scores = JSON.parse(scoresJson);
    return {
      X: parseInt(scores.X) || 0,
      O: parseInt(scores.O) || 0,
      draw: parseInt(scores.draw) || 0,
    };
  } catch (error) {
    console.error('점수 데이터 파싱 오류:', error);
    return {
      X: 0,
      O: 0,
      draw: 0,
    };
  }
}

// 점수 저장 함수
function saveScores(scores) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
}

// 점수 초기화 함수
function resetScores() {
  const initialScores = {
    X: 0,
    O: 0,
    draw: 0,
  };
  saveScores(initialScores);
  return initialScores;
}

// 점수 업데이트 함수
function updateScore(result) {
  const scores = loadScores();

  if (result === 'X' || result === 'O') {
    scores[result]++;
  } else if (result === 'draw') {
    scores.draw++;
  }

  saveScores(scores);
  return scores;
}

describe('틱택토 로컬 스토리지 테스트', () => {
  // 각 테스트 전에 localStorage 초기화
  beforeEach(() => {
    // localStorage 모킹
    const localStorageMock = (function () {
      let store = {};
      return {
        getItem: function (key) {
          return store[key] || null;
        },
        setItem: function (key, value) {
          store[key] = value.toString();
        },
        clear: function () {
          store = {};
        },
        removeItem: function (key) {
          delete store[key];
        },
      };
    })();

    // localStorage 대체
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });

    // 점수 초기화
    resetScores();
  });

  describe('점수 저장 및 불러오기', () => {
    it('초기 점수는 모두 0이어야 함', () => {
      const scores = loadScores();
      expect(scores.X).toBe(0);
      expect(scores.O).toBe(0);
      expect(scores.draw).toBe(0);
    });

    it('점수를 저장하고 불러올 수 있어야 함', () => {
      // 점수 업데이트
      const updatedScores = {
        X: 2,
        O: 1,
        draw: 3,
      };

      // 저장
      saveScores(updatedScores);

      // 불러오기
      const loadedScores = loadScores();

      expect(loadedScores.X).toBe(2);
      expect(loadedScores.O).toBe(1);
      expect(loadedScores.draw).toBe(3);
    });
  });

  describe('점수 업데이트', () => {
    it('X 플레이어 승리 시 X 점수가 증가해야 함', () => {
      // X 플레이어 승리
      const scores = updateScore('X');

      // X 점수 확인
      expect(scores.X).toBe(1);
      expect(scores.O).toBe(0);
      expect(scores.draw).toBe(0);
    });

    it('O 플레이어 승리 시 O 점수가 증가해야 함', () => {
      // O 플레이어 승리
      const scores = updateScore('O');

      // O 점수 확인
      expect(scores.X).toBe(0);
      expect(scores.O).toBe(1);
      expect(scores.draw).toBe(0);
    });

    it('무승부 시 무승부 점수가 증가해야 함', () => {
      // 무승부 처리
      const scores = updateScore('draw');

      // 무승부 점수 확인
      expect(scores.X).toBe(0);
      expect(scores.O).toBe(0);
      expect(scores.draw).toBe(1);
    });

    it('여러 번 점수 업데이트가 누적되어야 함', () => {
      // 여러 번 점수 업데이트
      updateScore('X');
      updateScore('O');
      updateScore('X');
      updateScore('draw');

      const scores = loadScores();
      expect(scores.X).toBe(2);
      expect(scores.O).toBe(1);
      expect(scores.draw).toBe(1);
    });
  });

  describe('점수 초기화', () => {
    it('점수 초기화 시 모든 점수가 0이 되어야 함', () => {
      // 점수 업데이트
      const updatedScores = {
        X: 3,
        O: 2,
        draw: 1,
      };
      saveScores(updatedScores);

      // 점수 초기화
      resetScores();

      // 초기화 후 점수 확인
      const scores = loadScores();
      expect(scores.X).toBe(0);
      expect(scores.O).toBe(0);
      expect(scores.draw).toBe(0);
    });
  });
});
