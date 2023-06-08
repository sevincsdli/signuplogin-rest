const { register, login,forgetpassword } = require("../controller/auth");

const express = require("express");
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/forgetpassword", forgetpassword);
module.exports = router;
