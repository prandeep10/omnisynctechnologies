const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
const devicesFilePath = 'devices.json';

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Read the initial state from the devices file
let devicesState = {};
try {
    devicesState = JSON.parse(fs.readFileSync(devicesFilePath, 'utf8'));
} catch (err) {
    console.error('Error reading devices file:', err);
}

// Endpoint to get the status of all devices
app.get('/api/devices', (req, res) => {
    res.json(devicesState);
});

// Endpoint to update the status of all devices
app.put('/api/devices', (req, res) => {
    const newDevicesState = req.body;

    // Validate the request body
    if (!isValidDevicesState(newDevicesState)) {
        return res.status(400).json({ error: 'Invalid request body' });
    }

    // Update the devices state
    devicesState = newDevicesState;

    // Write the updated state to the devices file
    fs.writeFile(devicesFilePath, JSON.stringify(devicesState, null, 2), 'utf8', (err) => {
        if (err) {
            console.error('Error writing devices file:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json({ message: 'Devices status updated successfully' });
    });
});

// Function to validate the devices state
function isValidDevicesState(state) {
    const validKeys = ['Light', 'Fan', 'Tv', 'LED'];
    for (const key of validKeys) {
        if (!(key in state)) {
            return false;
        }
    }
    return true;
}

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
