const validation = require("../../middleware/client/validation");
const { myMulter, fileValidation } = require("../../services/multer");
const { index, loginDashboard } = require("./admin/controller/login-dashboard");
const { signupShema, signinShema } = require("./client/auth.validation");
const {
  signup,
  getSignup,
  getSignin,
  signin,
  logout,
} = require("./client/controller/registration");

const router = require("express").Router();

// client routes

router.get("/signup", getSignup);
router.post(
  "/signup",
  myMulter("patients/profileImages", fileValidation.image).single("image"),
  validation(signupShema, "/signup"),
  signup
);
router.get("/login", getSignin);
router.post("/login", validation(signinShema, "/login"), signin);
router.get("/logout", logout);



//admin routes
router.get('/auth/admin',index)

router.post('/auth/admin',loginDashboard)







module.exports = router;
