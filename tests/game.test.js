describe('틱택토 게임 로직 테스트', () => {
  // 각 테스트 전에 게임 상태 초기화
  beforeEach(() => {
    // 게임 초기화 함수 호출
    initGame();
  });

  describe('게임 초기화', () => {
    it('게임 보드가 비어있어야 함', () => {
      // 3x3 보드의 모든 셀이 null인지 확인
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          expect(gameState.board[row][col]).toBeNull();
        }
      }
    });

    it('첫 번째 플레이어는 X여야 함', () => {
      expect(gameState.currentPlayer).toBe('X');
    });

    it('게임이 진행 중이어야 함', () => {
      expect(gameState.gameOver).toBe(false);
    });

    it('승자가 없어야 함', () => {
      expect(gameState.winner).toBeNull();
    });
  });

  describe('게임 플레이', () => {
    it('빈 셀을 클릭하면 현재 플레이어의 심볼로 표시되어야 함', () => {
      // X 플레이어가 (0,0) 위치에 표시
      updateBoard(0, 0, 'X');
      expect(gameState.board[0][0]).toBe('X');
    });

    it('이미 표시된 셀을 클릭하면 변경되지 않아야 함', () => {
      // X 플레이어가 (0,0) 위치에 표시
      updateBoard(0, 0, 'X');
      
      // O 플레이어가 같은 위치에 표시 시도
      const result = updateBoard(0, 0, 'O');
      
      // 보드 상태는 변경되지 않아야 함
      expect(gameState.board[0][0]).toBe('X');
      
      // 함수는 false를 반환해야 함
      expect(result).toBe(false);
    });

    it('플레이어 턴이 번갈아가며 변경되어야 함', () => {
      expect(gameState.currentPlayer).toBe('X');
      
      // X 플레이어 턴 후 O로 변경
      updateBoard(0, 0, 'X');
      switchPlayer();
      expect(gameState.currentPlayer).toBe('O');
      
      // O 플레이어 턴 후 X로 변경
      updateBoard(0, 1, 'O');
      switchPlayer();
      expect(gameState.currentPlayer).toBe('X');
    });
  });

  describe('승리 조건 확인', () => {
    it('가로줄이 같은 심볼로 채워지면 승리해야 함', () => {
      // X가 첫 번째 가로줄을 채움
      updateBoard(0, 0, 'X');
      updateBoard(0, 1, 'X');
      updateBoard(0, 2, 'X');
      
      const result = checkWinner();
      expect(result).toBe('X');
    });

    it('세로줄이 같은 심볼로 채워지면 승리해야 함', () => {
      // O가 첫 번째 세로줄을 채움
      updateBoard(0, 0, 'O');
      updateBoard(1, 0, 'O');
      updateBoard(2, 0, 'O');
      
      const result = checkWinner();
      expect(result).toBe('O');
    });

    it('대각선이 같은 심볼로 채워지면 승리해야 함', () => {
      // X가 왼쪽 위에서 오른쪽 아래 대각선을 채움
      updateBoard(0, 0, 'X');
      updateBoard(1, 1, 'X');
      updateBoard(2, 2, 'X');
      
      const result = checkWinner();
      expect(result).toBe('X');
    });

    it('다른 대각선이 같은 심볼로 채워져도 승리해야 함', () => {
      // O가 오른쪽 위에서 왼쪽 아래 대각선을 채움
      updateBoard(0, 2, 'O');
      updateBoard(1, 1, 'O');
      updateBoard(2, 0, 'O');
      
      const result = checkWinner();
      expect(result).toBe('O');
    });

    it('모든 셀이 채워졌지만 승자가 없으면 무승부여야 함', () => {
      // 무승부 상황 만들기
      // X | O | X
      // O | X | O
      // O | X | O
      updateBoard(0, 0, 'X');
      updateBoard(0, 1, 'O');
      updateBoard(0, 2, 'X');
      updateBoard(1, 0, 'O');
      updateBoard(1, 1, 'X');
      updateBoard(1, 2, 'O');
      updateBoard(2, 0, 'O');
      updateBoard(2, 1, 'X');
      updateBoard(2, 2, 'O');
      
      const winner = checkWinner();
      expect(winner).toBeNull();
      
      const isDraw = checkDraw();
      expect(isDraw).toBe(true);
    });
  });

  describe('게임 종료', () => {
    it('승자가 결정되면 게임이 종료되어야 함', () => {
      // X가 승리하는 상황
      updateBoard(0, 0, 'X');
      updateBoard(0, 1, 'X');
      updateBoard(0, 2, 'X');
      
      endGame('X');
      
      expect(gameState.gameOver).toBe(true);
      expect(gameState.winner).toBe('X');
    });

    it('무승부면 게임이 종료되어야 함', () => {
      endGame('draw');
      
      expect(gameState.gameOver).toBe(true);
      expect(gameState.winner).toBe('draw');
    });
  });

  describe('게임 재시작', () => {
    it('게임 재시작 시 보드가 초기화되어야 함', () => {
      // 몇 개의 셀을 표시
      updateBoard(0, 0, 'X');
      updateBoard(1, 1, 'O');
      
      // 게임 재시작
      resetGame();
      
      // 보드가 비어있어야 함
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          expect(gameState.board[row][col]).toBeNull();
        }
      }
    });

    it('게임 재시작 시 첫 번째 플레이어는 X여야 함', () => {
      // O 플레이어 턴으로 변경
      gameState.currentPlayer = 'O';
      
      // 게임 재시작
      resetGame();
      
      expect(gameState.currentPlayer).toBe('X');
    });

    it('게임 재시작 시 게임 상태가 초기화되어야 함', () => {
      // 게임 종료 상태로 변경
      gameState.gameOver = true;
      gameState.winner = 'X';
      
      // 게임 재시작
      resetGame();
      
      expect(gameState.gameOver).toBe(false);
      expect(gameState.winner).toBeNull();
    });
  });
});
