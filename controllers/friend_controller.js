const Friend = require("../models/friendship");
const User = require("../models/user");
module.exports.create = async function (req, res) {
  try {
    let friend = await Friend.find({
      from_user: req.user._id,
      to_user: req.params.id,
    });

    if (friend.length == 0) {
      let user = await User.findById(req.user._id);
      let newfriend = await Friend.create({
        from_user: req.user._id,
        to_user: req.params.id,
      });
      user.friendships.push(newfriend.to_user);
      user.save();
      req.flash("success", "Added to Friendlist");
      return res.redirect("back");
    } else {
      req.flash("error", "Already added to Friendlist");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", err);
    console.log("Error", err);
    return;
  }
};
module.exports.destroy = async function (req, res) {
  try {
    let friend = await Friend.find({
      from_user: req.user._id,
      to_user: req.params.id,
    });

    if (friend.length != 0) {
      await Friend.findOneAndDelete({
        from_user: req.user._id,
        to_user: req.params.id,
      });
      let user = await User.findByIdAndUpdate(req.user._id, {
        $pull: { friendships: req.params.id },
      });
      req.flash("success", "Deleted from Friendlist");
      return res.redirect("back");
    } else {
      req.flash("error", "Not in Friendlist");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", err);
    console.log("Error", err);
    return;
  }
};
