const appointmentModel = require("../../../DB/model/Appointment");
const patientModel = require("../../../DB/model/Patient");

const getProfile = async (req, res) => {
  const catchErr = req.flash("catchErr")[0];
  const status = req.flash("Status")[0];
  const complaint = req.flash("complaint")[0];

  const patient = await patientModel
    .findById(req.session.user.userID)
    .populate({
      path: "appointments",
    }).lean();

  console.log(patient);

  res.render("client/profile", {
    session: req.session.user,
    title: "Profile",
    status,
    complaint,
    catchErr,
    patient,
  });
};

const getAppointment = async (req, res) => {
  try {
    const { user_id, complaint } = req.body;
    const newAppointment = new appointmentModel({
      complaint,
      patient_id: user_id,
    });
    const savedAppointment = await newAppointment.save();

    await patientModel.findByIdAndUpdate(
      user_id,
      { $push: { appointments: savedAppointment._id } },
      { new: true }
    );
    req.flash("Status", "sent");
    req.flash("complaint", complaint);
    res.redirect("/profile");
  } catch (error) {
    req.flash("catchErr", "Something went wrong");
    res.redirect("/profile");
  }
};

module.exports = { getProfile, getAppointment };
