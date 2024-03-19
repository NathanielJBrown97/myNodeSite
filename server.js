const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 1337;

// Function to check if the file path is valid. If finds file, will read file and write. 
// If it cannot it will display a 404 error.
function serveStaticFile(res, filePath, contentType, responseCode = 200) {
    if (!fs.existsSync(filePath)) {
        // If the file doesn't exist, serve 404.html
        filePath = path.join(__dirname, 'subpages', '404.html');
        contentType = 'text/html';
        responseCode = 404;
    }

    fs.readFile(filePath, (error, content) => {
        res.writeHead(responseCode, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
    });
}

// Function that creates server using the assignment html file. Using a switch case to determine the type of 
// data the function will set the contentType to the respective... type. Then serve the file using the above funciton.
// Finally it will send a console.log message with a link to the site to view. (locally)
http.createServer((req, res) => {
    let url = req.url;
    if (url === '/') {
        url += 'assignment8.html';
    }

    let filePath = path.join(__dirname, url); 

    // Switch case to determine content type
    let contentType = 'text/html'; // Default content type
    switch (path.extname(filePath)) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
        case '.webp':
            contentType = 'image/webp';
            break;
    }

    serveStaticFile(res, filePath, contentType);

}).listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
