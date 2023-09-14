const express = require("express");
const {
  homepage,
  currentUser,
  studentsignup,
  studentsignin,
  studentsignout,
  studentsendmail,
  studentforgetlink,
  studentresetPassword,
  studentUpdate,
  studentAvatar,
  applyInternship,
  applyJob,
} = require("../controllers/indexController");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

// GET /
router.get("/", homepage);

// // POST 
router.post("/student", isAuthenticated, currentUser);

// POST /student/signup
router.post("/student/signup", studentsignup);

// POST /student/signin
router.post("/student/signin", studentsignin);

// GET /student/signout
router.get("/student/signout", isAuthenticated, studentsignout);

// POST /send-mail
router.post("/student/send-mail", studentsendmail);

// GET /forget-link/:studentid
router.get("/student/forget-link/:id", studentforgetlink);

// POST /student/reset-password/:studentid
router.post(
  "/student/reset-password/:id",
  isAuthenticated,
  studentresetPassword
);

// POST /student/update/:studentid
router.post("/student/update/:id", isAuthenticated, studentUpdate);

// POST /avatar/:studentid
router.post("/student/avatar/:id", isAuthenticated, studentAvatar);

//-------------------------------------------APPLY INTERNSHIPS-------------------------------------------

// POST /student/apply/internship/:internshipid
router.post("/student/apply/internship/:internshipid", isAuthenticated, applyInternship);

//-------------------------------------------APPLY JOBS-------------------------------c------------

// POST /apply/:jobipid
router.post("/student/apply/job/:jobid", isAuthenticated, applyJob);

module.exports = router;
