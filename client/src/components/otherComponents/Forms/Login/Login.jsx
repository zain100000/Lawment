import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginImage from "../../../../assets/forms/login-img.jpg";
import "../css/Login.css";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../../shared/LoaderComponent/Loader";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const signinData = {
        client_email: email,
        password,
      };

      const SigninApiUrl = "http://localhost:5000/api/clients/client_login";
      const response = await axios.post(SigninApiUrl, signinData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status >= 200 && response.status < 300) {
        toast.success(response.data.message);
        const { token } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("isLawyer", "false");
        window.dispatchEvent(new Event("storage"));
        navigate("/");
      } else {
        toast.error(response.data.extraDetails);
      }
    } catch (err) {
      if (err.response) {
        const errorMessage = err.response.data.message;
        if (errorMessage.includes("Invalid Credentials")) {
          toast.error("Invalid Credentials");
        } else {
          console.log(err);
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
    <section id="Login">
      <div className="container">
        <div className="card">
          <div className="row text-center">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <div>
                <h2
                  className="heading"
                  style={{ fontSize: "3rem", fontWeight: "bold" }}
                >
                  Client Signin
                </h2>
                <p>Please Fill In The Following Form To Login.</p>
              </div>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-sm-12 col-md-12 col-lg-6 mb-5">
              <img src={LoginImage} alt="Login Image" className="login-img" />
            </div>

            <div className="col-sm-12 col-md-12 col-lg-6">
              <form onSubmit={handleLogin}>
                <div className="row">
                  <div className="col-sm-12 col-md-12 col-lg-12">
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
                  <div className="col-sm-12 col-md-12 col-lg-12 ">
                    <input
                      className="inputField px-3"
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-12 col-lg-12">
                    <Link>
                      <h6 style={{ color: "#000", paddingLeft: 5 }}>
                        Forgot Password
                      </h6>
                    </Link>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <button className="loginBtn" type="submit">
                      {loading ? <Loader /> : <span>Login</span>}
                    </button>
                  </div>
                </div>
              </form>

              <div className="row mt-3 px-2">
                <div className="col-6">
                  <p style={{ color: "#393f81" }}>Didn't have an account?</p>
                </div>
                <div className="col-6">
                  <Link to="/client-register">
                    <h6
                      style={{
                        color: "#000",
                      }}
                    >
                      Register Here
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

export default Login;
