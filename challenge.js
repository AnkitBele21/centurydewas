document.addEventListener('DOMContentLoaded', function() {
    // Get the 'name' parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const challengerName = urlParams.get('name');

    // Autofill the challenger's name and make it readonly
    const challengerInput = document.getElementById('challenger-name');
    if (challengerName && challengerInput) {
        challengerInput.value = challengerName;
        challengerInput.readOnly = true; // Make the input read-only
    }

    const form = document.getElementById('challenge-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        // Since the challenger's name is autofilled and read-only, we don't need to get its value again
        const opponent = document.getElementById('opponent-name').value;
        submitChallenge(challengerName, opponent);
    });
});

function submitChallenge(challenger, opponent) {
    const scriptId = '13yZ2go8U7yHoKnXmLklwVONIU3-R0OP_iHKgaFdU9xYJ0rSqDpMofBG2'; // Replace with your Apps Script ID

    fetch(`https://script.google.com/macros/s/${scriptId}/exec`, {
        method: 'POST',
        mode: 'no-cors', // Note: 'no-cors' mode doesn't allow reading the response
        cache: 'no-cache',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ challenger, opponent })
    })
    .then(response => {
        // Since 'no-cors' mode is used, we won't get a readable response
        console.log('Challenge submitted successfully');
        // You can redirect the user or display a success message here
    })
    .catch(error => {
        console.error('Error:', error);
        // You can display an error message to the user here
    });
}
