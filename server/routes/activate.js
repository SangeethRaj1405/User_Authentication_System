const express = require("express")
const cors = require("cors");
const Activation  = require("../controllers/Activate");

const router = express.Router();

router.use(cors());

router.post("/Activate-account", Activation.accountActivation);

module.exports = router;