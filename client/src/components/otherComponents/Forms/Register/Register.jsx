import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../../shared/LoaderComponent/Loader";
import { useNavigate } from "react-router-dom";
import imagePlaceholder from "../../../../assets/default-avatar.png";
import "../css/Register.css";

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
          <div className="text-center">
            <h2 className="heading">Client Signup</h2>
            <p>Please Fill In The Following Form To Register.</p>
          </div>
          <form onSubmit={handleRegister} className="form">
            <div className="image-upload-container mb-3">
              <div
                className="input-group"
                style={{ display: "flex", justifyContent: "center" }}
              >
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
                      alt="Selected"
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <img
                      src={imagePlaceholder}
                      alt="Image Placeholder"
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                      }}
                    />
                  )}
                </label>
              </div>
            </div>

            <input
              className="inputField px-2"
              placeholder="Name"
              name="client_username"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              autoComplete="off"
            />
            <input
              className="inputField px-2"
              placeholder="Email"
              name="client_email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              autoComplete="off"
            />
            <input
              className="inputField px-2"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              autoComplete="off"
            />
            <input
              className="inputField px-2"
              placeholder="Phone"
              name="client_phone"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              autoComplete="off"
            />

            <button className="registerBtn" type="submit">
              {loading ? <Loader /> : <span>Register</span>}
            </button>
          </form>

          <div className="text-center mt-3">
            <p>
              Already have an account?{" "}
              <Link to="/client-login">Login Here</Link>
            </p>
            <p>
              Register as a <Link to="/lawyer-register">lawyer</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
