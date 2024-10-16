"use strict";
const http = require("http");
const fs = require('fs');
const PORT = process.env.PORT || 3000;

const routes = ['/about', '/contact-me', '/404'];

const readFile = (filename, res) => {
    fs.readFile(filename, (err, data) => {
        if(!err && data) {
            res.writeHead(200, {"Content-Type": "text/html"})
            res.write(data);
            return res.end();
        }
        res.writeHead(404, {"Content-Type": "text/html"});
        console.log("Sorry, something went wrong");
        return res.end();
    })
}

http.createServer((req, res) => {
    const baseUrl = "http://" + req.headers.host + '/'
    const url = new URL(req.url, baseUrl);
    const filename = '.' + url.pathname + '.html';
    if(!routes.includes(url.pathname)) {
        readFile("404.html", res);
        return;
    } 
    if(url.pathname === "/") {
        readFile("index.html", res);
        return;
    }
    readFile(filename, res);
    console.log(req.url);
}).listen(PORT, () => console.log(`Server running at Port: ${PORT}`));
