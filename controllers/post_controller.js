const post = require("../models/post");
const comment = require("../models/comment");
const Like = require("../models/like");

module.exports.create = async function (req, res) {
  try {
    let Post = await post.create({
      content: req.body.content,
      user: req.user._id,
    });

    if (req.xhr) {
      Post = await Post.populate("user", "name");

      return res.status(200).json({
        data: {
          post: Post,
        },
        message: "Post Created",
      });
    }

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
      // CHANGE :: delete the associated likes for the post and all its comments' likes too
      await Like.deleteMany({ likeable: Post, onModel: "Post" });
      await Like.deleteMany({ _id: { $in: Post.comments } });

      Post.deleteOne();
      await comment.deleteMany({ post: req.params.id });

      if (req.xhr) {
        return res.status(200).json({
          data: {
            post_id: req.params.id,
          },
          message: "Post deleted",
        });
      }

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
