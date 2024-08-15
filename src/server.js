// Include modules
const http = require('http');
const app = require('./app.js');

// Define port
// TODO: store in .env
const PORT = 9000;

// Use Express to listen and handle req/res
// I used http.createServer() instead of app.listen() directly because
// it can give more modular control over any future iterations
// (ie. adding https, using other middleware, WebSockets etc.)
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});