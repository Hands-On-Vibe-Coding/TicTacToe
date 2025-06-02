/**
 * 틱택토 게임 로직
 * 
 * 이 파일은 틱택토 게임의 핵심 로직을 구현합니다.
 * TDD 방식으로 개발되었으며, 게임 상태 관리, 승리 조건 확인 등의 기능을 포함합니다.
 */

// 게임 상태 객체
let gameState = {
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ],
  currentPlayer: 'X',
  gameOver: false,
  winner: null
};

/**
 * 게임 초기화 함수
 * 게임 보드와 상태를 초기화합니다.
 */
function initGame() {
  // 게임 상태 초기화
  gameState = {
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ],
    currentPlayer: 'X',
    gameOver: false,
    winner: null
  };
  
  // UI 초기화
  renderBoard();
  updateGameStatus();
  
  // 이벤트 리스너 설정
  setupEventListeners();
}

/**
 * 게임 보드 렌더링 함수
 * 현재 게임 상태에 따라 보드 UI를 업데이트합니다.
 */
function renderBoard() {
  const boardElement = document.querySelector('.game-board');
  
  // 기존 보드 내용 제거
  boardElement.innerHTML = '';
  
  // 3x3 보드 생성
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.row = row;
      cell.dataset.col = col;
      
      // 셀 내용 설정
      const value = gameState.board[row][col];
      if (value) {
        cell.textContent = value;
        cell.classList.add(value.toLowerCase());
      }
      
      boardElement.appendChild(cell);
    }
  }
}

/**
 * 이벤트 리스너 설정 함수
 * 게임 보드와 재시작 버튼에 이벤트 리스너를 설정합니다.
 */
function setupEventListeners() {
  // 게임 보드 셀 클릭 이벤트
  const boardElement = document.querySelector('.game-board');
  boardElement.addEventListener('click', handleCellClick);
  
  // 재시작 버튼 클릭 이벤트
  const restartButton = document.getElementById('restart-btn');
  restartButton.addEventListener('click', resetGame);
}

/**
 * 셀 클릭 이벤트 핸들러
 * 사용자가 게임 보드의 셀을 클릭했을 때 호출됩니다.
 */
function handleCellClick(event) {
  // 게임이 종료된 경우 클릭 무시
  if (gameState.gameOver) return;
  
  // 클릭된 셀이 아닌 경우 무시
  if (!event.target.classList.contains('cell')) return;
  
  const row = parseInt(event.target.dataset.row);
  const col = parseInt(event.target.dataset.col);
  
  // 보드 업데이트
  if (updateBoard(row, col, gameState.currentPlayer)) {
    // 승리 확인
    const winner = checkWinner();
    if (winner) {
      endGame(winner);
      return;
    }
    
    // 무승부 확인
    if (checkDraw()) {
      endGame('draw');
      return;
    }
    
    // 플레이어 전환
    switchPlayer();
    
    // UI 업데이트
    renderBoard();
    updateGameStatus();
  }
}

/**
 * 보드 상태 업데이트 함수
 * 지정된 위치에 현재 플레이어의 심볼을 표시합니다.
 * 
 * @param {number} row - 행 인덱스 (0-2)
 * @param {number} col - 열 인덱스 (0-2)
 * @param {string} player - 플레이어 심볼 ('X' 또는 'O')
 * @returns {boolean} - 업데이트 성공 여부
 */
function updateBoard(row, col, player) {
  // 범위 검사
  if (row < 0 || row > 2 || col < 0 || col > 2) {
    return false;
  }
  
  // 이미 표시된 셀인지 확인
  if (gameState.board[row][col] !== null) {
    return false;
  }
  
  // 보드 업데이트
  gameState.board[row][col] = player;
  return true;
}

/**
 * 플레이어 전환 함수
 * 현재 플레이어를 X에서 O로, 또는 O에서 X로 전환합니다.
 */
function switchPlayer() {
  gameState.currentPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';
}

/**
 * 승리 조건 확인 함수
 * 현재 보드 상태에서 승자가 있는지 확인합니다.
 * 
 * @returns {string|null} - 승자 ('X', 'O') 또는 승자가 없는 경우 null
 */
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

/**
 * 무승부 확인 함수
 * 모든 셀이 채워졌는지 확인합니다.
 * 
 * @returns {boolean} - 무승부 여부
 */
function checkDraw() {
  // 모든 셀이 채워졌는지 확인
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (gameState.board[row][col] === null) {
        return false;
      }
    }
  }
  
  // 승자가 없는 경우 무승부
  return checkWinner() === null;
}

/**
 * 게임 종료 함수
 * 게임 결과를 처리하고 UI를 업데이트합니다.
 * 
 * @param {string} result - 게임 결과 ('X', 'O', 또는 'draw')
 */
function endGame(result) {
  gameState.gameOver = true;
  gameState.winner = result;
  
  // 점수 업데이트
  updateScore(result);
  
  // UI 업데이트
  updateGameStatus();
  renderBoard();
}

/**
 * 게임 상태 UI 업데이트 함수
 * 현재 게임 상태에 따라 UI를 업데이트합니다.
 */
function updateGameStatus() {
  const statusElement = document.getElementById('game-status');
  const currentPlayerElement = document.getElementById('current-player');
  
  if (gameState.gameOver) {
    if (gameState.winner === 'draw') {
      statusElement.textContent = '게임 결과: 무승부!';
    } else {
      statusElement.textContent = `게임 결과: ${gameState.winner} 승리!`;
    }
  } else {
    statusElement.textContent = '현재 차례: ';
    currentPlayerElement.textContent = gameState.currentPlayer;
  }
  
  // 점수판 업데이트
  const scores = loadScores();
  document.getElementById('score-x').textContent = scores.X;
  document.getElementById('score-o').textContent = scores.O;
  document.getElementById('score-draw').textContent = scores.draw;
}

/**
 * 게임 재시작 함수
 * 게임 보드와 상태를 초기화하고 UI를 업데이트합니다.
 */
function resetGame() {
  // 게임 상태 초기화
  gameState = {
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ],
    currentPlayer: 'X',
    gameOver: false,
    winner: null
  };
  
  // UI 업데이트
  renderBoard();
  updateGameStatus();
}

// 페이지 로드 시 게임 초기화
document.addEventListener('DOMContentLoaded', initGame);
