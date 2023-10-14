const API_KEY = 'AIzaSyCfxg14LyZ1hrs18WHUuGOnSaJ_IJEtDQc';
const SHEET_ID = '1Bcl1EVN-7mXUP7M1FL9TBB5v4O4AFxGTVB6PwqOn9ss';

async function fetchData(sheetName) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheetName}?key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.values;
}

// ... [Previous Code]

function createGraph(data, labels, canvasId, graphTitle) {
    var ctx = document.getElementById(canvasId).getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: graphTitle,
                data: data,
                backgroundColor: '#01AB7A',
                borderColor: '#018a5e',
                borderWidth: 1,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: false // Hides legend to reduce clutter
                },
                tooltip: {
                    callbacks: {
                        title: function(context) {
                            // Customizing tooltip title
                            return `Details for ${labels[context[0].dataIndex]}`;
                        }
                    }
                }
            },
            title: {
                display: true,
                text: graphTitle,
                font: {
                    size: 18,
                    weight: 'bold'
                },
                color: '#01AB7A'
            }
        }
    });
}

async function createTableWisePerformanceGraph() {
    const data = await fetchData('club');
    const tables = data.map((row, index) => index + 1); // Simplified labels
    const occupancy = data.map(row => row[1]);
    const filteredData = occupancy.filter(val => val !== '0'); // Exclude zero values
    const filteredTables = tables.slice(0, filteredData.length); // Match labels to data length
    createGraph(filteredData, filteredTables, 'tableWisePerformanceChart', 'Tables Occupied');
}

async function createDateWisePerformanceGraph() {
    const data = await fetchData('club');
    const dates = data.map((row, index) => index + 1); // Simplified labels
    const occupancy = data.map(row => row[9]);
    const filteredData = occupancy.filter(val => val !== '0'); // Exclude zero values
    const filteredDates = dates.slice(0, filteredData.length); // Match labels to data length
    createGraph(filteredData, filteredDates, 'dateWisePerformanceChart', 'Club Performance by Date');
}

// ... [Previous Code]


// Initialize graphs on page load
window.onload = function() {
    createTableWisePerformanceGraph();
    createDateWisePerformanceGraph();
};
