const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true,
  },

  lawyerName: [
    {
      type: String,
      required: true,
    },
  ],

  appointment_date: {
    type: Date,
    required: true,
  },

  appointment_schedule: {
    type: String,
    required: true,
  },

  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  }, 
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
