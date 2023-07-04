const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: String,
    city:String,
    address: String,
    imageUrl: String,
    role: { type: String, default: "Doctor" },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    specialization: String,
    patients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Patient" }],
    appointments:[{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }]
  },
  { timestamps: true }
);

const doctorModel = mongoose.model("Doctor", doctorSchema);

module.exports = doctorModel;
