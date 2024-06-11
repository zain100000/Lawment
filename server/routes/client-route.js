const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth/authMiddleware");
const {
  clientSignupSchema,
  clientLoginSchema,
  clientResetPasswordSchema,
} = require("../validators/validator");
const validate = require("../middleware/validateMiddleware");
const clientController = require("../controllers/client-controller");
const clientProfileImageUpload = require("../middleware/upload-client-profile-image");

router.post(
  "/client_signup",
  clientProfileImageUpload.upload,
  validate(clientSignupSchema),
  clientController.signup
);

router.post(
  "/client_login",
  validate(clientLoginSchema),
  clientController.login
);

router.get("/getClients", authMiddleware, clientController.getClients);

router.get(
  "/getClientsById/:id",
  authMiddleware,
  clientController.getClientsById
);

router.post(
  "/reset-password",
  validate(clientResetPasswordSchema),
  clientController.resetPassword
);

router.delete(
  "/removeClient/:id",
  authMiddleware,
  clientController.deleteClient
);

module.exports = router;
