// Your API Key and Sheet ID
const API_KEY = 'AIzaSyCfxg14LyZ1hrs18WHUuGOnSaJ_IJEtDQc';
const SHEET_ID = '1Bcl1EVN-7mXUP7M1FL9TBB5v4O4AFxGTVB6PwqOn9ss';
const SHEET_NAME = 'Rank';

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

    const playerCoins = document.createElement('span');
    playerCoins.className = 'player-coins';
    playerCoins.textContent = `S+ Coins: ${coins}`;

    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';

    let progressBarColor = '#F44336'; // Default: Red

    if (coins >= 11 && coins <= 30) {
        progressBarColor = '#FFEB3B'; // Yellow
    } else if (coins >= 31 && coins <= 60) {
        progressBarColor = '#4CAF50'; // Green
    } else if (coins >= 61 && coins <= 100) {
        progressBarColor = '#795548'; // Brown
    } else if (coins >= 101 && coins <= 150) {
        progressBarColor = '#2196F3'; // Blue
    } else if (coins >= 151 && coins <= 210) {
        progressBarColor = '#E91E63'; // Pink
    } else if (coins > 210) {
        progressBarColor = '#000000'; // Black
    }

    progressBar.style.backgroundColor = progressBarColor;

    const colorMinCoins = [0, 11, 31, 61, 101, 151, 211];
    const colorMaxCoins = [10, 30, 60, 100, 150, 210, 1000];
    let progressBarWidth = 0;

    for (let i = 0; i < colorMinCoins.length; i++) {
        if (coins >= colorMinCoins[i] && coins <= colorMaxCoins[i]) {
            progressBarWidth = ((coins - colorMinCoins[i]) / (colorMaxCoins[i] - colorMinCoins[i] + 1)) * 100;
            break;
        }
    }

    if ([11, 31, 61, 101, 151, 211].includes(coins)) {
        progressBarWidth = Math.max(progressBarWidth, 2); // Ensuring at least 2% width
    }

    progressBar.style.width = `${progressBarWidth}%`;

    playerInfo.appendChild(playerName);
    playerInfo.appendChild(playerCoins);
    playerCard.appendChild(playerInfo);
    playerCard.appendChild(progressBar);

    return playerCard;
}

// Function to display players
function displayPlayers(players) {
    const playerContainer = document.getElementById('playerContainer');
    playerContainer.innerHTML = '';
    players.forEach(player => {
        playerContainer.appendChild(createPlayerCard(player));
    });
}

// Function to fetch data from Google Sheets
function fetchSheetData() {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: SHEET_NAME,
    }).then(function(response) {
        const values = response.result.values;
        if (values && values.length > 0) {
            const players = values.map((row, index) => ({
                rank: index + 1,
                name: row[1],
                coins: parseInt(row[2]),
            }));
            displayPlayers(players);
        } else {
            console.log('No data found.');
        }
    }, function(response) {
        console.error('Error fetching data:', response.result.error.message);
    });
}

// Function to search and filter data
function searchTable() {
    var input, filter, cards, name, i;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    cards = document.getElementsByClassName("player-card");
    for (i = 0; i < cards.length; i++) {
        name = cards[i].getElementsByClassName("player-name")[0].textContent;
        if (name.toUpperCase().indexOf(filter) > -1) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
}
let lastScrollTop = 0;
const floatingButton = document.getElementById('floatingButton');

window.addEventListener("scroll", function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        floatingButton.style.opacity = "0";
    } else {
        floatingButton.style.opacity = "1";
    }
    lastScrollTop = scrollTop;
});
document.addEventListener('DOMContentLoaded', () => {
    // Add click event listener to player elements
    document.querySelectorAll('.player-element-class').forEach(playerElement => {
        playerElement.addEventListener('click', () => {
            // Trigger the modal to appear
            new bootstrap.Modal(document.getElementById('playerModal')).show();
        });
    });

    // Handle "View Card" click
    document.getElementById('viewCardBtn').addEventListener('click', () => {
        // Logic to navigate to the player info page with the respective player data
        // Example: window.location.href = `https://leaderboard.snookerplus.in/playerinfo?player=${playerName}`;
    });

    // Handle "Challenge" click
    document.getElementById('challengeBtn').addEventListener('click', () => {
        // Logic to initiate a challenge
    });
});

// Call the initClient function to start fetching data
initClient();
