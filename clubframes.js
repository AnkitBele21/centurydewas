const API_KEY = 'AIzaSyCfxg14LyZ1hrs18WHUuGOnSaJ_IJEtDQc';
const SHEET_ID = '1RmMxuj_taiFoFx9V20xa_l8E74Wg-jaKTMexCfYpCTw';
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycby_exWUK1UIO9R9jl2gDT6QAtbIFIaDVriwv9KRzwwEZEqNjtP1kYXfPYuVi1walEih0w/exec';

async function fetchData(sheetName) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheetName}?key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.values.slice(1);
}

function displayFrameEntries(frameEntries) {
    const frameEntriesContainer = document.getElementById('frameEntries');
    frameEntriesContainer.innerHTML = ''; 
    
    frameEntries.forEach((entry, index) => {
        const frameElement = document.createElement('div');
        frameElement.className = entry.isActive ? 'frame-card active-frame' : 'frame-card';
        
        // Include Frame ID
        const frameIdElement = document.createElement('p');
        frameIdElement.innerText = `Frame ID: SPS${entry.rowNumber}`;
        frameIdElement.style.fontSize = 'small'; // Making the font size small
        frameElement.appendChild(frameIdElement);
        
        
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
        
    // Status for active frames
        if (entry.isActive) {
            const statusElement = document.createElement('p');
            statusElement.innerText = `Status: ${entry.offStatus ? entry.offStatus : 'Active'}`;
            statusElement.style.color = entry.offStatus ? 'red' : 'green'; // Red for "Off", green for "Active"
            frameElement.appendChild(statusElement);
        }

        // Edit Button for active frames
        // Edit Button for active frames
if (entry.isActive) {
    const editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.className = 'btn btn-primary';
    editButton.style.marginRight = '10px';
    editButton.onclick = function() {
    const frameId = entry.rowNumber; // Assuming entry.rowNumber holds the unique frame ID
    window.location.href = `https://ankitbele21.github.io/centurydewas/updateactiveframe.html?frameId=SPS${frameId}`;
    };

    frameElement.appendChild(editButton);
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
        let frameEntries = data.map((row, index) => ({
            rowNumber: index + 2, // Correctly scoped index
            date: row[2],
            duration: row[3],
            startTime: row[10],
            tableMoney: row[20],
            tableNo: row[7],
            playerNames: row.slice(12, 18),
            paidByNames: row.slice(23, 29),
            isValid: row[6],
            isActive: row[6] && !row[8]
        })).filter(entry => entry.isValid).reverse();
        
        if (playerNameFilter) {
            frameEntries = frameEntries.filter(entry =>
                entry.playerNames.some(name => name.toLowerCase().includes(playerNameFilter))
            );
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
            optionElement.value = row[2];
            nameDatalist.appendChild(optionElement);
        });
    });
}

function markFrameOn() {
    fetch(WEB_APP_URL, {
        method: 'POST',
        // Google Apps Script does not use the Content-Type header, so we use a query string
        body: 'action=frameOn',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => response.json())
.then(data => {
    if (data.status === "success") {
        alert("Frame marked as 'On' successfully.");
        window.location.reload();
    } else {
        // If the status is not "success", log or alert the error message if available
        console.error('Error marking frame as On:', data.message || 'Unknown error');
        alert("There was an error marking the frame as 'On'. " + (data.message || ''));
    }
})
.catch(error => {
    console.error('Fetch error:', error);
    alert("There was an error marking the frame as 'On'.");
});

}

window.onload = function() {
    fetchData('Frames').then(data => {
        const frameEntries = data.map((row, index) => ({
            rowNumber: index + 2, // Correctly scoped index
            date: row[2],
            duration: row[3],
            startTime: row[10],
            tableMoney: row[20],
            tableNo: row[7],
            playerNames: row.slice(12, 18),
            paidByNames: row.slice(23, 29),
            offStatus: row[8],
            isValid: row[6],
            isActive: row[6] && !row[8]
        })).filter(entry => entry.isValid).reverse();

        displayFrameEntries(frameEntries);
    });

    populatePlayerNames();
};
