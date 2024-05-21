const express = require('express');
const router = express.Router();
const { forgotPassword } = require('../controllers/forgetpassword');

// Define the route for handling forgot password requests
router.post('/', forgotPassword);

module.exports = router;
