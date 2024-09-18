const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer(function(req, res) {
    if (req.url === '/favicon.ico') {
        res.writeHead(204);
        res.end();
        return;
    }

    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    console.log(`Solicitud: ${filePath}`);
    const extname = path.extname(filePath);

    let contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.svg':
            contentType = 'image/svg+xml';
            break;
        case '.ico':
            contentType = 'image/x-icon';
            break;
        case '.woff':
            contentType = 'font/woff';
            break;
        case '.woff2':
            contentType = 'font/woff2';
            break;
    }

    fs.stat(filePath, (err, stats) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - Archivo no encontrado</h1>');
            } else {
                console.error('Error del servidor:', err);
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>500 - Error del servidor</h1>');
            }
            return;
        }

        if (stats.isDirectory()) {
            filePath = path.join(filePath, 'index.html');
        }

        fs.readFile(filePath, extname === '.html' || extname === '.css' || extname === '.js' ? 'utf8' : null, (err, content) => {
            if (err) {
                console.error('Error al leer el archivo:', err);
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>500 - Error del servidor</h1>');
                return;
            }

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        });
    });
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto: http://localhost:${PORT}`);
});
