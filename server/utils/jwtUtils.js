const jwt = require("jsonwebtoken");
const { secretKey } = require("../configuration/jwtConfig");

function generateToken(user){
    const payload = {
        email:user.email,
        role:user.role
    }
    return jwt.sign(payload, secretKey, {expiresIn: "1h"});
};

module.exports = {
    generateToken
}