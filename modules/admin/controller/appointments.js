const doctorModel = require("../../../DB/model/Doctors");
const appointmentModel = require("../../../DB/model/Appointment");
const labModel = require("../../../DB/model/Lab");

const getAppointments = async (req, res) => {
  const appointments = await appointmentModel
    .find({ doctor_id: req.session.doctor.userID })
    .populate("patient_id")
    .populate("doctor_id");

  res.render("admin/appointments", {
    title: "Appointments",
    appointments,
  });
};

const examine = async (req, res) => {
  const appointment = await appointmentModel.findById(req.params.id);
  await doctorModel.findOneAndUpdate(
    { _id: req.session.doctor.userID },
    { $push: { patients: appointment?.patient_id?._id } },
    { new: true }
  );
  req.flash("examine", true);
  res.redirect(`/admin/appointments/${appointment._id}/edit`);
};

const getEdit = async (req, res) => {
  const examine = req.flash("examine")[0];
  const sendTest = req.flash("sendTest")[0];
  const done = req.flash("done")[0];
  await appointmentModel
    .findOneAndUpdate(
      { _id: req.params.id },
      { doctor_id: req.session.doctor.userID },
      { new: true }
    )
    .populate("patient_id");

  const appointment = await appointmentModel.findById(req.params.id).populate([
    {
      path: "patient_id",
      select: "userName email phone address imageUrl BloodType gender",
    },
    { path: "lab_id" },
  ]);

  res.render("admin/appointments-edit", {
    title: "Edit Appointment",
    appointment,
    results: appointment.lab_id,
    examine,
    sendTest,
    done,
  });
};

const sendResult = async (req, res) => {
  const { testName, patientName } = req.body;

  const tests = testName.map((test, index) => ({
    name: test,
    result: "",
    test_img: "",
  }));

  const newTest = new labModel({ patientName, tests });
  const savedTest = await newTest.save();

  const appointment = await appointmentModel.findByIdAndUpdate(
    { _id: req.params.id },
    { lab_id: savedTest._id },
    { new: true }
  );
  req.flash("sendTest", true);
  res.redirect(`/admin/appointments/${appointment._id}/edit`);
};

const updateAppointment = async (req, res) => {
  try {
    const {
      appointmentDate,
      status,
      complaint,
      medicine,
      dosage,
      frequency,
      start_date,
      end_date,
    } = req.body;

    const prescriptions = medicine.map((med, index) => ({
      medicine: med,
      dosage: dosage[index],
      frequency: frequency[index],
      start_date: new Date(start_date[index]),
      end_date: new Date(end_date[index]),
    }));

    await appointmentModel.findOneAndUpdate(
      { _id: req.params.id },
      { scheduled: appointmentDate, status, prescriptions, complaint },
      { new: true }
    );
    req.flash("done", true);
    res.redirect("back");
  } catch (error) {
    res.redirect("admin/appointments");
  }
};

const deleteAppointment = async (req, res) => {
  try {
    await appointmentModel.findByIdAndDelete({ _id: req.params.id });

    res.redirect("admin/appointments");
  } catch (error) {
    console.log(error);
  }
};

const getDetails = async (req, res) => {
  const appointment = await appointmentModel.findById(req.params.id).populate([
    {
      path: "patient_id",
      select: "userName email phone address imageUrl BloodType gender",
    },
    { path: "lab_id" },
    { path: "doctor_id" },
  ]);

  res.render("admin/appointments-details", {
    title: "Appointment Details",
    appointment,
    results: appointment.lab_id,
  });
};

module.exports = {
  getEdit,
  getAppointments,
  updateAppointment,
  deleteAppointment,
  sendResult,
  getDetails,
  examine,
};
