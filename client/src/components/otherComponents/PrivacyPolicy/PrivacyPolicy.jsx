import React, { useEffect } from "react";
import "./css/PrivacyPolicy.css";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    return () => {
      window.scrollTo(0, 0);
    };
  }, []);
  return (
    <section id="privacy-policy">
      <div className="privacy-container container mt-5">
        <h1 className="text-center mb-4">Privacy Policy</h1>
        <div className="privacy-content">
          <h2>Introduction</h2>
          <p>
            Welcome to{" "}
            <span style={{ color: "#c8b47e", fontWeight: "bold" }}>
              LAWMENT
            </span>
            . We are committed to protecting your personal information and your
            right to privacy. If you have any questions or concerns about our
            policy, or our practices with regards to your personal information,
            please contact us at{" "}
            <span style={{ color: "#c8b47e", fontWeight: "bold" }}>
              +111-233-1273
            </span>
            .
          </p>

          <h2>Information We Collect</h2>
          <p>
            We collect personal information that you voluntarily provide to us
            when registering at the Website, expressing an interest in obtaining
            information about us or our products and services, when
            participating in activities on the Website, or otherwise contacting
            us.
          </p>

          <h2>How We Use Your Information</h2>
          <p>
            We use personal information collected via our Website for a variety
            of business purposes described below. We process your personal
            information for these purposes in reliance on our legitimate
            business interests, in order to enter into or perform a contract
            with you, with your consent, and/or for compliance with our legal
            obligations.
          </p>

          <h2>Sharing Your Information</h2>
          <p>
            We may process or share data based on the following legal basis:
            Consent, Legitimate Interests, Performance of a Contract, Legal
            Obligations, and Vital Interests.
          </p>

          <h2>Cookies and Tracking Technologies</h2>
          <p>
            We may use cookies and similar tracking technologies to access or
            store information. Specific information about how we use such
            technologies and how you can refuse certain cookies is set out in
            our Cookie Policy.
          </p>

          <h2>Your Privacy Rights</h2>
          <p>
            In some regions (like the European Economic Area), you have rights
            that allow you greater access to and control over your personal
            information. You may review, change, or terminate your account at
            any time.
          </p>

          <h2>Data Security</h2>
          <p>
            We have implemented appropriate technical and organizational
            security measures designed to protect the security of any personal
            information we process. However, please also remember that we cannot
            guarantee that the internet itself is 100% secure.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions or comments about this policy,
            <br /> you may email us at <br />
            <span style={{ color: "#c8b47e", fontWeight: "bold" }}>
              info@lawment.com
            </span>{" "}
            <br />
            or by post to: <br />
            <span style={{ color: "#c8b47e", fontWeight: "bold" }}>
              LAWMENT, 95 South Park Ave, NYC, USA
            </span>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
