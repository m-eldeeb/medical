const { auth } = require("../../middleware/client/auth");
const {
  getHome,
  getAbout,
  getDepartments,
  getDoctors,
} = require("./controller");
const { getProfile, getAppointment } = require("./controller/profile");

const router = require("express").Router();

router.get("/", getHome);
router.get("/about", getAbout);
router.get("/departments", getDepartments);
router.get("/doctors", getDoctors);
router.get("/profile", auth(), getProfile);

// Patient Complaint

router.post('/profile',getAppointment)

module.exports = router;
