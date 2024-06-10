const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Lawyer = require("../models/lawyer-model");
const HttpError = require("../models/http-error");
const lawyerProfileImageUpload = require("../middleware/upload-lawyer-profile-image");
const { v2: cloudinary } = require("cloudinary");

const signup = async (req, res, next) => {
  try {
    const {
      lawyer_username,
      lawyer_designation,
      lawyer_email,
      lawyer_phone,
      password,
      lawyer_department,
      location,
    } = req.body;

    let lawyer = await Lawyer.findOne({ lawyer_email });
    if (lawyer) {
      const error = new HttpError("Lawyer Already Exists!", 400);
      return next(error);
    }

    if (!req.file) {
      return next(new HttpError("No Lawyer Profile Image provided!", 400));
    }

    const lawyerProfileImageUrl =
      await lawyerProfileImageUpload.cloudinaryLawyerProfileImageUpload(
        req.file
      );

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    lawyer = new Lawyer({
      lawyer_username,
      lawyer_designation,
      lawyer_email,
      lawyer_phone,
      password: hashedPassword,
      lawyer_department,
      location,
      lawyer_profile_image: lawyerProfileImageUrl,
    });

    await lawyer.save();

    res.status(201).json({ message: "Lawyer Created Successfully!" });
  } catch (err) {
    console.log(err);
    const error = new HttpError("Error Creating Lawyer!", 500);
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { lawyer_email, password } = req.body;

    let lawyer = await Lawyer.findOne({ lawyer_email });
    if (!lawyer) {
      const error = new HttpError("Lawyer Not Found!", 404);
      return next(error);
    }

    const isMatch = await bcrypt.compare(password, lawyer.password);
    if (!isMatch) {
      const error = new HttpError("Invalid Credentials!", 401);
      return next(error);
    }

    const payload = {
      userType: "lawyer",
      lawyer: {
        id: lawyer.id,
        email: lawyer.email,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) {
          console.error("Error in JWT sign:", err.message);
          const error = new HttpError("Error Generating Token!", 500);
          return next(error);
        }
        console.log("JWT generated successfully");
        res.json({ message: "Login Successfully", token });
      }
    );
  } catch (err) {
    const error = new HttpError("Error Logging In!", 500);
    return next(error);
  }
};

const getLawyers = async (req, res, next) => {
  try {
    console.log("Fetching lawyer with ID:", req.userId);
    const lawyer = await Lawyer.findById(req.userId).select("-password");
    if (!lawyer) {
      console.log("No lawyer found for ID:", req.userId);
      const error = new HttpError("Lawyer Not Found!", 404);
      return next(error);
    }
    console.log("Found lawyer:", lawyer);
    res.json({ Lawyers: lawyer });
  } catch (err) {
    console.error("Error Getting Lawyer:", err);
    const error = new HttpError("Error Getting Lawyer!", 500);
    return next(error);
  }
};

const getLawyersById = async (req, res, next) => {
  try {
    const lawyer = await Lawyer.findById(req.params.id).select("-password");
    if (!lawyer) {
      const error = new HttpError("Lawyer Not Found For Provided Id!", 404);
      return next(error);
    }
    res.json({ Lawyers: lawyer });
  } catch (err) {
    console.error("Error in getting lawyer by id:", err.message);
    if (err.kind === "ObjectId") {
      const error = new HttpError("Lawyer Not Found For Provided Id!", 404);
      return next(error);
    }
    const error = new HttpError("Server Error", 500);
    return next(error);
  }
};

const resetPassword = async (req, res, next) => {
  const { lawyer_email, newPassword } = req.body;

  try {
    const lawyer = await Lawyer.findOne({ lawyer_email });

    if (!lawyer) {
      const error = new HttpError("Lawyer Not Found!", 404);
      return next(error);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    lawyer.password = hashedPassword;

    await lawyer.save();

    res.status(200).json({ message: "Password Reset Successfully!" });
  } catch (err) {
    const error = new HttpError("Error Resetting Password!", 500);
    return next(error);
  }
};

const deleteLawyer = async (req, res, next) => {
  const lawyerId = req.params.id;

  if (!lawyerId) {
    return res.status(400).json({ message: "Invalid Lawyer ID" });
  }

  try {
    const lawyer = await Lawyer.findById(lawyerId);

    if (!lawyer) {
      return res.status(404).json({ message: "Lawyer not found." });
    }

    if (lawyer.lawyer_profile_image) {
      try {
        const publicId = lawyer.lawyer_profile_image
          .split("/")
          .slice(-4)
          .join("/")
          .split(".")[0];

        const deletionResult = await cloudinary.uploader.destroy(publicId);
        if (deletionResult.result === "ok") {
        } else {
          console.error(
            `Failed to delete Lawyer Profile Image from Cloudinary: ${publicId}`
          );
        }
      } catch (err) {
        console.error(
          "Error deleting Lawyer Profile image from Cloudinary:",
          err
        );
      }
    }

    await Lawyer.deleteOne({ _id: lawyerId });

    res.status(200).json({ message: "Lawyer Deleted Successfully." });
  } catch (error) {
    console.log("Error deleting Lawyer:", error);
    return next(new HttpError("Failed To Delete Lawyer!", 500));
  }
};

module.exports = {
  signup,
  login,
  resetPassword,
  getLawyers,
  getLawyersById,
  resetPassword,
  deleteLawyer,
};
