// Your API Key and Sheet ID
const API_KEY = 'AIzaSyCfxg14LyZ1hrs18WHUuGOnSaJ_IJEtDQc';
const SHEET_ID = '1Bcl1EVN-7mXUP7M1FL9TBB5v4O4AFxGTVB6PwqOn9ss';
const PLAYER_SHEET_NAME = 'snookerplus';
const FRAMES_SHEET_NAME = 'Frames';

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function () {
        const urlParams = new URLSearchParams(window.location.search);
        const playerName = urlParams.get('player');
        
        if (playerName) {
            fetchPlayerInfo(playerName);
            fetchFramesInfo(playerName);
        } else {
            console.error('Player name not provided.');
        }
    });
}

function fetchPlayerInfo(playerName) {
    // ... (No changes here)
}

function fetchFramesInfo(playerName) {
    // ... (No changes here)
}

function displayPlayerInfo(playerInfo) {
    // ... (No changes here)
}

function displayFramesInfo(playerFrames) {
    const framesInfoDiv = document.getElementById('framesInfo');
    playerFrames.forEach(frame => {
        const frameCard = document.createElement('div');
        frameCard.className = 'frame-card';

        const winnerInfo = document.createElement('p');
        winnerInfo.innerText = `Winner: ${frame[5]}`;

        const frameDate = document.createElement('p');
        frameDate.className = 'frame-date';
        const date = new Date(frame[2]);
        frameDate.innerText = `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}, ${frame[3]} Min`;

        frameCard.appendChild(frameDate);
        frameCard.appendChild(winnerInfo);
        framesInfoDiv.appendChild(frameCard);
    });
}

gapi.load('client', initClient);
