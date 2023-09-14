 exports.sendtoken = (student, statuscode, res) => {
  const token = student.getjwttoken();
  const option = {
    exipres: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    // secure: true,
  };

  res.status(statuscode).cookie("token", token, option).json({ succes: true, id: student._id, token });

};

exports.employesendtoken = (employe, statuscode, res) => {
  const token = employe.getjwttoken();
  const option = {
    exipres: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    // secure: true,
  };

  res.status(statuscode).cookie("token", token, option).json({ succes: true, id: employe._id, token });

};
