const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const Contact = require("../models/contact-model");

const createContactForm = async (req, res, next) => {
  try {
    const { name, email, mobile, subject, message } = req.body;

    const contact = new Contact({
      name,
      email,
      mobile,
      subject,
      message,
    });

    await contact.save();
    res.status(201).json({ message: "Contact Form Submitted Successfully!" });
  } catch (err) {
    console.error("Error creating contact:", err);
    const error = new HttpError("Failed To Create Contact!", 500);
    return next(error);
  }
};

const getContactForm = async (req, res, next) => {
  try {
    const contact = await Contact.find();

    if (!contact) {
      return res.status(404).json({ message: "No Contact Form Yet!" });
    }

    res.status(200).json({ Contact_Forms: contact });
  } catch (err) {
    console.error("Error fetching contact forms:", err);
    const error = new HttpError("Failed To Get Contact Forms!", 500);
    return next(error);
  }
};

const getContactFormById = async (req, res, next) => {
  try {
    const contactFormId = req.params.id;
    const contact = await Contact.findById(contactFormId);

    if (!contact) {
      return res
        .status(404)
        .json({ message: "Contact Form not found for Provided Id" });
    }

    res.status(200).json({ Contact_Forms: contact });
  } catch (err) {
    console.error("Error fetching Contact Form by ID:", err);
    const error = new HttpError("Contact Form Not Found By Provided Id!", 500);
    return next(error);
  }
};

const deleteContactForm = async (req, res, next) => {
  const contactFormId = req.params.id;

  if (!contactFormId) {
    return res.status(400).json({ message: "Invalid Contact Form ID" });
  }

  let contact;
  try {
    contact = await Contact.findById(contactFormId);
  } catch (err) {
    console.error("Error finding Contact Form for deletion:", err);
    const error = new HttpError("Failed To Delete Contact Form!", 500);
    return next(error);
  }

  if (!contact) {
    return res.status(404).json({ message: "Contact Form not found." });
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    await Contact.deleteOne({ _id: contactFormId }, { session });

    await session.commitTransaction();
    res.status(200).json({ message: "Contact Form Deleted Successfully." });
  } catch (err) {
    await session.abortTransaction();
    console.error("Error deleting Contact Form:", err);
    const error = new HttpError("Failed To Delete Contact Form!", 500);
    return next(error);
  } finally {
    session.endSession();
  }
};

module.exports = {
  createContactForm,
  getContactForm,
  getContactFormById,
  deleteContactForm,
};
