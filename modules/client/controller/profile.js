const appointmentModel = require("../../../DB/model/Appointment");
const doctorModel = require("../../../DB/model/Doctors");
const patientModel = require("../../../DB/model/Patient");

const getProfile = async (req, res) => {
  // console.log(req.session.user);

  const patient = await patientModel
    .findById(req.session.user.userID)
    .populate({
      path: "appointments",
    })
    .lean();

  res.render("client/profile", {
    session: req.session.user,
    title: "Profile",

    patient,
  });
};

// const getAppointment = async (req, res) => {
//   try {
//     const { user_id, complaint } = req.body;
//     const newAppointment = new appointmentModel({
//       complaint,
//       patient_id: user_id,
//     });
//     const savedAppointment = await newAppointment.save();

//     await patientModel.findByIdAndUpdate(
//       user_id,
//       { $push: { appointments: savedAppointment._id } },
//       { new: true }
//     );
//     req.flash("Status", "sent");
//     req.flash("complaint", complaint);
//     res.redirect("/profile");
//   } catch (error) {
//     req.flash("catchErr", "Something went wrong");
//     res.redirect("/profile");
//   }
// };

const appointmentsPage = async (req, res) => {
  // const { specialty } = req.query;
  // console.log('gggg',req.query.specialty);
  res.render("client/appointments", {
    session: req.session.user,
  });
};

const getAppointment = async (req, res) => {
  req.flash("body", req.body);
  res.redirect(req.get("referer"));
};

const ttt = async (req, res) => {
  // console.log(req.session.user.userID);

  const { specialty, city, area } = req.body;

  // const data = await doctorModel
  //   .find({specialization:{ $regex: validSpecialty, $options: "i" }}).populate('appointments')
  //   .lean();
  // console.log(area);
  const data = await doctorModel
    .find({
      $and: [
        { specialization: { $regex: String(specialty), $options: "i" } },
        { city: { $regex: String(city), $options: "i" } },
        { address: { $regex: String(area), $options: "i" } },
      ],
    })
    .populate("appointments")
    .lean();

  // console.log(data[0]?.appointments);

  res.render("client/deta", {
    session: req.session.user,
    doctor: data,
  });
};

const selectAppointment = async (req, res) => {
  const userID = req.session.user.userID;

  const pp = await appointmentModel.findByIdAndUpdate(
    { _id: req.params.id },
    { picked: true, patient_id: userID }
  );

  await patientModel.findByIdAndUpdate(
    userID,
    { $push: { appointments: pp._id } },
    { new: true }
  );
  res.redirect(req.get("referer"));
};

module.exports = {
  getProfile,
  appointmentsPage,
  getAppointment,
  ttt,
  selectAppointment,
};
