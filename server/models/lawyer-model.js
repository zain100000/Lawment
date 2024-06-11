const mongoose = require("mongoose");

const lawyerSchema = new mongoose.Schema({
  lawyer_profile_image: { type: String, required: true },
  lawyer_username: { type: String, required: true, unique: true },
  lawyer_designation: { type: String, required: true },
  lawyer_email: { type: String, required: true, unique: true },
  lawyer_phone: { type: String, required: true },
  password: { type: String, required: true },
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],

  lawyer_department: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },

  resetPasswordToken: { type: String },

  resetPasswordTokenExpiry: { type: Date },
});

const Lawyer = new mongoose.model("Lawyer", lawyerSchema);
module.exports = Lawyer;
