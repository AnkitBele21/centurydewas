const API_KEY = 'AIzaSyCfxg14LyZ1hrs18WHUuGOnSaJ_IJEtDQc';
const SHEET_ID = '1Bcl1EVN-7mXUP7M1FL9TBB5v4O4AFxGTVB6PwqOn9ss';

document.getElementById('submitBtn').addEventListener('click', fetchPlayerInfo);

function fetchPlayerInfo() {
    const name = document.getElementById('name').value;
    const number = document.getElementById('number').value;

    if (!name || !number) {
        alert('Please enter name and number');
        return;
    }

    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/snookerplus!A2:Z1000?key=${API_KEY}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const playerRow = data.values.find(row => row[2] === name && row[4] === number);
            if (playerRow) {
                window.location.href = `player_details.html?player=${encodeURIComponent(name)}`;
            } else {
                alert('Player not found or number does not match');
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}
