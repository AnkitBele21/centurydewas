document.addEventListener('DOMContentLoaded', function() {
    fetchPlayerList(); // Fetch the player list when the document is ready

    const form = document.getElementById('challenge-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const challenger = document.getElementById('challenger-name').value;
        const opponent = document.getElementById('opponent-name').value;
        submitChallenge(challenger, opponent);
    });
});

function fetchPlayerList() {
    const API_KEY = 'AIzaSyCfxg14LyZ1hrs18WHUuGOnSaJ_IJEtDQc'; // Replace with your actual API key
    const SHEET_ID = '18mGrkwL9Xma64QeFm_0moXcuF0SIACqgT-s16kQe2BY'; // Your Google Sheet ID
    const RANGE = 'Player%20List!A:A'; // The range of cells to fetch

    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            populateDropdown('challenger-name', data.values);
            populateDropdown('opponent-name', data.values);
        })
        .catch(error => console.error('Error fetching player list:', error));
}

function populateDropdown(dropdownId, playerList) {
    const dropdown = document.getElementById(dropdownId);
    playerList.forEach(player => {
        const option = document.createElement('option');
        option.value = player[0]; // Assuming the name is in the first column
        option.textContent = player[0];
        dropdown.appendChild(option);
    });
}

function submitChallenge(challenger, opponent) {
    // ... your existing submitChallenge function ...
}
