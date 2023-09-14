const mongoose = require("mongoose");

const internshipModel = new mongoose.Schema(
  {
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "student" }],
    employe: { type: mongoose.Schema.Types.ObjectId, ref: "employe" },
    profile: String,
    skill: String,
    internshipType: {
      type: String,
      emun: ["In office", "Remote"],
    },
    openings: Number,
    from: String,
    to: String,
    duration: String,
    responsibility: String,
    stipend: {
      status: {
        type: String,
        emun: ["Fix", "Negotiable", "Performance based", "Unpaid"],
      },
      amount: Number,
    },
    perks: String,
    assesments: String,
  },
  { timestamps: true }
);

const Intership = mongoose.model("internship", internshipModel);

module.exports = Intership;
