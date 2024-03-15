// Updated Web App URL
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyHFvuKZ3cg3E65jDfzvJM56d9qoD21DUP-re4uqH0pkPcKQdXGuNCDfsNV_zartWL5eQ/exec';

document.addEventListener('DOMContentLoaded', function() {
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const frameId = getQueryParam('frameId');
    if (frameId) {
        document.getElementById('frameNo').value = frameId; // Set the Frame ID in the form
        // Fetch and pre-fill existing data for the frame
        fetchExistingData(frameId);
    }

    document.getElementById('updateFrameForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        updateFrameData();
    });
});

async function fetchExistingData(frameId) {
    // Implement fetching logic here
    // Example: fetch(WEB_APP_URL + '?action=fetch&frameId=' + frameId)...
}

async function updateFrameData() {
    const frameId = document.getElementById('frameNo').value;
    const rowNumber = frameId.replace('SPS', '');
    const tableNo = document.getElementById('tableNo').value;
    const startTime = document.getElementById('startTime').value;
    const players = document.getElementById('players').value.split(',').map(player => player.trim());

    const payload = {
        rowNumber: rowNumber,
        tableNo: tableNo,
        startTime: startTime,
        players: players
    };

    try {
        const response = await fetch(WEB_APP_URL, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        if (result.success) {
            alert('Frame updated successfully!');
            window.location.href = 'https://ankitbele21.github.io/centurydewas/clubframes';
        } else {
            alert('Failed to update the frame. Please try again.');
        }
    } catch (error) {
        console.error('Error updating frame:', error);
        alert('An error occurred while updating the frame.');
    }
}
