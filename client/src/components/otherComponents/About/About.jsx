import React, { useEffect } from "react";
import AboutImage from "../../../assets/about/about-img.jpg";
import MissionImage from "../../../assets/about/mission-img.jpg";
import VisionImage from "../../../assets/about/vision-img.jpg";
import "./css/About.css";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    return () => {
      window.scrollTo(0, 0);
    };
  }, []);
  return (
    <section id="About">
      <div className="container">
        {/* About Section */}
        <div className="row mt-5">
          <div className="col-sm-12 col-md-12 col-lg-6 order-sm-1 order-md-1 order-lg-1">
            <p className="about-description" style={{ textAlign: "justify" }}>
              <span style={{ fontSize: "2rem", fontWeight: 600 }}>
                At Lawment
              </span>
              , our passion is to make high-quality legal services accessible to
              everyone. Founded with the belief that navigating the legal
              landscape should be straightforward and transparent, we have
              assembled a team of dedicated professionals who are committed to
              providing exceptional legal support tailored to your unique needs.
              Our mission is to demystify the law and offer clear, practical
              solutions that empower our clients to make informed decisions.
            </p>

            <p className="about-description" style={{ textAlign: "justify" }}>
              Our team is comprised of experienced attorneys, legal consultants,
              and support staff who bring a wealth of knowledge and expertise
              across various legal disciplines. Whether you’re a business owner
              looking for advice on corporate law, an individual needing
              assistance with family matters, or someone seeking justice through
              personal injury claims, we have the skills and experience to guide
              you through every step of the process. We pride ourselves on our
              client-centered approach, taking the time to understand your
              specific circumstances and goals.
            </p>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6 order-sm-2 order-md-2 order-lg-2 text-center">
            <img src={AboutImage} alt="About Image" className="about-img" />
          </div>
        </div>
        {/* About Section */}

        {/* Mission Section */}
        <div className="row mt-5">
          <div className="col-sm-12 col-md-12 col-lg-6 order-sm-1 order-md-1 order-lg-2">
            <p className="mission-description" style={{ textAlign: "justify" }}>
              <span style={{ fontSize: "2rem", fontWeight: 600 }}>
                Our Mission
              </span>
              , is to provide accessible, transparent, and efficient legal
              services that empower individuals and businesses to navigate the
              complexities of the legal system with confidence. We are committed
              to delivering personalized legal solutions tailored to each
              client's unique needs, ensuring that every case receives the
              attention and expertise it deserves. process.
            </p>

            <p className="mission-description">
              We believe in the power of clear communication and collaboration,
              working closely with our clients to understand their goals and
              achieve the best possible outcomes. Our mission extends beyond
              merely resolving legal issues; we aim to build lasting
              relationships based on trust and reliability.
            </p>

            <p className="mission-description">
              By continually innovating and adapting to the evolving legal
              landscape.
            </p>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6 order-sm-2 order-md-2 order-lg-1 text-center">
            <img
              src={MissionImage}
              alt="Mission Image"
              className="mission-img"
            />
          </div>
        </div>
        {/* Mission Section */}

        {/* Vision Section */}
        <div className="row mt-5">
          <div className="col-sm-12 col-md-12 col-lg-6 order-sm-1 order-md-1 order-lg-1">
            <p className="about-description" style={{ textAlign: "justify" }}>
              <span style={{ fontSize: "2rem", fontWeight: 600 }}>
                Our Vision
              </span>
              , is to revolutionize the legal industry by making high-quality
              legal services accessible and affordable for everyone. We strive
              to create a platform where individuals and businesses can
              confidently navigate their legal challenges with ease and
              efficiency. By leveraging technology and a client-centric
              approach, we aim to break down the barriers that often make legal
              assistance feel daunting and out of reach. Our goal is to empower
              our clients with the knowledge, resources, and support they need
              to achieve their legal objectives.
            </p>

            <p className="about-description" style={{ textAlign: "justify" }}>
              We envision a future where legal services are transparent,
              straightforward, and tailored to the unique needs of each client.
              Our commitment to excellence, innovation, and integrity drives us
              to continuously improve and expand our offerings.
            </p>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6 order-sm-2 order-md-2 order-lg-2 text-center">
            <img src={VisionImage} alt="Vision Image" className="vision-img" />
          </div>
        </div>
        {/* Vision Section */}
      </div>
    </section>
  );
};

export default About;
