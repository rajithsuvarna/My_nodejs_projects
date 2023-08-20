const Post = require("../models/post");
module.exports.home = function (req, res) {
  Post.find({})
    .populate("user")
    .populate({ path: "comments", populate: { path: "user" } })
    .then((posts) => {
      return res.render("home", { title: "Codeial | Home", posts: posts });
    })
    .catch((err) => {
      console.log("ERROR:", err);
    });
};
