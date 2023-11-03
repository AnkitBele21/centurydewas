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
    const scriptId = '13yZ2go8U7yHoKnXmLklwVONIU3-R0OP_iHKgaFdU9xYJ0rSqDpMofBG2'; // Replace with your Apps Script ID

    fetch(`https://script.google.com/macros/s/AKfycbxjdMSbeqBuJI5_tnrqB1neG_DSiHrMZXCwT6Bs61lL7qB32dw__Hjqs-plPW0yXAY/exec`, {
        method: 'POST',
        mode: 'no-cors', // Note: 'no-cors' mode doesn't allow reading the response
        cache: 'no-cache',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ challenger, opponent })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log('Challenge submitted successfully');
        // Handle the response here if CORS is enabled and you expect a response
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
