var toss = require('../');
var http = require('http');

var t = toss();
var to = setTimeout(function () {
    t.end();
}, 1000);

http.get({ port : 8800, path : '/' }, t(function (res0) {
    http.get({ port : 8800, '/beep' }, t(function (res1) {
        t.end();
    }));
}));
