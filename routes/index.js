const express = require("express");
const Router = require("router");
const User = require("../Models/User");
var router = Router();
router.get("/", (req, res) => {
  res.render("index", {
    title: "ONLINE HELP DESK",
    desc: "Online Help Desk is an Intranet based application that can be accessed throughout the campus. This system can be used to automate the workflow of service requests for the various facilities in the campus. This is one integrated system that covers different kinds of facilities like class-rooms, labs, hostels, mess, canteen, gymnasium, computer center, faculty club etc. Registered users (students) will be able to log in a request for service for any of the supported facilities. These requests will be sent to the concerned facility heads, who are also valid users of the system, to get them resolved. The Facility heads will be managed by a college head who will also manage addition of students. Admin will be responsible for making a college head. The Login credentials will be mailed to students, facility heads and college head on their respective emails. ",
  });
});
router.get("/signin", (req, res) => {
  if (req.cookies.userID) {
    if (req.cookies.userRole === "Student") res.redirect("/student/dashboard");
    else if (req.cookies.userRole === "CollegeHead")
      res.redirect("/collegehead/dashboard");
    else if (req.cookies.userRole === "FacilityHead")
      res.redirect("/facilityhead/dashboard");
    else if (req.cookies.userRole === "Admin") res.redirect("/admin/dashboard");
  }
  res.render("signin");
});

router.post("/signin", (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;

  const user = User.findOne({ email: email }, async (err, data) => {
    if (data) {
      if (data.password === password) {
        req.body._id = data._id;
        req.body.role = data.role;
        res.cookie("userID", data._id);
        res.cookie("userRole", data.role);

        if (data.role === "Student") res.redirect("/student/dashboard");
        else if (data.role === "CollegeHead")
          res.redirect("/collegehead/dashboard");
        else if (data.role === "FacilityHead")
          res.redirect("/facilityhead/dashboard");
        else if (data.role === "Admin") res.redirect("/admin/dashboard");
      } else res.send("error");
    } else res.send("error");
  });
});
router.get("/signout", (req, res) => {
  cookie = req.cookies;
  for (var prop in cookie) {
    if (!cookie.hasOwnProperty(prop)) {
      continue;
    }
    res.cookie(prop, "", { expires: new Date(0) });
  }
  res.redirect("/");
});
module.exports = router;
