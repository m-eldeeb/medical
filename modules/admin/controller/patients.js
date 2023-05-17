const patientModel = require("../../../DB/model/Patient");


const patientsPage = async (req, res) => {
  const patients = await patientModel
    .find({})
    .select("-password -role -gender");

  res.render("admin/patients", { patients, title: "Patients" });
};

const getPatientProfile = async (req, res) => {
  const patient = await patientModel.findById(req.params.id).populate({
    path: "appointments",
  });

  res.render("admin/patient_profile", { title: "Patient Profile", patient });
};


const deletePatient = async (req, res) => {
  try {
    await patientModel.findByIdAndDelete({ _id: req.params.id });
    res.redirect("admin/patients");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  patientsPage,
  deletePatient,
  getPatientProfile,
};
