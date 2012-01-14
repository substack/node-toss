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

test('outer timeout', function (t) {
    t.plan(1);
    var tt = toss(15, function (err) {
        t.equal(err.toString(), 'Error: timeout');
        t.end();
    });
    
    busy(tt(function () {
        busy(tt(function () {
            tt.end();
        }))
    }));
});

test('inner timeout', function (t) {
    t.plan(1);
    var times = 0;
    var tt = toss(function (err) {
        if (++times === 1) {
            t.equal(err.toString(), 'Error: timeout');
        }
        else {
            t.end();
        }
    });
    
    busy(5, tt(function () {
        busy(tt(function () {
            tt.end();
        }))
    }));
});

function busy (cb) {
    setTimeout(cb, 10);
}
