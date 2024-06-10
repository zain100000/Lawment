import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import "./css/Header.css";
import imagePlaceHolder from "../../assets/default-avatar.png";
import { toast } from "react-toastify";
import axios from "axios";
import { isAuthenticated } from "../util/auth";
import Sidebar from "../shared/Sidebar/Sidebar";

const Header = () => {
  const [authenticated, setAuthenticated] = useState(isAuthenticated());
  const [profileImage, setProfileImage] = useState(imagePlaceHolder);
  const [profileData, setProfileData] = useState({});
  const [showSidebar, setShowSidebar] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [isLawyer, setIsLawyer] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      setAuthenticated(isAuthenticated());
      setIsLawyer(localStorage.getItem("isLawyer") === "true");
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);

    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (authenticated) {
        try {
          const token = localStorage.getItem("token");
          const apiUrl = isLawyer
            ? "http://localhost:5000/api/lawyers/getLawyers"
            : "http://localhost:5000/api/clients/getClients";
          const response = await axios.get(apiUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const profileImage = isLawyer
            ? response.data.Lawyers.lawyer_profile_image
            : response.data.Clients.client_profile_image;

          setProfileImage(profileImage || imagePlaceHolder);
          setProfileData(
            isLawyer ? response.data.Lawyers : response.data.Clients
          );
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    };

    fetchProfile();
  }, [authenticated, isLawyer]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLawyer");
    setAuthenticated(false);
    setIsLawyer(false);
    setProfileImage(imagePlaceHolder);
    toast.success("Logout Successfully");
  };

  const toggleSidebar = (isBooking) => {
    if (!authenticated) {
      toast.error(
        "Unregistered Client! Please Register If You Don't Have Account Or Login If You Have Account First."
      );
    } else {
      setShowSidebar(true);
      setIsBooking(isBooking);
    }
  };

  return (
    <>
      <section id="Header">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-6 d-flex justify-content-start">
              <div className="contact-info">
                <i className="fas fa-envelope icon"></i>
                <span className="spanText">info@lawment.com</span>
                <i className="fas fa-phone-alt icon"></i>
                <span className="spanText">+111-233-1273</span>
              </div>
            </div>
            <div className="col-6 d-flex justify-content-end">
              <div className="auth-section">
                {authenticated ? (
                  <>
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="profile-img"
                      onClick={() => toggleSidebar(false)}
                    />
                    <Link onClick={handleLogout}>
                      <span className="spanText">Logout</span>
                    </Link>
                  </>
                ) : (
                  <>
                    <i className="fas fa-lock icon"></i>
                    <span className="spanText">
                      <Link to="/client-login" className="auth-link">
                        Login
                      </Link>{" "}
                      /{" "}
                      <Link to="/client-register" className="auth-link">
                        Register
                      </Link>
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <nav className="navbar navbar-expand-lg bg-white">
          <div className="container">
            <strong>
              <Link className="navbar-brand" to="/">
                <img
                  className="Logo"
                  src={Logo}
                  alt="Logo"
                  style={{ width: 200, margin: 5 }}
                />
              </Link>
            </strong>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapsibleNavbar"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/services">
                    Services
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/departments">
                    Departments
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact-us">
                    Contact Us
                  </Link>
                </li>
                {!isLawyer && (
                  <li className="nav-item">
                    <div className="row">
                      <div className="col-lg-12">
                        <button
                          className="appointment-btn"
                          onClick={() => toggleSidebar(true)}
                        >
                          <span>Appointment</span>
                        </button>
                      </div>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </section>
      <Sidebar
        isOpen={showSidebar}
        toggleSidebar={() => setShowSidebar(false)}
        profileData={profileData}
        isBooking={isBooking}
        setBookingForm={toggleSidebar}
      />
    </>
  );
};

export default Header;
