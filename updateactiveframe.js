const API_KEY = 'AIzaSyCfxg14LyZ1hrs18WHUuGOnSaJ_IJEtDQc';
const SHEET_ID = '1RmMxuj_taiFoFx9V20xa_l8E74Wg-jaKTMexCfYpCTw';
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxenlvo46ANjLhqxSc5CCXAA9ORTjYMj66DegeB_jWSxUdfFfMxOBEOIPmV-F8rrBKZfQ/exec';

async function fetchData(sheetName, frameId) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheetName}?key=${API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        // Assuming the first column after the header contains the Frame ID in the format "SPS<number>"
        const frameData = data.values.slice(1).find(row => `SPS${row[0]}` === frameId);
        return frameData;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    const queryParams = new URLSearchParams(window.location.search);
    const frameId = queryParams.get('frameId');

    if (frameId) {
        document.getElementById('frameNo').value = frameId; // Display Frame ID

        const frameData = await fetchData('Frames', frameId);
        if (frameData) {
            // Assuming the data structure matches your sheet's columns
            // Update these indices based on your actual sheet structure
            document.getElementById('tableNo').value = frameData[1]; // Table No.
            document.getElementById('startTime').value = frameData[2]; // Start Time
            document.getElementById('players').value = frameData[3]; // Players
        }
    }
});
