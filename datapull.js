// Your API Key and Sheet ID
const API_KEY = 'AIzaSyCfxg14LyZ1hrs18WHUuGOnSaJ_IJEtDQc';
const SHEET_ID = '1Bcl1EVN-7mXUP7M1FL9TBB5v4O4AFxGTVB6PwqOn9ss';
const SHEET_NAME = 'Rank';

function loadGapiAndRun(callback) {
    if (!gapi.client) {
        gapi.load('client', callback);
    } else {
        callback();
    }
}

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function() {
        fetchSheetData();
    }).catch(function(error) {
        console.error("Error initializing client:", error);
    });
}

function createPlayerCard(player) {
    //... [Your original createPlayerCard function code here]
}

function displayPlayers(players) {
    //... [Your original displayPlayers function code here]
}

function fetchSheetData() {
    //... [Your original fetchSheetData function code here]
}

function searchTable() {
    //... [Your original searchTable function code here]
}

let lastScrollTop = 0;
const floatingButton = document.getElementById('floatingButton');

window.addEventListener("scroll", function() {
    //... [Your original scroll event listener code here]
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.player-card').forEach(playerCard => {
        playerCard.addEventListener('click', () => {
            var myModal = new bootstrap.Modal(document.getElementById('playerModal'));
            myModal.show();
        });
    });

    document.getElementById('viewCardBtn').addEventListener('click', () => {
        //... [Your original "View Card" click event listener code here]
    });

    document.getElementById('challengeBtn').addEventListener('click', () => {
        //... [Your original "Challenge" click event listener code here]
    });

    loadGapiAndRun(initClient);
});
