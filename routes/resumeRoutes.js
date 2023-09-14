const express = require("express");
const {
  resume,
  addEducation,
  editEducation,
  deleteEducation,
  addJobs,
  editJobs,
  deleteJobs,
  addInternship,
  editInternship,
  deleteInternship,
  addResponsibility,
  editResponsibility,
  deleteResponsibility,
  addCourse,
  editCourse,
  deleteCourse,
  addProject,
  editProject,
  deleteProject,
  addSkill,
  editSkill,
  deleteSkill,
  addAccomplishment,
  editAccomplishment,
  deleteAccomplishment,
} = require("../controllers/resumeController");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

// GET /
router.get("/", isAuthenticated, resume);

//-----------------------------------------eductaion-----------------------------------------

// POST /add-education
router.post("/add-education", isAuthenticated, addEducation);

// POST  /edit-education/:eduid
router.post("/edit-education/:eduid", isAuthenticated, editEducation);

// POST  /delete-education/:eduid
router.post("/delete-education/:eduid", isAuthenticated, deleteEducation);

//-----------------------------------------jobs-----------------------------------------

// POST /add-job
router.post("/add-job", isAuthenticated, addJobs);

// POST  /edit-job/:jobid
router.post("/edit-job/:jobid", isAuthenticated, editJobs);

// POST  /delete-job/:jobid
router.post("/delete-job/:jobid", isAuthenticated, deleteJobs);

//-----------------------------------------INTERNSHIP-----------------------------------------

// POST /add-intern
router.post("/add-intern", isAuthenticated, addInternship);

// POST  /edit-intern/:internid
router.post("/edit-intern/:internid", isAuthenticated, editInternship);

// POST  /delete-intern/:internid
router.post("/delete-intern/:internid", isAuthenticated, deleteInternship);

//-----------------------------------------RESPONSIBILITY-----------------------------------------

// POST /add-resp
router.post("/add-resp", isAuthenticated, addResponsibility);

// POST  /edit-resp/:respid
router.post("/edit-resp/:respid", isAuthenticated, editResponsibility);

// POST  /delete-resp/:respid
router.post("/delete-resp/:respid", isAuthenticated, deleteResponsibility);

//-----------------------------------------COURSES-----------------------------------------

// POST /add-courses
router.post("/add-courses", isAuthenticated, addCourse);

// POST  /edit-courses/:courseid
router.post("/edit-courses/:courseid", isAuthenticated, editCourse);

// POST  /delete-courses/:courseid
router.post("/delete-courses/:courseid", isAuthenticated, deleteCourse);

//-----------------------------------------PROJECTS-----------------------------------------

// POST /add-projects
router.post("/add-projects", isAuthenticated, addProject);

// POST  /edit-projects/:projectid
router.post("/edit-projects/:projectid", isAuthenticated, editProject);

// POST  /delete-projects/:projectid
router.post("/delete-projects/:projectid", isAuthenticated, deleteProject);

//-----------------------------------------SIKLLS-----------------------------------------

// POST /add-siklls
router.post("/add-siklls", isAuthenticated, addSkill);

// POST  /edit-siklls/:skillid
router.post("/edit-siklls/:skillid", isAuthenticated, editSkill);

// POST  /delete-siklls/:skillid
router.post("/delete-siklls/:skillid", isAuthenticated, deleteSkill);

//-----------------------------------------ACCOMPLISHMENTS-----------------------------------------

// POST /add-accomplishment
router.post("/add-accomplishment", isAuthenticated, addAccomplishment);

// POST  /edit-accomplishment/:accomid
router.post("/edit-accomplishment/:accomid", isAuthenticated, editAccomplishment);

// POST  /delete-accomplishment/:accomid
router.post(
  "/delete-accomplishment/:accomid",
  isAuthenticated,
  deleteAccomplishment
);

module.exports = router;
