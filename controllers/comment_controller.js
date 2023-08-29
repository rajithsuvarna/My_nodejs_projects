const Comment = require("../models/comment");
const Post = require("../models/post");
const commentsMailer = require("../mailers/comments_mailer");
const Like = require("../models/like");

module.exports.create = async function (req, res) {
  try {
    let post = await Post.findById(req.body.post);
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });
      post.comments.push(comment);
      post.save();
      comment = await comment.populate("user", "name email");
      commentsMailer.newComment(comment);
      if (req.xhr) {
        // Similar for comments to fetch the user's id!

        return res.status(200).json({
          data: {
            comment: comment,
          },
          message: "Post created!",
        });
      }

      req.flash("success", "Comment added");
      res.redirect("/");
    }
  } catch (err) {
    req.flash("error", err);
    console.log("Error", err);
    res.redirect("/");
  }
};

module.exports.destroy = async function (req, res) {
  try {
    let comment = await Comment.findById(req.params.id);
    let post = await Post.findById(comment.post);

    if (comment.user == req.user.id || post.user == req.user.id) {
      let postId = Comment.post;
      comment.deleteOne();

      let post = await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });

      // CHANGE :: destroy the associated likes for this comment
      await Like.deleteMany({ likeable: comment._id, onModel: "Comment" });

      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment_id: req.params.id,
          },
          message: "Post deleted",
        });
      }

      req.flash("success", "Comment deleted");

      return res.redirect("back");
    } else {
      req.flash("error", "Cannot delete this comment");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", err);
    console.log("Error", err);
    return;
  }
};
