const http = require('http');

http.createServer((req, res) => {
  // To Write a Cookie
  res.writeHead(200, {
    'Set-Cookie': 'mycookie=test',
    'Content-Type': 'text/plain',
  });
  res.write(req.url);
  res.end();
}).listen(3000);
