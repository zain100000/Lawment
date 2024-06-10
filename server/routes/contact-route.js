const express = require("express");
const router = express.Router();
const contactFormController = require("../controllers/contact-controller");
const { contactSchema } = require("../validators/validator");
const validate = require("../middleware/validateMiddleware");

router.post(
  "/addContactForm",
  validate(contactSchema),
  contactFormController.createContactForm
);

router.get("/getContactForms", contactFormController.getContactForm);

router.get("/getContactFormById/:id", contactFormController.getContactFormById);

router.delete(
  "/removeContactForm/:id",
  contactFormController.deleteContactForm
);

module.exports = router;
