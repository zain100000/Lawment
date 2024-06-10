const Client = require("../models/client-model");
const Lawyer = require("../models/lawyer-model");
const HttpError = require("../models/http-error");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const clientProfileImageUpload = require("../middleware/upload-client-profile-image");
const { v2: cloudinary } = require("cloudinary");

const signup = async (req, res, next) => {
  try {
    const { client_username, client_email, password, client_phone } = req.body;

    let client = await Client.findOne({ client_email });
    if (client) {
      const error = new HttpError("Client Already Exists!", 400);
      return next(error);
    }

    if (!req.file) {
      return next(new HttpError("No Client Profile Image provided!", 400));
    }

    const clientProfileImageUrl =
      await clientProfileImageUpload.cloudinaryClientProfileImageUpload(
        req.file
      );

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    client = new Client({
      client_username,
      client_phone,
      client_email,
      password: hashedPassword,
      client_profile_image: clientProfileImageUrl,
    });

    await client.save();

    res.status(201).json({ message: "Client Created Successfully!" });
  } catch (err) {
    const error = new HttpError("Error Creating Client!", 500);
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { client_email, password } = req.body;

    let client = await Client.findOne({ client_email });
    if (!client) {
      const error = new HttpError("Client Not Found!", 404);
      return next(error);
    }

    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch) {
      const error = new HttpError("Invalid Credentials!", 401);
      return next(error);
    }

    const payload = {
      userType: "client",
      client: {
        id: client.id,
        email: client.client_email,
      },
    };

    console.log(payload);

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

const getClients = async (req, res, next) => {
  try {
    const lawyers = await Lawyer.find({}).select(
      "lawyer_username lawyer_email lawyer_phone lawyer_designation lawyer_department"
    );

    const client = await Client.findById(req.userId).select("-password");

    if (!client) {
      const error = new HttpError("Client Not Found!", 404);
      return next(error);
    }

    res.json({ Clients: { ...client.toObject(), lawyers } });
  } catch (err) {
    console.error("Error getting clients:", err.message);
    const error = new HttpError("Error Getting Clients!", 500);
    return next(error);
  }
};

const getClientsById = async (req, res, next) => {
  try {
    const client = await Client.findById(req.params.id).select("-password");
    if (!client) {
      const error = new HttpError("Client Not Found For Provided Id!", 404);
      return next(error);
    }
    res.json({ Clients: client });
  } catch (err) {
    console.error("Error in getting client by id:", err.message);
    if (err.kind === "ObjectId") {
      const error = new HttpError("Client Not Found For Provided Id!", 404);
      return next(error);
    }
    const error = new HttpError("Server Error", 500);
    return next(error);
  }
};

const resetPassword = async (req, res, next) => {
  const { client_email, newPassword } = req.body;

  try {
    const client = await Client.findOne({ client_email });

    if (!client) {
      const error = new HttpError("Client Not Found!", 404);
      return next(error);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    client.password = hashedPassword;

    await client.save();

    res.status(200).json({ message: "Password Reset Successfully!" });
  } catch (err) {
    const error = new HttpError("Error Resetting Password!", 500);
    return next(error);
  }
};

const deleteClient = async (req, res, next) => {
  const clientId = req.params.id;

  if (!clientId) {
    return res.status(400).json({ message: "Invalid Client ID" });
  }

  try {
    const client = await Client.findById(clientId);

    if (!client) {
      return res.status(404).json({ message: "Client not found." });
    }

    if (client.client_profile_image) {
      try {
        const publicId = client.client_profile_image
          .split("/")
          .slice(-4)
          .join("/")
          .split(".")[0];

        const deletionResult = await cloudinary.uploader.destroy(publicId);
        if (deletionResult.result === "ok") {
        } else {
          console.error(
            `Failed to delete Client Profile Image from Cloudinary: ${publicId}`
          );
        }
      } catch (err) {
        console.error(
          "Error deleting Client Profile image from Cloudinary:",
          err
        );
      }
    }

    await Client.deleteOne({ _id: clientId });

    res.status(200).json({ message: "Client deleted successfully." });
  } catch (err) {
    console.error("Error deleting client:", err.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  signup,
  login,
  getClients,
  getClientsById,
  resetPassword,
  deleteClient,
};
