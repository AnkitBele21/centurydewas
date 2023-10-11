// Your API Key and Sheet ID
const API_KEY = 'AIzaSyCfxg14LyZ1hrs18WHUuGOnSaJ_IJEtDQc';
const SHEET_ID = '1Bcl1EVN-7mXUP7M1FL9TBB5v4O4AFxGTVB6PwqOn9ss';
const SHEET_NAME = 'Rank';

// List of previous champions
const champions = ["Arpit", "Saurav Johari"];

// Load the Google Sheets API
gapi.load('client', initClient);

// Initialize the Google Sheets API client
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function() {
        // Fetch data
        fetchSheetData();
    });
}

// Function to create a player card element
function createPlayerCard(player) {
    const { rank, name, coins } = player;

    const playerCard = document.createElement('div');
    playerCard.className = 'player-card';

    const playerInfo = document.createElement('div');
    playerInfo.className = 'player-info';

    const playerName = document.createElement('span');
    playerName.className = 'player-name';
    playerName.textContent = `${rank}. ${name}`;

    // Check if player is a champion and add a medal icon
    if (champions.includes(name)) {
        const championIcon = document.createElement('img');
        championIcon.src = 'path_to_medal_icon.png'; // Replace with the path to your medal icon
        championIcon.alt = 'Champion';
        championIcon.className = 'champion-icon';
        playerName.appendChild(championIcon);
    }

    // ... [Rest of the code remains the same]

    playerInfo.appendChild(playerName);
    playerCard.appendChild(playerInfo);

    return playerCard;
}

// ... [Rest of the code remains the same]

