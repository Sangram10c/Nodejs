const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
    //   res.writeHead(200, { 'Content-Type': 'text/plain' });
    //   res.end('Hello Flock!\n');
    // console.log("Request received");
    // console.log(req);
    // console.log(`Request URL: ${req.url}`);


    const log = `${new Date()} ${req.url}\n`;
    if (req.url === '/favicon.ico') {
        res.writeHead(204);
        
        res.end();
        return;
    }
    const myURL = url.parse(req.url, true, true, true);
    console.log(myURL);
    fs.appendFile('data.txt', log, (err, data) => {
        switch (myURL.pathname) {
            case "/":
                res.end("hello flock\n");
                break;
            case "/about":
                const name = myURL.query.myname || "Guest";
                const id = myURL.query.id || "unknown";

                res.end(`hii, ${name}  and your id is ${id}`);
                break;
            
            case "/search":
                const searchquery = myURL.query.search_query || "nothing";
                res.end("searching for  " + searchquery + "\n");
                break;

            case "/contact":
                res.end("contact me on 9999999999\n");
            default:
                res.end("404 not found\n");
        }
    });
});


server.listen(5000, () => {
    console.log('Server is running at http://localhost:5000');
});