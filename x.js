var http = require('http');
var fs = require('fs');
http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-type': 'text/html' });
    fs.readFile('./index.html', 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);
        res.write(data);
        res.end();
    });
}).listen(3000, function() {
    console.log("server running");
});