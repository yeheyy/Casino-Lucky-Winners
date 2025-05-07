const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    if (req.method === 'GET') {
        let filePath = path.join(__dirname, req.url === '/' ? 'visitors.html' : req.url);
        const extname = String(path.extname(filePath)).toLowerCase();
        const mimeTypes = {
            '.html': 'text/html',
            '.js': 'application/javascript',
            '.css': 'text/css',
            '.json': 'application/json'
        };
        const contentType = mimeTypes[extname] || 'application/octet-stream';

        fs.readFile(filePath, (err, content) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end('<h1>404 Not Found</h1>', 'utf-8');
                } else {
                    res.writeHead(500);
                    res.end(`Server Error: ${err.code}`);
                }
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    }
    
    else if (req.method === 'POST' && req.url === '/add-content') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const newContent = JSON.parse(body);
            const dataFilePath = path.join(__dirname, 'data.json');

            fs.readFile(dataFilePath, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading data.json:', err);
                    res.writeHead(500);
                    res.end('Server error while reading data.json');
                    return;
                }

                let contentArray = JSON.parse(data);
                contentArray.push(newContent);

                fs.writeFile(dataFilePath, JSON.stringify(contentArray, null, 2), 'utf8', err => {
                    if (err) {
                        console.error('Error writing to data.json:', err);
                        res.writeHead(500);
                        res.end('Server error while writing to data.json');
                        return;
                    }

                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Content added successfully' }));
                });
            });
        });
    } else {
        res.writeHead(405);
        res.end('Method Not Allowed');
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
