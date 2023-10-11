// Your API Key and Sheet ID
const API_KEY = 'AIzaSyCfxg14LyZ1hrs18WHUuGOnSaJ_IJEtDQc';
const SHEET_ID = '1Bcl1EVN-7mXUP7M1FL9TBB5v4O4AFxGTVB6PwqOn9ss';
const SHEET_NAME = 'Rank';

// Load the Google Sheets API and then run initClient
function loadGapiAndRun(callback) {
    if (!gapi.client) {
        // Load the Google API client and call initClient as the callback function
        gapi.load('client', callback);
    } else {
        callback();
    }
}

// Initialize the Google Sheets API client
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function() {
        // Fetch data
        fetchSheetData();
    }).catch(function(error) {
        // Log any errors in the console
        console.error("Error initializing client:", error);
    });
}

// ... [Rest of your code remains the same]

// Function to create a player card element
function createPlayerCard(player) {
    //... [This function remains the same as your original code]
}

// Function to display players
function displayPlayers(players) {
    //... [This function remains the same as your original code]
}

// Function to fetch data from Google Sheets
function fetchSheetData() {
    //... [This function remains the same as your original code]
}

// Function to search and filter data
function searchTable() {
    //... [This function remains the same as your original code]
}

// Event listener for scroll
let lastScrollTop = 0;
const floatingButton = document.getElementById('floatingButton');

window.addEventListener("scroll", function() {
    //... [This function remains the same as your original code]
});

// Event listener for DOM content loaded
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

    // Call the loadGapiAndRun function with initClient as the callback
    loadGapiAndRun(initClient);
});

// Event listener for DOM content loaded for modal handling
document.addEventListener('DOMContentLoaded', () => {
    // Add click event listener to player cards
    document.querySelectorAll('.player-card').forEach(playerCard => {
        playerCard.addEventListener('click', () => {
            // Trigger the modal to appear
            document.getElementById('playerModal').style.display = 'block';
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

    // Handle "Close" click
    document.getElementById('closeModalBtn').addEventListener('click', () => {
        document.getElementById('playerModal').style.display = 'none';
    });

    // Handle click outside the modal
    window.addEventListener('click', (event) => {
        if (event.target === document.getElementById('playerModal')) {
            document.getElementById('playerModal').style.display = 'none';
        }
    });
});
