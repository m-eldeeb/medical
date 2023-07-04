const doctorModel = require("../../../DB/model/Doctors");
const appointmentModel = require("../../../DB/model/Appointment");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

const doctorsPage = async (req, res) => {
  const doctors = await doctorModel.find().select("-password -role -gender");

  res.render("admin/doctors", { doctors, title: "Doctors" });
};

const getSignup = (req, res) => {
  const userExist = req.flash("userExist")[0];
  const oldInputs = req.flash("oldInputs")[0];
  const catchErr = req.flash("catchErr")[0];
  const fileErr = req.flash("fileErr")[0];
  let validationErr = req.flash("validationErr")[0];
  if (validationErr) {
    validationErr = validationErr.map((err) => {
      return err.path[0];
    });
  }

  res.render("admin/signup", {
    userExist,
    oldInputs,
    catchErr,
    validationErr,
    fileErr,
  });
};

const signup = async (req, res) => {
  try {
    if (req.fileErr) {
      req.flash("fileErr", true);
      res.redirect("/signup");
    } else {
      const {
        userName,
        email,
        password,
        phone,
        specialization,
        gender,
        address,
        city,
      } = req.body;
      const imageUrl = `${req.fileDestination}/${req.file.filename}`;
      const user = await doctorModel.findOne({ email });

      if (user) {
        req.flash("userExist", true);
        req.flash("oldInputs", req.body);
        res.redirect("/admin/doctors/signup");
      } else {
        const hashedPassword = await bcrypt.hash(
          password,
          parseInt(process.env.SALT_ROUNDS)
        );
        const newUser = new doctorModel({
          name: userName,
          email,
          password: hashedPassword,
          phone,
          gender,
          specialization,
          address,
          imageUrl,
          city,
        });
        const savedUser = await newUser.save();
        res.redirect("/admin/doctors/signin");
      }
    }
  } catch (error) {
    req.flash("catchErr", "server error");
    req.flash("oldInputs", req.body);
    res.redirect("/admin/doctors/signup");
  }
};

const getSignin = (req, res) => {
  const userExist = req.flash("userExist")[0];
  const wrongPassword = req.flash("wrongPassword")[0];
  const oldInputs = req.flash("oldInputs")[0];
  const catchErr = req.flash("catchErr")[0];

  let validationErr = req.flash("validationErr")[0];
  if (validationErr) {
    validationErr = validationErr.map((err) => {
      return err.path[0];
    });
  }
  res.render("admin/signin", {
    userExist,
    oldInputs,
    catchErr,
    validationErr,
    wrongPassword,
  });
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await doctorModel.findOne({ email });
    if (!user) {
      req.flash("userExist", true);
      req.flash("oldInputs", req.body);
      res.redirect("/admin/doctors/signin");
    } else {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        req.flash("wrongPassword", true);
        req.flash("oldInputs", req.body);
        res.redirect("/admin/doctors/signin");
      } else {
        req.session.doctor = {
          userID: user._id,
          isLoggedIn: true,
          role: "Doctor",
        };
        res.redirect("/admin");
      }
    }
  } catch (error) {
    req.flash("catchErr", "server error");
    req.flash("oldInputs", req.body);
    res.redirect("/admin/doctors");
  }
};

const getUpdate = async (req, res) => {
  const wrongPassword = req.flash("wrongPassword")[0];
  const catchErr = req.flash("catchErr")[0];
  const userExist = req.flash("userExist")[0];
  let validationErr = req.flash("validationErr")[0];
  if (validationErr) {
    validationErr = validationErr.map((err) => {
      return err.path[0];
    });
  }
  const doctor = await doctorModel.findById(req.params.id);
  res.render("admin/doctors_edit", {
    userExist,
    catchErr,
    validationErr,
    wrongPassword,
    doctor,
    title: "Doctor update",
  });
};

const update = async (req, res) => {
  try {
    if (req.fileErr) {
      req.flash("fileErr", true);
      res.redirect("/edit");
    } else {
      const { userName, phone, specialization, address, city } = req.body;
      const imageUrl = `${req.fileDestination}/${req.file.filename}`;

      const user = await doctorModel.findById(req.params.id);
      const oldImage = user.imageUrl.split("/")[3];

      if (!user) {
        req.flash("userExist", true);
        req.flash("oldInputs", req.body);
        res.redirect("/admin/doctors");
      } else {
        const searchPath = path.join(
          __dirname,
          "../../../uploads/doctors/profileImages"
        );
        fs.readdir(searchPath, (err, files) => {
          if (err) {
            console.error(err);
            return;
          }
          const matchingFiles = files.filter((file) => file.includes(oldImage));
          if (matchingFiles.length) {
            fs.unlinkSync(`${searchPath}/${matchingFiles[0]}`, (err) => {
              if (err) {
                console.error(err);
                return;
              }
            });
          }
        });
        await doctorModel.findOneAndUpdate(
          { _id: req.params.id },
          { name: userName, phone, specialization, address, imageUrl, city },
          { new: true }
        );
        res.redirect(`/admin/doctors`);
      }
    }
  } catch (error) {
    req.flash("catchErr", "server error");
    res.redirect(`/edit`);
  }
};

const deleteDoctor = async (req, res) => {
  try {
    await doctorModel.findByIdAndDelete({ _id: req.params.id });
    res.redirect("admin/doctors");
  } catch (error) {
    console.log(error);
  }
};

const getProfile = async (req, res) => {
  const doctor = await doctorModel
    .findById(req.params.id)
    .populate("patients")
    .populate("appointments");

  res.render("admin/doctor_profile", { doctor, title: "Doctor Profile" });
};

const deleteAppoint = async (req, res) => {
  await appointmentModel.findByIdAndDelete(req.params.id, { new: true });
  res.redirect(req.get("referer"));
};

const makeAppointments = async (req, res) => {
  const doctor = await doctorModel.findById(req.params.id);
  const saved = req.flash("saved")[0];
  res.render("admin/add-appointment", {
    doctor: doctor,
    title: "Add Appointments",
    saved,
  });
};

const makeAppointmentss = async (req, res) => {
  try {
    const { date, time } = req.body;
    // console.log(date, time);

    const appointments = date.map((med, index) => ({
      date: date[index],
      time: time[index],
      doctor_id: req.params.id,
    }));

    // console.log(appointments);

    const test = await appointmentModel.insertMany(appointments);
    const appo = test.map((app, index) => {
      return app._id;
    });
    const t = await doctorModel.findByIdAndUpdate(req.params.id, {
      $push: { appointments: appo },
    });
    req.flash("saved", true);
    res.redirect(req.get("referer"));
  } catch (error) {
    res.redirect(req.get("referer"));
  }
};

module.exports = {
  doctorsPage,
  getSignup,
  getSignin,
  signup,
  signin,
  getUpdate,
  update,
  deleteDoctor,
  getProfile,
  makeAppointments,
  makeAppointmentss,
  deleteAppoint,
};
