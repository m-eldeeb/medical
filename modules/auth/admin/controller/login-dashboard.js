const index = (req, res) => {
  const catchErr = req.flash("catchErr")[0];
  res.render("admin/dashboard-login", { catchErr });
};

const loginDashboard = (req, res) => {
  try {
    const { name, password } = req.body;

    if (name === "admin" && password === "admin") {
      console.log("Done");
      req.session.user = { isLoggedIn: true, role: "Admin" };
      res.redirect("/admin");
    } else {
      res.redirect("/auth/admin");
    }
  } catch (error) {
    req.flash("catchErr", "server error");
    res.redirect("/auth/admin");
  }
};
module.exports = { loginDashboard, index };
