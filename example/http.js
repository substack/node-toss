var toss = require('../');
var http = require('http');

var t = toss(2000, function (err) {
    console.log('timed out');
});

function get (cb) {
    http.get({ port : 8800, path : '/' }, function (res) {
        res.on('end', cb);
    });
}

var server = http.createServer(function (req, res) {
    setTimeout(function () {
        res.end('beeeeeeeeeeeeeeeeeeeeeeeeep');
    }, 600);
});

server.listen(8800, function () {
    get(t(function () {
        get(t(function () {
            console.log('finished');
            t.end();
        }));
    }));
});

setTimeout(function () {
    server.close();
}, 2000);
