const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home_controller");
const passport = require("passport");
router.use(express.urlencoded());

router.get("/", homeController.home);
router.use("/users", require("./user"));
router.use("/posts", require("./posts"));
router.use("/comments", require("./comment"));
router.use("/api", require("./api"));
router.use("/likes", require("./likes"));

module.exports = router;
