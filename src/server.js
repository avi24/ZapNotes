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