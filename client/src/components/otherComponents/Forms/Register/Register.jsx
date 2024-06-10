import React, { useState } from "react";
import { Link } from "react-router-dom";
import RegisterImage from "../../../../assets/forms/login-img.jpg";
import imagePlaceholder from "../../../../assets/default-avatar.png";
import "../css/Register.css";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../../shared/LoaderComponent/Loader";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Check if profile picture is selected
    if (!image) {
      toast.error("Select Profile Pic");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("client_username", name);
      formData.append("client_email", email);
      formData.append("password", password);
      formData.append("client_phone", phone);
      formData.append("client_profile_image", image);

      const SignupApiUrl = "http://localhost:5000/api/clients/client_signup";
      const response = await axios.post(SignupApiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status >= 200 && response.status < 300) {
        toast.success(response.data.message);
        navigate("/client-login");
      } else {
        toast.error(response.data.extraDetails);
      }
    } catch (err) {
      if (err.response) {
        const errorMessage = err.response.data.message;
        if (errorMessage.includes("Client Already Exists")) {
          toast.error("Client Already Exists");
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
    <section id="Register">
      <div className="container">
        <div className="card">
          <div className="row text-center">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <div>
                <h2
                  className="heading"
                  style={{ fontSize: "3rem", fontWeight: "bold" }}
                >
                  Client Signup
                </h2>
                <p>Please Fill In The Following Form To Register.</p>
              </div>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-sm-12 col-md-12 col-lg-6 mb-5">
              <img
                src={RegisterImage}
                alt="Register Image"
                className="register-img"
              />
            </div>

            <div className="col-sm-12 col-md-12 col-lg-6">
              <form onSubmit={handleRegister}>
                <div className="image-upload-container mb-3">
                  <div className="input-group">
                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      name="client_profile_image"
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
                  <div className="col-sm-12 col-md-6 col-lg-6">
                    <input
                      className="inputField px-3"
                      placeholder="Name"
                      name="client_username"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-sm-12 col-md-6 col-lg-6 ">
                    <input
                      className="inputField px-3"
                      placeholder="Email"
                      name="client_email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-6 col-lg-6">
                    <input
                      className="inputField px-3"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-sm-12 col-md-6 col-lg-6">
                    <input
                      className="inputField px-3"
                      placeholder="Phone"
                      name="client_phone"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                    />
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
                <div className="col-6">
                  <p style={{ color: "#393f81" }}>Already have an account?</p>
                </div>
                <div className="col-6">
                  <Link to="/client-login">
                    <h6
                      style={{
                        color: "#000",
                      }}
                    >
                      Login Here
                    </h6>
                  </Link>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <Link to="/lawyer-register">
                    <h6
                      style={{
                        paddingLeft: 10,
                        color: "#000",
                      }}
                    >
                      Register as a lawyer
                    </h6>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
