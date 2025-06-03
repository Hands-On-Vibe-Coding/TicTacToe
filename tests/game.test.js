// game.js의 함수와 변수를 테스트 환경에 추가
document.body.innerHTML = `
  <div class="game-container">
    <div class="game-board"></div>
    <div class="game-info">
      <div id="game-status"></div>
      <div class="score-board">
        <div>X: <span id="score-x">0</span></div>
        <div>O: <span id="score-o">0</span></div>
        <div>무승부: <span id="score-draw">0</span></div>
      </div>
      <button id="reset-button">게임 재시작</button>
      <button id="reset-scores-button">점수 초기화</button>
    </div>
  </div>
`;

// 게임 상태 객체
let gameState = {
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  currentPlayer: 'X',
  gameOver: false,
  winner: null,
};

// 게임 초기화 함수
function initGame() {
  // 게임 상태 초기화
  gameState = {
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
    currentPlayer: 'X',
    gameOver: false,
    winner: null,
  };
}

// 보드 상태 업데이트 함수
function updateBoard(row, col, player) {
  // 게임이 종료되었거나 이미 표시된 셀이면 업데이트하지 않음
  if (gameState.gameOver || gameState.board[row][col] !== null) {
    return false;
  }

  // 보드 업데이트
  gameState.board[row][col] = player;

  return true;
}

// 플레이어 전환 함수
function switchPlayer() {
  gameState.currentPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';
}

// 승리 조건 확인 함수
function checkWinner() {
  const board = gameState.board;

  // 가로줄 확인
  for (let row = 0; row < 3; row++) {
    if (board[row][0] && board[row][0] === board[row][1] && board[row][0] === board[row][2]) {
      return board[row][0];
    }
  }

  // 세로줄 확인
  for (let col = 0; col < 3; col++) {
    if (board[0][col] && board[0][col] === board[1][col] && board[0][col] === board[2][col]) {
      return board[0][col];
    }
  }

  // 대각선 확인 (왼쪽 위 -> 오른쪽 아래)
  if (board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
    return board[0][0];
  }

  // 대각선 확인 (오른쪽 위 -> 왼쪽 아래)
  if (board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
    return board[0][2];
  }

  return null;
}

// 무승부 확인 함수
function checkDraw() {
  // 모든 셀이 채워졌는지 확인
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (gameState.board[row][col] === null) {
        return false;
      }
    }
  }

  // 승자가 없으면 무승부
  return checkWinner() === null;
}

// 게임 종료 함수
function endGame(result) {
  gameState.gameOver = true;
  gameState.winner = result === 'draw' ? null : result;
}

// 게임 재시작 함수
function resetGame() {
  initGame();
}

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
      // X 플레이어가 가로줄 완성
      updateBoard(0, 0, 'X');
      updateBoard(0, 1, 'X');
      updateBoard(0, 2, 'X');

      // 승자 확인 및 게임 종료
      const winner = checkWinner();
      endGame(winner);

      // 게임 종료 확인
      expect(gameState.gameOver).toBe(true);
      expect(gameState.winner).toBe('X');
    });

    it('무승부면 게임이 종료되어야 함', () => {
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

      // 무승부 확인 및 게임 종료
      checkDraw(); // 무승부 확인
      endGame('draw');

      // 게임 종료 확인
      expect(gameState.gameOver).toBe(true);
      expect(gameState.winner).toBeNull();
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

      // 첫 번째 플레이어가 X인지 확인
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
