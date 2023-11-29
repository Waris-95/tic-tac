let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];

// Function to handle player clicks on the squares
function handleSquareClick(index) {
    if (gameBoard[index] === "") {
        // Square is empty, proceed with the turn
        gameBoard[index] = currentPlayer;
        updateSquare(index);

        // Check for a win or tie
        if (checkWin() || checkTie()) {
            endGame();
        } else {
            // Switch to the next player
            switchPlayer();
        }
    }
}

// Function to switch to the next player
function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// Function to update the square with the current player's symbol
function updateSquare(index) {
    const squareElement = $(`#square-${index}`);
    squareElement.empty(); // Clear any existing content

    const imageUrl = currentPlayer === "X" ? "url('https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg')" : "url('https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg')";
    
    squareElement.css("background-image", imageUrl);
}

// Function to check for a win
function checkWin() {
    // Implement your logic for checking a win
    // Example: Check rows, columns, and diagonals for a match
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] === currentPlayer && gameBoard[b] === currentPlayer && gameBoard[c] === currentPlayer) {
            announceWinner();
            return true;
        }
    }
    
    return false;
}

// Function to check for a tie
function checkTie() {
    return gameBoard.every(square => square !== "");
}

// Function to announce the winner or tie
function announceWinner() {
    const winnerText = currentPlayer === "X" ? "Winner: X" : "Winner: O";
    $("#winner-text").text(winnerText);
}

// Function to end the game
function endGame() {
    announceWinner();
    $(".square").off("click"); // Disable clicks on squares
}

// Event listener for square clicks
$(".square").on("click", function() {
    const index = $(this).index();
    handleSquareClick(index);
});

// Additional code for Phase 2 and beyond
// ...
