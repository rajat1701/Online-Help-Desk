const express = require("express");
const Router = require("router");
const User = require("../Models/User");
const Institute = require("../Models/Institute");
const Department = require("../Models/Department");
var router = Router();
router.get("/dashboard", (req, res) => {
  var userRole = req.cookies.userRole;
  if (userRole !== "CollegeHead") res.redirect("/signin");
  res.render("collegehead/dashboard");
});
router.get("/addfacilityhead", (req, res) => {
  var userRole = req.cookies.userRole;
  if (userRole !== "CollegeHead") res.redirect("/signin");
  res.render("collegehead/addfacilityhead");
});
router.get("/addstudent", (req, res) => {
  var userRole = req.cookies.userRole;
  if (userRole !== "CollegeHead") res.redirect("/signin");
  res.render("collegehead/addstudent");
});
router.post("/addfacilityhead", async (req, res) => {
  let _facilityhead = new User({
    name: req.body.name,
    email: req.body.facilityhead_email,
    phoneNumber: req.body.facilityhead_no,
    password: 1234,
    role: "FacilityHead",
  });
  let _department = new Department({
    name: req.body.department,
  });
  await _facilityhead.save();
  await _department.save();
  _department.facilityHead = _facilityhead._id;
  _facilityhead.department = _department._id;
  await _facilityhead.save();
  await _department.save();
  res.redirect("/collegehead/dashboard");
});
router.post("/addstudent", async (req, res) => {
  let _student = new User({
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.num,
    password: 1234,
    role: "Student",
  });
  await _student.save();

  res.redirect("/collegehead/dashboard");
});
module.exports = router;
