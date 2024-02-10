let scores = { player1: 0, player2: 0 };
let currentPlayer = 1; // Start with player 1
let onColor = false; // Start with red balls

const ballPoints = {
    red: 1,
    yellow: 2,
    green: 3,
    brown: 4,
    blue: 5,
    pink: 6,
    black: 7
};

function scoreBall(ball, player) {
    if (player !== currentPlayer) {
        alert("It's not your turn!");
        return;
    }
    if (ball !== 'red' && !onColor) {
        alert("You must pot a red ball first!");
        return;
    }
    if (ball === 'red' && onColor) {
        alert("You must pot a color ball now!");
        return;
    }
    scores[`player${player}`] += ballPoints[ball];
    updateScore(player);
    onColor = (ball === 'red') ? true : false;
    currentPlayer = (currentPlayer === 1) ? 2 : 1; // Switch turn
}

function foul(player) {
    const opponent = player === 1 ? 2 : 1;
    scores[`player${opponent}`] += 4; // Foul gives 4 points to the opponent
    updateScore(opponent);
    currentPlayer = opponent; // Switch turn to the opponent
}

function updateScore(player) {
    document.getElementById(`player${player}Score`).innerText = scores[`player${player}`];
}

// Initialize the game
updateScore(1);
updateScore(2);
