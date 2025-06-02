describe('틱택토 로컬 스토리지 테스트', () => {
  // 각 테스트 전에 localStorage 초기화
  beforeEach(() => {
    // localStorage 모킹
    const localStorageMock = (function() {
      let store = {};
      return {
        getItem: function(key) {
          return store[key] || null;
        },
        setItem: function(key, value) {
          store[key] = value.toString();
        },
        clear: function() {
          store = {};
        },
        removeItem: function(key) {
          delete store[key];
        }
      };
    })();
    
    // localStorage 대체
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true
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
        draw: 3
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
    it('X 승리 시 X 점수가 증가해야 함', () => {
      // X 승리 처리
      updateScore('X');
      
      const scores = loadScores();
      expect(scores.X).toBe(1);
      expect(scores.O).toBe(0);
      expect(scores.draw).toBe(0);
    });

    it('O 승리 시 O 점수가 증가해야 함', () => {
      // O 승리 처리
      updateScore('O');
      
      const scores = loadScores();
      expect(scores.X).toBe(0);
      expect(scores.O).toBe(1);
      expect(scores.draw).toBe(0);
    });

    it('무승부 시 무승부 점수가 증가해야 함', () => {
      // 무승부 처리
      updateScore('draw');
      
      const scores = loadScores();
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
      updateScore('X');
      updateScore('O');
      updateScore('draw');
      
      // 초기화
      resetScores();
      
      const scores = loadScores();
      expect(scores.X).toBe(0);
      expect(scores.O).toBe(0);
      expect(scores.draw).toBe(0);
    });
  });
});
