import React from "react";
import "./css/Facilities.css";

const Facilities = () => {
  return (
    <section id="Facilities">
      <div className="container">
        <div className="row m-5">
          <div className="col-sm-12 col-md-12 col-lg-4 mb-2">
            <div className="card text-dark">
              <div className="card-body">
                <i className="fab fa-quinscape fa-4x d-flex justify-content-center mb-3"></i>
                <p className="card-text">
                  <h6
                    style={{
                      textAlign: "center",
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    QUICK RESPONSE
                  </h6>
                  <p style={{ textAlign: "center" }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Illo, maxime deserunt molestias officia quis dicta
                    assumenda.
                  </p>
                </p>
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-md-12 col-lg-4 mb-2">
            <div class="card text-dark" id="card1">
              <div className="card-body">
                <i className="fas fa-smile fa-4x d-flex justify-content-center mb-3"></i>
                <p className="card-text">
                  <h6
                    style={{
                      textAlign: "center",
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    100% SATISFACTION
                  </h6>
                  <p style={{ textAlign: "center" }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Illo, maxime deserunt molestias officia quis dicta
                    assumenda.
                  </p>
                </p>
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-md-12 col-lg-4 mb-2">
            <div className="card text-dark">
              <div className="card-body">
                <i className="fas fa-chess-queen fa-4x d-flex justify-content-center mb-3"></i>
                <p className="card-text">
                  <h6
                    style={{
                      textAlign: "center",
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    QUALITY SERVICE
                  </h6>
                  <p style={{ textAlign: "center" }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Illo, maxime deserunt molestias officia quis dicta
                    assumenda.
                  </p>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Facilities;
