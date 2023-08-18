const express = require("express");
const port = 8000;
const db = require("./config/mongoose");
const cookieParse = require("cookie-parser");

const app = express();
app.use(express.urlencoded());
app.use(cookieParse());
app.use(express.static("./assets"));
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
app.use(expressLayouts);

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

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
