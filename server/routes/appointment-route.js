const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointment-controller");
const authMiddleware = require("../middleware/auth/authMiddleware");

router.post(
  "/addAppointment",
  authMiddleware,
  appointmentController.addAppointment
),
  router.get(
    "/getAppointments",
    authMiddleware,
    appointmentController.getAppointments
  );

router.get(
  "/getAppointmentById/:id",
  authMiddleware,
  appointmentController.getAppointmentById
);

router.put(
  "/updateAppointment/:id",
  authMiddleware,
  appointmentController.updateAppointment
);

router.delete(
  "/removeAppointment/:id",
  authMiddleware,

  appointmentController.deleteAppointment
);

module.exports = router;
