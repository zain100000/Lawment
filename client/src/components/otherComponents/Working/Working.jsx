import React from "react";
import WorkImage from "../../../assets/working/working-image.jpg";
import "./css/Working.css";

const Working = () => {
  return (
    <section id="Working">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <h1 className="heading">How We Work</h1>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-sm-12 col-md-12 col-lg-6 text-center">
            <img src={WorkImage} alt="Working Image" className="working-img" />
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6">
            <p className="working-description" style={{ textAlign: "justify" }}>
              <span style={{ fontSize: "2rem", fontWeight: 600 }}>
                At Lawment
              </span>
              , our mission is to make legal services accessible, transparent,
              and efficient. We start with a free initial consultation to
              understand your unique legal needs, ensuring that our services are
              tailored specifically to your situation. Our experienced team
              conducts a thorough analysis of your case, identifying key issues
              and formulating a strategic plan to achieve the best possible
              outcome.
            </p>

            <p className="working-description" style={{ textAlign: "justify" }}>
              Communication is at the heart of our approach. We prioritize
              clear, consistent updates and maintain an open channel for any
              questions or concerns you might have. At Lawment, your peace of
              mind is our priority.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Working;
