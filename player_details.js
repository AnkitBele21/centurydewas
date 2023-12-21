// player_details.js
// Your API Key and Sheet ID
const API_KEY = 'AIzaSyCfxg14LyZ1hrs18WHUuGOnSaJ_IJEtDQc';
const SHEET_ID = '1RmMxuj_taiFoFx9V20xa_l8E74Wg-jaKTMexCfYpCTw';
const PLAYER_SHEET_NAME = 'snookerplus';
const FRAMES_SHEET_NAME = 'Frames';
const RANK_SHEET_NAME = 'Rank';

// Razorpay Key - Replace with your actual key
const RAZORPAY_KEY = 'YOUR_RAZORPAY_KEY';

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const playerName = urlParams.get('player');
        
        if (playerName) {
            fetchPlayerInfo(playerName);
            fetchFramesInfo(playerName);
            fetchRankInfo(playerName);
            setupPayNowButton(playerName);
        } else {
            console.error('Player name not provided.');
        }
    });
}

// ... [Rest of your existing functions]

function setupPayNowButton(playerName) {
    document.getElementById('payNowButton').addEventListener('click', function() {
        const playerBalance = document.getElementById('totalMoney').innerText.replace('Balance: ₹ ', '');
        initiatePayment(playerName, playerBalance);
    });
}

function initiatePayment(playerName, amount) {
    var options = {
        "key": RAZORPAY_KEY,
        "amount": amount * 100, // Convert to smallest currency unit
        "currency": "INR",
        "name": "Snooker Plus",
        "description": "Clear Player Dues",
        "handler": function(response) {
            // Handle the payment success
            alert('Payment successful. Payment ID: ' + response.razorpay_payment_id);
            // TODO: Send payment details to server for verification and sheet update
        },
        "prefill": {
            "name": playerName,
            // Add other prefill information if available
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    var rzp = new Razorpay(options);
    rzp.open();
}

// Load the Google API client and call initClient
gapi.load('client', initClient);
