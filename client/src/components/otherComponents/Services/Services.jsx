import React from "react";
import { Link } from "react-router-dom";
import "./css/Services.css";

const Services = () => {
  return (
    <section id="Services">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <h1 className="heading text-center">Our Services</h1>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-12">
            <Link className="float-md-end service-btn" to="/Services">
              See All Services
              <i
                className="fas fa-chevron-right"
                style={{ paddingLeft: 5 }}
              ></i>
            </Link>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="service-coloum">
              <div className="service-item">
                <i className="fas fa-handshake"></i>
                <h3>Legal Consultation</h3>
                <p>
                  Our expert legal team provides comprehensive consultations to
                  understand your needs and guide you through the legal
                  landscape. We offer strategic <br />
                  advices.
                </p>
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="service-coloum">
              <div className="service-item">
                <i className="fas fa-file-alt"></i>
                <h3>Document Drafting</h3>
                <p>
                  We assist in drafting and reviewing legal documents to ensure
                  they are precise, comprehensive, and legally sound. This
                  includes contracts, wills, agreements, and other critical
                  documents.
                </p>
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-md-12 col-lg-4">
            <div className="service-coloum">
              <div className="service-item">
                <i className="fas fa-gavel"></i>
                <h3>Contract Negotiation</h3>
                <p>
                  Our experienced negotiators work to secure the best terms for
                  your contracts. We represent your interests and strive to
                  achieve agreements that are favorable and legally enforceable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
