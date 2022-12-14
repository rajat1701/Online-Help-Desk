const express = require("express");
const Router = require("router");
const User = require("../Models/User");
const Institute = require("../Models/Institute");
const Department = require("../Models/Department");
const Request = require("../Models/Request");
const { default: mongoose } = require("mongoose");
var router = Router();
router.get("/dashboard", (req, res) => {
  var userRole = req.cookies.userRole;
  if (userRole !== "FacilityHead") res.redirect("/signin");

  var requests = Request.find({ changedby: req.cookies.userID })
    .populate("facilityId")
    .populate("user_id")
    .then((data) => {
      console.log(data);
      res.render("facilityhead/dashboard", { data });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.post("/update", (req, res) => {
  var userRole = req.cookies.userRole;
  if (userRole !== "FacilityHead") res.redirect("/signin");
  console.log(req.body);
  var requestId = req.body.requestId;
  var request = Request.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(requestId) },
    { status: req.body.approve === "" ? "Approved" : "Rejected" },
    (err, data) => {
      if (data) {
        console.log(data);
        res.redirect("/facilityhead/dashboard");
      }
    }
  );
});

module.exports = router;
