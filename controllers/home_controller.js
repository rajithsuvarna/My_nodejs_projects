const Post = require("../models/post");
const User = require("../models/user");
module.exports.home = function (req, res) {
  Post.find({})
    .populate("user")
    .populate({ path: "comments", populate: { path: "user" } })
    .then((posts) => {
      User.find({}).then((user) => {
        return res.render("home", {
          title: "Codeial | Home",
          posts: posts,
          all_user: user,
        });
      });
    })
    .catch((err) => {
      console.log("ERROR:", err);
    });
};
