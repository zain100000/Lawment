const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth/authMiddleware");
const lawyerController = require("../controllers/lawyer-controller");
const {
  lawyerSignupSchema,
  lawyerLoginSchema,
  lawyerResetPasswordSchema,
} = require("../validators/validator");
const validate = require("../middleware/validateMiddleware");
const lawyerProfileImageUpload = require("../middleware/upload-lawyer-profile-image");

router.post(
  "/lawyer_signup",
  lawyerProfileImageUpload.upload,
  validate(lawyerSignupSchema),
  lawyerController.signup
);

router.post(
  "/lawyer_login",
  validate(lawyerLoginSchema),
  lawyerController.login
);

router.get("/getLawyers", authMiddleware, lawyerController.getLawyers);

router.get(
  "/getLawyersById/:id",
  authMiddleware,
  lawyerController.getLawyersById
);

router.post(
  "/lawyer-reset-password",
  validate(lawyerResetPasswordSchema),
  lawyerController.resetPassword
);

router.delete(
  "/removeLawyer/:id",
  authMiddleware,
  lawyerController.deleteLawyer
);

module.exports = router;
