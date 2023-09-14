const { catchAsyncErrors } = require("../middlewares/catchAcyncErrors");
const Student = require("../models/studentModule");
const ErrorHandler = require("../utils/ErrorHandler");
const { v4: uuidv4 } = require("uuid");

exports.resume = catchAsyncErrors(async (req, res, next) => {
  const { resume } = await Student.findById(req.id).exec();
  res.json({ message: "Secure resume page!", resume });
});

//-----------------------------------------eductaion-----------------------------------------

exports.addEducation = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.education.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Education added!" });
});

exports.editEducation = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const eduIndex = student.resume.education.findIndex(
    (i) => i.id === req.params.eduid
  );
  student.resume.education[eduIndex] = {
    ...student.resume.education[eduIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "Education Updated!" });
});

exports.deleteEducation = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filteredEducation = student.resume.education.filter(
    (i) => i.id !== req.params.eduid
  );
  student.resume.education = filteredEducation;
  await student.save();
  res.json({ message: "Education deleted!" });
});

//-----------------------------------------jobs-----------------------------------------

exports.addJobs = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.jobs.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Jobs added!" });
});

exports.editJobs = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const jobIndex = student.resume.jobs.findIndex(
    (i) => i.id === req.params.jobid
  );
  student.resume.jobs[jobIndex] = {
    ...student.resume.jobs[jobIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "Jobs Updated!" });
});

exports.deleteJobs = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filteredJobs = student.resume.jobs.filter(
    (i) => i.id !== req.params.jobid
  );
  student.resume.jobs = filteredJobs;
  await student.save();
  res.json({ message: "Jobs deleted!" });
});

//-----------------------------------------INTERNSHIP-----------------------------------------

exports.addInternship = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.internships.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "internships added!" });
});

exports.editInternship = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const internshipsIndex = student.resume.internships.findIndex(
    (i) => i.id === req.params.internid
  );
  student.resume.internships[internshipsIndex] = {
    ...student.resume.internships[internshipsIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "internships Updated!" });
});

exports.deleteInternship = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filteredinternships = student.resume.internships.filter(
    (i) => i.id !== req.params.internid
  );
  student.resume.internships = filteredinternships;
  await student.save();
  res.json({ message: "internships deleted!" });
});

//-----------------------------------------RESPONSIBILITY-----------------------------------------

exports.addResponsibility = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.responsibilty.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Responsibility added!" });
});

exports.editResponsibility = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const responsibiltyIndex = student.resume.responsibilty.findIndex(
    (i) => i.id === req.params.respid
  );
  student.resume.responsibilty[responsibiltyIndex] = {
    ...student.resume.responsibilty[responsibiltyIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "Responsibility Updated!" });
});

exports.deleteResponsibility = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filteredResponsibilty = student.resume.responsibilty.filter(
    (i) => i.id !== req.params.respid
  );
  student.resume.responsibilty = filteredResponsibilty;
  await student.save();
  res.json({ message: "Responsibility deleted!" });
});

//-----------------------------------------COURSES-----------------------------------------

exports.addCourse = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.courses.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Course added!" });
});

exports.editCourse = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const coursesIndex = student.resume.courses.findIndex(
    (i) => i.id === req.params.courseid
  );
  student.resume.courses[coursesIndex] = {
    ...student.resume.courses[coursesIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "Course Updated!" });
});

exports.deleteCourse = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filteredCourses = student.resume.courses.filter(
    (i) => i.id !== req.params.courseid
  );
  student.resume.courses = filteredCourses;
  await student.save();
  res.json({ message: "Course deleted!" });
});

//-----------------------------------------PROJECTS-----------------------------------------

exports.addProject = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.projects.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Project added!" });
});

exports.editProject = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const projectsIndex = student.resume.projects.findIndex(
    (i) => i.id === req.params.projectid
  );
  student.resume.projects[projectsIndex] = {
    ...student.resume.projects[projectsIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "Project Updated!" });
});

exports.deleteProject = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filteredProjects = student.resume.projects.filter(
    (i) => i.id !== req.params.projectid
  );
  student.resume.projects = filteredProjects;
  await student.save();
  res.json({ message: "Project deleted!" });
});

//-----------------------------------------SKILLS-----------------------------------------

exports.addSkill = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.skills.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Skills added!" });
});

exports.editSkill = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const skillsIndex = student.resume.skills.findIndex(
    (i) => i.id === req.params.skillid
  );
  student.resume.skills[skillsIndex] = {
    ...student.resume.skills[skillsIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "Skills Updated!" });
});

exports.deleteSkill = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filteredSkills = student.resume.skills.filter(
    (i) => i.id !== req.params.skillid
  );
  student.resume.skills = filteredSkills;
  await student.save();
  res.json({ message: "Skills deleted!" });
});

//-----------------------------------------ACCOMPLISHMENTS-----------------------------------------

exports.addAccomplishment = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.accomplishments.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Accomplishment added!" });
});

exports.editAccomplishment = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const accomplishmentIndex = student.resume.accomplishments.findIndex(
    (i) => i.id === req.params.accomid
  );
  student.resume.accomplishments[accomplishmentIndex] = {
    ...student.resume.accomplishments[accomplishmentIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "Accomplishment Updated!" });
});

exports.deleteAccomplishment = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filteredAccomplishments = student.resume.accomplishments.filter(
    (i) => i.id !== req.params.accomid
  );
  student.resume.accomplishments = filteredAccomplishments;
  await student.save();
  res.json({ message: "Accomplishment deleted!" });
});
