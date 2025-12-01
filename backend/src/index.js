// backend/src/index.js
const http = require('http');
const handleRequest = require('./app');

const PORT = process.env.PORT || 3001;

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log(`BiblePing API running at http://localhost:${PORT}`);
});
