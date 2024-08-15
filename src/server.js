/*
const http = require('http');

const PORT = 9000;

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write("Hello, ");
    res.end('World!\n');
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
*/

//Import modules
const express = require('express');
const path = require('path');

// Create an Express app
const app = express();

// Define PORT
// TODO: Define port in .env later on
const PORT = 9000;

// Middleware - Handle JSON requests 
app.use(express.json());
// Middleware - Serve static pages from 'static' directory
app.use(express.static(path.join(__dirname, '../static')));

// Route for homepage
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Define an API route for notes
app.get('/api/notes', (req, res) => {
    res.json({ message: 'Hello from the API!' });
});
// Define an API route for users
app.get('/api/users', (req, res) => {
    res.json({ message: 'Hello from the API!' });
});
  
// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});