const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb://127.0.0.1:27017/codeial_development_project"
  );
}

const db = mongoose.connection;
db.once("open", function () {
  console.log("Successfully connected to database");
});
module.exports = db;
