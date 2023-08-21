const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const passport = require("passport");

router.get(
  "/profile/:id",
  passport.checkAuthentication,
  userController.profile
);

router.get("/signin", userController.signIn);
router.get("/signup", userController.signUp);

router.post("/create", userController.Create);
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/user/signin" }),
  userController.createSession
);

router.get("/signout", userController.destroySession);

module.exports = router;
