// Your API Key and Sheet ID
const API_KEY = 'AIzaSyCfxg14LyZ1hrs18WHUuGOnSaJ_IJEtDQc';
const SHEET_ID = '1Bcl1EVN-7mXUP7M1FL9TBB5v4O4AFxGTVB6PwqOn9ss';
const PLAYER_SHEET_NAME = 'snookerplus';
const FRAMES_SHEET_NAME = 'Frames';
const RANK_SHEET_NAME = 'Rank';

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const playerName = urlParams.get('player');
        
        if (playerName) {
            fetchPlayerInfo(playerName);
            fetchFramesInfo(playerName);
            fetchRankInfo(playerName);
        } else {
            console.error('Player name not provided.');
        }
    });
}

// [Your existing functions: fetchPlayerInfo, fetchFramesInfo, fetchRankInfo, displayPlayerInfo]

function displayFramesInfo(framesData, playerName) {
    const framesContainer = document.getElementById('framesInfo');
    framesData.reverse().forEach(frame => {
        const frameElement = document.createElement('div');
        frameElement.className = 'frame-card';

        const dateParts = frame[2].split("/");
        const formattedDate = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
        const dateStr = `${formattedDate.getDate()} ${formattedDate.toLocaleString('default', { month: 'short' })}, ${formattedDate.getFullYear()}`;
        
        const durationStr = `${frame[3]} Min`;
        const winner = frame[5];
        const loser = frame[34];
        const opponentName = winner === playerName ? loser : winner;

        if(winner === playerName) {
            frameElement.classList.add('winner');
        } else if(winner === "Rummy") {
            frameElement.classList.add('rummy');
        } else {
            frameElement.classList.add('loser');
        }

        frameElement.innerHTML = `
            <p>${dateStr}, Duration: ${durationStr}</p>
            <p>Opponent: ${opponentName}</p>
        `;
        framesContainer.appendChild(frameElement);
    });
}

function displayRankInfo(rankInfo) {
    document.getElementById('playerRank').innerText = `Rank: ${rankInfo[0]}`;
    document.getElementById('winRate').innerText = `Win Rate: ${rankInfo[4]}%`;
    document.getElementById('playerCard').style.backgroundColor = rankInfo[3];
}

gapi.load('client', initClient);
