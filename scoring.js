let scores = { player1: 0, player2: 0 };

function scoreRed(player) {
    scores[`player${player}`] += 1;
    updateScore(player);
}

function scoreColor(player, points) {
    scores[`player${player}`] += points;
    updateScore(player);
}

function foul(player) {
    const opponent = player === 1 ? 2 : 1;
    scores[`player${opponent}`] += 4;
    updateScore(opponent);
}

function updateScore(player) {
    document.getElementById(`player${player}Score`).innerText = scores[`player${player}`];
}
