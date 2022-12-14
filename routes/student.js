const express = require("express");
const Router = require("router");
const User = require("../Models/User");
const Institute = require("../Models/Institute");
const Department = require("../Models/Department");
const Request = require("../Models/Request");
var router = Router();
router.get("/dashboard", (req, res) => {
  var userRole = req.cookies.userRole;
  if (userRole !== "Student") res.redirect("/signin");
  var requests = Request.find({ user_id: req.cookies.userID })
    .populate("facilityId")
    .then((data) => {
      console.log(data);
      res.render("student/dashboard", { data });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/createrequest", (req, res) => {
  var userRole = req.cookies.userRole;
  if (userRole !== "Student") res.redirect("/signin");
  var requests = Department.find({}).then((data) => {
    console.log(data);
    res.render("student/createrequest", { data });
  });
});
router.post("/createrequest", async (req, res) => {
  var facilityId = req.body.facilityId;
  var desc = req.body.desc;
  var facility = Department.findOne({ _id: facilityId })
    .then(async (data) => {
      var request = new Request({
        user_id: req.cookies.userID,
        changedby: data.facilityHead,
        startingdate: Date.now(),
        facilityId,
        desc,
      });
      await request.save();
      res.redirect("/student/dashboard");
    })
    .catch((err) => res.send(err));
});
module.exports = router;
