const API_KEY = 'AIzaSyCfxg14LyZ1hrs18WHUuGOnSaJ_IJEtDQc';
const SHEET_ID = '1Bcl1EVN-7mXUP7M1FL9TBB5v4O4AFxGTVB6PwqOn9ss';

async function fetchData(sheetName) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheetName}?key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.values;
}

function createGraph(data, labels, canvasId) {
    var ctx = document.getElementById(canvasId).getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Performance',
                data: data,
            }]
        },
    });
}

async function createTableWisePerformanceGraph() {
    const data = await fetchData('club');
    const tables = data.map(row => row[0]);
    const occupancy = data.map(row => row[1]);
    createGraph(occupancy, tables, 'tableWisePerformanceChart');
}

async function createDateWisePerformanceGraph() {
    const data = await fetchData('club');
    const dates = data.map(row => row[7]);
    const occupancy = data.map(row => row[9]);
    createGraph(occupancy, dates, 'dateWisePerformanceChart');
}

// Initialize graphs on page load
window.onload = function() {
    createTableWisePerformanceGraph();
    createDateWisePerformanceGraph();
};
