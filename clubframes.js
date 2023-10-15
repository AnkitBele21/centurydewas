// Add your API_KEY and SHEET_ID here
const API_KEY = 'AIzaSyCfxg14LyZ1hrs18WHUuGOnSaJ_IJEtDQc';
const SHEET_ID = '1Bcl1EVN-7mXUP7M1FL9TBB5v4O4AFxGTVB6PwqOn9ss';

async function fetchData(sheetName) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheetName}?key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.values;
}

function displayFrameEntries(frameEntries) {
    const frameEntriesContainer = document.getElementById('frameEntries');
    frameEntriesContainer.innerHTML = ''; // Clear previous entries
    
    frameEntries.forEach(entry => {
        const frameElement = document.createElement('div');
        frameElement.className = 'frame-card';
        
        const dateElement = document.createElement('h5');
        dateElement.innerText = `Date: ${entry.date}`;
        frameElement.appendChild(dateElement);
        
        const durationElement = document.createElement('p');
        durationElement.innerText = `Duration: ${entry.duration} min`;
        frameElement.appendChild(durationElement);
        
        const startTimeElement = document.createElement('p');
        startTimeElement.innerText = `Start Time: ${entry.startTime}`;
        frameElement.appendChild(startTimeElement);
        
        const tableMoneyElement = document.createElement('p');
        tableMoneyElement.innerText = `Table Money: ${entry.tableMoney}`;
        frameElement.appendChild(tableMoneyElement);
        
        const playersElement = document.createElement('p');
        playersElement.innerText = `Players: ${entry.playerNames.join(', ')}`;
        frameElement.appendChild(playersElement);
        
        frameEntriesContainer.appendChild(frameElement);
    });
}

function applyFilters() {
    const playerNameFilter = document.getElementById('playerNameFilter').value.toLowerCase();
    const dateFilter = document.getElementById('dateFilter').value;
    
    fetchData('Frames').then(data => {
        let frameEntries = data.map(row => ({
            date: row[2],
            duration: row[3],
            startTime: row[10],
            tableMoney: row[20],
            playerNames: row.slice(12, 18)
        }));
        
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

window.onload = function() {
    fetchData('Frames').then(data => {
        const frameEntries = data.map(row => ({
            date: row[2],
            duration: row[3],
            startTime: row[10],
            tableMoney: row[20],
            playerNames: row.slice(12, 18)
        }));
        displayFrameEntries(frameEntries);
    });
};
