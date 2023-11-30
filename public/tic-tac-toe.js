$(document).ready(function () {
    let currentPlayer;
    let gameBoard;

    // Event listener for the square clicks
    $(".square").on("click", function () {
        if (gameBoard) {
            const index = $(this).index();
            handleSquareClick(index);
        }
    });

    // Event listener for the new game button
    $("#new-game").on("click", function () {
        startNewGame();
    });

    // Function to initialize a new game
    function startNewGame() {
        currentPlayer = Math.random() < 0.5 ? "X" : "O";
        gameBoard = ["", "", "", "", "", "", "", "", ""];

        // Clear the board and reset the UI
        $(".square").empty().css("background-image", "");
        $("#winner-text").text(`Current Player: ${currentPlayer}`);

        // Enable clicks on squares
        $(".square").on("click", function () {
            if (gameBoard) {
                const index = $(this).index();
                handleSquareClick(index);
            }
        });

        // If the computer is Player X, make its move
        if (currentPlayer === "X") {
            computerMove();
        }
    }

    // Function to handle player clicks on the squares
    function handleSquareClick(index) {
        if (gameBoard[index] === "" && currentPlayer !== "X") {
            // Square is empty and it's not the computer's turn, proceed with the turn
            gameBoard[index] = currentPlayer;
            updateSquare(index);

            // Check for a win or tie
            if (checkWin() || checkTie()) {
                endGame();
            } else {
                // Switch to the next player
                switchPlayer();

                // If the computer is the next player, make its move
                if (currentPlayer === "X") {
                    computerMove();
                }
            }
        }
    }

    // Function to switch to the next player
    function switchPlayer() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        $("#winner-text").text(`Current Player: ${currentPlayer}`);
    }

    // Function to make the computer's move
    function computerMove() {
        const emptySquares = gameBoard.reduce((acc, value, index) => {
            if (value === "") {
                acc.push(index);
            }
            return acc;
        }, []);

        // Randomly select an empty square for the computer's move
        const randomIndex = Math.floor(Math.random() * emptySquares.length);
        const computerIndex = emptySquares[randomIndex];

        // Simulate a delay to make the computer's move visible
        setTimeout(() => {
            gameBoard[computerIndex] = "X";
            updateSquare(computerIndex);

            // Check for a win or tie after the computer's move
            if (checkWin() || checkTie()) {
                endGame();
            } else {
                // Switch to the next player
                switchPlayer();
            }
        }, 500);
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

    // Start a new game on page load
    startNewGame();
});
