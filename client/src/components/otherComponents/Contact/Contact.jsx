import React, { useState, useEffect } from "react";
import "./css/Contact.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../shared/LoaderComponent/Loader";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    return () => {
      window.scrollTo(0, 0);
    };
  }, []);

  const API = import.meta.env.VITE_SERVER_URI;
  
  const handleContact = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const contactData = {
        name,
        email,
        mobile,
        subject,
        message,
      };

      const ContactApiUrl = `${API}/api/contactForms/addContactForm`;
      const response = await axios.post(ContactApiUrl, contactData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status >= 200 && response.status < 300) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.extraDetails);
      }
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.extraDetails);
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
    <section id="Contact">
      <div className="container">
        <div className="row mt-5">
          <div className="col-sm-12 col-md-12 col-lg-6">
            <div style={{ marginLeft: 10 }}>
              <h2
                className="heading"
                style={{ fontSize: "2.5rem", fontWeight: "bold" }}
              >
                Contact Us
              </h2>
              <p>Please fill in the following form to contact us quickly.</p>
            </div>
            <form>
              <div className="row p-2">
                <div className="col-sm-12 col-md-12 col-lg-12">
                  <input
                    className="inputField px-3"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>
              <div className="row p-2">
                <div className="col-sm-12 col-md-12 col-lg-12">
                  <input
                    className="inputField px-3"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>
              <div className="row p-2">
                <div className="col-sm-12 col-md-12 col-lg-12">
                  <input
                    className="inputField px-3"
                    placeholder="Phone"
                    name="mobile"
                    value={mobile}
                    onChange={(e) => {
                      setMobile(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>
              <div className="row p-2">
                <div className="col-sm-12 col-md-12 col-lg-12">
                  <input
                    className="inputField px-3"
                    placeholder="Subject"
                    name="subject"
                    value={subject}
                    onChange={(e) => {
                      setSubject(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>
              <div className="row p-2">
                <div className="col-sm-12 col-md-12 col-lg-12">
                  <textarea
                    className="inputField px-3"
                    placeholder="Message"
                    name="message"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    required
                    rows={3}
                  />
                </div>
              </div>
              <div className="row p-2">
                <div className="col-sm-12 col-md-12 col-lg-12">
                  <button className="contactBtn" onClick={handleContact}>
                    {loading ? <Loader /> : <span>Send Message</span>}
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="col-sm-12 col-md-12 col-lg-6">
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-12 infoContainer">
                <div className="infoContent">
                  <i className="fas fa-phone-alt infoIcon"></i>
                  <span className="infoText" style={{ marginLeft: 10 }}>
                    +111-233-1273
                  </span>
                </div>
              </div>

              <div className="col-sm-12 col-md-12 col-lg-12 infoContainer">
                <div className="infoContent">
                  <i className="fas fa-envelope infoIcon"></i>
                  <span className="infoText" style={{ marginLeft: 10 }}>
                    info@lawment.com
                  </span>
                </div>
              </div>

              <div className="col-sm-12 col-md-12 col-lg-12 infoContainer">
                <div className="infoContent">
                  <i className="fas fa-map infoIcon"></i>
                  <span className="infoText" style={{ marginLeft: 10 }}>
                    95 South Park Ave, NYC, USA
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="seperator w-100" />
    </section>
  );
};

export default Contact;
