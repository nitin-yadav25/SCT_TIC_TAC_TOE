let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
const statusDisplay = document.querySelector('#game-status');
const cells = document.querySelectorAll('.cell');

// Winning conditions
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Handle the player's click on a cell
function handleCellClick(clickedCell, index) {
    if (board[index] !== '' || !gameActive) return;

    board[index] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    checkResult();
}

// Check the result of the game
function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];

        if (a === '' || b === '' || c === '') continue;
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer} has won!`;
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        statusDisplay.textContent = `Game ended in a draw!`;
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// AI move for the computer
function computerMove() {
    if (!gameActive) return;

    let availableCells = [];
    board.forEach((cell, index) => {
        if (cell === '') availableCells.push(index);
    });

    let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    let clickedCell = document.querySelector(`.cell[data-index='${randomIndex}']`);

    handleCellClick(clickedCell, randomIndex);
}

// Event listener for handling clicks on each cell
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(cell, index));
});

// Reset the game
document.querySelector('#reset-button').addEventListener('click', () => {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => (cell.textContent = ''));
    statusDisplay.textContent = '';
});

// Play against computer button
document.querySelector('#play-computer-button').addEventListener('click', () => {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    cells.forEach(cell => (cell.textContent = ''));
    statusDisplay.textContent = '';

    // After every move, trigger a computer move
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            if (gameActive && currentPlayer === 'O') {
                setTimeout(computerMove, 500); // Simulate a delay for the computer's move
            }
        });
    });
});
