const jwt = require("jsonwebtoken");
const Client = require("../../models/client-model");
const Lawyer = require("../../models/lawyer-model");
const HttpError = require("../../models/http-error");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid or missing token" });
  }

  const jwtToken = authHeader.replace("Bearer ", "").trim();

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET);

    let userData;
    if (isVerified.client) {
      userData = await Client.findById(isVerified.client.id).select(
        "-password"
      );
    } else if (isVerified.lawyer) {
      userData = await Lawyer.findById(isVerified.lawyer.id).select(
        "-password"
      );
    } else {
      throw new Error("Invalid user type in JWT token");
    }

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    req.token = jwtToken;
    req.user = userData;
    req.userId = isVerified.client ? userData._id : isVerified.lawyer.id;
    req.userType = isVerified.client ? "client" : "lawyer";
    next();
  } catch (error) {
    console.error("Error verifying token:", error.message || error);
    res.status(401).json({ message: "Unauthorized token" });
  }
};

module.exports = authMiddleware;
