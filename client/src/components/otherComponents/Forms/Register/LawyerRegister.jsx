import React, { useState } from "react";
import { Link } from "react-router-dom";
import RegisterImage from "../../../../assets/forms/login-img.jpg";
import imagePlaceholder from "../../../../assets/default-avatar.png";
import "../css/LawyerRegister.css";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../../shared/LoaderComponent/Loader";
import { useNavigate } from "react-router-dom";

const LawyerRegister = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const API = import.meta.env.VITE_SERVER_URI;

  const handleLawyerRegister = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Select Profile Pic");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("lawyer_username", name);
      formData.append("lawyer_email", email);
      formData.append("password", password);
      formData.append("lawyer_department", department);
      formData.append("lawyer_designation", designation);
      formData.append("location", location);
      formData.append("lawyer_phone", phone);
      formData.append("lawyer_profile_image", image);

      const SignupApiUrl = `${API}/api/lawyers/lawyer_signup`;
      const response = await axios.post(SignupApiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status >= 200 && response.status < 300) {
        toast.success(response.data.message);
        navigate("/lawyer-login");
      } else {
        toast.error(response.data.extraDetails);
      }
    } catch (err) {
      if (err.response) {
        const errorMessage = err.response.data.message;
        if (errorMessage.includes("Lawyer Already Exists")) {
          toast.error("Lawyer Already Exists");
        } else {
          toast.error(err.response.data.extraDetails);
        }
      } else if (err.request) {
        toast.error("No response from the server. Please try again.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="lawyer-register">
      <div className="container">
        <div className="card">
          <div className="row text-center">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <div>
                <h2
                  className="heading"
                  style={{ fontSize: "3rem", fontWeight: "bold" }}
                >
                  Lawyer Signup
                </h2>
                <p>Please Fill In The Following Form To Register.</p>
              </div>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <form onSubmit={handleLawyerRegister}>
                <div className="image-upload-container mb-3">
                  <div
                    className="input-group"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      name="lawyer_profile_image"
                      onChange={handleImageChange}
                      hidden
                    />
                    <label htmlFor="image" style={{ cursor: "pointer" }}>
                      {image ? (
                        <img
                          src={URL.createObjectURL(image)}
                          style={{
                            width: 80,
                            height: 80,
                            borderRadius: 80,
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <div>
                          <img
                            src={imagePlaceholder}
                            alt="Image Placeholder"
                            style={{
                              width: 80,
                              height: 80,
                              borderRadius: 80,
                            }}
                          />
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-12 col-lg-12">
                    <input
                      className="inputField px-3"
                      placeholder="Name"
                      name="lawyer_username"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      autoComplete="name"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-12 col-lg-12">
                    <input
                      className="inputField px-3"
                      placeholder="Email"
                      name="lawyer_email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-12 col-lg-12">
                    <input
                      type="password"
                      className="inputField px-3"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      autoComplete="password"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-12 col-lg-12">
                    <input
                      className="inputField px-3"
                      placeholder="Phone"
                      name="lawyer_phone"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                      autoComplete="phone"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-12 col-lg-12">
                    <input
                      className="inputField px-3"
                      placeholder="Designation"
                      name="lawyer_designation"
                      value={designation}
                      onChange={(e) => {
                        setDesignation(e.target.value);
                      }}
                      autoComplete="designation"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className="d-flex flex-row">
                      <select
                        className="form-control px-3"
                        name="lawyer_department"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                      >
                        <option value="">Select Department:</option>
                        <option value="Civil Rights">Civil Rights</option>
                        <option value="Entertainment Law">
                          Entertainment Law{" "}
                        </option>
                        <option value="Health Law">Health Law </option>
                        <option value="Immigration Law">
                          Immigration Law{" "}
                        </option>
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
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className="d-flex flex-row">
                      <select
                        className="form-control px-3"
                        name="lawyer_location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      >
                        <option value="">Select Location:</option>
                        <option value="Karachi">Karachi</option>
                        <option value="Lahore">Lahore </option>
                        <option value="Faisalabad">Faisalabad </option>
                        <option value="Rawalpindi">Rawalpindi </option>
                        <option value="Islamabad">Islamabad </option>
                      </select>
                      <i
                        className="fas fa-chevron-down"
                        style={{ marginTop: 12, marginLeft: -30 }}
                      ></i>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <button className="registerBtn" type="submit">
                      {loading ? <Loader /> : <span>Register</span>}
                    </button>
                  </div>
                </div>
              </form>

              <div className="row mt-3 px-2">
                <div className="col-sm-12 col-md-12 col-lg-12 text-center">
                  <p>
                    Already have an account?{" "}
                    <Link to="/lawyer-login">Login Here</Link>
                  </p>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12 text-center">
                  <p>
                    Register as a <Link to="/client-register">Client</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LawyerRegister;
