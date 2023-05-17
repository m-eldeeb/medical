const getHome = (req, res) => {
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

module.exports = { getHome, getAbout, getDepartments, getDoctors };
