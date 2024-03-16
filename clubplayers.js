const API_KEY = 'AIzaSyCfxg14LyZ1hrs18WHUuGOnSaJ_IJEtDQc';
const SHEET_ID = '1RmMxuj_taiFoFx9V20xa_l8E74Wg-jaKTMexCfYpCTw';
const PLAYER_SHEET_NAME = 'snookerplus';

document.addEventListener('DOMContentLoaded', function() {
    fetchPlayerData();
});

function fetchPlayerData() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${PLAYER_SHEET_NAME}?key=${API_KEY}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const rows = data.values;
            const tableBody = document.getElementById('playersTable').getElementsByTagName('tbody')[0];
            rows.slice(3).forEach(row => {
                const playerName = row[3]; // Assuming player names are in column D
                const balance = row[6]; // Assuming balances are in column G
                const rowElement = tableBody.insertRow();
                rowElement.insertCell(0).textContent = playerName;
                rowElement.insertCell(1).textContent = balance;
                const topUpCell = rowElement.insertCell(2);
                const topUpButton = document.createElement('button');
                topUpButton.textContent = 'Top Up';
                topUpButton.className = 'btn btn-primary';
                topUpButton.addEventListener('click', () => topUpBalance(playerName));
                topUpCell.appendChild(topUpButton);
            });
        })
        .catch(error => console.error('Error fetching player data:', error));
}

function topUpBalance(playerName) {
    // Implement the top-up functionality here
    console.log(`Top up for ${playerName}`);
    // This could involve displaying a modal to enter the top-up amount and then updating the sheet accordingly.
}
