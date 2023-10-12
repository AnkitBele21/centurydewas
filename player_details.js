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
function fetchPlayerInfo(playerName) {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: `${PLAYER_SHEET_NAME}`,
    }).then((response) => {
        const values = response.result.values;
        const playerInfo = values.find(row => row[2] === playerName); // Assuming name is in column C
        if (playerInfo) {
            displayPlayerInfo(playerInfo);
        } else {
            console.log('Player info not found.');
        }
    }, (response) => {
        console.error('Error fetching player data:', response.result.error.message);
    });
}
function fetchFramesInfo(playerName) {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: `${FRAMES_SHEET_NAME}`,
    }).then((response) => {
        const values = response.result.values;
        const framesData = values.filter(row => [row[5], row[33]].includes(playerName)); // Assuming player names are in columns F and AH
        if (framesData.length > 0) {
            displayFramesInfo(framesData, playerName);
        } else {
            console.log('No frames found for player.');
        }
    }, (response) => {
        console.error('Error fetching frames data:', response.result.error.message);
    });
}
function fetchRankInfo(playerName) {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: `${RANK_SHEET_NAME}`,
    }).then((response) => {
        const values = response.result.values;
        const rankInfo = values.find(row => row[1] === playerName); // Matching player name in column B
        if (rankInfo) {
            displayRankInfo(rankInfo);
        } else {
            console.log('Rank info not found.');
        }
    }, (response) => {
        console.error('Error fetching rank data:', response.result.error.message);
    });
}
function displayPlayerInfo(playerInfo) {
    document.getElementById('playerName').innerText = playerInfo[2]; // Assuming name is in column C
    const totalMoneyElement = document.getElementById('totalMoney');
    totalMoneyElement.innerText = `Balance: ₹ ${playerInfo[6]}`; // Assuming balance is in column G
    
    // Check if balance is more than 0 and color it red
    if (parseInt(playerInfo[6]) > 0) {
        totalMoneyElement.classList.add('positive');
    } else {
        totalMoneyElement.classList.remove('positive');
    }
    
    // Check if balance is more than 2000 and display warning
    if (parseInt(playerInfo[6]) > 2000) {
        document.getElementById('warning').style.display = 'block';
    } else {
        document.getElementById('warning').style.display = 'none';
    }
}


// [Existing JavaScript here]

// [Rest of the JavaScript code remains the same]

// [Previous JS code remains the same]

// [Previous JS code remains the same]

// [Previous JavaScript remains the same]

function displayFramesInfo(framesData, playerName) {
    const framesContainer = document.getElementById('framesInfo');

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

        // Check if the frame was a Rummy
        if (opponentName === "Rummy") {
            frameElement.innerHTML = `
                <p><span class="icon">&#128197;</span>${dateStr}, <span class="icon">&#128337;</span>${durationStr}</p>
                <p>Format: Rummy</p>
            `;
        } else {
            const isWinner = frame[5] === playerName;
            const currencyValue = frame[9] || "LP";
            const sPlusValue = isWinner ? frame[50] : frame[51];
            const currencyDisplay = isWinner ? `+₹${currencyValue}` : `-₹${currencyValue}`;
            const sPlusDisplay = `S+${sPlusValue}`;

            frameElement.innerHTML = `
                <p><span class="icon">&#128197;</span>${dateStr}, <span class="icon">&#128337;</span>${durationStr}</p>
                <p>Opponent: ${opponentName}</p>
                <p>${currencyDisplay}, ${sPlusDisplay}</p>
            `;
        }
        framesContainer.appendChild(frameElement);
    });
}





function displayRankInfo(rankInfo) {
    document.getElementById('playerRank').innerText = `Rank: ${rankInfo[0]}`; 
    document.getElementById('winRate').innerText = `Win Rate: ${rankInfo[4]}%`; 
    document.getElementById('playerCard').style.backgroundColor = rankInfo[3]; 
}

// Load the Google API client and call initClient
gapi.load('client', initClient);
