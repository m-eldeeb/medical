const mongoose = require("mongoose");

const LabSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
    tests: [
      {
        name: String,
        result: String,
        test_img: String,
      },
    ],

    appointments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
      },
    ],
  },
  { timestamps: true }
);

const labModel = mongoose.model("Lab", LabSchema);

module.exports = labModel;
