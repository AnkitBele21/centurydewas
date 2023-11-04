document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const challengerName = urlParams.get('name');
    const challengerInput = document.getElementById('challenger-name');
    const challengerNameDisplay = document.getElementById('challenger-name-display');

    if (challengerName && challengerInput) {
        challengerInput.value = challengerName;
        challengerNameDisplay.textContent = challengerName;
    }

    fetchPlayerList(); // Fetch the player list for the datalist
    fetchIncomingChallenges(challengerName); // Fetch incoming challenges

    const form = document.getElementById('challenge-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const opponent = document.getElementById('opponent-name').value;
        const matchType = document.getElementById('match-type').value;
        submitChallenge(challengerName, opponent, matchType);
    });
});

function fetchPlayerList() {
    // ... (fetch player list and populate datalist as described in the previous response)
}

function fetchIncomingChallenges(challengerName) {
    // ... (fetch incoming challenges and display them)
}

function submitChallenge(challenger, opponent, matchType) {
    const scriptId = 'YOUR_SCRIPT_ID'; // Replace with your Apps Script ID

    fetch(`https://script.google.com/macros/s/${scriptId}/exec`, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ challenger, opponent, matchType })
    })
    .then(response => {
        console.log('Challenge submitted successfully');
        // ... (handle the response)
    })
    .catch(error => {
        console.error('Error:', error);
        // ... (handle the error)
    });
}
