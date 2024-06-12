import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/Carousel.css";

const Carousel = ({ images, headings, descriptions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [currentIndex, images.length]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://lawment-deployment-server.onrender.com/api/lawyers/getLawyers?name=${searchQuery}`
      );
      if (response.data.length > 0) {
        setSearchResults(response.data.Lawyers);
        setErrorMessage("");
      } else {
        setSearchResults([]);
        setErrorMessage("No Lawyer Found");
      }
    } catch (error) {
      setSearchResults([]);
      setErrorMessage("An error occurred while fetching the data");
    }
  };

  return (
    <section id="Carousel">
      <div className="carousel-container">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-slide ${
              index === currentIndex ? "active" : ""
            }`}
          >
            <img
              src={image}
              alt={`slide-${index}`}
              className="carousel-image"
            />
            <div className="carousel-content">
              <h2 className="flip-in-out heading">{headings[index]}</h2>
              <h2 className="flip-in-out description">{descriptions[index]}</h2>
              <div className="searchContainer">
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fas fa-search"></i>
                  </span>
                  <input
                    className="form-control"
                    placeholder="Search The Lawyers"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button onClick={handleSearch}>Search</button>
                </div>
              </div>
              <div className="search-results">
                {searchResults.length > 0
                  ? searchResults.map((lawyer) => (
                      <div key={lawyer.id} className="lawyer-result">
                        <h3>{lawyer.name}</h3>
                        <p>{lawyer.specialization}</p>
                        {/* You can add more details as needed */}
                      </div>
                    ))
                  : errorMessage && <p>{errorMessage}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Carousel;
