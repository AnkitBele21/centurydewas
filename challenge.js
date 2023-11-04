document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const challengerName = urlParams.get('name');
    const challengerInput = document.getElementById('challenger-name');
    const challengerNameDisplay = document.getElementById('challenger-name-display');
    const submitButton = document.getElementById('submit-challenge');
    const opponentInput = document.getElementById('opponent-name');

    if (challengerName && challengerInput) {
        challengerInput.value = challengerName;
        challengerNameDisplay.textContent = `Challenge to Player: ${challengerName}`;
    }

    fetchPlayerList(); // Fetch the player list for the datalist
    fetchIncomingChallenges(challengerName); // Fetch incoming challenges

    opponentInput.addEventListener('input', () => {
        // Enable the submit button only if the opponent's name is not empty
        submitButton.disabled = !opponentInput.value.trim();
    });

    const form = document.getElementById('challenge-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const opponent = opponentInput.value;
        const matchType = document.getElementById('match-type').value;
        submitChallenge(challengerName, opponent, matchType);
    });
});

function fetchPlayerList() {
    // Implement fetching player list and populating datalist
    // This is a placeholder function, you'll need to implement it according to your application's needs
}

function fetchIncomingChallenges(challengerName) {
    // Implement fetching incoming challenges and displaying them
    // This is a placeholder function, you'll need to implement it according to your application's needs
}

function submitChallenge(challenger, opponent, matchType) {
    const webAppUrl = 'https://script.google.com/macros/s/AKfycbxtyT4Ts7KHV7_XXoNFqBMxfsNdCVN2m3Kg05ZtQMUJDRupMbqRF3lQNjaqH-kpUQOx/exec';

    fetch(webAppUrl, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ challenger, opponent, matchType })
    })
    .then(response => {
        console.log('Challenge submitted successfully');
        opponentInput.value = ''; // Clear the opponent input
        submitButton.disabled = true; // Disable the submit button again
        // You can redirect the user or display a success message here
    })
    .catch(error => {
        console.error('Error:', error);
        // You can display an error message to the user here
    });
}
