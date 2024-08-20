// Include modules
const http = require('http');
require('dotenv').config();
const app = require('./app.js');

// Define host and port (use from .env file)
const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || '9000';

// Use Express to listen and handle req/res
// I used http.createServer() instead of app.listen() directly because
// it can give more modular control over any future iterations
// (ie. adding https, using other middleware, WebSockets etc.)
const server = http.createServer(app);

server.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}/`);
});