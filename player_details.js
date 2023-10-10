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
        const urlParams = new URLSearchParams(window.location.search);
        const playerName = decodeURIComponent(urlParams.get('player'));
        if (playerName) {
            fetchPlayerInfo(playerName);
            fetchFramesInfo(playerName);
        } else {
            console.error('Player name is missing in URL parameters.');
        }
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
            const playerInfo = values.find(row => row[2] === playerName);
            if (playerInfo) {
                console.log('Player Info:', playerInfo);
                // TODO: Display player info on the webpage
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
            const framesData = values.filter(row =>
                [row[12], row[13], row[14], row[15], row[16], row[17]].includes(playerName)
            );
            if (framesData.length > 0) {
                console.log('Frames Info:', framesData);
                // TODO: Display frames info on the webpage
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
