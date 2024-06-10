import React, { useEffect } from "react";
import Slider1 from "../../assets/slider/slider-1.jpg";
import Slider2 from "../../assets/slider/slider-2.jpg";
import Carousel from "../otherComponents/Carousel/Carousel";
import Facilities from "../otherComponents/Facilities/Facilities";
import Working from "../otherComponents/Working/Working";
import Services from "../otherComponents/Services/Services";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    return () => {
      window.scrollTo(0, 0);
    };
  }, []);

  const images = [Slider1, Slider2];
  const headings = ["Search the Expert Lawyers", "Search the Expert Lawyers"];
  const descriptions = [
    "Find out department and location based lawyers near your area",
    "Find out department and location based lawyers near your area",
  ];

  return (
    <section id="Home">
      {/* Banner Section */}
      <section id="Banner">
        <Carousel
          images={images}
          headings={headings}
          descriptions={descriptions}
        />
      </section>
      {/* Banner Section */}

      {/* Facilities Section */}
      <section id="Facilities">
        <Facilities />
      </section>
      {/* Facilities Section */}

      {/* Working Section */}
      <section id="Working">
        <Working />
      </section>
      {/* Working Section */}

      {/* Services Section */}
      <section id="Services">
        <Services />
      </section>
      {/* Services Section */}

      <hr
        className="seperator"
        style={{ color: "green", fontWeight: "bold" }}
      />
    </section>
  );
};

export default Home;
