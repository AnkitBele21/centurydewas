const API_KEY = 'AIzaSyCfxg14LyZ1hrs18WHUuGOnSaJ_IJEtDQc';
const SHEET_ID = '1RmMxuj_taiFoFx9V20xa_l8E74Wg-jaKTMexCfYpCTw';

async function fetchData(sheetName) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheetName}?key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.values.slice(1);
}

function displayFrameEntries(frameEntries) {
    const frameEntriesContainer = document.getElementById('frameEntries');
    frameEntriesContainer.innerHTML = ''; 
    
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
        playersElement.innerText = `Players: ${entry.playerNames.filter(name => name).join(', ')}`;
        frameElement.appendChild(playersElement);

        const paidByElement = document.createElement('p');
        paidByElement.innerText = `Paid by: ${entry.paidByNames.filter(name => name).join(', ')}`;
        frameElement.appendChild(paidByElement);
        
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
        let frameEntries = data.map(row => ({
            date: row[2],
            duration: row[3],
            startTime: row[10],
            tableMoney: row[20],
            playerNames: row.slice(12, 18),
            paidByNames: row.slice(23, 29), // Assuming X to AC columns
            isValid: row[6] && row[8]
        })).filter(entry => entry.isValid)
        .reverse(); // Reverse the order of entries
        
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
            optionElement.value = row[2]; // Assuming names are in column C
            nameDatalist.appendChild(optionElement);
        });
    });
}

window.onload = function() {
    fetchData('Frames').then(data => {
        const frameEntries = data.map(row => ({
            date: row[2],
            duration: row[3],
            startTime: row[10],
            tableMoney: row[20],
            playerNames: row.slice(12, 18),
            paidByNames: row.slice(23, 29), // Assuming X to AC columns
            isValid: row[6] && row[8]
        })).filter(entry => entry.isValid)
        .reverse(); // Reverse the order of entries
        
        displayFrameEntries(frameEntries);
    });

    populatePlayerNames(); // Populate player name suggestions
};
