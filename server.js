// server.js
const express = require('express');
const WebSocket = require('ws');
const http = require('http');

// Initialize the express app and HTTP server
const app = express();
const server = http.createServer(app);

// Set up WebSocket server
const wss = new WebSocket.Server({ server });

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Handle WebSocket connections
wss.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('message', (message) => {
        console.log(`Received: ${message}`);

        // Broadcast the message to all other clients
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    socket.on('close', () => {
        console.log('Client disconnected');
    });
});

// Start the server on a port (e.g., 3000)
const PORT = 4000; // You can change this if needed
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
