const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const employeModel = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "First Name is required"],
      minLenght: [4, "First name should be at least 4 characters long"],
    },
    lastname: {
      type: String,
      required: [true, "Last Name is required"],
      minLenght: [4, "Last name should be at least 4 characters long"],
    },
    contact: {
      type: String,
      required: [true, "Contact is required"],
      maxLenght: [10, "Contact must not excced 10 characters long"],
      minLenght: [10, "Contact should be at least 10 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
      unique: true,
    },
    password: {
      type: String,
      select: false,
      maxLenght: [15, "Password should not exceed more than 15 characters"],
      minLenght: [6, "Password should have at least 6 characters"],
      // match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/]
    },
    resetPasswordToken: {
      type: String,
      default: "0",
    },
    organizationName: {
      type: String,
      required: [true, "organiztion Name is required"],
      minLenght: [4, "organiztion name should be at least 4 characters long"],
    },
    organizationLogo: {
      type: Object,
      default: {
        fileId: "",
        url: "https://images.unsplash.com/photo-1693892014156-7de1a64f682f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      },
    },
    internships: [{ type: mongoose.Schema.Types.ObjectId, ref: "internship" }],
    jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "jobs" }],
  },
  { timestamps: true }
);

employeModel.pre("save", function () {
  if (!this.isModified("password")) {
    return;
  }

  let salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});

employeModel.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

employeModel.methods.getjwttoken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIER,
    }
  );
};

const Employe = mongoose.model("employe", employeModel);

module.exports = Employe;
