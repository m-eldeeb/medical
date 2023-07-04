const { auth } = require("../../middleware/client/auth");
const {
  getHome,
  getAbout,
  getDepartments,
  getDoctors,
  getDoctorsAppointments,
} = require("./controller/index");

const {
  getProfile,
  getAppointment,
  appointmentsPage,
  ttt,
  selectAppointment,
} = require("./controller/profile");

const router = require("express").Router();

router.get("/", getHome);
router.get("/about", getAbout);
router.get("/departments", getDepartments);
router.get("/doctors", getDoctors);
router.get("/profile", auth(), getProfile);
router.get("/doctors/appointments",auth(), getDoctorsAppointments);

router.get("/doctors/appointments/details", ttt);

router.post("/doctors/appointments/details", ttt);

router.post("/doctors/appointments/details/:id", selectAppointment);



// router.post("/doctors/appointments/:specialty/:city/:area", getDoctorsAppointments);



// router.get("/doctors/appointments", appointmentsPage);
// router.post("/doctors/appointments", getAppointment);
// router.post("/book-appointments", getAppointment);

// Patient Complaint

// router.post('/profile',getAppointment)

module.exports = router;
