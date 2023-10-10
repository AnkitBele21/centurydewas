// Your API Key and Sheet ID
const API_KEY = 'AIzaSyCfxg14LyZ1hrs18WHUuGOnSaJ_IJEtDQc';
const SHEET_ID = '1Bcl1EVN-7mXUP7M1FL9TBB5v4O4AFxGTVB6PwqOn9ss';
const PLAYER_SHEET_NAME = 'Snookerplus*';
const FRAMES_SHEET_NAME = 'Frames';

// Initialize Google Sheets API client
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function () {
        // Retrieve player name from URL parameter
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

// Function to fetch and display player info
function fetchPlayerInfo(playerName) {
    // ... (Code to fetch player info from Google Sheets)
}

// Function to fetch and display frames info
function fetchFramesInfo(playerName) {
    // ... (Code to fetch frames info from Google Sheets)
}

// Display functions for player and frame info
function displayPlayerInfo(playerInfo) {
    // ... (Code to display player info on the webpage)
}

function displayFramesInfo(framesData) {
    // ... (Code to display frame info on the webpage)
}

// Call the initClient function to start fetching data
initClient();
