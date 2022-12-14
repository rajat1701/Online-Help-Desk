var mongoose = require("mongoose");
const Org = require("./Institute");
const Dept = require("./Department");
const User = require("./User");
const Request = require("./Request");

const RequestSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  changedby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  startingdate: {
    type: Date,
  },

  facilityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    default: "null",
  },
  desc: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Request", RequestSchema);
