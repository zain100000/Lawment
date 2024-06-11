const Appointment = require("../models/appointment-model");
const Lawyer = require("../models/lawyer-model");
const Client = require("../models/client-model");

const addAppointment = async (req, res) => {
  try {
    const { department, lawyerName, appointment_date, appointment_schedule } =
      req.body;

    const clientId = req.user._id;
    const clientUsername = req.user.client_username;

    if (!clientId) {
      return res
        .status(401)
        .json({ message: "Please Register First Then Book An Appointment" });
    }

    if (req.body.client !== clientUsername) {
      return res.status(401).json({
        message: "Invalid client. Please login with the correct account.",
      });
    }

    const registeredLawyers = await Lawyer.find({
      lawyer_username: { $in: lawyerName },
      lawyer_department: department,
    });

    if (registeredLawyers.length === 0) {
      return res.status(404).json({
        message:
          "No registered lawyers found for the specified department and names.",
      });
    }

    const newAppointment = new Appointment({
      department,
      lawyerName: registeredLawyers.map((lawyer) => lawyer._id),
      appointment_date,
      appointment_schedule,
      client: clientId,
    });

    await newAppointment.save();

    registeredLawyers.forEach(async (lawyer) => {
      lawyer.appointments.push(newAppointment._id);
      await lawyer.save();
    });

    const client = await Client.findById(clientId);
    client.appointments.push(newAppointment._id);
    await client.save();

    const populatedAppointment = await Appointment.findById(
      newAppointment._id
    ).populate("client", "client_username");

    const responseAppointment = {
      department: populatedAppointment.department,
      lawyerName: populatedAppointment.lawyerName,
      appointment_date: populatedAppointment.appointment_date,
      appointment_schedule: populatedAppointment.appointment_schedule,
      client: populatedAppointment.client.client_username,
    };

    res.status(201).json({
      message: "Appointment booked successfully",
      Appointments: responseAppointment,
    });
  } catch (error) {
    console.error("Error adding appointment:", error);
    res.status(500).json({ message: "Failed to add appointment" });
  }
};

const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({})
      .populate("client", "client_username client_phone")
      .populate({
        path: "lawyerName",
        select: "lawyer_username lawyer_phone",
        model: "Lawyer",
      });
    res.json({ Appointments: appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAppointmentById = async (req, res) => {
  const appointmentId = req.params.id;
  try {
    const appointment = await Appointment.findById(appointmentId)
      .populate("client", "client_username")
      .populate({
        path: "lawyerName",
        select: "lawyer_username", // Adjust this according to your Lawyer model
        model: "Lawyer",
      });
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.json({ Appointments: appointment });
  } catch (error) {
    console.error("Error fetching appointment by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateAppointment = async (req, res) => {
  const appointmentId = req.params.id;
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { $set: req.body },
      { new: true }
    )
      .populate("client", "client_username")
      .populate(
        "lawyers",
        "lawyer_username lawyer_email lawyer_phone lawyer_profile_image"
      );
    if (!updatedAppointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.json(updatedAppointment);
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteAppointment = async (req, res) => {
  const appointmentId = req.params.id;
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(
      appointmentId
    );
    if (!deletedAppointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    const client = await Client.findOneAndUpdate(
      { appointments: appointmentId },
      { $pull: { appointments: appointmentId } }
    );

    if (!client) {
      console.error("Client not found for appointment:", appointmentId);
    }

    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
};
