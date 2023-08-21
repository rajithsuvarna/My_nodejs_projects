const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = function (req, res) {
  Post.findById(req.body.post).then((post) => {
    Comment.create({
      content: req.body.content,
      post: req.body.post,
      user: req.user._id,
    }).then((comment) => {
      if (comment) {
        post.comments.push(comment);
        post.save();
        res.redirect("/");
      }
    });
  });
};

module.exports.destroy = function (req, res) {
  Comment.findById(req.params.id)
    .then((comment) => {
      //todo
      let mypost = Post.findById(comment.post);
      if (comment.user == req.user.id || mypost.user == req.user.id) {
        let postId = Comment.post;
        comment.deleteOne();

        Post.findByIdAndUpdate(postId, {
          $pull: { comments: req.params.id },
        })
          .then((post) => {
            return res.redirect("back");
          })
          .catch((err) => {
            console.log(err);
            return;
          });
      } else {
        return res.redirect("back");
      }
    })
    .catch((err) => {
      console.log(err);
      return;
    });
};
