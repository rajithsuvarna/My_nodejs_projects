const user = require("../models/user");
module.exports.profile = function (req, res) {
  user.findById(req.params.id).then((user) => {
    return res.render("userprofile", {
      title: "User Profile",
      profile_user: user,
    });
  });
};
module.exports.update = function (req, res) {
  if (req.params.id == req.user.id) {
    user.findByIdAndUpdate(req.params.id, req.body).then(() => {
      return res.redirect("back");
    });
  } else {
    return res.status(404).send("unauthorized");
  }
};

module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/user/profile");
  }
  return res.render("user_signUp", { title: "Codial:SignUP" });
};

module.exports.signIn = function (req, res) {
  return res.render("user_signIn", { title: "Codial:SignIn" });
};

module.exports.Create = function (req, res) {
  if (req.body.password != req.body.confirmpassword) {
    return res.redirect("back");
  }
  user
    .findOne({ email: req.body.email })
    .then((newUser) => {
      if (!newUser) {
        user
          .create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          })
          .then(() => {
            return res.redirect("/user/signin");
          })
          .catch((err) => {
            console.log("Error: while creating user", err);
            return;
          });
      } else {
        return res.redirect("back");
      }
    })
    .catch((err) => {
      if (err) {
        console.log("Error:", err);
        return;
      }
    });
};
module.exports.createSession = function (req, res) {
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.log("Error:while signout ");
      return;
    }
    return res.redirect("/");
  });
};
