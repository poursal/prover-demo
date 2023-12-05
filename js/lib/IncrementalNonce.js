// Constructor for incremental nonce
oratush.inonce = function () {
    this.nonce = new Uint32Array(1);
    this.littleEndian = oratush.littleEndian;
}
// Methods
oratush.inonce.prototype = {
    next: function () {
        const converted = new Uint8Array(this.nonce.buffer);
        const next = [...converted]; // Expand to copy the array by value

        if (!this.littleEndian) {
            next.reverse();
        }

        this.nonce[0]++;
        return next;
    }
}
