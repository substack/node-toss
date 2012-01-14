var test = require('tap').test;
var toss = require('../');
var http = require('http');

test('http request timeout failure', function (t) {
    var port = Math.floor(Math.random() * 5e5 + 1e4);
    var tt = toss(200, function (err) {
        t.ok(err);
        t.end();
    });
    
    function get (cb) {
        http.get({ port : port, path : '/' }, function (res) {
            res.on('end', cb);
        });
    }
    
    function ready () {
        get(tt(function () {
            get(tt(function () {
                console.log('finished');
                tt.end();
            }));
        }));
    }
    
    var server = http.createServer(function (req, res) {
        setTimeout(function () {
            res.end('beeeeeeeeeeeeeeeeeeeeeeeeep');
        }, 600);
    });
    server.listen(port, ready);
    
    t.on('end', function () {
        server.close();
    });
});
