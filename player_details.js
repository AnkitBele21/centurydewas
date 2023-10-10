// player_details.js
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

async function fetchData(sheetName, playerName, callback) {
    try {
        const response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: SHEET_ID,
            range: `${sheetName}`,
        });
        const values = response.result.values;
        callback(values, playerName);
    } catch (error) {
        console.error(`Error fetching data from ${sheetName}:`, error.result ? error.result.error.message : error);
    }
}

function displayPlayerInfo(values, playerName) {
    const playerInfo = values.find(row => row[2] === playerName);
    if (playerInfo) {
        document.getElementById('playerName').innerText = playerInfo[2];
        document.getElementById('totalMoney').innerText = `Balance: ₹ ${playerInfo[6]}`;
    } else {
        console.log('Player info not found.');
    }
}

function displayFramesInfo(framesData, playerName) {
    const framesContainer = document.getElementById('framesInfo');
    
    // Reverse the framesData array to display the newest frames first
    framesData.reverse().forEach(frame => {
        const frameElement = document.createElement('div');
        frameElement.className = 'frame-card';

        // Format the date
        const dateParts = frame[2].split("/");
        const formattedDate = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
        const dateStr = `${formattedDate.getDate()} ${formattedDate.toLocaleString('default', { month: 'short' })}, ${formattedDate.getFullYear()}`;
        
        const durationStr = `${frame[3]} Min`;
        const winner = frame[5];
        const loser = frame[34];

        // Determine the opponent's name
        const opponentName = winner === playerName ? loser : winner;

        // Determine the frame card color
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


function displayRankInfo(values, playerName) {
    const rankInfo = values.find(row => row[1] === playerName);
    if (rankInfo) {
        document.getElementById('playerRank').innerText = `Rank: ${rankInfo[0]}`;
        document.getElementById('winRate').innerText = `Win Rate: ${rankInfo[4]}%`;
        document.getElementById('playerCard').style.backgroundColor = rankInfo[3];
    } else {
        console.log('Rank info not found.');
    }
}

function fetchPlayerInfo(playerName) {
    fetchData(PLAYER_SHEET_NAME, playerName, displayPlayerInfo);
}

function fetchFramesInfo(playerName) {
    fetchData(FRAMES_SHEET_NAME, playerName, displayFramesInfo);
}

function fetchRankInfo(playerName) {
    fetchData(RANK_SHEET_NAME, playerName, displayRankInfo);
}

// Load the Google API client and call initClient
gapi.load('client', initClient);
