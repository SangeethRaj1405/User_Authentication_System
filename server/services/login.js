const bcrypt = require("bcrypt");
const User = require("../modelss/user.js");
const { generateToken } = require("../utils/jwtUtils");

async function login(email, password) {
    try {
        
        // Wait for the query to finish
        const existingUser = await User.findOne({ email }); 
        if (!existingUser) {
            throw new Error("User not found");
        }

        // Wait for the comparison
        const validPassword = await bcrypt.compare(password, existingUser.password); 
        if (!validPassword) {
            throw new Error("Invalid password");
        }

        const token = generateToken(existingUser);
        return token;

    } catch (error) {
        throw new Error("Invalid credentials");
    }
}

module.exports = { login };
