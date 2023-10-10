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

// ... (No changes in fetchPlayerInfo and fetchRankInfo functions) ...

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

function displayFramesInfo(framesData, playerName) {
    const framesContainer = document.getElementById('framesTableBody');
    
    // Reverse the framesData array to display the newest frames first
    framesData.reverse().forEach(frame => {
        const frameRow = document.createElement('tr');

        // Format the date
        const dateParts = frame[2].split("/");
        const formattedDate = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
        const dateStr = `${formattedDate.getDate()} ${formattedDate.toLocaleString('default', { month: 'short' })}, ${formattedDate.getFullYear()}`;
        
        const durationStr = `${frame[3]} Min`;
        const winner = frame[5];
        const loser = frame[33];

        // Determine the opponent's name
        const opponentName = winner === playerName ? loser : winner;

        // Determine the frame card color
        if(winner === playerName) {
            frameRow.classList.add('winner');
        } else if(winner === "Rummy") {
            frameRow.classList.add('rummy');
        } else {
            frameRow.classList.add('loser');
        }

        frameRow.innerHTML = `
            <td>${dateStr}</td>
            <td>${durationStr}</td>
            <td>${opponentName}</td>
            <td>${winner === playerName ? "Won" : "Lost"}</td>
        `;
        framesContainer.appendChild(frameRow);
    });
}

// ... (No changes in displayPlayerInfo and displayRankInfo functions) ...

// Load the Google API client and call initClient
gapi.load('client', initClient);
