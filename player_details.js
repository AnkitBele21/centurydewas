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
    }).then(function () {
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
    // ... (Same as before)
}

function fetchFramesInfo(playerName) {
    // ... (Same as before)
}

function fetchRankInfo(playerName) {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: RANK_SHEET_NAME,
    }).then(function (response) {
        const values = response.result.values;
        const rankInfo = values.find(row => row[1] === playerName); // Matching player name in column B
        if (rankInfo) {
            displayRankInfo(rankInfo);
        } else {
            console.log('Rank info not found.');
        }
    }, function (response) {
        console.error('Error fetching rank data:', response.result.error.message);
    });
}

function displayPlayerInfo(playerInfo) {
    console.log("Player Info:", playerInfo);  // Debugging: Log the player info
    
    const playerNameElement = document.getElementById('playerName');
    const playerBalanceElement = document.getElementById('totalMoney');
    
    if(playerNameElement && playerInfo[2]) {
        playerNameElement.innerText = playerInfo[2]; // Assuming name is in column C
    } else {
        console.error("Element with id 'playerName' not found or player name is empty.");
    }
    
    if(playerBalanceElement && playerInfo[6]) {
        playerBalanceElement.innerText = `Balance: ₹ ${playerInfo[6]}`; // Assuming balance is in column G
    } else {
        console.error("Element with id 'totalMoney' not found or balance is empty.");
    }
}

function displayRankInfo(rankInfo) {
    console.log("Rank Info:", rankInfo);  // Debugging: Log the rank info
    
    const playerRankElement = document.getElementById('playerRank');
    const playerWinRateElement = document.getElementById('winRate');
    const playerCardElement = document.getElementById('playerCard');
    
    if(playerRankElement && rankInfo[0]) {
        playerRankElement.innerText = `Rank: ${rankInfo[0]}`; // Assuming Rank is in column A
    } else {
        console.error("Element with id 'playerRank' not found or rank is empty.");
    }
    
    if(playerWinRateElement && rankInfo[4]) {
        playerWinRateElement.innerText = `Win Rate: ${rankInfo[4]}%`; // Assuming Win Rate is in column E
    } else {
        console.error("Element with id 'winRate' not found or win rate is empty.");
    }
    
    if(playerCardElement && rankInfo[3]) {
        playerCardElement.style.backgroundColor = rankInfo[3]; // Assuming Color is in column D
    } else {
        console.error("Element with id 'playerCard' not found or color is empty.");
    }
}
function fetchFramesInfo(playerName) {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: FRAMES_SHEET_NAME,
    }).then(function (response) {
        const values = response.result.values;
        const framesData = values.filter(row => 
            [row[5], row[34]].includes(playerName) // Assuming player names are in columns F and AH
        );
        if (framesData.length > 0) {
            displayFramesInfo(framesData, playerName);
        } else {
            console.log('No frames found for player.');
        }
    }, function (response) {
        console.error('Error fetching frames data:', response.result.error.message);
    });
}

function displayFramesInfo(framesData, playerName) {
    const framesContainer = document.getElementById('framesInfo');
    
    // Reverse the framesData array to display the newest frames first
    framesData.reverse().forEach(frame => {
        const frameElement = document.createElement('div');
        frameElement.className = 'frame-card';

        const dateParts = frame[2].split("/");
        const formattedDate = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
        const dateStr = `${formattedDate.getDate()} ${formattedDate.toLocaleString('default', { month: 'short' })}, ${formattedDate.getFullYear()}`;
        const durationStr = `${frame[3]} Min`;

        // Check if the displayed player is the winner and apply a special class
        const winnerIsPlayer = frame[5] === playerName;
        const winnerClass = winnerIsPlayer ? 'winner-you' : 'winner';

        frameElement.innerHTML = `
            <p>${dateStr}, ${durationStr}</p>
            <p class="${winnerClass}">Winner: ${frame[5]}</p>
        `;
        framesContainer.appendChild(frameElement);
    });
}

// Load the Google API client and call initClient
gapi.load('client', initClient);
