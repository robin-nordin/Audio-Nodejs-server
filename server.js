const http = require('http'); // Defines specific server = http.
const fs = require('fs'); // Reads the files.
const path = require('path'); // Find the files.
const server = http.createServer(); // Creates the server.

const mime = {
    '.html':    'text/html',
    '.css':     'text/html',
    '.jpg':     'image/jpeg',
    '.js':      'text/javascript',
    '.svg':     'image/svg+xml',
    '.mp3':     'audio/mpeg'
}


server.on('request', (request, response) => { // Turns the server on. Tells the website what will happen when the server turns on.
    
    if (request.url === '/') {
        response.writeHead(301, {'location': '/index.html'}); // writeHead accepts two parameters and in this situiation it says "site not found(301 error code), direct to index.html".
        response.end();
    } else {
        const baseUrl = __dirname + request.url;
        const source = fs.createReadStream(baseUrl);
    
        source.on('open', () => {
        //response.setHeader('Content-Type', 'text/html');
        const type = mime[path.extname(baseUrl)];
        response.setHeader('Content-Type', type);
        source.pipe(response);
    });

        source.on('error', () => {
        response.end('Sidan kan inte hittas.'); // Gives an error message if the site is not found.
    });
    
}
   
}); 

server.listen(8000);