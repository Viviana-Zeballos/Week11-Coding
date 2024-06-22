// Declared a variable to select all squares on the board
const squares = document.querySelectorAll('.square');

// Initialize the current player and game state
let currentPlayer = 'X';
let gameActive = true;

// Declared the turn indicator element
const turnIndicator = document.getElementById('turn-indicator');

// This function is used to handle the player's click to the squares
const handleSquareClick = (clickedSquareEvent) => {
    const clickedSquare = clickedSquareEvent.target;
    const clickedSquareIndex = parseInt(clickedSquare.getAttribute('id').substring(7)) - 1;

    // Check if the square is already taken or if the game is not active
    if (clickedSquare.textContent !== '' || !gameActive) {
        return;
    }

    // Place the current player's mark in the chosen square
    clickedSquare.textContent = currentPlayer;

    // Check for a win
    if (checkWin()) {
        announceWinner();
        gameActive = false;
        return;
    }

    // Check for a tie
    if (checkDraw()) {
        announceDraw();
        gameActive = false;
        return;
    }

    // Switch the players and update the turn indicator
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    turnIndicator.textContent = `It's ${currentPlayer}'s turn!`;
};

// This is a function to check for a win, it lists out all the possibilities
const checkWin = () => {
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

    for (let condition of winningConditions) {
        let [a, b, c] = condition;
        if (
            squares[a].textContent !== '' &&
            squares[a].textContent === squares[b].textContent &&
            squares[a].textContent === squares[c].textContent
        ) {
            return true;
        }
    }
    return false;
};

// This function announces the winner, if there is one
const announceWinner = () => {
    alert(`Player ${currentPlayer} wins!`);
};

// This function checks for a tie
const checkDraw = () => {
    return [...squares].every(square => square.textContent !== '');
};

// This function announces a tie if there is one
const announceDraw = () => {
    alert("It's a draw!");
};

// Add click event listener to each square
squares.forEach(square => {
    square.addEventListener('click', handleSquareClick);
});

// This function resets the game
const playAgain = () => {
    squares.forEach(square => {
        square.textContent = '';
    });
    currentPlayer = 'X';
    gameActive = true;
    turnIndicator.textContent = `It's ${currentPlayer}'s turn!`;
};
