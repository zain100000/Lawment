import React from "react";
import PropTypes from "prop-types";
import "./css/AppointmentDetailsSidebar.css";

const AppointmentDetailsSidebar = ({ isOpen, appointment, onClose }) => {
  if (!isOpen || !appointment) return null;

  return (
    <div className="appointment-details-sidebar">
      <div className="appointment-details-content">
        <button className="close-modal-btn" onClick={onClose}>
          ×
        </button>
        <h3>Appointment Details</h3>
        <p>Department: {appointment.department}</p>
        <p>Lawyer Name: {appointment.lawyerName}</p>
        <p>Date: {appointment.appointment_date}</p>
        <p>Schedule: {appointment.appointment_schedule}</p>
        <div className="modal-actions">
          <button className="edit-btn">
            <i className="fas fa-pencil-alt"></i> Edit
          </button>
          <button className="delete-btn">
            <i className="fas fa-trash"></i> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

AppointmentDetailsSidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  appointment: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default AppointmentDetailsSidebar;
