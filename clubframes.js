const API_KEY = 'AIzaSyCfxg14LyZ1hrs18WHUuGOnSaJ_IJEtDQc';
const SHEET_ID = '1RmMxuj_taiFoFx9V20xa_l8E74Wg-jaKTMexCfYpCTw';
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxenlvo46ANjLhqxSc5CCXAA9ORTjYMj66DegeB_jWSxUdfFfMxOBEOIPmV-F8rrBKZfQ/exec';

async function fetchData(sheetName) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheetName}?key=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok.');
    }
    const data = await response.json();
    return data.values.slice(1);
}

function displayFrameEntries(frameEntries) {
    const frameEntriesContainer = document.getElementById('frameEntries');
    frameEntriesContainer.innerHTML = '';
    
    frameEntries.forEach((entry, index) => {
        const frameElement = document.createElement('div');
        frameElement.className = entry.isActive ? 'frame-card active-frame' : 'frame-card';
        
        // Add elements like date, tableNo, duration, etc.
        
        if (entry.isActive) {
            const offButton = document.createElement('button');
            offButton.innerText = 'Mark Off';
            offButton.className = 'btn btn-warning';
            offButton.addEventListener('click', function() { markFrameOff(index + 2); }); // Adjusted to account for header row and zero-based index
            frameElement.appendChild(offButton);
        }
        
        frameEntriesContainer.appendChild(frameElement);
    });
}

function applyFilters() {
    // Existing filter application logic
}

function populatePlayerNames() {
    // Existing player names population logic
}

function markFrameOn() {
    fetch(WEB_APP_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'action=frameOn'
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            window.location.reload();
        } else {
            alert("There was an error marking the frame as 'On'.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("There was an error marking the frame as 'On'.");
    });
}

function markFrameOff(row) {
    fetch(WEB_APP_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `action=frameOff&row=${row}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            window.location.reload();
        } else {
            alert("There was an error marking the frame as 'Off'.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("There was an error marking the frame as 'Off'.");
    });
}

window.onload = function() {
    fetchData('Frames').then(data => {
        displayFrameEntries(data.map(row => ({
            date: row[2],
            duration: row[3],
            startTime: row[10],
            tableMoney: row[20],
            tableNo: row[7],
            playerNames: row.slice(12, 18),
            paidByNames: row.slice(23, 29),
            isValid: row[6],
            isActive: row[6] && !row[8]
        })).filter(entry => entry.isValid).reverse());
    });

    populatePlayerNames();
};
