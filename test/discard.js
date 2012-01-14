var toss = require('../');
var test = require('tap').test;

test('errors', function (t) {
    t.plan(1);
    var tt = toss(30, function (err) {
        t.equal(err, 'beep');
        t.end();
    });
    
    busy(tt(function () {
        busy(tt(function () {
            tt.error('beep');
        }))
    }));
});

function busy (cb) {
    setTimeout(cb, 10);
}
