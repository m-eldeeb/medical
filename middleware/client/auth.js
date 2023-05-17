const patientModel = require("../../DB/model/Patient");

const auth = () => {
  return async (req, res, next) => {
    if (
      !req.session ||
      !req.session.user?.userID ||
      !req.session.user?.isLoggedIn
    ) {
      req.flash("inValidSession", true);
      res.redirect("/login");
    } else {
      const findUser = await patientModel
        .findById(req.session.user.userID)
        .select("-password");

      if (!findUser) {
        req.flash("inValidSession", true);
        res.redirect("/login");
      } else {
        req.session.user.findUser = findUser;
        next();
      }
    }
  };
};

module.exports = { auth };
