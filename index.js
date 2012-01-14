module.exports = function (outerTimeout, errCb) {
    if (typeof outerTimeout === 'function') {
        errCb = outerTimeout;
        outerTimeout = 0;
    }
    
    if (outerTimeout) {
        var oto = setTimeout(function () {
            alive = false;
            if (errCb) errCb(new Error('timeout'));
        }, outerTimeout);
    }
    
    var alive = true;
    var self = function (timeout, fn) {
        if (typeof timeout === 'function') {
            fn = timeout;
            timeout = 0;
        }
        
        if (!alive) {
            var err = new Error('timeout');
            return function () {
                err.arguments = [].slice.call(arguments);
                if (errCb) errCb(err)
            };
        }
        else if (alive && timeout) {
            var err = new Error('timeout');
            var ito = setTimeout(function () {
                alive = false;
                if (errCb) errCb(err);
            }, timeout);
            return function () {
                clearTimeout(ito);
                if (alive) fn.apply(this, arguments);
            };
        }
        else if (alive) {
            return function () {
                if (alive) fn.apply(this, arguments);
            };
        }
    };
    
    self.error = function (err) {
        self.end();
        if (errCb) errCb(err);
    };
    
    self.end = function () {
        alive = false;
        clearTimeout(oto);
    };
    
    return self;
};
