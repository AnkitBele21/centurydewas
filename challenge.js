// Load the Google Sheets API
gapi.load('client', initClient);

// Initialize the Google Sheets API client
function initClient() {
    gapi.client.init({
        apiKey: 'AIzaSyCfxg14LyZ1hrs18WHUuGOnSaJ_IJEtDQc', // Your API key
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function() {
        // Handle the initial setup or any additional setup when the page loads
        prefillChallengerName();
    });
}

// Prefill the challenger's name from the URL parameter
function prefillChallengerName() {
    const urlParams = new URLSearchParams(window.location.search);
    const challenger = urlParams.get('challenger');
    if (challenger) {
        document.getElementById('challenger-name').value = decodeURIComponent(challenger);
    }
}

// Event listener for form submission
document.getElementById('challenge-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const challengerName = document.getElementById('challenger-name').value;
    const opponentName = document.getElementById('opponent-name').value;
    submitChallenge(challengerName, opponentName);
});

// Function to submit the challenge to Google Sheets
function submitChallenge(challenger, opponent) {
    const params = {
        spreadsheetId: '1Bcl1EVN-7mXUP7M1FL9TBB5v4O4AFxGTVB6PwqOn9ss', // Your Sheet ID
        range: 'Challenges!A:B', // Assuming you want to write to columns A and B
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
    };

    const valueRangeBody = {
        "values": [
            [challenger, opponent] // The data to be written: [Challenger, Opponent]
        ]
    };

    gapi.client.sheets.spreadsheets.values.append(params, valueRangeBody)
        .then(function(response) {
            // Handle the response here, such as showing a success message
            alert('Challenge submitted successfully!');
        })
        .catch(function(response) {
            // Handle any errors here
            alert('Failed to submit challenge.');
        });
}

// Call the initClient function to start fetching data
initClient();
