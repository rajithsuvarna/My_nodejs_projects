const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");

router.get("/profile", userController.profile);

router.get("/signin", userController.signIn);
router.get("/signup", userController.signUp);

router.post("/create", userController.Create);

module.exports = router;
