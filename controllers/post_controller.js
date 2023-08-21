const post = require("../models/post");
const comment = require("../models/comment");

module.exports.create = async function (req, res) {
  try {
    await post.create({ content: req.body.content, user: req.user._id });
    req.flash("success", "Post published");
    return res.redirect("back");
  } catch (err) {
    req.flash("error", err);
    console.log("Error", err);
    return;
  }
};

module.exports.destroy = async function (req, res) {
  try {
    let Post = await post.findById(req.params.id);
    if (Post.user == req.user.id) {
      Post.deleteOne();
      await comment.deleteMany({ post: req.params.id });
      req.flash("success", "Post and associated comments deleted");
      return res.redirect("back");
    } else {
      req.flash("error", "Cannot delete this post");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", "Post published");
    console.log("Error", err);
    return;
  }
};
