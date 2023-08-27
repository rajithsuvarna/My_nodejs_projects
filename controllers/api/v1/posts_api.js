const Post = require("../../../models/post");
const comment = require("../../../models/comment");
module.exports.index = async function (req, res) {
  let posts = await Post.find({})
    .sort("-createdAt")
    .populate("user")
    .populate({ path: "comments", populate: { path: "user" } });

  return res.json(200, {
    message: "List of posts",
    posts: posts,
  });
};

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);
    if (post.user == req.user.id) {
      post.deleteOne();
      await comment.deleteMany({ post: req.params.id });

      /*if (req.xhr) {
      return res.status(200).json({
        data: {
          post_id: req.params.id,
        },
        messae: "Post deleted",
      });
    }

    req.flash("success", "Post and associated comments deleted");
    */
      return res.json(200, {
        message: "Post and associated comments deleted",
      });
    } else {
      return res.json(401, {
        message: "You cannot delete this post",
      });
    }
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};
