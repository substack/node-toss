var test = require('tap').test;
var http = require('http');
var toss = require('../');

function withServer (cb) {
    var port = Math.floor(Math.random() * 5e5 + 1e4);
    var get = function (fn) {
        http.get({ port : port, path : '/' }, function (res) {
            res.on('end', fn);
        });
    };
    
    var server = http.createServer(function (req, res) {
        setTimeout(function () {
            res.end('beeeeeeeeeeeeeeeeeeeeeeeeep');
        }, 600);
    });
    server.listen(port, cb.bind(null, get));
    
    return server;
}

test('http request timeout failure', function (t) {
    var tt = toss(200, function (err) {
        t.ok(err);
        t.end();
    });
    
    var server = withServer(function (get) {
        get(tt(function () {
            get(tt(function () {
                tt.end();
            }));
        }));
    });
    
    t.on('end', function () {
        server.close();
    });
});
