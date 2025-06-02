/**
 * 틱택토 로컬 스토리지 관리
 * 
 * 이 파일은 틱택토 게임의 점수 데이터를 로컬 스토리지에 저장하고 불러오는 기능을 구현합니다.
 * TDD 방식으로 개발되었으며, 점수 저장, 불러오기, 초기화 기능을 포함합니다.
 */

// 로컬 스토리지 키
const STORAGE_KEY = 'tictactoe_scores';

/**
 * 점수 불러오기 함수
 * 로컬 스토리지에서 게임 점수를 불러옵니다.
 * 
 * @returns {Object} - 게임 점수 객체 {X: number, O: number, draw: number}
 */
function loadScores() {
  // 로컬 스토리지에서 점수 데이터 불러오기
  const scoresJson = localStorage.getItem(STORAGE_KEY);
  
  // 데이터가 없으면 기본값 반환
  if (!scoresJson) {
    return {
      X: 0,
      O: 0,
      draw: 0
    };
  }
  
  // JSON 파싱하여 반환
  try {
    const scores = JSON.parse(scoresJson);
    return {
      X: parseInt(scores.X) || 0,
      O: parseInt(scores.O) || 0,
      draw: parseInt(scores.draw) || 0
    };
  } catch (error) {
    console.error('점수 데이터 파싱 오류:', error);
    return {
      X: 0,
      O: 0,
      draw: 0
    };
  }
}

/**
 * 점수 저장 함수
 * 게임 점수를 로컬 스토리지에 저장합니다.
 * 
 * @param {Object} scores - 게임 점수 객체 {X: number, O: number, draw: number}
 */
function saveScores(scores) {
  try {
    // 점수 객체를 JSON 문자열로 변환하여 저장
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  } catch (error) {
    console.error('점수 데이터 저장 오류:', error);
  }
}

/**
 * 점수 업데이트 함수
 * 게임 결과에 따라 점수를 업데이트합니다.
 * 
 * @param {string} result - 게임 결과 ('X', 'O', 또는 'draw')
 */
function updateScore(result) {
  // 현재 점수 불러오기
  const scores = loadScores();
  
  // 결과에 따라 점수 증가
  if (result === 'X' || result === 'O' || result === 'draw') {
    scores[result]++;
  }
  
  // 업데이트된 점수 저장
  saveScores(scores);
  
  // UI 업데이트 (점수판)
  updateScoreDisplay(scores);
}

/**
 * 점수판 UI 업데이트 함수
 * 현재 점수에 따라 점수판 UI를 업데이트합니다.
 * 
 * @param {Object} scores - 게임 점수 객체 {X: number, O: number, draw: number}
 */
function updateScoreDisplay(scores) {
  // DOM 요소가 존재하는 경우에만 업데이트
  if (document.getElementById('score-x')) {
    document.getElementById('score-x').textContent = scores.X;
    document.getElementById('score-o').textContent = scores.O;
    document.getElementById('score-draw').textContent = scores.draw;
  }
}

/**
 * 점수 초기화 함수
 * 게임 점수를 초기화합니다.
 */
function resetScores() {
  // 점수 초기화
  const scores = {
    X: 0,
    O: 0,
    draw: 0
  };
  
  // 초기화된 점수 저장
  saveScores(scores);
  
  // UI 업데이트
  updateScoreDisplay(scores);
}

// 페이지 로드 시 점수판 초기화
document.addEventListener('DOMContentLoaded', () => {
  const scores = loadScores();
  updateScoreDisplay(scores);
});
