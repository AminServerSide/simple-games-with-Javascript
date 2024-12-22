// Select all required elements
const selectBox = document.querySelector(".select-box"),
    selectBtnX = selectBox.querySelector(".options .playerX"),
    selectBtnO = selectBox.querySelector(".options .playerO"),
    playBoard = document.querySelector(".play-board"),
    players = document.querySelector(".players"),
    allBox = document.querySelectorAll("section span"),
    resultBox = document.querySelector(".result-box"),
    wonText = resultBox.querySelector(".won-text"),
    replayBtn = resultBox.querySelector("button");

// Variables for game state
let playerXIcon = "fas fa-times"; // FontAwesome icon class for 'X'
let playerOIcon = "far fa-circle"; // FontAwesome icon class for 'O'
let playerSign = "X"; // Default starting player is 'X'

// Initialize the game
window.onload = () => {
    // Add click event to all boxes
    allBox.forEach(box => {
        box.addEventListener("click", () => clickedBox(box));
    });
};

// Player X selection
selectBtnX.onclick = () => {
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
};

// Player O selection
selectBtnO.onclick = () => {
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
    players.classList.add("active", "player");
};

// Handle user click
function clickedBox(element) {
    // Add appropriate icon based on the current player's turn
    if (playerSign === "X") {
        element.innerHTML = `<i class="${playerXIcon}"></i>`;
        element.setAttribute("id", "X");
        players.classList.add("active"); // Highlight Player O's turn
        playerSign = "O"; // Switch to Player O
    } else {
        element.innerHTML = `<i class="${playerOIcon}"></i>`;
        element.setAttribute("id", "O");
        players.classList.remove("active"); // Highlight Player X's turn
        playerSign = "X"; // Switch to Player X
    }
    element.style.pointerEvents = "none"; // Disable further clicks on this box
    selectWinner(); // Check for a winner or draw
}

// Get the ID of a box
function getIdVal(classname) {
    return document.querySelector(".box" + classname).id;
}

// Check if a winning combination is met
function checkIdSign(val1, val2, val3, sign) {
    return getIdVal(val1) === sign && getIdVal(val2) === sign && getIdVal(val3) === sign;
}

// Determine the winner
function selectWinner() {
    const winningCombinations = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9],
        [1, 4, 7], [2, 5, 8], [3, 6, 9],
        [1, 5, 9], [3, 5, 7]
    ];

    const isWinner = winningCombinations.some(combination => checkIdSign(...combination, playerSign === "X" ? "O" : "X"));

    if (isWinner) {
        setTimeout(() => {
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
            wonText.innerHTML = `Player <p>${playerSign === "X" ? "O" : "X"}</p> won the game!`;
        }, 700);
    } else if ([...allBox].every(box => box.id)) { // Check for a draw
        setTimeout(() => {
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
            wonText.textContent = "Match has been drawn!";
        }, 700);
    }
}

// Replay button click event
replayBtn.onclick = () => {
    window.location.reload(); // Reload the page
};
