var toss = require('../');
var fs = require('fs');

var t = toss(10, function (err) {
    console.log('reads took to long');
});

fs.readFile(__filename, t(function (err, body) {
    if (err) t.error(err)
    else fs.readFile(__filename + '/no_such_file', t(function (err, body) {
        if (err) t.error(err)
        else t.end()
    }))
}));
