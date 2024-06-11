import React from "react";
import { Link } from "react-router-dom";
import "./css/Footer.css";

const Footer = () => {
  return (
    <section id="Footer">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-4">
            <h6 className="footerHeading">About Us</h6>
            <p className="footerDescription">
              At Lawment, our passion is to make high quality legal services
              accessible to everyone. Founded with the belief that navigating
              the legal landscape should be straightforward and transparent, we
              have assembled a team of dedicated professionals who are committed
              to providing exceptional legal support tailored to your unique
              needs.
            </p>
            <Link to={"/about"} style={{ color: "#c8b47e" }}>
              Learn More<i className="fas fa-arrow-right px-2"></i>
            </Link>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-4 mx-auto">
            <h6 className="footerHeading px-4">UseFul Links</h6>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/departments">Departments</Link>
              </li>
              <li>
                <Link to="/terms-and-conditions">Terms and Conditions</Link>
              </li>
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          <div className="col-sm-12 col-md-12 col-lg-4">
            <h6 className="footerHeading">Our Contact</h6>
            <div className="mainContainer p-2">
              <i className="fas fa-phone-alt icon"></i>
              <span className="text-black px-3">
                +111-233-1273 <br />
              </span>
            </div>
            <div className="mainContainer p-2">
              <i className="fas fa-envelope icon"></i>
              <Link className="text-decoration-none">
                <span className="text-black px-3">info@lawment.com</span>
              </Link>
            </div>
            <div className="mainContainer p-2">
              <i className="fas fa-map-marker-alt icon"></i>
              <span className="text-black px-3">
                95 South Park Ave, NYC, USA
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="small text-center text-white bg-dark p-3 mt-5">
        &copy;Copyright @ 2022 By{" "}
        <span>
          <Link to={"/"} style={{ color: "var(--secondary)" }}>
            Lawment
          </Link>
        </span>{" "}
        | All Rights Reserved
      </div>
    </section>
  );
};

export default Footer;
