module.exports = function () {
    var alive = true;
    var self = function (fn) {
        if (alive) fn()
    };
    
    self.end = function () {
        alive = false;
    };
    
    return self;
};
