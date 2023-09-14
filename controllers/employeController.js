const { catchAsyncErrors } = require("../middlewares/catchAcyncErrors");
const Internship = require("../models/internshipModel");
const Employe = require("../models/employeModel");
const Job = require("../models/jobModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { employesendtoken } = require("../utils/SendToken");
const { sendmail } = require("../utils/nodemail");
const path = require("path");
const imagekit = require("../utils/imagekit").iniitImageKit();

exports.homepage = catchAsyncErrors(async (req, res, next) => {
  res.json({ message: "Secure Employe homepage!" });
});

exports.currentemploye = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findById(req.id).exec();
  res.json({ employe });
});

exports.employesignup = catchAsyncErrors(async (req, res, next) => {
  const employe = await new Employe(req.body).save();
  employesendtoken(employe, 201, res);
});

exports.employesignin = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findOne({ email: req.body.email })
    .select("+password")
    .exec();
  if (!employe)
    return next(new ErrorHandler("User not found with this Email", 404));

  const isMatch = employe.comparePassword(req.body.password);
  if (!isMatch) return next(new ErrorHandler("Wrong Credentials", 500));

  employesendtoken(employe, 200, res);
});

exports.employesignout = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("token");
  res.json({ message: "Successfully sign out" });
});

exports.employesendmail = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findOne({ email: req.body.email }).exec();

  if (!employe)
    return next(new ErrorHandler("User not found with this Email", 404));
  const url = `${req.protocol}://${req.get("host")}/employe/forget-link/${
    employe._id
  }`;

  sendmail(req, res, next, url);
  employe.resetPasswordToken = "1";
  await employe.save();
  res.json({ employe, url });
});

exports.employeforgetlink = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findById(req.params.id).exec();

  if (!employe)
    return next(new ErrorHandler("User not found with this Email", 404));

  if (employe.resetPasswordToken == "1") {
    employe.resetPasswordToken = "0";
    employe.password = req.body.password;
    await employe.save();
  } else {
    return next(
      new ErrorHandler("Invalid Reset Password Link! Please try again ", 500)
    );
  }
  res.status(200).json({ message: "password has been successfully changed" });
});

exports.employeresetPassword = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findById(req.id).exec();
  employe.password = req.body.password;
  await employe.save();
  employesendtoken(employe, 201, res);
});

exports.employeUpdate = catchAsyncErrors(async (req, res, next) => {
  await Employe.findByIdAndUpdate(req.params.id, req.body).exec();
  res.status(200).json({
    success: true,
    message: "employe Updated Successfully!",
  });
});

exports.employeAvatar = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findById(req.params.id).exec();
  const file = req.files.organizationLogo;
  const modifiedFileName = `LOGOBUILDER-${Date.now()}${path.extname(
    file.name
  )}`;

  if (employe.organizationLogo.fileId !== "") {
    await imagekit.deleteFile(employe.organizationLogo.fileId);
  }

  const { fileId, url } = await imagekit.upload({
    file: file.data,
    fileName: modifiedFileName,
  });
  employe.organizationLogo = {
    fileId,
    url,
  };
  await employe.save();
  res.status(200).json({
    success: true,
    message: "profile uploaded",
  });
});

//-----------------------------------------INTERNSHIP-----------------------------------------

exports.createinternship = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findById(req.id).exec();
  const internship = await new Internship(req.body);
  internship.employe = employe._id;
  employe.internships.push(internship._id);
  await internship.save();
  await employe.save();

  res.status(200).json({
    success: true,
    internship,
  });
});

exports.readinternship = catchAsyncErrors(async (req, res, next) => {
  const { internships } = await Employe.findById(req.id)
    .populate("internships")
    .exec();

  res.status(200).json({
    success: true,
    internships,
  });
});

exports.readSingleinternship = catchAsyncErrors(async (req, res, next) => {
  const internship = await Internship.findById(req.params.id).exec();
  res.status(200).json({
    success: true,
    internship,
  });
});
//-----------------------------------------JOBS-----------------------------------------

exports.createjob = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findById(req.id).exec();
  const job = await new Job(req.body);
  job.employe = employe._id;
  employe.jobs.push(job._id);
  await job.save();
  await employe.save();

  res.status(200).json({
    success: true,
    job,
  });
});

exports.readjob = catchAsyncErrors(async (req, res, next) => {
  const { jobs } = await Employe.findById(req.id)
    .populate("jobs")
    .exec();

  res.status(200).json({
    success: true,
    internships,
  });
});

exports.readSinglejob = catchAsyncErrors(async (req, res, next) => {
  const job = await Job.findById(req.params.id).exec();
  res.status(200).json({
    success: true,
    job,
  });
});
