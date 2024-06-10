import React from "react";
import "./css/AllServices.css";

const AllServices = () => {
  return (
    <section id="AllServices">
      <div className="container">
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

        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="service-coloum">
              <div className="service-item">
                <i className="fas fa-balance-scale"></i>
                <h3>Litigation and Dispute Resolution</h3>
                <p>
                  We represent clients in court and manage all aspects of
                  litigation. From pre-trial preparation to courtroom
                  representation, we aim to resolve disputes effectively and
                  efficiently.
                </p>
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="service-coloum">
              <div className="service-item">
                <i className="fas fa-briefcase"></i>
                <h3>Business Law Services</h3>
                <p>
                  Lawment offers a full range of business law services,
                  including company formation, compliance, mergers and
                  acquisitions, and intellectual property protection. We help
                  businesses.
                </p>
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-md-12 col-lg-4">
            <div className="service-coloum">
              <div className="service-item">
                <i className="fas fa-users"></i>
                <h3>Family Law</h3>
                <p>
                  We provide compassionate legal support for family-related
                  issues such as divorce, child custody, and adoption. Our goal
                  is to resolve matters amicably while protecting our clients’
                  best interests.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="service-coloum">
              <div className="service-item">
                <i className="fas fa-map-marker-alt"></i>
                <h3>Real Estate Law</h3>
                <p>
                  Our real estate law services cover transactions, leases,
                  property disputes, and zoning issues. We ensure that all
                  dealings are legally compliant and protect your investments.
                </p>
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="service-coloum">
              <div className="service-item">
                <i className="fas fa-user-tie"></i>
                <h3>Employment Law</h3>
                <p>
                  We advise both employers and employees on employment law
                  matters, including contracts, workplace disputes, wrongful
                  termination, and compliance with labor laws.
                </p>
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-md-12 col-lg-4">
            <div className="service-coloum">
              <div className="service-item">
                <i className="fas fa-scroll"></i>
                <h3>Estate Planning</h3>
                <p>
                  Lawment helps clients plan for the future with services like
                  drafting wills, creating trusts, and managing estate
                  administration. We ensure that your assets are distributed according to your wishes.                  
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllServices;
