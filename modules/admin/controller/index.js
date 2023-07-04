const appointmentModel = require("../../../DB/model/Appointment");
const doctorModel = require("../../../DB/model/Doctors");
const labModel = require("../../../DB/model/Lab");
const patientModel = require("../../../DB/model/Patient");

const getIndex = async (req, res) => {
  const doctors = await doctorModel.countDocuments();
  const patients = await patientModel.countDocuments();
  const appointments = await appointmentModel.countDocuments();
  const labs = await labModel.countDocuments();

  res.render("admin/dashboard", { doctors, patients, appointments, labs,session:req.session?.doctor?.userID });
};

module.exports = getIndex;
