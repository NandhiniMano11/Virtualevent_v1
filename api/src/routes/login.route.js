const express = require("express");
const login = require("../controller/login.controller");
const router = express.Router(); 

router.route("/sendOtp").post(login.send_Otp);
router.route("/verifyotp").post(login.verify_otp);
router.route("/register").post(login.reg_user);
router.route("/timer").post(login.timer);

module.exports = router;
