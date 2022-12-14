var mongoose = require("mongoose");
const Department = require("./Department");
var User = require("./User");

const InstSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  collegeHead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  departments: {
    type: ["Department"],
  },
});
module.exports =
  mongoose.models.Institute || mongoose.model("Institute", InstSchema);
//
