const express = require("express");
const port = 8000;
const db = require("./config/mongoose");
const cookieParse = require("cookie-parser");

const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const saasMiddleware = require("node-sass-middleware");
const flash = require("connect-flash");
const customMware = require("./config/middleware");

const app = express();
app.use(express.urlencoded());
app.use(cookieParse());
app.use(express.static("./assets"));
app.use("/uploads", express.static(__dirname + "/uploads"));
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
app.use(expressLayouts);

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use(
  saasMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "extended",
    prefix: "/css",
  })
);

app.use(
  session({
    name: "codeial",
    //To change the secret before deployment in production mode
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl: "mongodb://127.0.0.1:27017/codeial_development_project",
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

app.use("/", require("./routes"));

app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, function (err) {
  if (err) {
    console.log("ERROR:", err);
    return;
  }
  console.log("Server is UP and Running on port:", port);
});
