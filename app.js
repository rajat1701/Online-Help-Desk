var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { env } = require("process");
const cors = require("cors");
require("./db/database");
var indexRouter = require("./routes/index");
var adminRouter = require("./routes/admin");
var collegeheadRouter = require("./routes/collegehead");
var studentRouter = require("./routes/student");
var facilityHeadRouter = require("./routes/facilityhead");
//remaining routers
var hbs = require("hbs");
var app = express();

var session = require("express-session");
require("dotenv").config();
const MongoStore = require("connect-mongo");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "views/partials"), (err) => {});
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

var sess = {
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
  }),
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
  },
};

if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

app.use(session(sess));

app.use("/", indexRouter);
app.use("/admin", adminRouter);
app.use("/collegehead", collegeheadRouter);
app.use("/student", studentRouter);
app.use("/facilityhead", facilityHeadRouter);
// catch 404 and forward to   error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
