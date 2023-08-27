const express = require("express");
const router = express.Router();
const postAPI = require("../../../controllers/api/v1/posts_api");
const passport = require("passport");

router.get("/", postAPI.index);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  postAPI.destroy
);

module.exports = router;
