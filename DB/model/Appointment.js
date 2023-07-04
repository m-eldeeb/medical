const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    complaint: { type: String },
    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled"],
      default: "scheduled",
    },
    doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
    lab_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lab",
    },
    prescriptions: [
      {
        medicine: String,
        dosage: String,
        frequency: String,
        start_date: String,
        end_date: String,
      },
    ],
    date: String,
    time: String,
    picked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const appointmentModel = mongoose.model("Appointment", appointmentSchema);

module.exports = appointmentModel;
