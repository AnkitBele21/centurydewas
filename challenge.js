document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('challenge-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const challenger = document.getElementById('challenger-name').value;
        const opponent = document.getElementById('opponent-name').value;
        submitChallenge(challenger, opponent);
    });
});

function submitChallenge(challenger, opponent) {
    const scriptId = 'YOUR_SCRIPT_ID'; // Replace with your Apps Script ID

    // Call the Apps Script web app with the challenger and opponent names
    fetch(`https://script.google.com/macros/s/${scriptId}/exec`, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ challenger, opponent })
    })
    .then(response => {
        console.log('Challenge submitted successfully');
        // Handle the response from the Apps Script (if CORS is enabled and response is returned)
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
