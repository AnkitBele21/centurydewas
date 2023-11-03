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
    const scriptUrl = 'https://script.google.com/macros/s/13yZ2go8U7yHoKnXmLklwVONIU3-R0OP_iHKgaFdU9xYJ0rSqDpMofBG2/exec'; // Replace with your actual Apps Script web app URL

    fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors', // Note: 'no-cors' mode doesn't allow reading the response
        cache: 'no-cache',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ challenger, opponent })
    })
    .then(() => {
        // Since 'no-cors' mode is used, we don't get a response to read
        // But we can assume it was successful if no network error was thrown
        console.log('Challenge submitted successfully');
        alert('Challenge submitted successfully! Redirecting to the leaderboard...');
        setTimeout(() => {
            window.location.href = 'https://leaderboard.snookerplus.in';
        }, 3000); // Redirect after 3 seconds
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to submit challenge. Please try again.');
    });
}
