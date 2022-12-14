const express = require("express");
const Router = require("router");
const User = require("../Models/User");
const Institute = require("../Models/Institute");
var router = Router();
router.get("/signup", (req, res) => {
  res.render("admin/signup");
});
router.get("/dashboard", (req, res) => {
  var userRole = req.cookies.userRole;
  if (userRole !== "Admin") res.redirect("/signin");
  res.render("admin/dashboard");
});
router.get("/addcollegehead", (req, res) => {
  var userRole = req.cookies.userRole;
  if (userRole !== "Admin") res.redirect("/signin");
  res.render("admin/collegeheadform");
});
router.post("/signup", async (req, res) => {
  let _user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phone,
    role: "Admin",
  });
  await _user
    .save()
    .then((data) => {
      res.redirect("/admin/dashboard");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
router.post("/addcollegehead", async (req, res) => {
  let _collegehead = new User({
    name: req.body.collegehead_name,
    email: req.body.collegehead_email,
    phoneNumber: req.body.collegehead_no,
    password: 1234,
    role: "CollegeHead",
  });
  let _institute = new Institute({
    name: req.body.institute_name,
    desc: req.body.institute_desc,
  });
  await _collegehead.save();
  await _institute.save();
  _institute.collegeHead = _collegehead._id;
  _collegehead.institute = _institute._id;
  await _collegehead.save();
  await _institute.save();
  res.redirect("/admin/dashboard");
});
module.exports = router;
