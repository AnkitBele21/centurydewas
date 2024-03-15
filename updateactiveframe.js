document.getElementById('updateFrameForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Extract the numeric part of the Frame ID (assuming it's in the format "SPS<number>")
    const frameId = document.getElementById('frameNo').value;
    const rowNumber = frameId.replace('SPS', '');

    const tableNo = document.getElementById('tableNo').value;
    const startTime = document.getElementById('startTime').value;
    const players = document.getElementById('players').value.split(',').map(player => player.trim());

    // Construct the payload to send to your Google Apps Script Web App
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
            // Handle success (e.g., redirect or show a success message)
            alert('Frame updated successfully!');
            window.location.href = 'https://ankitbele21.github.io/centurydewas/clubframes';
        } else {
            // Handle failure
            alert('Failed to update the frame. Please try again.');
        }
    } catch (error) {
        console.error('Error updating frame:', error);
        alert('An error occurred while updating the frame.');
    }
});
