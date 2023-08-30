const express = require("express");
const router = express.Router();
const passport = require("passport");

const friendController = require("../controllers/friend_controller");

router.get(
  "/addfriend/:id",
  passport.checkAuthentication,
  friendController.create
);
router.get(
  "/unfriend/:id",
  passport.checkAuthentication,
  friendController.destroy
);

module.exports = router;
