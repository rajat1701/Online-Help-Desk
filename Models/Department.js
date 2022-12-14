var mongoose = require("mongoose");
const User = require("./User");
const Request = require("./Request");
const DepartSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  facilityHead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});
module.exports =
  mongoose.models.Department || mongoose.model("Department", DepartSchema);
