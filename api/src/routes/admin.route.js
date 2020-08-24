const express = require("express");
const admin = require("../controller/admin.controller");

const router = express.Router(); 

router.route("/invite").post(admin.invite);
router.route("/deleteUser").post(admin.del_user);
router.route("/userList").post(admin.userList);
router.route("/addevent").post(admin.addevent);
router.route("/listevents").post(admin.listevents);
module.exports = router;
