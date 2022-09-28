const express = require("express");
const router = express.Router();

const { signup, signin } = require("../controllers/user");

router.post("/user/register", signup);
router.post("/user/login", signin);

module.exports = router;
