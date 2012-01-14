var test = require('tap').test;
var http = require('http');
var toss = require('../');

function withServer (delay, cb) {
    var port = Math.floor(Math.random() * 5e5 + 1e4);
    var get = function (fn) {
        http.get({ port : port, path : '/' }, function (res) {
            res.on('end', fn);
        });
    };
    
    var server = http.createServer(function (req, res) {
        setTimeout(function () {
            res.end('beeeeeeeeeeeeeeeeeeeeeeeeep');
        }, delay);
    });
    server.listen(port, cb.bind(null, get));
    
    return server;
}

test('http request timeout failure', function (t) {
    t.plan(1);
    
    var tt = toss(200, function (err) {
        t.ok(err);
        t.end();
    });
    
    var server = withServer(600, function (get) {
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

test('http request timeout success', function (t) {
    t.plan(1);
    var tt = toss(function (err) {
        t.fail(err);
    });
    
    var server = withServer(10, function (get) {
        get(tt(function () {
            get(tt(function () {
                t.ok(true);
                tt.end();
                t.end();
            }));
        }));
    });
    
    t.on('end', function () {
        server.close();
    });
});
