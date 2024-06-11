import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../../shared/LoaderComponent/Loader";
import { useNavigate } from "react-router-dom";
import "../css/LawyerForgotPassword.css";

const LawyerForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API = import.meta.env.VITE_SERVER_URI;

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const resetPasswordData = {
        lawyer_email: email,
        newPassword: password,
      };

      const ResetPasswordApiUrl = `${API}/api/lawyers/lawyer-reset-password`;
      const response = await axios.post(
        ResetPasswordApiUrl,
        resetPasswordData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        toast.success("Password Is Reset Successfully");
        navigate("/");
      } else {
        toast.error(response.data.extraDetails);
      }
    } catch (err) {
      if (err.response) {
        const errorMessage = err.response.data.message;
        if (errorMessage.includes("Invalid Email")) {
          toast.error("Invalid Email");
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
    <section id="lawyer-reset-password">
      <div className="container">
        <div className="card">
          <div className="text-center">
            <h2 className="heading">Password Reset</h2>
            <p>Please Fill In The Following Form To Reset Your Password.</p>
          </div>
          <form onSubmit={handleResetPassword} className="form">
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

            <button className="resetBtn" type="submit">
              {loading ? <Loader /> : <span>Reset Password</span>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LawyerForgotPassword;
