const API_KEY = 'AIzaSyCfxg14LyZ1hrs18WHUuGOnSaJ_IJEtDQc';
const SHEET_ID = '1RmMxuj_taiFoFx9V20xa_l8E74Wg-jaKTMexCfYpCTw';

async function fetchData(sheetName, range = '') {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheetName}${range}?key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.values;
}

async function displayClubDetails() {
    const data = await fetchData('club', '!H:I'); // Fetching data from columns H and I
    const clubDetailsContainer = document.getElementById('clubDetails');
    data.forEach(([label, value]) => {
        const detailElement = document.createElement('p');
        detailElement.innerText = `${label}: ${value}`;
        clubDetailsContainer.appendChild(detailElement);
    });
}

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
                    beginAtZero: true,
                    display: canvasId !== 'dateWisePerformanceChart' // Hide axis for 'dateWisePerformanceChart'
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        title: function(context) {
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
    const data = await fetchData('club', '!A:B'); // Fetching data from columns A and B
    const tables = data.map(row => row[0]);
    const occupancy = data.map(row => row[1]);
    createGraph(occupancy, tables, 'tableWisePerformanceChart', 'Table\'s Performance');
}

async function createDateWisePerformanceGraph() {
    const data = await fetchData('club2', '!A:C'); // Fetching data from columns A and C
    const dates = data.map(row => row[0]);
    const occupancy = data.map(row => row[2]);
    createGraph(occupancy, dates, 'dateWisePerformanceChart', 'Club Performance');
}

window.onload = function() {
    displayClubDetails();
    createTableWisePerformanceGraph();
    createDateWisePerformanceGraph();
};
