const express = require("express");
const {
  homepage,
  employesignup,
  currentemploye,
  employesignin,
  employesignout,
  employesendmail,
  employeforgetlink,
  employeresetPassword,
  employeUpdate,
  employeAvatar,
  createinternship,
  readinternship,
  readSingleinternship,
  createjob,
  readjob,
  readSinglejob,
} = require("../controllers/employeController");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

// GET /
router.get("/", homepage);

// POST /employe
router.post("/details", isAuthenticated, currentemploye);

// POST /signup
router.post("/signup", employesignup);

// POST /signin
router.post("/signin", employesignin);

// GET /signout
router.get("/signout", isAuthenticated, employesignout);

// POST /send-mail
router.post("/send-mail", employesendmail);

// GET /forget-link/:employeid
router.get("/forget-link/:id", employeforgetlink);

// POST /reset-password/:employeid
router.post("/reset-password/:id", isAuthenticated, employeresetPassword);

// POST /update/:employeid
router.post("/update/:id", isAuthenticated, employeUpdate);

// POST /avatar/:employeid
router.post("/avatar/:id", isAuthenticated, employeAvatar);

//-----------------------------------------INTERNSHIP-----------------------------------------

// POST /internship/create
router.post("/internship/create", isAuthenticated, createinternship);

// POST /internship/read
router.post("/internship/read", isAuthenticated, readinternship);

// POST /internship/create/:id
router.post("/internship/read/:id", isAuthenticated, readSingleinternship);

//-----------------------------------------JOB-----------------------------------------

// POST /job/create
router.post("/job/create", isAuthenticated, createjob);

// POST /job/read
router.post("/job/read", isAuthenticated, readjob);

// POST /job/create/:id
router.post("/job/read/:id", isAuthenticated, readSinglejob);
module.exports = router;
