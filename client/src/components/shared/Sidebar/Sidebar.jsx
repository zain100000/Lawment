import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./css/Sidebar.css";
import imagePlaceHolder from "../../../assets/default-avatar.png";
import Loader from "../LoaderComponent/Loader";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar, isBooking }) => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [department, setDepartment] = useState("");
  const [lawyer, setLawyer] = useState("");
  const [appointment_schedule, setAppointmentSchedule] = useState("");
  const [appointment_date, setAppointmentDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [client, setClient] = useState("");
  const [deleteAccount, setDeleteAccount] = useState("");
  const [lawyers, setLawyers] = useState([]);
  const [profileData, setProfileData] = useState({});
  const [isLawyer, setIsLawyer] = useState(
    localStorage.getItem("isLawyer") === "true"
  );
  const navigate = useNavigate();

  const API = import.meta.env.VITE_SERVER_URI;

  useEffect(() => {
    if (isOpen) {
      getAppointments();
      getProfileData();
    }
  }, [isOpen]);

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API}/api/appointments/addAppointment`,
        {
          department,
          lawyerName: lawyer,
          appointment_date: appointment_date,
          appointment_schedule: appointment_schedule,
          client: client,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newAppointment = response.data.Appointments;
      setAppointments([...appointments, newAppointment]);
      toast.success("Appointment Booked Successfully");
      // Reset form fields
      setDepartment("");
      setLawyer("");
      setAppointmentSchedule("");
      setAppointmentDate("");
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("Error booking appointment:");
    } finally {
      setLoading(false);
    }
  };

  const getAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API}/api/appointments/getAppointments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAppointments(response.data.Appointments);
    } catch (error) {
      console.error("Error Fetching Appointments");
    }
  };

  const getProfileData = async () => {
    try {
      const token = localStorage.getItem("token");
      const apiUrl = isLawyer
        ? `${API}/api/lawyers/getLawyers`
        : `${API}/api/clients/getClients`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (isLawyer) {
        setProfileData(response.data.Lawyers);
      } else {
        setProfileData(response.data.Clients);
        setClient(response.data.Clients.client_username);
        setLawyers(response.data.Clients.lawyers);
      }
    } catch (error) {
      console.error("Error Fetching Profile Data");
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);

    try {
      const token = localStorage.getItem("token");
      const timestamp = new Date().getTime();
      const response = await axios.get(
        `${API}/api/appointments/getAppointments?timestamp=${timestamp}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const appointments = response.data.Appointments;
      setAppointments(appointments);
    } catch (error) {
      console.error("Error fetching new data:");
    }

    setRefreshing(false);
  };

  const handleProfileRefresh = async () => {
    setRefreshing(true);

    try {
      const token = localStorage.getItem("token");
      const apiUrl = isLawyer
        ? `${API}/api/lawyers/getLawyers`
        : `${API}/api/clients/getClients`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (isLawyer) {
        setProfileData(response.data.Lawyers);
      } else {
        setProfileData(response.data.Clients);
        setClient(response.data.Clients.client_username);
        setLawyers(response.data.Clients.lawyers);
      }
    } catch (error) {
      console.error("Error Fetching Profile Data");
    }

    setRefreshing(false);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Appointment?"
    );

    if (confirmed) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`${API}/api/appointments/removeAppointment/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAppointments((prevData) =>
          prevData.filter((item) => item._id !== id)
        );
        toast.success("Appointment Deleted Successfully");
      } catch (error) {
        console.error("Error deleting Appointment:", error);
        toast.error("Error deleting Appointment:");
      }
    }
  };

  const handleDeleteAccount = async (_id) => {
    if (!_id) {
      toast.error("ID is not defined");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete your account?"
    );

    if (confirmed) {
      try {
        const token = localStorage.getItem("token");
        const apiUrl = isLawyer
          ? `${API}/api/lawyers/removeLawyer/${_id}`
          : `${API}/api/clients/removeClient/${_id}`;
        await axios.delete(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        localStorage.removeItem("token");
        localStorage.removeItem("isLawyer");
        toast.success("Your account has been deleted successfully");
        navigate("/");
        window.location.reload();
      } catch (error) {
        console.error("Error deleting account:", error);
        toast.error("Error deleting account:");
      }
    }
  };

  const handleViewAppointmentDetails = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleCloseAppointmentDetails = () => {
    setSelectedAppointment(null);
  };

  const filteredLawyers = lawyers.filter(
    (lawyer) => lawyer.lawyer_department === department
  );

  return (
    <section id="Sidebar">
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <button className="close-btn" onClick={toggleSidebar}>
            ×
          </button>
        </div>
        <div className="sidebar-content">
          {isBooking ? (
            <div className="booking-section">
              <h4>Book Appointment</h4>
              <form onSubmit={handleBookAppointment}>
                <div className="form-group">
                  <label>Department:</label>
                  <div className="d-flex flex-row">
                    <select
                      className="form-control px-3"
                      name="department"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                    >
                      <option value="">Select Department:</option>
                      <option value="Civil Rights">Civil Rights</option>
                      <option value="Entertainment Law">
                        Entertainment Law{" "}
                      </option>
                      <option value="Health Law">Health Law </option>
                      <option value="Immigration Law">Immigration Law </option>
                      <option value="International Law">
                        International Law{" "}
                      </option>
                      <option value="Military Law">Military Law </option>
                    </select>
                    <i
                      className="fas fa-chevron-down"
                      style={{ marginTop: 12, marginLeft: -30 }}
                    ></i>
                  </div>
                </div>
                <div className="form-group">
                  <label>Lawyer Name:</label>
                  <div className="d-flex flex-row">
                    <select
                      name="lawyerName"
                      value={lawyer}
                      onChange={(e) => setLawyer(e.target.value)}
                      className="form-control"
                    >
                      <option value="">Select Lawyer</option>
                      {filteredLawyers.length > 0 ? (
                        filteredLawyers.map((lawyer, index) => (
                          <option key={index} value={lawyer.lawyer_username}>
                            {lawyer.lawyer_username}
                          </option>
                        ))
                      ) : (
                        <option value="">No Lawyers Found</option>
                      )}
                    </select>
                    <i
                      className="fas fa-chevron-down"
                      style={{ marginTop: 12, marginLeft: -30 }}
                    ></i>
                  </div>
                </div>
                <div className="form-group">
                  <label>Date:</label>
                  <input
                    type="date"
                    name="appointment_date"
                    value={appointment_date}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Schedule:</label>
                  <div className="d-flex flex-row">
                    <select
                      className="form-control px-3"
                      name="schedule"
                      value={appointment_schedule}
                      onChange={(e) => setAppointmentSchedule(e.target.value)}
                    >
                      <option value="">Select Schedule:</option>
                      <option value="9AM-10AM">9AM-10AM</option>
                      <option value="10AM-11AM">10AM-11AM</option>
                      <option value="11AM-12PM">11AM-12PM</option>
                      <option value="12PM-1PM">12PM-1PM</option>
                      <option value="2PM-3PM">2PM-3PM</option>
                      <option value="3PM-4PM">3PM-4PM</option>
                      <option value="4PM-5PM">4PM-5PM</option>
                    </select>
                    <i
                      className="fas fa-chevron-down"
                      style={{ marginTop: 12, marginLeft: -30 }}
                    ></i>
                  </div>
                </div>
                <button type="submit" className="bookBtn">
                  {loading ? <Loader /> : <span>Book</span>}
                </button>
              </form>
            </div>
          ) : (
            <div className="profile-section">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <div>
                  <img
                    src={
                      isLawyer
                        ? profileData.lawyer_profile_image
                        : profileData.client_profile_image || imagePlaceHolder
                    }
                    alt="Profile"
                    className="profile-img"
                  />
                </div>
                <div>
                  <i
                    className="fas fa-sync-alt text-white mt-1"
                    onClick={handleProfileRefresh}
                  ></i>
                </div>
              </div>

              <h3>
                {isLawyer
                  ? profileData.lawyer_username
                  : profileData.client_username}
              </h3>
              <p>
                {isLawyer ? profileData.lawyer_email : profileData.client_email}
              </p>
              <p>
                {isLawyer ? profileData.lawyer_phone : profileData.client_phone}
              </p>

              <div
                onClick={() => handleDeleteAccount(profileData._id)}
                style={{ cursor: "pointer" }}
              >
                <i className="fas fa-trash text-danger"></i>
                {""}
                <span> Delete Your Account</span>
              </div>
            </div>
          )}

          {/* Appointments Section */}

          {!isBooking && (
            <div className="appointments-section">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4>Appointments</h4>

                <i
                  className="fas fa-sync-alt text-white mt-1"
                  onClick={handleRefresh}
                ></i>
              </div>
              {appointments.length > 0 ? (
                <ul className="appointments-list">
                  {appointments.map((appointment) => (
                    <div key={appointment._id} className="appointment-item">
                      <div>
                        <span>Appointment</span>
                      </div>

                      <div style={{ display: "flex", gap: 10 }}>
                        <i
                          className="fas fa-eye text-primary"
                          onClick={() =>
                            handleViewAppointmentDetails(appointment)
                          }
                        ></i>
                        <i
                          className="fas fa-trash text-danger"
                          onClick={() => handleDelete(appointment._id)}
                        ></i>
                      </div>
                    </div>
                  ))}
                </ul>
              ) : (
                <p style={{ textAlign: "center" }}>No appointments yet.</p>
              )}
            </div>
          )}

          {/* Appointment Details */}
          {selectedAppointment && (
            <div className="appointment-details">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h4>Details</h4>
                <button
                  className="close-btn"
                  style={{ marginTop: -20 }}
                  onClick={handleCloseAppointmentDetails}
                >
                  ×
                </button>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                <p>
                  <strong>Department:</strong> {selectedAppointment.department}
                </p>
                {console.log("Lawyer Names:", selectedAppointment.lawyerName)}
                <p>
                  <strong>Lawyer Name:</strong>{" "}
                  {selectedAppointment.lawyerName.map((lawyer, index) => (
                    <span key={index}>
                      {typeof lawyer === "string"
                        ? lawyer
                        : lawyer.lawyer_username}
                      {index !== selectedAppointment.lawyerName.length - 1 &&
                        ", "}
                    </span>
                  ))}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(
                    selectedAppointment.appointment_date
                  ).toLocaleDateString()}
                </p>
                <p>
                  <strong>Schedule:</strong>{" "}
                  {selectedAppointment.appointment_schedule}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  isBooking: PropTypes.bool.isRequired,
};

export default Sidebar;
