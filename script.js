const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('resetBtn');
let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let gameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

resetBtn.addEventListener('click', resetGame);

function handleCellClick(event) {
  const cell = event.target;
  const cellIndex = parseInt(cell.getAttribute('data-index'));

  if (gameState[cellIndex] !== null || !gameActive) {
    return;
  }

  gameState[cellIndex] = currentPlayer;
  cell.innerText = currentPlayer;

  if (checkWin()) {
    alert(`${currentPlayer} wins!`);
    gameActive = false;
    return;
  }

  if (gameState.every(cell => cell !== null)) {
    alert('Draw!');
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
  return winningConditions.some(condition => {
    return condition.every(index => {
      return gameState[index] === currentPlayer;
    });
  });
}

function resetGame() {
  gameState = Array(9).fill(null);
  cells.forEach(cell => cell.innerText = '');
  currentPlayer = 'X';
  gameActive = true;
}
