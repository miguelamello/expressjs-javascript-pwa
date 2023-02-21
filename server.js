require = require('esm')(module); // enable ES modules in Node.js
const http = require('http');
const path = require('path');
const { createReadStream } = require('fs');
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  const stream = createReadStream(filePath);

  stream.on('error', () => {
    res.writeHead(404);
    res.end();
  });

  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Cache-Control': 'public, max-age=31536000, immutable',
  });
  stream.pipe(res);
});

server.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});
