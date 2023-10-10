const API_KEY = 'AIzaSyCfxg14LyZ1hrs18WHUuGOnSaJ_IJEtDQc';
const SHEET_ID = '1Bcl1EVN-7mXUP7M1FL9TBB5v4O4AFxGTVB6PwqOn9ss';

function fetchPlayerInfo() {
    const name = document.getElementById('name').value;
    const number = document.getElementById('number').value;

    // Validate input
    if (!name || !number) {
        alert('Please enter name and number');
        return;
    }

    // Fetch player info from "snooker plus*" sheet
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/snooker plus*!A2:Z1000?key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            // Find the player and display info
            const playerRow = data.values.find(row => row[2] === name && row[4] === number);
            if (playerRow) {
                displayPlayerInfo(playerRow);
                fetchFramesInfo(name);
            } else {
                alert('Player not found');
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayPlayerInfo(playerRow) {
    // Display player info in a card
    const playerInfoDiv = document.getElementById('playerInfo');
    playerInfoDiv.innerHTML = `
        <h2>${playerRow[2]}</h2>
        <p>Table Money: ${playerRow[?]}</p>
        <p>Total Money: ${playerRow[?]}</p>
        <p>Balance: ${playerRow[?]}</p>
    `;
}

function fetchFramesInfo(playerName) {
    // Fetch frames info from "Frames" sheet
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Frames!A2:Z1000?key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            // Filter frames for the player and display
            const playerFrames = data.values.filter(row => row[12] === playerName || row[13] === playerName || /*...other columns...*/ row[17] === playerName);
            displayFramesInfo(playerFrames);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayFramesInfo(playerFrames) {
    // Display frames info in a list
    const framesInfoDiv = document.getElementById('framesInfo');
    framesInfoDiv.innerHTML = '<h2>Frames</h2>';
    playerFrames.forEach(frame => {
        framesInfoDiv.innerHTML += `
            <p>Date: ${frame[2]}, Winner: ${frame[5]}, Duration: ${frame[3]} minutes</p>
        `;
    });
}
function goToDetailsPage() {
    const playerName = document.getElementById('playerNameInput').value;
    window.location.href = "player_details.html?player=" + encodeURIComponent(playerName);
}
