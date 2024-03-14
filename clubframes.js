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
        
        const dateElement = document.createElement('h5');
        dateElement.innerText = `Date: ${entry.date}`;
        frameElement.appendChild(dateElement);

        const tableNoElement = document.createElement('p');
        tableNoElement.innerText = `Table No: ${entry.tableNo || 'N/A'}`;
        frameElement.appendChild(tableNoElement);
        
        if (!entry.isActive) {
            const durationElement = document.createElement('p');
            durationElement.innerText = `Duration: ${entry.duration} min`;
            frameElement.appendChild(durationElement);
        }
        
        const startTimeElement = document.createElement('p');
        startTimeElement.innerText = `Start Time: ${entry.startTime}`;
        frameElement.appendChild(startTimeElement);
        
        if (!entry.isActive) {
            const tableMoneyElement = document.createElement('p');
            tableMoneyElement.innerText = `Table Money: ${entry.tableMoney}`;
            frameElement.appendChild(tableMoneyElement);
        }
        
        const playersElement = document.createElement('p');
        playersElement.innerText = `Players: ${entry.playerNames.filter(name => name).join(', ')}`;
        frameElement.appendChild(playersElement);

        const paidByElement = document.createElement('p');
        paidByElement.innerText = `Paid by: ${entry.paidByNames.filter(name => name).join(', ') || 'N/A'}`;
        frameElement.appendChild(paidByElement);
        
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
    const playerNameFilter = document.getElementById('playerNameFilter').value.toLowerCase();
    let dateFilter = document.getElementById('dateFilter').value;
    
    if(dateFilter) {
        const [year, month, day] = dateFilter.split('-');
        dateFilter = `${day}/${month}/${year}`;
    }
    
    fetchData('Frames').then(data => {
        let frameEntries = data.map(row => {
            const isActive = row[6] && !row[8];
            return {
                date: row[2],
                duration: row[3],
                startTime: row[10],
                tableMoney: row[20],
                tableNo: row[7],
                playerNames: row.slice(12, 18),
                paidByNames: row.slice(23, 29),
                isValid: row[6],
                isActive: isActive
            };
        }).filter(entry => entry.isValid).reverse();
        
        if (playerNameFilter) {
            frameEntries = frameEntries.filter(entry => entry.playerNames.some(name => name.toLowerCase().includes(playerNameFilter)));
        }
        
        if (dateFilter) {
            frameEntries = frameEntries.filter(entry => entry.date === dateFilter);
        }
        
        displayFrameEntries(frameEntries);
    });
}

function populatePlayerNames() {
    fetchData('SnookerPlus').then(data => {
        const nameDatalist = document.getElementById('playerNames');
        data.forEach(row => {
            const optionElement = document.createElement('option');
            optionElement.value = row[2]; // Assuming player names are in the third column
            nameDatalist.appendChild(optionElement);
        });
    });
}

function markFrameOn() {
    // Existing markFrameOn logic remains unchanged
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
