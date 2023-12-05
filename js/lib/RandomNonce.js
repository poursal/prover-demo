// Constructor for random nonce
oratush.rnonce = function () {
}
// Methods
oratush.rnonce.prototype = {
    next: function () {
        const next = new Uint8Array(4);
        window.crypto.getRandomValues(next);
        return next;
    }
}
