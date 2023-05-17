const auth = () => {
  return async (req, res, next) => {
    if (
      !req.session ||
      !req.session.user?.role === "Admin" ||
      !req.session.user?.isLoggedIn
    ) {
      req.flash("inValidSession", true);
      res.redirect("/auth/admin");
    } else {
      next();
    }
  };
};

module.exports = { auth };
