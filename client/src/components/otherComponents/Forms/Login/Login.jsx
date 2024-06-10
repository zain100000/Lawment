import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../../shared/LoaderComponent/Loader";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API = import.meta.env.VITE_SERVER_URI;

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const signinData = {
        client_email: email,
        password,
      };

      const SigninApiUrl = `${API}/api/clients/client_login`;
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
          <div className="text-center">
            <h2 className="heading">Client Signin</h2>
            <p>Please Fill In The Following Form To Login.</p>
          </div>
          <form onSubmit={handleLogin} className="form">
            <input
              className="inputField px-2"
              placeholder="Email"
              name="client_email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              autoComplete="email"
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
              autoComplete="password"
            />
            <Link className="forgotPasswordLink">Forgot Password?</Link>
            <button className="loginBtn" type="submit">
              {loading ? <Loader /> : <span>Login</span>}
            </button>
          </form>
          <div className="text-center mt-3">
            <p>
              Didn't have an account?{" "}
              <Link to="/client-register">Register Here</Link>
            </p>
            <p>
              Register as a <Link to="/lawyer-register">Lawyer</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
