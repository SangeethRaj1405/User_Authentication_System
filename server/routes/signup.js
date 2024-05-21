const express = require("express");
const signupController = require("../controllers/signup");

const router = express.Router();  //intializing the router

router.post("/register", signupController.createUser); //assigning the router

module.exports = router;