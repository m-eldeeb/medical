const router = require("express").Router();
const { auth } = require("../../middleware/admin/auth-dashboard");
const validation = require("../../middleware/client/validation");
const { myMulter, fileValidation } = require("../../services/multer");
const getIndex = require("./controller");
const {
  getAppointments,
  getDetails,
  updateAppointment,
  deleteAppointment,
  sendResult,
  getEdit,
  examine,
} = require("./controller/appointments");
const {
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
} = require("./controller/doctors");
const {
  inventoryPage,
  getAddMedicine,
  addMedicine,
  deleteMedicine,
  getUpdateMedicine,
  updateMedicine,
} = require("./controller/inventory");
const {
  getLabs,
  getUpdateLab,
  updateLab,
  deleteLab,
  detailsPage,
} = require("./controller/labs");
const {
  patientsPage,
  deletePatient,
  getPatientProfile,
} = require("./controller/patients");

const backAuth = require("../../middleware/admin/auth");

const {
  signupShema,
  signinShema,
  updateSchema,
} = require("./doctor.validation");

router.get("/admin", auth(), getIndex);

//doctors
router.get("/admin/doctors", backAuth(), doctorsPage);
router.get("/admin/doctors/signup", getSignup);
router.post(
  "/admin/doctors/signup",
  myMulter("doctors/profileImages", fileValidation.image).single("image"),
  validation(signupShema, "signup"),
  signup
);
router.get("/admin/doctors/signin", getSignin);
router.post("/admin/doctors/signin", validation(signinShema, "signin"), signin);
router.get("/admin/doctors/:id/edit", getUpdate);
router.get("/admin/doctors/:id/add-appointment", makeAppointments);
router.post("/admin/doctors/:id/add-appointment", makeAppointmentss);
router.post(
  "/admin/doctors/:id/edit",
  myMulter("doctors/profileImages", fileValidation.image).single("image"),
  validation(updateSchema, "edit"),
  update
);

router.delete("/admin/doctors/:id", deleteDoctor);
router.get("/admin/doctors/:id/profile", getProfile);

router.delete("/admin/doctors/appointments/:id", deleteAppoint);

// patients
router.get("/admin/patients", backAuth(), patientsPage);
router.get("/admin/patients/:id/profile", getPatientProfile);
router.delete("/admin/patients/:id", deletePatient);

// appointments
router.get("/admin/appointments", backAuth(), getAppointments);
router.get("/admin/appointments/:id/edit", getEdit);
router.post("/admin/appointments/:id/edit", updateAppointment);
router.get("/admin/appointments/:id/edit/examine", examine);
router.delete("/admin/appointments/:id", deleteAppointment);
router.post("/admin/appointments/:id/details/result", sendResult);
router.get("/admin/appointments/:id/details", getDetails);

// labs
router.get("/admin/labs", backAuth(), getLabs);
router.get("/admin/labs/:id/details", detailsPage);
router.get("/admin/labs/:id/edit", getUpdateLab);
router.post(
  "/admin/labs/:id/edit",
  myMulter("lab/tests_results", fileValidation.image).array("testImg", 10),
  updateLab
);
router.delete("/admin/labs/:id", deleteLab);

//inventory

router.get("/admin/inventory", backAuth(), inventoryPage);
router.get("/admin/inventory/medicine", getAddMedicine);
router.post("/admin/inventory/medicine", addMedicine);

router.get("/admin/inventory/:id/edit", getUpdateMedicine);
router.post("/admin/inventory/:id/edit", updateMedicine);

router.delete("/admin/inventory/:id", deleteMedicine);




module.exports = router;
