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
        // Example usage (replace 'John Doe' with the desired player name)
        const playerName = 'John Doe'; // TODO: Get this from user input or another source
        fetchPlayerInfo(playerName);
        fetchFramesInfo(playerName);
    });
}

// Function to fetch and display player info
function fetchPlayerInfo(playerName) {
    // ... (same as in your previous code)
}

// Function to fetch and display frames info
function fetchFramesInfo(playerName) {
    // ... (same as in your previous code)
}

// Display functions from the previous message
function displayPlayerInfo(playerInfo) {
    // ... (same as in the previous message)
}

function displayFramesInfo(framesData) {
    // ... (same as in the previous message)
}

// Call the initClient function to start fetching data
initClient();
