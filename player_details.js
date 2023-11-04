// player_details.js
// Your API Key and Sheet ID
const API_KEY = 'AIzaSyCfxg14LyZ1hrs18WHUuGOnSaJ_IJEtDQc';
const SHEET_ID = '1Bcl1EVN-7mXUP7M1FL9TBB5v4O4AFxGTVB6PwqOn9ss';
const PLAYER_SHEET_NAME = 'snookerplus';
const FRAMES_SHEET_NAME = 'Frames';
const RANK_SHEET_NAME = 'Rank';

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
            setupChallengeButton(playerName); // Set up the challenge button
        } else {
            console.error('Player name not provided.');
        }
    });
}

function fetchPlayerInfo(playerName) {
    // ... [Previous fetchPlayerInfo function code]
}

function fetchFramesInfo(playerName) {
    // ... [Previous fetchFramesInfo function code]
}

function fetchRankInfo(playerName) {
    // ... [Previous fetchRankInfo function code]
}

function displayPlayerInfo(playerInfo) {
    // ... [Previous displayPlayerInfo function code]
}

function displayFramesInfo(framesData, playerName) {
    // ... [Previous displayFramesInfo function code]
}

function displayRankInfo(rankInfo) {
    // ... [Previous displayRankInfo function code]
}

// New function to set up the challenge button
function setupChallengeButton(playerName) {
    const challengeButton = document.getElementById('challengeButton');
    if (challengeButton) {
        challengeButton.addEventListener('click', function() {
            window.location.href = `https://leaderboard.snookerplus.in/challenge?name=${encodeURIComponent(playerName)}`;
        });
    }
}

// Load the Google API client and call initClient
gapi.load('client', initClient);
