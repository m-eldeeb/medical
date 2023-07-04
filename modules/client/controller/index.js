const getHome = (req, res) => {
  console.log(req.session);
  res.render("client/index", { session: req.session });
};

const getAbout = (req, res) => {
  res.render("client/about", { session: req.session });
};

const getDepartments = (req, res) => {
  res.render("client/departments", { session: req.session });
};

const getDoctors = (req, res) => {
  res.render("client/doctors", { session: req.session });
};
const getDoctorsAppointments = (req, res) => {
  res.render("client/appointments", { session: req.session });
};

module.exports = { getHome, getAbout, getDepartments, getDoctors,getDoctorsAppointments };
