const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  client_profile_image: {
    type: String,
    required: true,
  },

  client_username: {
    type: String,
    required: true,
  },

  client_email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  client_phone: {
    type: String,
    required: true,
  },

  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],

  lawyers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lawyer",
    },
  ],

  resetPasswordToken: { type: String },

  resetPasswordTokenExpiry: { type: Date },
});

const Client = new mongoose.model("Client", clientSchema);
module.exports = Client;
