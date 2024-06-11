import React, { useEffect } from "react";
import "./css/Departments.css";

const Departments = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    return () => {
      window.scrollTo(0, 0);
    };
  }, []);
  return (
    <section id="Departments">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="department-column">
              <div className="department-item">
                <i className="fas fa-balance-scale-right"></i>
                <h3>Civil Rights Department</h3>
                <p>
                  The Civil Rights Department focuses on protecting individuals'
                  fundamental rights and liberties, addressing issues such as
                  discrimination, equal opportunity, and freedoms of speech,
                  religion, and assembly. It provides legal assistance and
                  advocacy to ensure compliance with civil rights laws.
                </p>
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="department-column">
              <div className="department-item">
                <i className="fas fa-film"></i>
                <h3>Entertainment Law Department</h3>
                <p>
                  The Entertainment Law Department specializes in legal matters
                  related to the entertainment industry, including film,
                  television, music, and digital media. It handles contracts,
                  intellectual property rights, licensing, and negotiations for
                  artists, producers, and entertainment companies.{" "}
                </p>
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-md-12 col-lg-4">
            <div className="department-column">
              <div className="department-item">
                <i className="fas fa-stethoscope"></i>
                <h3>Health Law Department</h3>
                <p>
                  The Health Law Department addresses legal issues in the
                  healthcare sector, including regulatory compliance, patient
                  rights, medical malpractice, and healthcare policy. It
                  supports healthcare providers, institutions, and patients in
                  navigating complex healthcare laws and regulations.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="department-column">
              <div className="department-item">
                <i className="fas fa-passport"></i>
                <h3>Immigration Law Department</h3>
                <p>
                  The Immigration Law Department assists individuals and
                  businesses with immigration-related legal matters, such as
                  visa applications, citizenship, deportation defense, and
                  employment authorization. It provides guidance and
                  representation to help clients comply with immigration laws
                  and regulations.
                </p>
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="department-column">
              <div className="department-item">
                <i className="fas fa-globe"></i>
                <h3>International Law Department</h3>
                <p>
                  The International Law Department deals with legal issues that
                  cross national borders, including international trade,
                  treaties, human rights, and diplomatic relations. It advises
                  governments, corporations, and individuals on the complexities
                  of international law and global regulatory frameworks.
                </p>
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-md-12 col-lg-4">
            <div className="department-column">
              <div className="department-item">
                <i className="fas fa-id-badge"></i>
                <h3>Military Law Department</h3>
                <p>
                  The Military Law Department specializes in legal matters
                  related to the armed forces, including military justice,
                  court-martial proceedings, and veterans' rights. It provides
                  legal services to military personnel, veterans, and their
                  families, ensuring adherence to military laws and regulations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Departments;
