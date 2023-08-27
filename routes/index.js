const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home_controller");
router.use(express.urlencoded());

router.get("/", homeController.home);
router.use("/user", require("./user"));
router.use("/posts", require("./posts"));
router.use("/comments", require("./comment"));
router.use("/api", require("./api"));

module.exports = router;
