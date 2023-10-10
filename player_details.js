// Your API Key and Sheet ID
const API_KEY = 'AIzaSyCfxg14LyZ1hrs18WHUuGOnSaJ_IJEtDQc';
const SHEET_ID = '1Bcl1EVN-7mXUP7M1FL9TBB5v4O4AFxGTVB6PwqOn9ss';
const PLAYER_SHEET_NAME = 'Snookerplus*';
const FRAMES_SHEET_NAME = 'Frames';

// Initialize Google Sheets API client
function initClient() {
    // Initialize API client and fetch data...
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

// Function to fetch and display player info
function fetchPlayerInfo(playerName) {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: PLAYER_SHEET_NAME,
    }).then(function (response) {
        const values = response.result.values;
        if (values && values.length > 0) {
            // Find the player by name in columns C (assuming it's in column C) and G
            const playerInfo = values.find(row => row[2] === playerName || row[6] === playerName);

            if (playerInfo) {
                // Player found, you can access their data in playerInfo.
                // playerInfo[2] contains the player name in column C.
                // playerInfo[6] contains the player name in column G.
                console.log('Player Info:', playerInfo);
            } else {
                console.log('Player not found.');
            }
        } else {
            console.log('No data found.');
        }
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
        const values = response.result.values;
        if (values && values.length > 0) {
            // Filter frames data where the player's name is in columns M, N, O, P, Q, R
            const framesData = values.filter(row =>
                [row[12], row[13], row[14], row[15], row[16], row[17]].includes(playerName)
            );

            if (framesData.length > 0) {
                // Player found in frames, you can access the frames data in framesData.
                // Each row in framesData represents a frame.
                console.log('Frames Info:', framesData);
            } else {
                console.log('Player not found in frames.');
            }
        } else {
            console.log('No data found.');
        }
    }, function (response) {
        console.error('Error fetching data:', response.result.error.message);
    });
}

// Call the initClient function to start fetching data
initClient();
