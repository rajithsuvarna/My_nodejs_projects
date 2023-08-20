const post = require("../models/post");
const comment = require("../models/comment");
module.exports.create = function (req, res) {
  post
    .create({ content: req.body.content, user: req.user._id })
    .then((newPost) => {
      return res.redirect("back");
    })
    .catch((err) => {
      console.log("Error:", err);
      return;
    });
};

module.exports.destroy = function (req, res) {
  post.findById(req.params.id).then((Post) => {
    if (Post.user == req.user.id) {
      Post.deleteOne();
      comment
        .deleteMany({ post: req.params.id })
        .then(() => {
          return res.redirect("back");
        })
        .catch((err) => {
          return res.redirect("back");
        });
    } else {
      return res.redirect("back");
    }
  });
};
