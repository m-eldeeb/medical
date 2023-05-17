const doctorModel = require("../../DB/model/Doctors");
const patientModel = require("../../DB/model/Patient");

const auth = () => {
  return async (req, res, next) => {
    if (
      !req.session ||
      !req.session.doctor?.userID ||
      !req.session.doctor?.isLoggedIn
    ) {
      req.flash("inValidSession", true);
      res.redirect("/admin/doctors/signin");
    } else {
      const findUser = await doctorModel
        .findById(req.session.doctor.userID)
        .select("-password");

      if (!findUser) {
        req.flash("inValidSession", true);
        res.redirect("/admin/doctors/signin");
      } else {
        req.session.findUser = findUser;
        next();
      }
    }
  };
};

module.exports = auth;
