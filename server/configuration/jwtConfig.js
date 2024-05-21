const crypto = require("crypto");

// Generate a random secret Key
const secretKey = crypto.randomBytes(32).toString('hex');

module.exports = {
    secretKey: secretKey
}