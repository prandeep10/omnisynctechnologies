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

// Endpoint to get the status of all devices
app.get('/api/devices', (req, res) => {
    fs.readFile(devicesFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        res.json(JSON.parse(data));
    });
});

// Endpoint to update the status of a device
app.put('/api/devices/:device', (req, res) => {
    const device = req.params.device;
    const status = req.body.status;

    fs.readFile(devicesFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        const devices = JSON.parse(data);
        if (devices.hasOwnProperty(device)) {
            devices[device] = status;
            fs.writeFile(devicesFilePath, JSON.stringify(devices, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Internal server error' });
                    return;
                }

                res.json({ message: `${device} status updated successfully` });
            });
        } else {
            res.status(404).json({ error: 'Device not found' });
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
