const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    complaint: { type: String, required: true },
    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled"],
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
    scheduled: String,
  },
  { timestamps: true }
);

const appointmentModel = mongoose.model("Appointment", appointmentSchema);

module.exports = appointmentModel;
