// Import required modules
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../modelss/user');

// Function to handle account activation
exports.accountActivation = async (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(400).json({
            message: 'Token is required'
        });
    }

    // Verify JWT token 
    jwt.verify(token, "shfbsegr74wuhdsijkkseer873w6837r3356328hdcshfssi376", async function(err, decoded) {
        if (err) {
            console.log('JWT VERIFY IN ACCOUNT ACTIVATION ERROR', err);
            return res.status(401).json({
                error: 'Expired link. Signup again'
            });
        }

        const { name, email, phone, password } = decoded; 

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword)

        // Create new user with hashed password
        const user = new User({ name, email, phone, password: hashedPassword });

        try {
            await user.save();
            return res.json({
                message: 'Signup success. Please signin.'
            });
        } catch (err) {
            console.log('SAVE USER IN ACCOUNT ACTIVATION ERROR', err);
            return res.status(500).json({
                error: 'This Account was already activated with this email'
            });
        }
    });
};
