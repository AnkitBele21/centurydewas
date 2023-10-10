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
            const playerInfo = values.find(row => row[2] === playerName);

            if (playerInfo) {
                document.getElementById('playerName').textContent = playerInfo[2]; // Name
                document.getElementById('totalMoney').textContent = `Total Money: ${playerInfo[6]}`; // Total Money
                // Add more fields as per your requirement
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
                const framesList = document.getElementById('frames');
                framesData.forEach(frame => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `Date: ${frame[2]}, Duration: ${frame[3]} mins, Winner: ${frame[5]}`;
                    framesList.appendChild(listItem);
                });
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
