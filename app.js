require("dotenv").config({ path: "./.env" });
const express = require("express");

const app = express();

app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");

  next();
});


//db connection
require("./models/database").connectDatabase();

//logger
const logger = require("morgan");
const ErrorHandler = require("./utils/ErrorHandler");
const { generatedErrors } = require("./middlewares/errors");
app.use(logger("tiny"));

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//session and cookies
const session = require("express-session");
const cookieparser = require("cookie-parser");
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);
app.use(cookieparser());

//express-fileupload
const fileupload = require("express-fileupload");
app.use(fileupload());

// cors
app.use(require("cors")({ credentials: true, origin: true }));

//routes
app.use("/", require("./routes/indexRoutes"));
app.use("/resume", require("./routes/resumeRoutes"));
app.use("/employe", require("./routes/employeRoutes.js"));

//error handlers
app.all("*", (req, res, next) => {
  next(new ErrorHandler(`requested url not found: ${req.url}`, 404));
});

app.use(generatedErrors);

app.listen(
  process.env.PORT,
  console.log(`server running on port:${process.env.PORT}`)
);
