const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: String,
    address: String,
    imageUrl: String,
    role: { type: String, default: "User" },
    BloodType: {
      type: String,
      enum: ["AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    appointments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
      },
    ],
  },
  { timestamps: true }
);

const patientModel = mongoose.model("Patient", patientSchema);

module.exports = patientModel;
