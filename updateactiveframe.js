document.getElementById('updateFrameForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Ensure variables are correctly captured from form inputs
    const frameId = document.getElementById('frameNo').value;
    const rowNumber = frameId.replace('SPS', ''); // Assuming 'SPS' prefix in your Frame ID
    const tableNo = document.getElementById('tableNo').value;
    const startTime = document.getElementById('startTime').value;
    const playersInput = document.getElementById('players').value;
    const players = playersInput.split(',').map(player => player.trim());

    // Correctly define the payload within the same scope as its usage
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
});
