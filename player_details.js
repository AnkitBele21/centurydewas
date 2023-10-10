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

function fetchPlayerInfo(playerName) {
    // Fetching and displaying player info logic...
    // [Your existing logic here]
}

function fetchFramesInfo(playerName) {
    // Fetching and displaying frames info logic...
    // [Your existing logic here]
}

function displayPlayerInfo(playerInfo) {
    // Displaying player info logic...
    document.getElementById('playerName').textContent = playerInfo.name;
    document.getElementById('totalMoney').textContent = `Total Money: ${playerInfo.totalMoney}`;
    document.getElementById('tableMoney').textContent = `Table Money: ${playerInfo.tableMoney}`;
    document.getElementById('balance').textContent = `Balance: ${playerInfo.balance}`;
}

function displayFramesInfo(framesData) {
    const framesList = document.getElementById('framesList');
    framesList.innerHTML = '';  // Clear previous data

    if (framesData && framesData.length > 0) {
        framesData.forEach(frame => {
            const listItem = document.createElement('li');
            listItem.textContent = `Date: ${frame[2]}, Duration: ${frame[3]} minutes, Winner: ${frame[5]}`;
            framesList.appendChild(listItem);
        });
    } else {
        framesList.innerHTML = '<li>No frames data found for this player.</li>';
    }
}

// Call the initClient function to start fetching data
initClient();
