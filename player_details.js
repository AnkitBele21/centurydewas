// Your API Key and Sheet ID
const API_KEY = 'AIzaSyCfxg14LyZ1hrs18WHUuGOnSaJ_IJEtDQc';
const SHEET_ID = '1Bcl1EVN-7mXUP7M1FL9TBB5v4O4AFxGTVB6PwqOn9ss';
const PLAYER_SHEET_NAME = 'Snookerplus*';
const FRAMES_SHEET_NAME = 'Frames';

// Function to fetch and display player info
function fetchPlayerInfo(playerName) {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: PLAYER_SHEET_NAME,
    }).then(function (response) {
        // Handle player info...
    }, function (response) {
        console.error('Error fetching data:', response.result.error.message);
    });
}

// Function to fetch and display frames info
function fetchFramesInfo(playerName) {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: FRAMES_SHEET_NAME,
    }).then(function (response) {
        // Handle frames info...
    }, function (response) {
        console.error('Error fetching data:', response.result.error.message);
    });
}

// Ensure the API is loaded before initializing
window.onload = function() {
    gapi.load('client', initClient);
};

// Initialize Google Sheets API client
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function () {
        // Example usage (replace 'John Doe' with the desired player name)
        const playerName = 'John Doe';
        fetchPlayerInfo(playerName);
        fetchFramesInfo(playerName);
    });
}
