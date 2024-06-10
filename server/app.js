const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const errorMiddleware = require("./middleware/errorMiddleware");
const cors = require("cors");

require("dotenv").config();

const clientRoutes = require("./routes/client-route");
const lawyerRoutes = require("./routes/lawyer-route");
const appointmentRoutes = require("./routes/appointment-route");
const contactFormRoutes = require("./routes/contact-route");

const app = express();
app.use(bodyParser.json());

app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

// ROUTES
app.use(express.json());
app.use("/api/clients", clientRoutes);
app.use("/api/lawyers", lawyerRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/contactForms", contactFormRoutes);

app.use(errorMiddleware);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully!");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
