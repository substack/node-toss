toss
====

Abort groups of callbacks.

This is a handy module for cancelling nested asynchronous logic when some
external event comes along like a timeout that should abort an entire
transaction.

Toss is like domains in node but implemented as a function wrapper instead of a
something in core.

example
=======

``` js
var toss = require('toss');
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
```

methods
=======

var toss = require('toss')

var t = toss(timeout=0, cb)
---------------------------

Create a toss function `t` with an optional `timeout` and an optional error
callback `cb`.

`cb` fires when a callback is attempted after `t.end()` is called
or when `t.error()` is explicitly called.

If `timeout` is specified and `t.end()` hasn't been called in `timeout`
milliseconds, `t.end()` will be called automatically.

t(timeout=0, cb)
----------------

Returns a function that calls `cb` with the arguments provided unless `t.end()`
has been called, in which case the callback from `toss()` is called.

Put this function around the callbacks that you want to group together.

t.end()
-------

After this function is called, all calls to functions wrapped with `t()` will be
ignored and the callback from `toss()` will fire.

t.error(err)
------------

Executes `t.end()` then triggers the callback from `toss()` with the `err`
object.

install
=======

With [npm](http://npmjs.org) do:

```
npm install toss
```

license
=======

MIT/X11
