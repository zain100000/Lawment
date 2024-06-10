import { NavLink } from "react-router-dom";
import "./css/Error.css";

const Error = () => {
  return (
    <>
      <section id="Error">
        <div className="content">
          <h2 className="header">404</h2>
          <h4>Sorry! Page not found</h4>
          <p>
            Oops! It seems like the page you're trying to access doesn't exist.
            If you believe there's an issue, feel free to report it, and we'll
            look into it.
          </p>
          <div className="btns">
            <NavLink to="/">Return Home</NavLink>
            <NavLink to="/contact-us">Report Problem</NavLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default Error;
