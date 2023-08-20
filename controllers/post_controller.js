const post = require("../models/post");
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
