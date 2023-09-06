const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.google.com",
  port: 587,
  secure: false,
  auth: {
    user: "userid",
    pass: "password",
  },
});

let renderTemplate = (data, relativePath) => {
  let mailHTML;
  ejs
    .renderFile(path.join(__dirname, "../views/mailers/", relativePath), data)
    .then((template) => {
      mailHTML = template;
    })
    .catch((err) => {
      if (err) {
        console.log("error in rendering template");
        return;
      }
    });
  /*function (err, template) {
      if (err) {
        console.log("error in rendering template");
        return;
      }

      mailHTML = template;
    }*/

  return mailHTML;
};

module.exports = {
  transporter: transporter,
  renderTemplate: renderTemplate,
};
