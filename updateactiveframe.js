document.addEventListener('DOMContentLoaded', function() {
    const queryParams = new URLSearchParams(window.location.search);
    const frameId = queryParams.get('frameId');

    if (frameId) {
        document.getElementById('frameNo').value = frameId; // Display Frame ID
        document.getElementById('frameNo').readOnly = true; // Make Frame ID read-only

        // Fetch and pre-fill the form with the frame's existing data
        // Placeholder for fetch logic - replace with actual data fetching
        fetchData('Frames').then(data => {
            const frameData = data.find(row => `SPS${row.rowNumber}` === frameId);
            if (frameData) {
                // Pre-fill form fields with frameData
                // Example: document.getElementById('tableNo').value = frameData.tableNo;
            }
        });
    }

    // Handle form submission to update frame data
    document.getElementById('updateFrameForm').addEventListener('submit', function(event) {
        event.preventDefault();
        // Update frame data logic here
        // Redirect or show success message after updating
    });
});
