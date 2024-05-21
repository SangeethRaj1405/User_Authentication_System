const express = require("express")
const cors = require("cors");
const Reset  = require("../controllers/reset");

const router = express.Router();

router.use(cors());

router.post("/", Reset.reset);

module.exports = router;