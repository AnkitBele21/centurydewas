// Your API Key and Sheet ID
const API_KEY = 'AIzaSyCfxg14LyZ1hrs18WHUuGOnSaJ_IJEtDQc';
const SHEET_ID = '1Bcl1EVN-7mXUP7M1FL9TBB5v4O4AFxGTVB6PwqOn9ss';
const PLAYER_SHEET_NAME = 'snookerplus';
const FRAMES_SHEET_NAME = 'Frames';

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
        } else {
            console.error('Player name not provided.');
        }
    });
}

function fetchPlayerInfo(playerName) {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: PLAYER_SHEET_NAME,
    }).then(function (response) {
        const values = response.result.values;
        const playerInfo = values.find(row => row[2] === playerName); // Assuming name is in column C
        if (playerInfo) {
            displayPlayerInfo(playerInfo);
        } else {
            console.log('Player not found.');
        }
    }, function (response) {
        console.error('Error fetching player data:', response.result.error.message);
    });
}

function fetchFramesInfo(playerName) {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: FRAMES_SHEET_NAME,
    }).then(function (response) {
        const values = response.result.values;
        const framesData = values.filter(row => 
            [row[12], row[13], row[14], row[15], row[16], row[17]].includes(playerName)
        );
        if (framesData.length > 0) {
            displayFramesInfo(framesData);
        } else {
            console.log('No frames found for player.');
        }
    }, function (response) {
        console.error('Error fetching frames data:', response.result.error.message);
    });
}

function displayPlayerInfo(playerInfo) {
    document.getElementById('playerName').innerText = playerInfo[2]; // Assuming name is in column C
    document.getElementById('totalMoney').innerText = `Total Money: ${playerInfo[6]}`; // Assuming total money is in column G
    // Add more player info display logic as needed
}

function displayFramesInfo(framesData) {
    const framesContainer = document.getElementById('framesInfo');
    framesData.forEach(frame => {
        const frameElement = document.createElement('div');
        frameElement.innerText = `Date: ${frame[2]}, Duration: ${frame[3]}, Winner: ${frame[5]}`; // Adjust column indices as needed
        framesContainer.appendChild(frameElement);
    });
}

gapi.load('client', initClient);
