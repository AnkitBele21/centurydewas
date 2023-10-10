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
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: PLAYER_SHEET_NAME,
    }).then(function (response) {
        const values = response.result.values;
        const playerInfo = values.find(row => row[2] === playerName);
        if (playerInfo) {
            displayPlayerInfo(playerInfo);
        } else {
            console.log('Player not found.');
        }
    }, function (response) {
        console.error('Error fetching player data:', response.result.error.message);
    });
}

function fetchFramesInfo(playerName) {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: FRAMES_SHEET_NAME,
    }).then(function (response) {
        const values = response.result.values;
        const framesData = values.filter(row => 
            [row[12], row[13], row[14], row[15], row[16], row[17]].includes(playerName)
        );
        if (framesData.length > 0) {
            displayFramesInfo(framesData);
        } else {
            console.log('No frames found for player.');
        }
    }, function (response) {
        console.error('Error fetching frames data:', response.result.error.message);
    });
}

function displayPlayerInfo(playerInfo) {
    document.getElementById('playerName').innerText = playerInfo[2];
    document.getElementById('totalMoney').innerText = `Total Money: ${playerInfo[6]}`;
}

// ... (previous JavaScript) ...

function displayFramesInfo(playerFrames) {
    const framesInfoDiv = document.getElementById('framesInfo');
    const playerName = document.getElementById('playerName').innerText; // Get the displayed player name
    
    playerFrames.forEach(frame => {
        const frameCard = document.createElement('div');
        frameCard.className = 'frame-card';

        const frameDate = document.createElement('p');
        frameDate.className = 'frame-date';
        const date = new Date(frame[2]);
        frameDate.innerText = `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}, ${frame[3]} Min`;

        const winnerInfo = document.createElement('p');
        winnerInfo.className = 'winner';
        winnerInfo.innerText = `Winner: ${frame[5]}`;
        
        // Check if the displayed player is the winner and apply a special class
        if(frame[5] === playerName) {
            winnerInfo.classList.add('you');
        }

        frameCard.appendChild(frameDate);
        frameCard.appendChild(winnerInfo);
        framesInfoDiv.appendChild(frameCard);
    });
}

// ... (rest of the JavaScript) ...


// Load the Google API client and call initClient
gapi.load('client', initClient);
