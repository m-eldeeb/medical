const mongoose = require("mongoose");
const medicineSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true
    },
    manufacturer: {
      type: String,
      required: true
    },
    description: String,
    quantity: {
      type: Number,
      required: true,
      min: 0
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    dosage: {
      type: String,
      required: true
    },
  });
  
  const medicine = mongoose.model('Medicine', medicineSchema);
  
  module.exports = medicine