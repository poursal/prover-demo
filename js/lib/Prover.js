// Namespace creation
const oratush = {}
// Helper method to determine platform endianness
oratush.littleEndian = (() => {
    const buffer = new ArrayBuffer(2);
    new DataView(buffer).setInt16(0, 256, true /* littleEndian */);
    // Int16Array uses the platform's endianness.
    return new Int16Array(buffer)[0] === 256;
})();

// Constructor for Proof Of Work
// Input:
// timeout => in milliseconds
oratush.prover = function (timeout = 6000) {
    this.hashAlgo = "SHA-256";
    this.timeout = timeout; // in milliseconds
}
// Methods
oratush.prover.prototype = {
    // Input:
    // data => Uint8Array the input
    // nonceG => the nonce generator, used to get the next nonce as a Uint8Array
    // difficulty => how many leading zeros are acceptable
    // Returns:
    // A Uint8Array containing the nonce or null on failure
    process: async function (difficulty, data, nonceG) {
        const now = Date.now();
        let nextNonce, hash, block;

        do {
            nextNonce = nonceG.next();
            block = this.prepareBlock(data, nextNonce);
            hash = await this.calculateHash(block);

            if ((Date.now() - now) > this.timeout) {
                nextNonce = null;
                break;
            }
        } while(!this.isAcceptable(hash, difficulty));

        return nextNonce;
    },

    // Input:
    // data => Uint8Array the input
    // nonce => Uint8Array containing the nonce
    // Returns:
    // A Uint8Array containing the data and the nonce
    prepareBlock: function (data, nonce) {
        const block = new Uint8Array(data.length + nonce.length);
        let i;

        // Copy the data
        for (i = 0; i < data.length; i++) {
            block[i] = data[i];
        }
        // Copy the nonce
        for (i = 0; i < nonce.length; i++) {
            block[data.length + i] = nonce[i];
        }

        return block;
    },

    // Input:
    // data => Uint8Array the input
    // difficulty => how many leading zeros are acceptable
    // Returns:
    // True if the difficulty is met, false otherwise
    isAcceptable: function (data, difficulty) {
        const bytesZero = Math.floor(difficulty / 8);
        const bitsZero = difficulty % 8;
        let i;
        const bitMask = 255;
        let bitOp = 255;

        // Check if the first bytesZero are all zero
        for (i = 0; i < bytesZero; i++) {
            if (data[i] !== 0) {
                return false;
            }
        }

        // If we are exactly at 0 bits, return true as we have already checked full bytes above
        if (bitsZero === 0) {
            return true;
        }

        // Prepare the bitOp by shifting to left. So if I want 5 leading zeros I have:
        // 11111111 => 11111000
        for (let j = 0; j < (8 - bitsZero); j++) {
            bitOp = bitOp << 1;
        }

        // Make the number 8 bits long with the mask
        bitOp = bitOp & bitMask;

        return (data[i] & bitOp) === 0;
    },

    // Input:
    // data => Uint8Array the input
    // Returns:
    // A Uint8Array containing the hash
    calculateHash: async function (data) {
        const hash = await crypto.subtle.digest(this.hashAlgo, data); // hash the message
        return Array.from(new Uint8Array(hash)); // convert buffer to byte array (32 bytes long)
    }
}
